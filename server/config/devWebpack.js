module.exports = function (app) {
    const config = require("../../webpack.config.dev");
    const webpack = require("webpack");
    const compiler = webpack(config);

    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000
    }));
};