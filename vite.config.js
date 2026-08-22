import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },

  build: {
    // Everything the first paint needs is inline in index.html already; the
    // extra <link rel=modulepreload> tags Vite emits for the split chunks are
    // what keeps splitting from costing a waterfall.
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: true,

    rollupOptions: {
      output: {
        /* React and the router change on their own release cadence, the app
           code changes every deploy. Splitting them means a copy tweak
           re-downloads ~14 KB instead of the whole ~67 KB bundle, while the
           vendor chunks stay in cache under their immutable hash. */
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'react'
          }
        },
      },
    },
  },
})
