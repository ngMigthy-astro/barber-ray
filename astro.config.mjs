// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
