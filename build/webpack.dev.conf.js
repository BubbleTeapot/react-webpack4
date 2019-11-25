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
        // 文件名称
        chunkFilename: 'static/js/[name].chunk.js'
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
        host: "localhost",
        port: 9000,
        hotOnly:true,   // 当编译失败时，不刷新页面
        compress: true, //是否启用gzip压缩
        historyApiFallback: {
            disableDotRule: true
        },
        proxy: {
            "/api": "http://localhost:3000"
        },
        // watchContentBase: true, //在文件改变时会进行页面刷新，默认情况下该配置是禁止的
        // quiet: true,    //这避免了一些系统的CPU过载。当启用该配置，除了初始化信息会被写到console中，其他任何信息都不会被写进去。
    }
})