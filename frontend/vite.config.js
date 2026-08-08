import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: '0.0.0.0', // Permite que Docker exponga el puerto 5173
    port: 5173,
    watch: {
      usePolling: true, // Forzar a Vite a revisar cambios periódicamente
      interval: 100, // Revisa cada 100 ms
    },
    proxy: {
      // cambiamos el nombre del servicio 'backend'
      // por la IP del bridge de Docker
      '/api': {
        target: 'http://172.17.0.1:8000', // Docker redirige internamente
        changeOrigin: true,
      },
      '/ws': {
        target: 'http://172.17.0.1:8000',
        ws: true, // Vite debe manejar el upgrade de HTTP a WebSocket
        changeOrigin: true,
      },
    }
  }
})
