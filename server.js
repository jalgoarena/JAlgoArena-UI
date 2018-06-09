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

const consul = require('consul')();

consul.health.service({
    service: 'jalgoarena-api',
    passing: true,
    near: "_agent"
}, (err, result) => {
    if (err) {
        console.error(`ERR: cannot find jalgoarena-api service instance${err}`);
    } else {
        let serviceInstance = result[0];
        let url = `http://${serviceInstance.Node.Address}:${serviceInstance.Service.Port}`;

        const apiProxy = proxy('/api', {
            target: url,
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        });
        app.use('/api', apiProxy);
    }
});

consul.health.service({
    service: 'jalgoarena-events',
    passing: true,
    near: "_agent"
}, (err, result) => {
    if (err) {
        console.error(`ERR: cannot find jalgoarena-events service instance: ${err}`);
    } else {
        let serviceInstance = result[0];
        let url = `http://${serviceInstance.Node.Address}:${serviceInstance.Service.Port}`;
        const wsProxy = proxy('/ws', {
            target: url,
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/ws': ''
            }
        });
        app.use('/ws', wsProxy);
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public"), "index.html");
});

app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});

