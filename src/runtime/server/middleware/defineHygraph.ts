import { defineOrchestr } from '#imports';
import type { defineOrchestrMock } from '@laioutr-core/orchestr/types';
import { hygraphClientFactory } from '../client/hygraph';

export const defineHygraph = (defineOrchestr as typeof defineOrchestrMock)
  .meta({
    app: '@laioutr/app-hygraph',
    logoUrl: '/app-hygraph/logo.svg',
    label: 'Hygraph',
  })
  .extendRequest(async () => ({ context: { hygraph: hygraphClientFactory() } }));
