var webpack = require('webpack');

module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        filename: "./public/dist/bundle.js",
        sourceMapFilename: "public/dist/bundle.map"
    },
    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000
    },
    devtool: '#source-map',
    plugins: process.env.NODE_ENV === 'heroku' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [],
    module: {
        loaders: [
            {
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                },
                include: /src/,
                exclude: /node_modules/,
                test: /\.jsx?$/
            }
        ]
    }
};