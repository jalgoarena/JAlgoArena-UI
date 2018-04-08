var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: [
        "babel-polyfill",
        "webpack-hot-middleware/client",
        "./client/index"
    ],
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/assets/"
    },
    devServer: {
        inline: true,
        contentBase: "./public",
        port: 3000
    },
    devtool: "cheap-module-eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                tests: /\.js?$/,
                loaders: ["babel"],
                include: path.join(__dirname, "client")
            },
            {
                test: /\.json$/,
                loader: 'json'
            }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    }
};
