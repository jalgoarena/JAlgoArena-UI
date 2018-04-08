var webpack = require("webpack");
var path = require("path");

module.exports = {
    mode: 'development',
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
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                },
                include: path.resolve(__dirname, "client"),
                exclude: /node_modules/,
                test: /\.jsx?$/
            }]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};
