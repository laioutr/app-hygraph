import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // `#imports` is a Nuxt virtual module that only exists inside a Nuxt build.
      // Unit tests import runtime files directly, so point it at a stub.
      '#imports': fileURLToPath(new URL('./test/stubs/imports.ts', import.meta.url)),
    },
  },
});
