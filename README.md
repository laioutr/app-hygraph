# @laioutr/app-hygraph

[![Laioutr][laioutr-src]][laioutr-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Laioutr app that integrates [Hygraph](https://hygraph.com) as a headless CMS. Provides a media library for the Laioutr Studio, blog content handlers, and reusable exports for other apps that connect to Hygraph.

## Features

### Assets

The module registers a Hygraph media library in the Laioutr Studio, giving editors a browsable asset picker backed by their Hygraph project.

The laioutr-integrated @nuxt/image provider is configured to use the Hygraph image CDN.

### Exports

Other Laioutr apps that also talk to Hygraph can import the client, middleware, codegen config, and utilities from this package instead of duplicating code or configurationn. See [Exports](#exports) below.

### Blog Demo

The module also includes a demo blog implementation with orchestr-handlers for blog content: query handlers and query template providers for blog collections and posts, link handlers for connecting posts to collections, and component resolvers for rendering both.

## Configuration

Add the module to your `nuxt.config.ts` and provide your Hygraph credentials:

```ts
export default defineNuxtConfig({
  modules: ['@laioutr/app-hygraph'],
  '@laioutr/app-hygraph': {
    contentApiUrl: 'https://...',
    imageBaseUrl: 'https://...',
    token: '...',
  },
});
```

| Option          | Description                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentApiUrl` | Hygraph Content API endpoint                                                                                                                                               |
| `imageBaseUrl`  | Hygraph image CDN base URL (used by `@nuxt/image`). Region-specific; find yours by querying `{ assets(first: 1) { url } }` against your Content API and taking the domain. |
| `token`         | Permanent auth token for the Content API                                                                                                                                   |

## Exports

The package exposes three subpath exports for use outside the Nuxt module context.

### `@laioutr/app-hygraph/runtime`

Everything needed to build Hygraph-backed orchestr handlers in another app.

```ts
import { defineHygraph, hygraphClientFactory, mapHygraphMedia } from '@laioutr/app-hygraph/runtime';
import type { HygraphAsset, HygraphClientConfig, HygraphResponse } from '@laioutr/app-hygraph/runtime';
```

| Export                          | Purpose                                                                                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defineHygraph`                 | Pre-configured orchestr builder with Hygraph metadata and a `context.hygraph` client. Chain `.queryHandler()`, `.linkHandler()`, etc. directly on it.                         |
| `hygraphClientFactory(config?)` | Creates a Hygraph GraphQL client. Falls back to `useRuntimeConfig()` when called without arguments inside the Nuxt module. Pass a `HygraphClientConfig` to use it standalone. |
| `mapHygraphMedia(asset)`        | Converts a `HygraphAsset` to a Laioutr `MediaImage`, selecting the correct Nuxt Image provider (handles SVGs).                                                                |

### `@laioutr/app-hygraph/codegen`

Generates TypeScript types from your Hygraph schema using GraphQL Code Generator. The factory produces a codegen config with Hygraph-specific scalar mappings (`DateTime`, `RichTextAST`, `Json`, `Long`, `Hex`, etc.) so you don't have to define them yourself.

Install the peer dependencies:

```bash
pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations graphql
```

Create a `codegen.ts` at your project root:

```ts
import { defineHygraphCodegen } from '@laioutr/app-hygraph/codegen';

export default defineHygraphCodegen({
  documents: 'src/runtime/server/queries/**/*.ts',
  outputPath: 'src/runtime/server/generated/graphql.ts',
});
```

Set `HYGRAPH_CONTENT_API_URL` and `HYGRAPH_TOKEN` in your environment, then run:

```bash
npx graphql-codegen
```

This reads your `.ts` files containing tagged `/* GraphQL */` template literals, introspects the Hygraph schema, and writes the generated types to `outputPath`.

| Option       | Default                                                                               |
| ------------ | ------------------------------------------------------------------------------------- |
| `schemaUrl`  | `process.env.HYGRAPH_CONTENT_API_URL`                                                 |
| `token`      | `process.env.HYGRAPH_TOKEN`                                                           |
| `documents`  | `src/runtime/server/queries/**/*.ts`                                                  |
| `outputPath` | `src/runtime/server/generated/graphql.ts`                                             |
| `scalars`    | Hygraph defaults (`DateTime`, `RichTextAST`, `Json`, etc.) merged with your overrides |

### `@laioutr/app-hygraph/queries`

Reusable GraphQL fragments.

```ts
import { AssetFragment } from '@laioutr/app-hygraph/queries';

const MY_QUERY = /* GraphQL */ `
  ${AssetFragment}
  query MyQuery {
    assets {
      ...Asset
    }
  }
`;
```

## Development

```bash
# 1. Copy .npmrc.config to .npmrc and fill in NPM_LAIOUTR_TOKEN
# 2. Install dependencies
pnpm i

# 3. Fetch remote project config
npx @laioutr/cli rc fetch -p <org-slug>/<project-slug> -s <secret-key>

# 4. Prepare and start
pnpm dev:prepare
pnpm dev              # playground
pnpm orchestr-dev     # orchestr playground
```

## Publishing

```bash
pnpm release
```

Runs lint, tests, builds, updates the changelog, publishes to npm, and pushes tags.

For private publishing to `npm.laioutr.cloud`, add `"publishConfig": { "registry": "https://npm.laioutr.cloud/" }` to `package.json` and ensure your package name follows the `@laioutr-org/<org-slug>_<name>` format.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@laioutr/app-hygraph/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@laioutr/app-hygraph
[npm-downloads-src]: https://img.shields.io/npm/dm/@laioutr/app-hygraph.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@laioutr/app-hygraph
[license-src]: https://img.shields.io/npm/l/@laioutr/app-hygraph.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@laioutr/app-hygraph
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
[laioutr-src]: https://img.shields.io/badge/%F0%9F%A6%99_Laioutr_App-702DCE
[laioutr-href]: https://www.laioutr.com/
