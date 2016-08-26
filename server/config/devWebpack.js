module.exports = function (app, logger) {
    var config = require('../../webpack.config.dev');
    var webpack = require('webpack');
    var compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: logger.debug,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
}