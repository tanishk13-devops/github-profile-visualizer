import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/github-profile-visualizer/' : '/',
  server: {
    port: 5173,
    open: true
  }
});
