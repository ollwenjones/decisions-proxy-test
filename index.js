const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const https = require("https");
const http = require("http");
const fs = require("fs");
const privateKey = fs.readFileSync("server.key", "utf8");
const certificate = fs.readFileSync("server.cert", "utf8");
const app = express();

const useHttps = true;
// this is insecure to set this env flag - use only for dev testing
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const proxyTarget = useHttps ? "https://win-machine" : "http://win-machine:80";

const credentials = { key: privateKey, cert: certificate };
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.use(
  "/decisions", // catch all traffic to this-site/decisions
  createProxyMiddleware({
    target: proxyTarget, // proxy all such requests to Decisions end-point
    changeOrigin: true,
    logLevel: "warn",
    secure: false, // this is a test / POC, so it doesn't need to be secure. 
    onProxyReq: (proxyReq, req, res) => {
      // set header, which is an experimental flag Decisions can read to embed the host site in traffic from the embedded UI.
      proxyReq.setHeader("x-proxied-from", req.headers.host);
    },
  })
  );
app.use(express.static("./")); // just tell express to serve the static content here.
// app.listen(3000); // this test server will run on localhost:3000/
// app.listen(3443);

httpServer.listen(3000);
console.log("http: listening at :3000...");
httpsServer.listen(3443);
console.log("https: listening at :3443...");
