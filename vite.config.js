import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://<user>.github.io/Loop_straat/, so every built asset and route needs that
// sub-path prefix. src/lib/asset.js and the router's basename both read this back from
// import.meta.env.BASE_URL, so it only needs to be set here.
const base = process.env.GITHUB_PAGES ? '/Loop_straat/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  // 5173 is taken by another local server on this machine, so the site defaults to 5180.
  server: { port: Number(process.env.PORT) || 5180 },
  preview: { port: 4173 },
  build: {
    target: 'es2020',
    // The 3D arch (three.js and react-three-fiber) is its own lazy chunk, loaded only when the section nears the screen.
    chunkSizeWarningLimit: 1000
  }
});
