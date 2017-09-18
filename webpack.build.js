const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var es3ifyPlugin = require('es3ify-webpack-plugin');
/**
 * 将scss 抽离，打包成单独的文件
 * */
const extractSass = new ExtractTextWebpackPlugin({
    filename: "loading.css",
    disable: process.env.NODE_ENV === "development"
})

module.exports = {
    entry:
        [
            "es5-shim",
            "es5-shim/es5-sham",
            'babel-polyfill',
            './src/components/ie8.classlist.js',
            './src/app.jsx',
            './src/vendors.js'
        ]
    ,

    output: {
        path: path.resolve(__dirname, 'build'),
        filename:
            'js/[name].js'
    }
    ,

    resolve: {
        enforceExtension: false,
        extensions:
            ['.js', '.jsx', '.scss']
    }
    ,

    devtool: 'source-map',

    module:
        {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loaders: ['es3ify-loader', 'babel-loader'],
                },

                {
                    enforce: "post",
                    test: /\.(js|jsx)$/,
                    loaders: ['es3ify-loader'],
                },

                {
                    test: /\.(png|svg|jpg|gif)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'img/[name].[ext]'
                        }
                    }
                },

                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: extractSass.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: false
                                }
                            },

                            'sass-loader'
                        ]
                    })
                }
            ],
        }
    ,

    plugins: [
        new HtmlWebpackPlugin({
                template: './src/index.html'
        }),

        extractSass,

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors', 'manifest'],
            minChunks: Infinity,
            filename: 'js/[name].js'
        }),

        new es3ifyPlugin()
    ]
};





