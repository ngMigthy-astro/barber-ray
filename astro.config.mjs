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
  integrations: [
    react(),
    sitemap({
      // Excluir rutas privadas del sitemap para que Google no las indexe
      filter: (page) =>
        !page.includes("/admin/") &&
        !page.includes("/profile") &&
        !page.includes("/api/"),
    }),
  ],
  output: "server",
  adapter: vercel(),
  webAnalytics: {
    enabled: true,
  },
});
