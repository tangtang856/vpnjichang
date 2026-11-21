import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://vpnjichang.wiki',
  output: 'static',
  build: {
    format: 'preserve'
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404')
    })
  ]
});
