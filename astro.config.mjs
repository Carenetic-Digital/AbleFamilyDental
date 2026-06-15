import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Set this to your production URL (updated during deployment)
  site: 'https://wildwooddentalclinic.com',
  output: 'static',
  integrations: [
    sitemap({
      // Keep noindex/draft routes out of the sitemap so we don't advertise
      // pages to search engines that we've explicitly told them not to index.
      filter: (page) => !page.includes('/about/careers-first-draft'),
    }),
  ],
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
    // On fly.io's persistent volume, inotify doesn't reliably fire for
    // newly-created files, so Vite/Tailwind miss new pages or classes
    // until the server restarts. Polling sidesteps the broken inotify
    // path. Local dev keeps native watching (FLY_APP_NAME is unset).
    ...(process.env.FLY_APP_NAME && {
      server: { watch: { usePolling: true, interval: 500 } },
    }),
  },
});
