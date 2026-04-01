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

      // Serve Next.js static assets directly from .next/static
      if (pathname && pathname.startsWith("/_next/static/")) {
        const relativePath = pathname.replace("/_next/static/", "");
        const filePath = path.join(__dirname, ".next", "static", relativePath);

        try {
          const stat = await fs.promises.stat(filePath);
          if (stat.isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              ".js": "application/javascript",
              ".css": "text/css",
              ".woff": "font/woff",
              ".woff2": "font/woff2",
              ".ttf": "font/ttf",
              ".eot": "application/vnd.ms-fontobject",
              ".svg": "image/svg+xml",
              ".png": "image/png",
              ".jpg": "image/jpeg",
              ".gif": "image/gif",
              ".webp": "image/webp",
              ".json": "application/json",
              ".map": "application/json",
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
          console.error(`[static] File not found: ${filePath}`);
        }
      }

      // Serve dynamically uploaded files from STORAGE_PATH
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

      // Let Next.js handle everything else (pages, API routes, static files)
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
    // Diagnostic: verify build integrity
    const buildIdPath = path.join(__dirname, ".next", "BUILD_ID");
    try {
      const buildId = fs.readFileSync(buildIdPath, "utf8").trim();
      console.log(`> BUILD_ID: ${buildId}`);
    } catch (e) {
      console.error("> ERROR: No BUILD_ID found!", e.message);
    }
    const staticDir = path.join(__dirname, ".next", "static");
    try {
      const entries = fs.readdirSync(staticDir);
      console.log(`> .next/static exists with ${entries.length} entries:`, entries);
      const chunksDir = path.join(staticDir, "chunks");
      if (fs.existsSync(chunksDir)) {
        const chunks = fs.readdirSync(chunksDir);
        console.log(`> .next/static/chunks has ${chunks.length} files:`);
        console.log(`> Chunk names: ${chunks.join(", ")}`);
      } else {
        console.error("> ERROR: .next/static/chunks does NOT exist!");
      }
    } catch (e) {
      console.error("> ERROR: .next/static does NOT exist!", e.message);
    }
  });
});
