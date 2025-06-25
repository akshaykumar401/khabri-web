import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact()
  ],
  server: {
    proxy: {
      '/apii': {
        target: 'https://newsbackend-sran.onrender.com',
        changeOrigin: true,
        secure: false,
        // cookieDomainRewrite: '',
        cookieDomainRewrite: 'localhost',
        rewrite: (path) => path.replace(/^\/apii/, ''),
      },
    }
  }
})