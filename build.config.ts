import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    { input: 'src/codegen/index', name: 'codegen/index' },
    { input: 'src/queries/index', name: 'queries/index' },
  ],
  externals: [
    'defu',
    '@parcel/watcher',
    '@laioutr-core/frontend-core',
    '@laioutr-core/kit',
    '@graphql-codegen/cli',
  ],
});
