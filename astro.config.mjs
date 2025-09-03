// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), icon()],
  site: "https://simon-muenker.github.io",
  base: "TWONy-micro",

  vite: {
    plugins: [tailwindcss()],
  },
});
