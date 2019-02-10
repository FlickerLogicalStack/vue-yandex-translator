module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        quotes: ['warn', 'single'],
        'indent-legacy': 0,
        indent: 0,
        semi: ['warn', 'always'],
        'space-before-function-paren': 0,
        curly: 0,
        'vue/valid-v-on': 1
    }
};
