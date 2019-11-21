'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appSrc: resolveApp('src'),
    appPages: resolveApp('src/pages'),
    appRouter: resolveApp('src/router'),
    appPublic: resolveApp('public'),
    appBuild: resolveApp('dist'),
    appHtml: resolveApp('public/index.html'),
    appFavicon: resolveApp('public/favicon.ico'),
}