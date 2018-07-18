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

const jalgoarenaApiUrl = process.env.JALGOARENA_API_URL || "http://localhost:5001";

const apiProxy = proxy('/api', {
    target: jalgoarenaApiUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
});
app.use('/api', apiProxy);

const jalgoarenaWsUrl = process.env.JALGOARENA_WS_URL || "http://localhost:5005";

const wsProxy = proxy('/ws', {
    target: jalgoarenaWsUrl,
    ws: true,
    changeOrigin: true,
    pathRewrite: {
        '^/ws': ''
    }
});
app.use('/ws', wsProxy);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public"), "index.html");
});

app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});

