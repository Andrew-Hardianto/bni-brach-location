import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    envCompatible({ prefix: 'REACT_APP_', mountedPath: 'process.env' })
  ],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    proxy: {
      '/cabang': 'http://127.0.0.1:5000',
      '/outlet': 'http://127.0.0.1:5000',
      '/wilayah': 'http://127.0.0.1:5000',
      '/provinsi': 'http://127.0.0.1:5000',
      '/kota': 'http://127.0.0.1:5000',
      '/kecamatan': 'http://127.0.0.1:5000',
      '/kelurahan': 'http://127.0.0.1:5000',
      '/kodepos': 'http://127.0.0.1:5000',
      '/auth': 'http://127.0.0.1:5000'
    }
  }
});

