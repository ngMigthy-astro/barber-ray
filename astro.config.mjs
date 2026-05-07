// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  output: "server",
  adapter: vercel(),
});
