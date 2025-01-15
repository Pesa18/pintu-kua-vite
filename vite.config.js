import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Pintukua",
        short_name: "Nama Pendek",
        description: "Deskripsi aplikasi Anda",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/pintukua-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pintukua-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/pintukua-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
