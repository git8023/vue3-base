module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'plugin:vue/strongly-recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-return-assign': 'off',
    '@typescript-eslint/ban-types': 'off',
    'nonblock-statement-body-position': 'off',
    curly: 'off',
    'max-classes-per-file': 'off',
    'lines-between-class-members': 'off',
    'no-useless-constructor': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
  },
};
