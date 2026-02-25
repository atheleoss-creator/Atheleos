const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Hostinger's Node.js App uses production by default, but we enforce it just in case
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// The port Hostinger assigns dynamically to the Node.js App
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);

    // Let Next.js handle the request
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
