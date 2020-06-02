const paths = require('./paths');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/index.js", //入口文件
    output: {
        filename: 'js/[name].js', //输出的文件名
        path: paths.appBuild, //输出的文件目录
        publicPath: '/', //服务根地址
        chunkFilename: 'js/[name].js' //分包的命名
    },
    module:{
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                        {
                        loader: 'url-loader', //图片处理
                        options: {
                            esModule: false, //处理图片导入时require和import的冲突
                            limit: 4096, //图片大小超过4096k用(file-loader)处理
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'asset/img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(svg)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: 'asset/img/[name].[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'asset/media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'asset/font/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    'cache-loader',
                    'thread-loader', //将loader操作放入单独线程运行
                    'babel-loader'
                ],
                include: paths.appSrc
            },
            {
                enforce: 'pre', //保证在babel转义之前进行代码检查
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                        cache: true, //此选项启用将整理结果缓存到文件中。
                        emitWarning: true, //关闭警告提示
                        emitError: true, //关闭错误提示
                        eslintPath: paths.ESLINT,
                        formatter: undefined
                        }
                    }
                ],
                include: paths.appSrc
            },
        ]
    },
    resolve: {
        alias: {
            "@": paths.appSrc,
            "pages": paths.appPages,
            "router": paths.appRouter,
            "styles": paths.appStyles
        },
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            'node_modules',
            paths.NODE_MODULES
        ],
    },
    plugins:[
        new CaseSensitivePathsPlugin(), //区分路径大小写(避免osx开发人员路径书写冲突)
        new FriendlyErrorsWebpackPlugin(), //识别webpack报错
        new HtmlWebpackPlugin({ //打包index.html
            inject: true,   //scrpit注入位置[true：默认值，script标签位于html文件的 body 底部； body：script标签位于html文件的 body 底部（同 true；） head：script 标签位于 head 标签内； false：不插入生成的 js 文件，只是单纯的生成一个 html 文件
            title: 'react', //页面title
            favicon: paths.appFavicon,
            filename: 'index.html',
            template: paths.appHtml
        }),
    ],
    /* 分包处理 */
    optimization: {
        moduleIds: 'hashed', //设置id的算法
        runtimeChunk: 'single', //创建一个在所有生成 chunk 之间共享的运行时文件
        namedChunks: true, //使用 chunkName 来替换 chunkId，实现固化 chunkId，保持缓存的能力
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk-vendors',
                    chunks: 'all', //async对异步引入的代码分割 initial对同步引入代码分割 all对同步异步引入的分割都开启
                    minSize: 30000, //字节 引入的文件大于30kb才进行分割
                    priority: -10 //优先权
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2, //模块至少使用次数
                    priority: -20,
                    chunks: 'all',
                    reuseExistingChunk: true //模块嵌套引入时，判断是否复用已经被打包的模块
                }
            }
        },
        /* 对js压缩 */
        minimizer: [
            new TerserPlugin(
                {
                    terserOptions: {
                        /* terserOptions具体参数请参看 https://github.com/terser/terser#minify-options */
                        compress: {
                            /* compress具体参数请参看 https://github.com/terser/terser#compress-options */
                            arrows: false, //类和对象文字的方法被转化为箭头表达式,如果所得代码较短： m(){return x}变m:()=>x 默认true
                            collapse_vars: false, //折叠单次使用的非常数变量，允许副作用 默认true
                            comparisons: false, //对二进制节点应用某些优化，例如!(a <= b) → a > b（仅当unsafe_comps），尝试否定二进制节点，例如a = !b && !c && !d && !e → a=!(b||c||d||e)等 默认true
                            computed_props: false, //将常量计算属性转换为常规属性：{["computed"]: 1}转换为{computed: 1} 默认true
                            hoist_funs: false, //提升函数声明 默认值false
                            hoist_props: false, //将常量对象和数组文字中的属性提升为受一组约束约束的常规变量。例如： var o={p:1, q:2}; f(o.p, o.q);转换为f(1, 2) 默认值true
                            hoist_vars: false, //提升var声明（这是false 默认情况下，因为它似乎通常会增加输出的大小） 默认false
                            inline: false, //使用simple/return statement进行内联调用 默认true
                            loops: false, //优化了do，while而且for循环时，我们可以静态地判断病情 默认true
                            negate_iife: false, //否定返回值被丢弃的“立即调用的函数表达式”，以避免代码生成器插入的parens 默认true
                            properties: false, //使用点表示法重写属性访问权限foo["bar"] → foo.bar 默认true
                            reduce_funcs: false, //允许一次性函数作为函数表达式内联，允许进一步优化。默认情况下启用。选项取决于reduce_vars 启用。如果禁用此选项，则某些代码在Chrome V8引擎中运行得更快。不会对其他主流浏览器产生负面影响 默认true
                            reduce_vars: false, //改进对赋值的变量的优化，并将其用作常量值 默认true
                            switches: false, //删除重复并删除无法访问的switch分支 默认true
                            toplevel: false, //在顶级作用域中删除未引用的函数（"funcs"）和/或变量（"vars"）（false默认情况下，true删除未引用的函数和变量）默认false
                            typeofs: false, //转换typeof foo == "undefined"为 foo === void 0。注意：false由于已知问题，建议将此值设置为IE10及更早版本 默认true
                            booleans: true, //对布尔上下文的各种优化!!a ? b : c → a ? b : c 默认true
                            if_return: true, //if / return和if / continue的优化 默认true
                            sequences: true, //使用逗号运算符连接连续的简单语句 默认true
                            unused: true, //删除未引用的函数和变量（除非设置为，否则简单的直接变量赋值不计为引用"keep_assign"） 默认true
                            conditionals: true, //对if-s和条件表达式应用优化 默认true
                            dead_code: true, //删除无法访问的代码 默认true
                            evaluate: true //尝试计算常量表达式 默认true
                        },
                        mangle: {
                            safari10: true //传递true解决Safari 10循环迭代器错误 “无法声明两次let变量”。https://github.com/terser/terser#output-options 默认false
                        }
                    },
                    sourceMap: true, //如果希望指定源地图选项，则传递一个对象
                    cache: true, // 开启缓存
                    parallel: true, // 开启多线程
                    extractComments: false // 提取注释
                }
            )
        ]
    },
}