var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        "./client/index"
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js",
        publicPath: '/assets/'
    },
    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            tests: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'client')
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};