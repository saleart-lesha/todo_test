import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/todo_test/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/app/test/setupTests.ts',
  },
  build: {
    rollupOptions: {
      external: [/\.test\.(ts|tsx)$/, /@testing-library/, /vitest/],
    },
    outDir: 'dist',
  },
  optimizeDeps: {
    exclude: ['**/*.test.ts', '**/*.test.tsx'],
  },
})
