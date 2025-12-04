import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Code splitting configuration
        rollupOptions: {
          output: {
            manualChunks: {
              // React core
              'vendor-react': ['react', 'react-dom'],
              // Animation library (large)
              'vendor-framer': ['framer-motion'],
              // Icons (can be loaded lazily)
              'vendor-icons': ['lucide-react'],
            },
          },
        },
        // Increase chunk size warning limit (framer-motion is large)
        chunkSizeWarningLimit: 600,
        // Optimize dependencies - use esbuild (built-in)
        target: 'esnext',
        minify: 'esbuild',
      },
    };
});
