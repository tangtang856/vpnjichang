import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    h1: z.string(),
    desc: z.string(),
    category: z.string(),
    date: z.string(),
    summary: z.string(),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string()
    })).optional()
  })
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    h1: z.string(),
    desc: z.string(),
    platform: z.string(),
    summary: z.string(),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string()
    })).optional()
  })
});

export const collections = { blog, guides };
