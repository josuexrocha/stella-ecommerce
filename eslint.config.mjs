// eslint.config.mjs

import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021
      },
    },
    rules: {
      // Vous pouvez ajouter ou modifier des règles ici
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];