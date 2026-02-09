import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor';
            // Keep all MUI + Emotion in one chunk to avoid "Cannot access before initialization" (circular/order issues)
            if (id.includes('@mui/') || id.includes('@emotion')) return 'mui-vendor';
            if (id.includes('react-router')) return 'router';
            if (id.includes('@reduxjs/toolkit') || id.includes('redux')) return 'redux-vendor';
            if (id.includes('axios')) return 'axios';
            if (id.includes('slick-carousel') || id.includes('react-slick')) return 'slick';
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mui/material', '@mui/icons-material'],
    exclude: [],
  },
  server: {
    proxy: {
      '/api/external': {
        target: 'https://thedanbro.com/bbho/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/external/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        },
      },
    },
  },
})
