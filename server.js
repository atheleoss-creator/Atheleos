const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const { Server } = require("socket.io");

// ALWAYS force production mode on Hostinger to prevent Turbopack 404s
const dev = false;
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
      const { pathname } = parsedUrl;

      // EXPLICIT ROUTING: Hostinger custom servers often drop Next.js static chunk routing
      // If the request is for an internal Next.js file, strictly pass it directly to Next
      if (pathname.startsWith("/_next") || pathname.startsWith("/public")) {
        await handle(req, res, parsedUrl);
        return;
      }

      // Normal application routing
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

    // 5. Disconnect + Offline Presence
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

  server.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port} in PRODUCTION mode`);
  });
});
