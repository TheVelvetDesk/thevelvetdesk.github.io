import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: './',
  server: {
    fs: {
      allow: ['../..'],
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
    },
  },
});
