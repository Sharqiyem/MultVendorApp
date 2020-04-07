module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-var': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.native.js'],
      },
    },
  },
};
