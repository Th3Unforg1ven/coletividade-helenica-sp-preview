import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  define: {
    'import.meta.env.VITE_SITE_ORIGIN': JSON.stringify(
      process.env.SITE_ORIGIN || 'https://th3unforg1ven.github.io',
    ),
  },
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.qa-*/**', '**/.chrome-*/**', '**/qa-*.png', '**/homepage-preview*.png'],
    },
  },
})
