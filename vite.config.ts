// vite.config.ts
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import path from 'path'

// Plugin customizado para importar arquivos .md como raw text
function markdownPlugin() {
  return {
    name: 'markdown-loader',
    transform(code: string, id: string) {
      if (id.endsWith('.md')) {
        // Exporta o conteúdo do markdown como string
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: null
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdownPlugin()
  ],
    server: {
    port: 8080
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-slot'],
        }
      }
    }
  }
})