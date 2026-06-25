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
  server: {
    host: process.env.HOST || 'localhost',
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.fly.dev', '.spark0.io', '.workers.dev'],
      watch: process.env.FLY_APP_NAME
        ? { usePolling: true, interval: 1000 }
        : undefined,
    },
  },
});
