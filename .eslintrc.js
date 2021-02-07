module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/html-indent': 'off',
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single']
    },
    globals: {
        process: true
    }
};
