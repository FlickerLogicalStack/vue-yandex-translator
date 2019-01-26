module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        quotes: [
            'error',
            'single'
        ],
        indent: [
            'warn',
            4
        ],
        semi: [
            'warn',
            'always'
        ]
    }
};
