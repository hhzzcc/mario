const path = require('path');

module.exports = {
    publicPath: './',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve('./src'))
    }
};