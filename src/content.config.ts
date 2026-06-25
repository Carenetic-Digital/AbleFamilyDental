import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { blogSchema } from './stubs/sparkable-content';
import { resolveBlogFields } from './stubs/sparkable-runtime';

// Blog posts are CMS-managed JSON entries. The post shape is owned by the CMS:
// resolveBlogFields() reads this site's blog.fields from site-settings.json
// (or the default field set when none is declared) so the collection validates
// exactly what the editor writes. See SITE_SETUP.md §8b.
const blog = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/blog' }),
  schema: blogSchema(z, resolveBlogFields()),
});

export const collections = { blog };
