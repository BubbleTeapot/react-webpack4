# react-webpack4
使用react和webpack4以及常用react插件组成的脚手架

一键搭建react开发环境（包括react-router、redux、antd、axios）
## 使用方式

```javascript
npx react-exctra-webpack4-cli demo
cd demo
yarn (或者npm install)
//运行
yarn start
```

## 项目结构

demo目录结构如下。

```
|-- demo
    |-- build                       # 项目配置
        |-- paths.js                # 项目配置中用到的路径信息
        |-- server.js               # 项目本地服务配置
        |-- webpack.base.conf.js    # 项目公用配置
        |-- webpack.dev.conf.js     # 项目开发配置
        |-- webpack.prod.conf.js    # 项目生产配置
    |-- dist                        # 项目打包生成目录
    |-- public                      # 项目静态资源目录
    |-- src
        |-- actions                 # 集中处理项目接口返回数据，然后返回给组件
        |-- api                     # 存放所有的接口调用函数
        |-- components              # 公共组件目录
            |-- loading             # loading动画组件
        |-- pages                   # 项目页面目录
            |-- Home
                |-- Home.js         
                |-- Home.module.less
            |-- Login
            |-- NotFound404         # 404页面
            |-- SolidCarousel
        |-- redux                   # redux目录
            |-- actions             # redux用来接收处理数据的文件目录
            |-- reducers            # redux用来更新store的文件目录
            |-- index.js            # 创建并暴露store
        |-- routes                  # 路由配置目录
            |-- index.js
        |-- style                   # 公共样式
            |-- common.css
        |-- utils
            |-- request.js          # axios初始化文件
            |-- renderRoutes.js     # 路由限权文件
        |-- App.js                  # 路由根组件（所有的页面路由都在这里注册）
        |-- index.js                # 项目入口文件
    |-- .babelrc		            #babel插件的一些配置，antd按需引入
    |-- .gitignore            
    |-- LICENSE  
    |-- package.json
    |-- README.md

```

## 基本功能

- 解析css、less，自动抽离css，压缩css（默认去掉注释）, 自动添加浏览器前缀，cssModel避免污染全局样式。
- 图片处理，小于4kb的图片转化成bese64格式输出
- ES6及以上自动转码，并使用@babel/polyfill处理部分函数浏览器不兼容问题，加入plugin-transform-runtime避免@babel/polyfill污染全局环境
- 热加载
- 集成react-router、redux、antd、axios并支持按需加载
- 路由限权管理
- axios封装。
- loading过渡动画处理
- 预加载处理
- eslint 启用默认react代码检测

## 性能优化

- 生产环境下使用cssnano压缩css, 单独抽离css

- react-router按需加载

- cache-loader使用缓存

- splitChunks分包处理，将常用的插件集中编译打包成一个文件，避免重复的打包操作；
minimizer启用js压缩（TerserPlugin）采用多线程压缩，并开启缓存。

- 压缩html文件（去掉删除空格、换行；清理html中的注释;删除多余的属性；去掉script标签的type属性等）

- 使用thread-loader将项目js文件处理操作放在单独的线程处理

- 路由按需加载

## 打包发布

```
yarn build
```


