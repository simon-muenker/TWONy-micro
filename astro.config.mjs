// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), icon()],
  site: "https://simon-muenker.github.io",
  base: "TWONy-micro",
});
