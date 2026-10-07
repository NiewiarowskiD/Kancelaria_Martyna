import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // MUI i emotion muszą być zbundlowane, żeby działały w Node (prerender)
    noExternal: [/^@mui\//, /^@emotion\//],
  },
});
