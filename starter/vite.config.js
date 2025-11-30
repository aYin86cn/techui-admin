import vue from '@vitejs/plugin-vue'
import path from "path"
import { defineConfig } from 'vite'
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias:{
      "@":path.resolve(__dirname,"src"),
    }
  },
  optimizeDeps: {
    include:['echarts'],
    exclude: ['@techui/admin']
  },
  plugins: [
    vue(),
  ]
})
