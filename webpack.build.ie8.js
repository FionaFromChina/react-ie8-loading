const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './build/js/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/apps.js'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['es3ify-loader'],
            },
        ]
    }
};


