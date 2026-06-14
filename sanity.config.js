import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { myStructure } from './sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h4v8jpxb';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Myntra Clone Studio',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [structureTool({ structure: myStructure })],

  schema: {
    types: schemaTypes,
  },
});
