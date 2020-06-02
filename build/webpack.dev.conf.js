const paths = require("./paths");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.conf.js');
const webpack = require("webpack");

module.exports = merge(commonConfig, {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            importLoaders: 2, //启用/禁用或设置在CSS加载程序之前应用的加载程序的数量
                        }
                    },
                    {
                        loader: 'postcss-loader', //把CSS解析成JavaScript可以操作的抽象语法树结构(Abstract Syntax Tree, AST)，第二个就是调用插件来处理AST并得到结果
                        options: {
                            sourceMap: false,
                            plugins: [
                                require("autoprefixer")() //添加浏览器前缀
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            importLoaders: 2, //启用/禁用或设置在CSS加载程序之前应用的加载程序的数量
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader', //把CSS解析成JavaScript可以操作的抽象语法树结构(Abstract Syntax Tree, AST)，第二个就是调用插件来处理AST并得到结果
                        options: {
                            sourceMap: false,
                            plugins: [
                                require("autoprefixer")() //添加浏览器前缀
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            importLoaders: 2, //启用/禁用或设置在CSS加载程序之前应用的加载程序的数量
                        }
                    },
                    {
                        loader: 'postcss-loader', //把CSS解析成JavaScript可以操作的抽象语法树结构(Abstract Syntax Tree, AST)，第二个就是调用插件来处理AST并得到结果
                        options: {
                            sourceMap: false,
                            plugins: [
                                require("autoprefixer")() //添加浏览器前缀
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                          sourceMap: false
                        }
                    }
                ],
            },
            {
                test: /\.module\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            importLoaders: 2, //启用/禁用或设置在CSS加载程序之前应用的加载程序的数量
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader', //把CSS解析成JavaScript可以操作的抽象语法树结构(Abstract Syntax Tree, AST)，第二个就是调用插件来处理AST并得到结果
                        options: {
                            sourceMap: false,
                            plugins: [
                                require("autoprefixer")() //添加浏览器前缀
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                          sourceMap: false
                        }
                    }
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin( //定义开发环境得全局变量
            {
                'process.env': {
                    NODE_ENV: '"development"',
                }
            }
        ),
    ],
    /*devServer: {
        hot: true,
        contentBase: paths.appPublic,
        host: "localhost",
        port: 9000,
        publicPath: '/',
        open: true,
        hotOnly: true,   // 当编译失败时，不刷新页面
        compress: true, //是否启用gzip压缩
        historyApiFallback: true, //解决真实路由刷新404的问题
        proxy: {
            "/api": "http://localhost:3000"
        },
        watchContentBase: true, //在文件改变时会进行页面刷新，默认情况下该配置是禁止的
        quiet: true,    //这避免了一些系统的CPU过载。当启用该配置，除了初始化信息会被写到console中，其他任何信息都不会被写进去。
    }*/
})