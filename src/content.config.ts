import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { blogSchema } from '@sparkable-cms/cms/content';
import { resolveBlogFields } from '@sparkable-cms/cms/runtime';

// The post shape is driven by site-settings.json → blog.fields (or the CMS
// default set when none is declared — which matches this site's original
// hand-rolled schema exactly). resolveBlogFields() reads that list so the
// content collection validates exactly the fields the editor writes.
const blog = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/blog' }),
  schema: blogSchema(z, resolveBlogFields()),
});

export const collections = { blog };
