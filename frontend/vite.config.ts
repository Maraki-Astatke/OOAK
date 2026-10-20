import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
        VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'OOAK Bag Store',
        short_name: 'OOAK',
        description: 'Discover our exclusive collection of handcrafted bags.',
        theme_color: '#4A1525', // Burgundy
        background_color: '#F0EFEA', // Silver/Cream
        icons: [
          {
            src: 'pwa-192x192.png', // You will need to add these images to your public folder
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
