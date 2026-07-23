/**
 * Stub for Nuxt's `#imports` virtual module.
 *
 * Unit tests exercise runtime files directly, outside a Nuxt build, so `#imports`
 * has no real implementation to resolve to. `vitest.config.ts` aliases it here.
 * Tests that reach these helpers must inject their own values (e.g. by passing an
 * explicit config to `hygraphClientFactory`) rather than relying on Nuxt runtime state.
 */

export const useRuntimeConfig = (): any => {
  throw new Error('[test] useRuntimeConfig() is not available outside a Nuxt runtime — pass an explicit config.');
};
