const path = require('path');
const paths = require('./paths');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ["./src/main.js"],
    output: {
        // 文件名称
        filename: "static/js/bundle.js"
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
            "pages": paths.appPages,
            "router": paths.appRouter
        }
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,   //scrpit注入位置[true：默认值，script标签位于html文件的 body 底部； body：script标签位于html文件的 body 底部（同 true；） head：script 标签位于 head 标签内； false：不插入生成的 js 文件，只是单纯的生成一个 html 文件
            filename: "index.html",
            template: paths.appHtml,
            favicon: paths.appFavicon,
            minify: {
                collapseWhitespace: true // 去除空白
            }
        }),
    ]
}