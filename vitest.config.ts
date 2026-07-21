/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  envDir: path.resolve(__dirname, './'),
  test: {
    globals: false,
    environment: 'jsdom',
    setupFiles: 'apps/web/setupTests.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps/web'),
    },
  },
})
