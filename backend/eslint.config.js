import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import nodePlugin from "eslint-plugin-node";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      node: nodePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Node.js rules
      "node/no-unsupported-features/es-syntax": "off",
      // Prettier
      "prettier/prettier": "warn",
    },
  },
];
