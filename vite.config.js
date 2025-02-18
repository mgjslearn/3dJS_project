import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/3DJS_project/"  // Set this to your GitHub repo name
  plugins: [react()],
  assetsInclude: ['**/*.glb']
})
