import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// The `@` alias gives every component one stable import specifier. Relative
// paths change depending on which directory you import from, which makes them
// useless as a Code Connect snippet — a dev pasting `../components/BigButton`
// into a different folder gets a broken import.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
