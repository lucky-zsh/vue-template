const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
module.exports = {
    stats: 'none',
    mode: 'production',
    devtool: 'cheap-module-source-map',
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '../.temp_cache'),
        buildDependencies: {
            // 将你的配置添加依赖，更改配置时，使得缓存失效
            config: [__filename]
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(process.cwd(), 'build/'), path.resolve(process.cwd(), 'dist/')]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                cache: true
            })
        ]
    }
};
