import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginSvelte from "eslint-plugin-svelte";

import * as svelteParser from "svelte-eslint-parser";
import * as typescriptParser from "@typescript-eslint/parser";

export default [
  // js.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginSvelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
        project: "./tsconfig.json",
        extraFileExtensions: [".svelte"],
      },
    },
  },
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/global.css",
      },
    },
  },
];
