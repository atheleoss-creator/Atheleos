const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const { Server } = require("socket.io");
const fs = require("fs");

const dev = false;
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

const userSocketMap = new Map();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // ✅ FIX 1: Serve Next.js static files
      if (pathname && pathname.startsWith("/_next/static/")) {
        const filePath = path.join(
          __dirname,
          ".next",
          pathname.replace("/_next/", ""),
        );

        try {
          const stat = await fs.promises.stat(filePath);
          if (stat.isFile()) {
            const ext = path.extname(filePath).toLowerCase();

            const mimeTypes = {
              ".js": "application/javascript",
              ".css": "text/css",
              ".json": "application/json",
              ".woff": "font/woff",
              ".woff2": "font/woff2",
              ".ttf": "font/ttf",
              ".eot": "application/vnd.ms-fontobject",
              ".svg": "image/svg+xml",
            };

            res.setHeader(
              "Content-Type",
              mimeTypes[ext] || "application/octet-stream",
            );
            res.setHeader(
              "Cache-Control",
              "public, max-age=31536000, immutable",
            );

            return fs.createReadStream(filePath).pipe(res);
          }
        } catch (e) {
          // fallback to Next
        }
      }

      // ✅ FIX 2: Serve public folder (images, etc.)
      if (pathname && pathname.startsWith("/")) {
        const publicPath = path.join(__dirname, "public", pathname);
        try {
          const stat = await fs.promises.stat(publicPath);
          if (stat.isFile()) {
            return fs.createReadStream(publicPath).pipe(res);
          }
        } catch (e) {}
      }

      // ✅ Your existing uploads logic (unchanged)
      if (pathname && pathname.startsWith("/uploads/")) {
        const baseDir = process.env.STORAGE_PATH
          ? path.join(process.env.STORAGE_PATH, "uploads")
          : path.join(__dirname, "public", "uploads");

        const filename = pathname.replace("/uploads/", "");
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

            return fs.createReadStream(filePath).pipe(res);
          }
        } catch (e) {}
      }

      // ✅ Fallback to Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  // ✅ Socket.io (unchanged)
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      if (userId) {
        const userIdStr = userId.toString();
        userSocketMap.set(userIdStr, socket.id);

        socket.emit("online_users", Array.from(userSocketMap.keys()));
        socket.broadcast.emit("user_online", userIdStr);
      }
    });

    socket.on("send_message", (data) => {
      const targetSocketId = userSocketMap.get(data.recipientId.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("receive_message", data);

        socket.emit("message_delivered", {
          messageId: data.messageId,
          conversationId: data.conversationId,
          deliveredAt: new Date().toISOString(),
        });
      }
    });

    socket.on("typing", (data) => {
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

    socket.on("mark_read", (data) => {
      const targetSocketId = userSocketMap.get(data.recipientId.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("messages_read", data);
      }
    });

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

    socket.on("disconnect", () => {
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          io.emit("user_offline", userId);
          break;
        }
      }
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
