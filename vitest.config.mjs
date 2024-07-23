import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.mjs', // Reference the setup file here
  },
  resolve: {
    alias: {
      components: resolve(__dirname, 'components'),
      lib: resolve(__dirname, 'lib'),
      pages: resolve(__dirname, 'pages'),
    },
  },
})
