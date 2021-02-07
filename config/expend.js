const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleLoaderCommonOptions = [
    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: '[name]_[local]_[hash:base64:4]',
                exportLocalsConvention: 'camelCase'
            }
        }
    }
];

const cssLoaderOptions = [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'];

//代替require('图片地址')
const assetsRequire = {
    transformAssetUrls: {
        video: 'src',
        source: 'src',
        img: ['src'],
        image: ['src', 'href'],
        use: ['src', 'href']
    }
};

const cssOneOf = [
    {
        resourceQuery: /module/,
        use: [...styleLoaderCommonOptions, 'postcss-loader']
    },
    {
        use: cssLoaderOptions
    }
];

const scssOneOf = [
    {
        resourceQuery: /module/,
        use: [...styleLoaderCommonOptions, 'postcss-loader', 'sass-loader']
    },
    {
        use: [...cssLoaderOptions, 'sass-loader']
    }
];

module.exports = {
    assetsRequire,
    cssOneOf,
    scssOneOf
};
