import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA(
    {
      manifest: {
        name: "Meal Planner",
        short_name: "Meal Planner",
        theme_color: "#4DBA87",
        icons: [
          {
            src: "/img/icons/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/img/icons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/img/icons/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/img/icons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        start_url: ".",
        display: "standalone",
        background_color: "#FFA500"
      },
      includeAssets: [
        "/img/icons/web-app-manifest-192x192.png",
        "/img/icons/web-app-manifest-512x512.png",
        "/img/icons/web-app-manifest-192x192.png",
        "/img/icons/web-app-manifest-512x512.png",
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
