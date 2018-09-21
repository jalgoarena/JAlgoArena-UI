const path = require("path");
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = "build/public";

module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial"
                }
            }
        }
    },
    entry: {
        vendors: "./src/client/vendors",
        index: ["@babel/polyfill", "./src/client/index"]
    },
    output: {
        path: path.resolve(__dirname, outputDirectory),
        filename: "[name].bundle.js",
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HTMLWebpackPlugin({
            title: "JAlgoArena",
            favicon: path.resolve(__dirname, "src", "client", "assets", "favicon.ico"),
            template: path.resolve(__dirname, "src", "client", "assets", "index.html"),
            filename: path.resolve(__dirname, outputDirectory, "index.html"),
            hash: true,
            meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "build/public"),
        hot: true,
        open: true,
        proxy: {
            "/api": "http://localhost:3000",
            "/ws": "http://localhost:3000"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                enforce: "pre",
                test: "/\.js$/",
                loader: "source-map-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
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
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
};

