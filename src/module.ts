/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createResolver, defineNuxtModule, installModule } from '@nuxt/kit';
import { defu } from 'defu';
import { registerLaioutrApp } from '@laioutr-core/kit';
import { name, version } from '../package.json';

/**
 * The options the module adds to the nuxt.config.ts.
 */
export interface ModuleOptions {
  contentApiUrl: string;
  imageBaseUrl: string;
  token: string;
  /**
   * Optional. PAT with Draft-stage read permission. Separate from `token` so published reads keep a
   * least-privileged credential. Without it the connector always serves published content, even when
   * a verified preview token marks the request as a preview.
   */
  previewToken?: string;
  /** Optional. Hygraph's Content API serves both stages; only needed if a project observes CDN staleness on drafts. */
  previewApiUrl?: string;
}

/**
 * The config the module adds to nuxt.runtimeConfig.public['@laioutr/app-hygraph']
 */
export interface RuntimeConfigModulePublic {}

/**
 * The config the module adds to nuxt.runtimeConfig['@laioutr/app-hygraph']
 */
export interface RuntimeConfigModulePrivate extends ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: name, // configKey must match package name
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const resolveRuntimeModule = (path: string) => resolve('./runtime', path);

    nuxt.options.build.transpile.push(resolve('./runtime'));

    // Runtime configuration for this module
    // These two statements can be removed if you don't provide a runtime config
    nuxt.options.runtimeConfig[name] = defu(nuxt.options.runtimeConfig[name] as Parameters<typeof defu>[0], options);

    // Make app-assets publicly available
    nuxt.options.nitro.publicAssets ??= [];
    nuxt.options.nitro.publicAssets.push({
      dir: resolveRuntimeModule('./app/public'),
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Configure Nuxt Image for Hygraph
    nuxt.hook('laioutr:nuxtImageConfig' as any, (config: any) => {
      config.hygraph = {
        baseURL: options.imageBaseUrl,
      };
    });

    await registerLaioutrApp({
      name,
      version,
      orchestrDirs: [resolveRuntimeModule('server/orchestr')],
      sections: [resolveRuntimeModule('app/sections')],
      blocks: [resolveRuntimeModule('app/blocks')],
      mediaLibraryProviders: [resolveRuntimeModule('./server/media-library/hygraph')],
    });

    // Install peer-dependency modules only on prepare-step.
    // This makes auto-imports and import-aliases work. Remove any modules you might not need.
    if (nuxt.options._prepare) {
      await installModule('@nuxt/image');
      await installModule('@laioutr-core/frontend-core');
      await installModule('@laioutr-core/orchestr');
      await installModule('@laioutr-app/ui');
    }

    // Shared
    // Imports and other stuff which is shared between client and server

    // Client
    // Add plugins, composables, etc.

    // Server
    // Add server-only imports, etc.
  },
});
