const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/decisions", // catch all traffic to this-site/decisions
  createProxyMiddleware({
    target: "http://192.168.1.3:80", // proxy all such requests to Decisions end-point
    changeOrigin: true,
    logLevel: "warn",
    onProxyReq: (proxyReq, req, res) => {
      // set header, which is an experimental flag Decisions can read to embed the host site in traffic from the embedded UI.
      proxyReq.setHeader("x-proxied-from", req.headers.host);
    },
  })
);
app.use(express.static("./")); // just tell express to serve the static content here.
app.listen(3000); // this test server will run on localhost:3000/
