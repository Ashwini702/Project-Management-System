import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  base: './',
  plugins: [react(), basicSsl()],
  server: {
    host: '0.0.0.0',
    port: 5175,
    proxy: {
      '/api': { target: 'http://127.0.0.1:5000', changeOrigin: true },
      '/uploads': { target: 'http://127.0.0.1:5000', changeOrigin: true }
    }
  },
  build: {
    chunkSizeWarningLimit: 1800
  }
});
