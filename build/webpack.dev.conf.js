const path = require("path");
const paths = require("./paths");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.conf.js')
const webpack = require("webpack");

module.exports = merge(commonConfig, {
    mode: "development",
    entry: ['@babel/polyfill'],
    devtool:"cheap-module-eval-source-map",// 开发环境配置
    output: {
        // 输出目录
        path: paths.appBuild,
        // 文件名称
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    plugins: [
        // 开启HMR(热替换功能,替换更新部分,不重载页面！) 相当于在命令行加 --hot
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({  // 创建一些全局环境变量
            'process.env': {
                VUEP_BASE_URL: '/'
            }
        })
    ],
    devServer: {
        hot: true,
        contentBase: paths.appPublic,
        host: "0.0.0.0",
        port: 8080,
        // historyApiFallback: {disableDotRule: true},  // 该项目配置此属性无效（原因未知）
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
})