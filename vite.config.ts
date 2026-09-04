import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En desarrollo, el frontend corre en :5173 y proxea /api hacia el backend
// Spring Boot en :8081. En producción, Nginx hace ese proxy (ver repo infra).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
