const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const { Server } = require("socket.io");
const fs = require("fs");

// Use production mode if specifically requested or if a production build exists
// This ensures we NEVER accidentally run Turbopack dev mode on production servers
const hasBuild = fs.existsSync(path.join(__dirname, '.next', 'BUILD_ID'));
const dev = process.env.NODE_ENV !== "production" && !hasBuild;
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js app from the project root in STRICT production mode
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

// Store active users and their socket IDs
const userSocketMap = new Map(); // userId -> socket.id

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);

      // Explicitly serve dynamically uploaded files
      if (parsedUrl.pathname && parsedUrl.pathname.startsWith("/uploads/")) {
        // Resolve from STORAGE_PATH first if set, otherwise from local public folder
        const baseDir = process.env.STORAGE_PATH
          ? path.join(process.env.STORAGE_PATH, "uploads")
          : path.join(__dirname, "public", "uploads");

        // Extract just the filename (e.g., /uploads/image.jpg -> image.jpg)
        const filename = parsedUrl.pathname.replace("/uploads/", "");
        const filePath = path.join(baseDir, filename);
        try {
          const stat = await fs.promises.stat(filePath);
          if (stat.isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              ".jpg": "image/jpeg",
              ".jpeg": "image/jpeg",
              ".png": "image/png",
              ".gif": "image/gif",
              ".webp": "image/webp",
              ".mp4": "video/mp4",
              ".webm": "video/webm",
            };
            res.setHeader(
              "Content-Type",
              mimeTypes[ext] || "application/octet-stream",
            );
            res.setHeader(
              "Cache-Control",
              "public, max-age=31536000, immutable",
            );
            const stream = fs.createReadStream(filePath);
            return stream.pipe(res);
          }
        } catch (e) {
          // File not found, fall back to Next.js handler
        }
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  // Initialize Socket.io
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  io.on("connection", (socket) => {
    // 1. Register User Socket + Online Presence
    socket.on("register", (userId) => {
      if (userId) {
        const userIdStr = userId.toString();
        userSocketMap.set(userIdStr, socket.id);

        // Send the current online users list to the newly connected user
        socket.emit("online_users", Array.from(userSocketMap.keys()));

        // Broadcast to ALL connected sockets that this user is now online
        socket.broadcast.emit("user_online", userIdStr);
      }
    });

    // 2. Handle Instant Messages with delivery confirmation
    socket.on("send_message", (data) => {
      /* data: { recipientId, conversationId, messageId, content, senderId, senderName, senderAvatar, createdAt } */
      const targetSocketId = userSocketMap.get(data.recipientId.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("receive_message", data);

        // Send delivery confirmation back to the sender
        socket.emit("message_delivered", {
          messageId: data.messageId,
          conversationId: data.conversationId,
          deliveredAt: new Date().toISOString(),
        });
      }
    });

    // 3. Handle Typing Indicators
    socket.on("typing", (data) => {
      // data: { recipientId, conversationId, senderId, senderName }
      const targetSocketId = userSocketMap.get(data.recipientId.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("user_typing", data);
      }
    });

    socket.on("stop_typing", (data) => {
      const targetSocketId = userSocketMap.get(data.recipientId.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("user_stop_typing", data);
      }
    });

    // 4. Handle Read Receipts
    socket.on("mark_read", (data) => {
      // data: { recipientId, conversationId, readerId }
      const targetSocketId = userSocketMap.get(data.recipientId.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("messages_read", data);
      }
    });

    // 5. Handle WebRTC Calls
    socket.on("call_user", (data) => {
      const targetSocketId = userSocketMap.get(data.userToCall.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("incoming_call", {
          signal: data.signalData,
          from: data.from,
          name: data.name,
          avatar: data.avatar,
          isVideo: data.isVideo,
        });
      }
    });

    socket.on("answer_call", (data) => {
      const targetSocketId = userSocketMap.get(data.to.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("call_accepted", data.signal);
      }
    });

    socket.on("end_call", (data) => {
      const targetSocketId = userSocketMap.get(data.to.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("call_ended");
      }
    });

    socket.on("ice_candidate", (data) => {
      const targetSocketId = userSocketMap.get(data.to.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("ice_candidate", data.candidate);
      }
    });

    // 6. Disconnect + Offline Presence
    socket.on("disconnect", () => {
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          // Broadcast to ALL connected sockets that this user is now offline
          io.emit("user_offline", userId);
          break;
        }
      }
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port} in PRODUCTION mode`);
  });
});
