const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: [
        "babel-polyfill",
        "./client/index"
    ],
    output: {
        path: path.resolve(__dirname, "public", "assets"),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new UglifyJsPlugin()
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
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};

