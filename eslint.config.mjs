import eslintPluginAstro from "eslint-plugin-astro";
import tailwind from "eslint-plugin-tailwindcss";
import eslintPluginSvelte from "eslint-plugin-svelte";

import * as svelteParser from "svelte-eslint-parser";
import * as typescriptParser from "@typescript-eslint/parser";

export default [
  // js.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginSvelte.configs["flat/recommended"],
  ...tailwind.configs["flat/recommended"],
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
];
