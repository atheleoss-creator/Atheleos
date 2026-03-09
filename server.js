const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");

// ALWAYS force production mode on Hostinger to prevent Turbopack 404s
const dev = false;
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js app from the project root in STRICT production mode
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
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
  }).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port} in PRODUCTION mode`);
  });
});
