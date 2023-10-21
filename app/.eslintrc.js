module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['google', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'quotes': ['error', 'single'],
    'require-jsdoc': 'off',
    'object-curly-spacing': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': 'off',
    'max-len': 'off',
    'react/prop-types': 'off',
  },
};
