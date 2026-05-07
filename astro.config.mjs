// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default defineConfig({
  site: "https://barber-ray.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
  output: "server",
  adapter: vercel(),
  webAnalytics: {
    enabled: true, // set to false when using @vercel/analytics@1.4.0
  },
});
