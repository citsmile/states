import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  root: 'apps/web',
  envDir: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps/web'),
    },
  },
})
