import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server :{
  //   proxy :{
  //     "/api" :{
  //       target : "https://code-pro-backend.vercel.app",
  //       changeOrigin : true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure : false,
  //     }
  //   }
  // }
  plugins: [react()],
})
