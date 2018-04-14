const env = process.env.NODE_ENV || "dev";
const port = process.env.PORT || 3000;

const path = require("path");
const express = require("express");

const morgan = require("morgan");
const helmet = require("helmet");
const serveStatic = require("serve-static");

const app = express();
const compression = require("compression");
app.use(compression());

app.use(morgan("tiny"));

helmet(app);

let assetsDir;

if (env === "production") {
    require("./server/build/copyFiles")();
    assetsDir = path.join(__dirname, "public", "assets");
} else {
    require("./server/config/devWebpack")(app);
    assetsDir = path.join(__dirname, "assets");
}

app.use(serveStatic(assetsDir));

app.get("*", function (req, res) {
    res.sendFile(path.join(assetsDir, "index.html"));
});

var config = require("./client/config");

app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
    console.log("JAlgoArena API Server: " + config.jalgoarenaApiUrl);
    console.log("JAlgoArena WebSocket Server:" + config.jalgoarenaWebSocketUrl);
});

