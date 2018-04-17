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

let loadConfig = function () {
    const emailRegex = process.env.JALGOARENA_EMAIL_REGEX
        || /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    function loadIfPresent(env, defaultValue) {
        if (process.env.JALGOARENA_TEAMS) {
            return JSON.parse(env);
        }
        return defaultValue;
    }

    let teams = loadIfPresent(process.env.JALGOARENA_TEAMS, ["Team A", "Team B", "Team C"]);
    let regions = loadIfPresent(process.env.JALGOARENA_TEAMS, ["Kraków", "Wrocław"]);
    let languages = loadIfPresent(process.env.JALGOARENA_REGIONS, ["java", "kotlin", "ruby"]);

    return {
        jalgoarenaWebSocketUrl: process.env.JALGOARENA_WS_URL || "http://localhost:5005",
        title: process.env.JALGOARENA_TITLE || "Start to solve your first problem",
        emailRegex,
        emailErrorMessage: process.env.JALGOARENA_EMAIL_ERROR_MESSAGE || "Please enter a valid email address",
        teams,
        regions,
        languages
    };
};

let config = loadConfig();

console.log("Config: \n" + JSON.stringify(config, null, 2));

app.get("/config", function (req, res) {
    res.send(config);
});

let jalgoarenaApiUrl = process.env.JALGOARENA_API_URL || "http://localhost:5001";
app.use('/api', function(req, res) {
    let destinationUrl = jalgoarenaApiUrl + req.path;
    console.log(`Redirect ${req.originalUrl} to ${destinationUrl}`);
    res.redirect(destinationUrl);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(assetsDir, "index.html"));
});

app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
    console.log("Server using API: " + jalgoarenaApiUrl);
});

