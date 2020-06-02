const paths = require('./paths');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('./webpack.dev.conf');
const options = {
  open: true,
  // hot: true,
  // hotOnly: true,   // 当编译失败时，不刷新页面
  compress: true, //是否启用gzip压缩
  host: '127.0.0.1',
  historyApiFallback: true,
  contentBase: paths.appBuild,
}
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(8001, '127.0.0.1', () => {
  console.log('start: 127.0.0.1:8001');
});