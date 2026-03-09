const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");

// Enforce production mode on Hostinger by defaulting dev to false unless explicitly set to development
const dev = process.env.NODE_ENV === "development";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js app from the project root
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, hostname, () => {
    console.log(
      `> Ready on http://${hostname}:${port} in ${dev ? "development" : "production"} mode`,
    );
  });
});
