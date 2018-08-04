const port = process.env.PORT || 3000;

const path = require("path");
const express = require("express");

const morgan = require("morgan");
const helmet = require("helmet");
const serveStatic = require("serve-static");
const proxy = require('http-proxy-middleware');

const app = express();
const compression = require("compression");
app.use(compression());
app.use(morgan("tiny"));

helmet(app);
app.use(serveStatic(path.join(__dirname, "public")));


const apiProxy = proxy('/api', {
    target: process.env.JALGOARENA_API_HTTP_URL || "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
});
app.use('/api', apiProxy);

const wsProxy = proxy('/ws', {
    target: process.env.JALGOARENA_API_WS_URL || "http://localhost:5005",
    ws: true,
    changeOrigin: true,
    pathRewrite: {
        '^/ws': ''
    }
});
app.use('/ws', wsProxy);

const kvProxy = proxy('/config', {
    target: "http://localhost:8500",
    changeOrigin: true,
    pathRewrite: {
        '^/config': '/v1/kv/jalgoarena/config?raw'
    }
});
app.use("/config", kvProxy);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public"), "index.html");
});

app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});

