import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'



export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/, // Allow JSX in .js, .jsx, .ts, .tsx files under /src
  }
  ,
  server: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

})
