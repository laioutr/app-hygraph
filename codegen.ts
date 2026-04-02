import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.HYGRAPH_CONTENT_API_URL!]: {
        headers: {
          Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
        },
      },
    },
  ],
  documents: 'src/runtime/server/queries/**/*.ts',
  generates: {
    'src/runtime/server/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: true,
        maybeValue: 'T | null',
        scalars: {
          DateTime: 'string',
          Date: 'string',
          Json: 'Record<string, unknown>',
          Long: 'number',
          RichTextAST: 'Record<string, unknown>',
          Hex: 'string',
          RGBAHue: 'string',
          RGBATransparency: 'number',
        },
      },
    },
  },
};
export default config;
