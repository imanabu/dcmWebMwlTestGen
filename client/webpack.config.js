var path = require('path');

module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: {
        main: ['./main.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../public/jsd')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }

};
