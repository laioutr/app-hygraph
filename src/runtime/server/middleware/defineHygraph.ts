import { defineOrchestr } from '#imports';
import { hygraphClientFactory } from '../client/hygraph';

export const defineHygraph = defineOrchestr
  .meta({
    app: '@laioutr/app-hygraph',
  })
  .use(async (ctx, next) => next({ context: { hygraph: hygraphClientFactory() } }));
