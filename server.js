var env = process.env.NODE_ENV || "dev";
var port = process.env.PORT || 3000;

var path = require("path");
var express = require("express");

var morgan = require("morgan");
var helmet = require("helmet");
var serveStatic = require("serve-static");

var app = express();
var compression = require("compression");
app.use(compression());

app.use(morgan("tiny"));

helmet(app);

var assetsDir;

console.log("Env: " + env);

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
    console.log("JAlgoArena API Server connected: " + config.jalgoarenaApiUrl);
});

