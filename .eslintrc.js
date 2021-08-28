module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  globals: {
    global: true
  },
  rules: {
    "@typescript-eslint/no-inferrable-types": "off"
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
