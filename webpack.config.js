module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        filename: "./public/scripts/bundle.js",
        sourceMapFilename: "public/scripts/bundle.map"
    },
    devtool: '#source-map',
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