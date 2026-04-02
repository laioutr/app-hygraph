import srcModule from '../src/module';

export default defineNuxtConfig({
  modules: [
    srcModule,
    '@pinia/nuxt', // Added to show in devtools
    '@laioutr-core/frontend-core',
    '@laioutr-core/orchestr',
    '@laioutr-core/orchestr-devtools',
  ],
  '@laioutr/app-hygraph': {
    contentApiUrl: import.meta.env.HYGRAPH_CONTENT_API_URL,
    imageBaseUrl: import.meta.env.HYGRAPH_IMAGE_BASE_URL,
    token: import.meta.env.HYGRAPH_TOKEN,
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-09-11',
  vite: {
    optimizeDeps: {
      include: ['ajv', 'json-source-map', 'natural-compare-lite'],
    },
  },
});
