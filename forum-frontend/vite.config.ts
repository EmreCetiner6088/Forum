import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/students': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/profile': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      'sockjs-client': 'sockjs-client/dist/sockjs.min.js',
    },
  },
})