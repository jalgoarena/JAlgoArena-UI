module.exports = {
    entry: [
        "./src/app.jsx"
    ],
    output: {
        filename: "./public/scripts/bundle.js"
    },

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