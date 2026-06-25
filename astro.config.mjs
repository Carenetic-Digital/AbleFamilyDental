import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wildwooddentalclinic.com',
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/about/careers-first-draft'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
