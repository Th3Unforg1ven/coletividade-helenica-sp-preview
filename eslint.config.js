import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  { ignores: ['node_modules/**', 'dist/**', 'tmp/**', 'local-media/**'] },
  {
    files: [
      'src/**/*.{js,jsx}',
      'scripts/**/*.mjs',
      'experiments/**/*.jsx',
      'public/privacy.js',
      '*.config.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none', ignoreRestSiblings: true },
      ],
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
    },
  },
]
