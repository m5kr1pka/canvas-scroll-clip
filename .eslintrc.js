module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  globals: {
    global: true
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
