import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build for better performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('@mui')) {
              return 'vendor-mui';
            }
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
            if (id.includes('react-slick') || id.includes('slick-carousel')) {
              return 'vendor-carousel';
            }
            // Other node_modules
            return 'vendor-other';
          }
          // Component chunks
          if (id.includes('/components/')) {
            if (id.includes('/home/')) {
              return 'components-home';
            }
            if (id.includes('/products/')) {
              return 'components-products';
            }
            if (id.includes('/user/')) {
              return 'components-user';
            }
            return 'components-common';
          }
          // Page chunks
          if (id.includes('/pages/')) {
            if (id.includes('/home/')) {
              return 'pages-home';
            }
            if (id.includes('/products/')) {
              return 'pages-products';
            }
            if (id.includes('/auth/')) {
              return 'pages-auth';
            }
            return 'pages-other';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'images/[name]-[hash][extname]';
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return 'fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps only in development
    sourcemap: false,
    // Use default esbuild minifier (no external terser dependency)
    target: 'es2015',
    cssCodeSplit: true,
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
