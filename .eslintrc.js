module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-var': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.native.js'],
      },
    },
  },
};
