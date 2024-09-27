import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      /*
        SANDBOX RULES
        * Las siguientes reglas buscan definir un conjunto de normas que guíen el desarrollo de software de manera uniforme, 
          facilitando así la comprensión del código por parte de todos los miembros del equipo.
      */
     
          "indent": ["error", 2], // Identado de 2 espacios respecto al padre
          "line-comment-position": ["error", { "position": "above" }], // Documentación encima del codigo (No al lado derecho)
          "no-extra-semi": "error", // Poner Punto y coma innecesarios
          "semi": "error", // Poner punto y coma al final de cada sentencia
          
    },
  },
)
