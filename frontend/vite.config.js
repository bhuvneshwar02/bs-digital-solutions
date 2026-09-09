import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In dev, proxy API calls to the local Express server so the frontend can use
// same-origin `/api/...` paths. In production, VITE_API_URL points at Render.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API || 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
