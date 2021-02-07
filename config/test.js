const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'testing',
    devtool: 'cheap-module-source-map',
    plugins: [new CleanWebpackPlugin()]
};
