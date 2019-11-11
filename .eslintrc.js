// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
  },
  extends: [
    'standard',
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'indent': ['error', 'tab'],
    // 'no-tabs': 'off',
    'space-in-parens': ['error', 'never'],
    'block-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'space-before-function-paren': ['off'],
    // 'no-trailing-spaces': ['off'],
    // 'no-multiple-empty-lines': ['off'],
    'no-sparse-arrays': ['off'],
    camelcase: ['off'],
    'comma-dangle': ['off'],
    'no-new': ['off'],
    'padded-blocks': ['off'],
    'spaced-comment': ['off'],
    'object-property-newline': ['off'],
  },
  globals: {
    StatusBar: true,
  },
}
