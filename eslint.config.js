import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignore build output
  globalIgnores(["dist"]),

  {
    // Lint TS/TSX + JS/JSX files in src
    files: ["src/**/*.{ts,tsx,js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      react,
    },

    settings: {
      react: {
        version: "detect",
        pragma: "React",
        jsxRuntime: "automatic",
      },
    },

    rules: {
      // React 17+ / Vite / TS: no need to import React in scope
      "react/react-in-jsx-scope": "off",

      // JS no-undef does NOT work with TS + new JSX transform
      "no-undef": "off",

      // Disable base rule and use TS-aware unused-vars
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]);
