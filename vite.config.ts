import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// `base` must match the GitHub repository name so assets load on GitHub Pages.
export default defineConfig({
  base: '/SiteWebIon/',
  plugins: [react(), tailwindcss()],
})
