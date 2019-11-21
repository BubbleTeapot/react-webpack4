const path = require("path");
const paths = require("./paths");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.conf.js')

module.exports = merge(commonConfig, {
    mode: "production",
    devtool:"cheap-module-source-map",   // 线上生成配置
    output: {
        // 输出目录
        path: paths.appBuild,
        // 文件名称
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js'
    },
    plugins: [],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
            cacheGroups: {
                // 公共代码打包分组配置
                // jquery: {
                //     name: 'jquery',
                //     test: /[\\/]node_modules[\\/]jquery[\\/]/
                // },
            }
        },
    }
})