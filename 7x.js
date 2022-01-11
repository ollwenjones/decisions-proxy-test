const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const https = require("https");
const http = require("http");
const fs = require("fs");
const privateKey = fs.readFileSync("server.key", "utf8");
const certificate = fs.readFileSync("server.cert", "utf8");
const app = express();

const useHttps = false; // change this to true if you are using SSL/HTTPS. should be consistent end to end.

// this is insecure to set this env flag - use only for dev testing
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const proxyTarget = useHttps ? "https://win-machine:8081" : "http://win-machine:8081";
const httpServer = http.createServer(app);
const proxyTestPath = '/decisions'; 
const actualPathBase = '';

app.use(
  "/decisions", // catch all traffic to this-site/decisions
  createProxyMiddleware({
    /**
     * destination URL: proxy all such requests to Decisions end-point
     */
    target: proxyTarget,
    /**
     * "changes the origin of the host header to the target URL" [docs](https://github.com/chimurai/http-proxy-middleware)
     */
    changeOrigin: true, // change origin so it appears same-origin on both ends.
    logLevel: "info",
    /**
     * If the test path and actual decisions path are different, it's necessary to replace the test path with the real one
     */
    pathRewrite: {[proxyTestPath] : actualPathBase}, 
    secure: false, // this is a test / POC, so it doesn't need to be secure. 
    onProxyReq: (proxyReq, req, res) => {
      // for each proxied request:
      // set a special header, which is an experimental flag Decisions can read to embed the host site's URL the embedded UI,
      // so network traffic from the Decisions form continues to go through the host/proxy and not be CORS.
      // if you need to try this, you will currently have to ask Decisions for a patch for your version.
      proxyReq.setHeader("x-proxied-from", req.headers.host);
      if (proxyTestPath !== actualPathBase) {
        // set additional header if the base path of decisions is set, and it is different from the one you are testing for in your proxy.
        // e.g. Self hosted 7 has no path base by default, 
        proxyReq.setHeader("x-proxied-from-path-base", proxyTestPath);
      }
    },
  })
  );
app.use(express.static("./")); // just tell express to serve the static content here.

httpServer.listen(3000);
console.log("http: listening at :3000...");

if (useHttps) {
  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = useHttps ? https.createServer(credentials, app) : null;
  httpsServer.listen(3443);
  console.log("https: listening at :3443...");
}
