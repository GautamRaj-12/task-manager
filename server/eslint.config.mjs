import globals from 'globals'
import pluginJs from '@eslint/js'
import esLintConfigPrettier from 'eslint-config-prettier'

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  esLintConfigPrettier,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]
