const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
// const autoprefixerFromPostcss = require('autoprefixer');
// const cssnanoFromPostcss = require('cssnano');

const env = process.env.NODE_ENV || 'development';

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'js/[name].[hash:8].bundle.js',
        chunkFilename: 'js/[name]-[id].[hash:8].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { modules: true } },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         plugins: (loader) => [
                        //             autoprefixerFromPostcss(),
                        //             cssnanoFromPostcss()
                        //         ]
                        //     }
                        // }
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'less-loader' }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'images'
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/assets',
                to: __dirname + '/public/assets'
            }
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HTMLWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        modules: [
            path.resolve('src'),
            'node_modules',
        ],
        extensions: [' ', '.js', '.jsx', '.css', '.less']
    },
    devtool: 'eval',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true,
        inline: true,
        hot: true,
        hotOnly: true
    }
};