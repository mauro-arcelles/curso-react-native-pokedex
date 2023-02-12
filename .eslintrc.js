module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'comma-dangle': ['warn', 'never'],
        'no-trailing-spaces': 'off',
        'curly': 'off',
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
