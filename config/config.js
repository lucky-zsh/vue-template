const { merge } = require('webpack-merge');
const baseConfig = require('./base');
const devConfig = require('./dev');
const testConfig = require('./test');
const proConfig = require('./pro');

module.exports = () => {
    let config = process.env.NODE_ENV === 'development' ? devConfig : process.env.NODE_ENV === 'testing' ? testConfig : proConfig;
    return merge(baseConfig, config);
};
