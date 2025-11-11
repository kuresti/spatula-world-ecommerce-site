import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // All requests to /api/* will be proxied to the backend
      '/api': {
        target: 'http://localhost:5000', // backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
  // The browser can call /api/products and Vite forwards it to
  // http://localhost:5000/products.
});
