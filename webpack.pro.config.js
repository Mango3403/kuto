const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin'); 

const env = process.env.NODE_ENV || 'production';

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public/pro',
        filename: 'js/[name]-[hash:7].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { modules: true } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')(),
                                    require('cssnano')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
                // use: 'babel-loader'
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
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|ttc|eot|TTF)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.gz$/,
                enforce: 'pre',
                use: 'gzip-loader'
            }
        ]
    },
    plugins: [
        new CleanPlugin(['public/pro'], {
            'root': __dirname,
            'verbose': true,
            'dry': false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HTMLWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/assets',
                to: __dirname + '/public/pro/assets'
            }
        ])
    ],
    resolve: {
        extensions: [' ', '.js', '.jsx', '.css', '.less']
    }
}