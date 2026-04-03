const fs = require("fs");
const path = require("path");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = false;
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();
const userSocketMap = new Map();

const MIME_TYPES = {
  ".css": "text/css",
  ".eot": "application/vnd.ms-fontobject",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript",
  ".json": "application/json",
  ".map": "application/json",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function streamFile(filePath, res, cacheControl) {
  const stat = await fs.promises.stat(filePath);
  if (!stat.isFile()) {
    return false;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.setHeader(
    "Content-Type",
    MIME_TYPES[ext] || "application/octet-stream",
  );
  if (cacheControl) {
    res.setHeader("Cache-Control", cacheControl);
  }

  await new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    stream.on("error", reject);
    res.on("close", resolve);
    stream.on("end", resolve);
    stream.pipe(res);
  });

  return true;
}

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        const { pathname = "" } = parsedUrl;

        if (pathname.startsWith("/_next/static/")) {
          const relativePath = pathname.replace("/_next/static/", "");
          const filePath = path.join(__dirname, ".next", "static", relativePath);

          try {
            const served = await streamFile(
              filePath,
              res,
              "public, max-age=31536000, immutable",
            );
            if (served) return;
          } catch {}
        }

        if (pathname.startsWith("/uploads/")) {
          const uploadsRoot = process.env.STORAGE_PATH
            ? path.join(process.env.STORAGE_PATH, "uploads")
            : path.join(__dirname, "public", "uploads");
          const relativePath = pathname.replace("/uploads/", "");
          const filePath = path.join(uploadsRoot, relativePath);

          try {
            const served = await streamFile(
              filePath,
              res,
              "public, max-age=31536000, immutable",
            );
            if (served) return;
          } catch {}
        }

        await handle(req, res, parsedUrl);
      } catch (error) {
        console.error("Request handling failed:", req.url, error);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end("internal server error");
        }
      }
    });

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
        if (!userId) return;

        const normalizedUserId = userId.toString();
        userSocketMap.set(normalizedUserId, socket.id);

        socket.emit("online_users", Array.from(userSocketMap.keys()));
        socket.broadcast.emit("user_online", normalizedUserId);
      });

      socket.on("send_message", (data) => {
        const targetSocketId = userSocketMap.get(data.recipientId?.toString());
        if (!targetSocketId) return;

        io.to(targetSocketId).emit("receive_message", data);
        socket.emit("message_delivered", {
          messageId: data.messageId,
          conversationId: data.conversationId,
          deliveredAt: new Date().toISOString(),
        });
      });

      socket.on("typing", (data) => {
        const targetSocketId = userSocketMap.get(data.recipientId?.toString());
        if (targetSocketId) {
          io.to(targetSocketId).emit("user_typing", data);
        }
      });

      socket.on("stop_typing", (data) => {
        const targetSocketId = userSocketMap.get(data.recipientId?.toString());
        if (targetSocketId) {
          io.to(targetSocketId).emit("user_stop_typing", data);
        }
      });

      socket.on("mark_read", (data) => {
        const targetSocketId = userSocketMap.get(data.recipientId?.toString());
        if (targetSocketId) {
          io.to(targetSocketId).emit("messages_read", data);
        }
      });

      socket.on("call_user", (data) => {
        const targetSocketId = userSocketMap.get(data.userToCall?.toString());
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
        const targetSocketId = userSocketMap.get(data.to?.toString());
        if (targetSocketId) {
          io.to(targetSocketId).emit("call_accepted", data.signal);
        }
      });

      socket.on("end_call", (data) => {
        const targetSocketId = userSocketMap.get(data.to?.toString());
        if (targetSocketId) {
          io.to(targetSocketId).emit("call_ended");
        }
      });

      socket.on("ice_candidate", (data) => {
        const targetSocketId = userSocketMap.get(data.to?.toString());
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

    server.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Server boot failed:", error);
    process.exit(1);
  });
