module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    camelcase: ['error'],
    'max-lines-per-function': [
      'error',
      {
        max: 100,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parse: 'flow',
      },
    ],
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 1,
    'new-cap': 0,
    'require-jsdoc': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-var-requires': 2,
    '@typescript-eslint/no-empty-function': 2,
    '@typescript-eslint/no-unused-vars': 2,
  },
};
