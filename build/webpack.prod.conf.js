const path = require("path");
const paths = require("./paths");
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadPlugin = require('preload-webpack-plugin');
const commonConfig = require('./webpack.base.conf.js');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = merge(commonConfig, {
    mode: "production",
    entry: {
        app: './src/index.js'
    }, //入口文件
    devtool:"source-map",   //是否生成.map文件(和源代码形成映射便于调试)
    output: {
        filename: 'js/[name].[contenthash:8].js', //输出的文件名
        path: paths.appBuild, //输出的文件目录
        chunkFilename: 'js/[name].[contenthash:8].js' //分包出口
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: false,
                            publicPath: '../'
                        }
                    },
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: false,
                            publicPath: '../'
                        }
                    },
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: false,
                            publicPath: '../'
                        }
                    },
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: false,
                            publicPath: '../'
                        }
                    },
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
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin( //定义开发环境得全局变量
            {
                'process.env': {
                    NODE_ENV: '"production"',
                }
            }
        ),
        new MiniCssExtractPlugin({ //将css单独打包
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({ //css压缩
            assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {
                            removeAll: true //移除所有注释
                        } 
                    }
                ]
            },
            canPrint: true //指示插件是否可以将消息打印到控制台
        }),
        new webpack.HashedModuleIdsPlugin({hashDigest: 'hex'}), //该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境(使用16进制编码方式)
        new HtmlWebpackPlugin({ //打包index.html
            title: 'react', //页面title
            filename: 'index.html',
            favicon: paths.appFavicon,
            minify: { //缩小生成的HTML
                collapseWhitespace: true, //删除空格、换行 默认false
                removeComments: true, //清理html中的注释 默认false
                removeRedundantAttributes: true, //删除多余的属性
                removeScriptTypeAttributes: true, //去掉script标签的type属性 默认false
                removeStyleLinkTypeAttributes: true, //去掉style和link标签的type属性 默认false
                useShortDoctype: true //使用短的文档类型，默认false
            },
            template: paths.appHtml
        }),
        new PreloadPlugin( //优先加载的资源
            {
              rel: 'preload',
              include: 'initial',
              fileBlacklist: [ 
                /\.map$/,
                /hot-update\.js$/
              ]
            }
        ),
        new PreloadPlugin( //需要预加载的资源
            {
              rel: 'prefetch',
              include: 'asyncChunks'
            }
        ),
        //复制文件
        new CopyPlugin({
            patterns: [
                {
                    from: paths.appPublic,
                    to: paths.appBuild,
                    toType: 'dir',
                    globOptions: {
                        ignore: [
                            'statics/**/*',
                            'mock/**/*',
                        ]
                    }
                }
            ]
        })
    ],
})