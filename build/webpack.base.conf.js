const path = require('path');
const paths = require('./paths');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ["./src/main.js"],
    output: {
        // 输出目录
        path: paths.appBuild,
        // 文件名称
        filename: "bundle.js"
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sc|sa|c|le)ss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', "less-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                      outputPath: 'images/', // 图片输出的路径
                      limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: 'fonts/',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": paths.appSrc,
            pages: paths.appPages,
            router: paths.appRouter
        }
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: paths.appHtml,
            favicon: paths.appFavicon
        }),
    ]
}