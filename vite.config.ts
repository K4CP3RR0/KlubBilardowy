import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import * as path from "node:path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: [
      'bilard.kacpercichorski.tech',
      '192.168.1.194',
      'localhost'
    ]
  },
  optimizeDeps: {
    include: ['react-map-gl', 'mapbox-gl']
  },
  resolve: {
    alias: {
      // This maps the "root" of the package to the mapbox-specific file
      // found in your node_modules screenshot
      'react-map-gl': path.resolve(__dirname, './node_modules/react-map-gl/dist/mapbox.js'),
    },
  },
})
