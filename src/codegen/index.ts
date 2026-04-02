import type { CodegenConfig } from '@graphql-codegen/cli';

export interface HygraphCodegenOptions {
  /** Hygraph Content API endpoint URL. Defaults to process.env.HYGRAPH_CONTENT_API_URL */
  schemaUrl?: string;
  /** Hygraph API token. Defaults to process.env.HYGRAPH_TOKEN */
  token?: string;
  /** Glob pattern for GraphQL document files. Defaults to 'src/runtime/server/queries/**\/*.ts' */
  documents?: string;
  /** Output file path for generated types. Defaults to 'src/runtime/server/generated/graphql.ts' */
  outputPath?: string;
  /** Additional custom scalar mappings (merged with Hygraph defaults) */
  scalars?: Record<string, string>;
}

const DEFAULT_SCALARS: Record<string, string> = {
  DateTime: 'string',
  Date: 'string',
  Json: 'Record<string, unknown>',
  Long: 'number',
  RichTextAST: 'Record<string, unknown>',
  Hex: 'string',
  RGBAHue: 'string',
  RGBATransparency: 'number',
};

export const defineHygraphCodegen = (options: HygraphCodegenOptions = {}): CodegenConfig => {
  const schemaUrl = options.schemaUrl ?? process.env.HYGRAPH_CONTENT_API_URL!;
  const token = options.token ?? process.env.HYGRAPH_TOKEN!;
  const documents = options.documents ?? 'src/runtime/server/queries/**/*.ts';
  const outputPath = options.outputPath ?? 'src/runtime/server/generated/graphql.ts';

  return {
    overwrite: true,
    schema: [
      {
        [schemaUrl]: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    ],
    documents,
    generates: {
      [outputPath]: {
        plugins: ['typescript', 'typescript-operations'],
        config: {
          skipTypename: true,
          maybeValue: 'T | null',
          scalars: { ...DEFAULT_SCALARS, ...options.scalars },
        },
      },
    },
  };
};
