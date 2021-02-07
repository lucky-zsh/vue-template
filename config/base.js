const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { assetsRequire, cssOneOf, scssOneOf } = require('./expend');
const FsEnv = require('./env.js');
const envObj = FsEnv(`../env/.env.${process.env.NODE_ENV}`);
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'js/[name].min.js',
        chunkFilename: 'js/chunk/[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, '..', 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                // 添加解析 .vue文件loader
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve(__dirname, '../src')],
                options: assetsRequire
            },
            {
                test: /\.js(\?.*)?$/,
                exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, '../src')],
                sideEffects: true,
                oneOf: cssOneOf
            },
            {
                test: /\.s[ac]ss$/i,
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/_element-ui')],
                sideEffects: true,
                oneOf: scssOneOf
            },
            {
                test: /\.(|woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            limit: 2048,
                            name: 'assets/fonts/[name].[ext]',
                            publicPath: '/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/i, //正则表达式匹配图片规则
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 2048,
                            name: 'assets/images/[name].[ext]', //images:图片打包的文件夹；
                            publicPath: '/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css'],
        alias: {
            '@': path.resolve(__dirname, '..', 'src/')
        },
        fallback: { crypto: false }
    },
    plugins: [
        new webpack.DefinePlugin({
            // 定义环境和变量
            'process.env': {
                ...envObj
            }
        }),
        new webpack.ProgressPlugin({
            activeModules: false,
            percentBy: null
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../public/index.html'),
            favicon: path.join(__dirname, '../public/favicon.ico'), //favicon路径
            filename: 'index.html',
            chunks: ['main'],
            inject: true,
            minify: true,
            cache: false,
            hash: true //开启hash  ?[hash]
        }),
        new VueLoaderPlugin()
    ]
};
