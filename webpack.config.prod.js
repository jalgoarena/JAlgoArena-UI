var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: [
        "babel-polyfill",
        "./client/index"
    ],
    output: {
        path: path.join(__dirname, "public", "assets"),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                },
                include: path.join(__dirname, "client"),
                exclude: /node_modules/,
                test: /\.jsx?$/
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    }
};

