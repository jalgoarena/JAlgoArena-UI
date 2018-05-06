const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: "./client/index"
    },
    output: {
        path: path.resolve(__dirname, "public", "assets"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "assets", "index.html"),
            filename: path.resolve(__dirname, "public", "assets", "index.html"),
            favicon: path.resolve(__dirname, "assets", "favicon.ico"),
            hash: true
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "client"),
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};

