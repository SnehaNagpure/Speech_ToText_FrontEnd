import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/, //  Allow JSX in .js files under /src
  }
  ,
  server: {
  proxy: {
    
    '/uploads': 'http://localhost:5000'
  }
}

})
