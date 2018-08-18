const path = require("path");
const fs = require("fs");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = "build";

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: "./src/server/index.js",
    target: "node",
    node: {
        __dirname: false,
        __filename: false,
    },
    output: {
        path: path.resolve(__dirname, outputDirectory),
        filename: "server.js",
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory])
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/env', {
                            'targets': {
                                'node': 'current'
                            }
                        }]
                    ]
                }
            }
        }]
    }
};

