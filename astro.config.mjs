import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// When @sparkable-cms/cms is not installed (no GitHub token), redirect its
// runtime/content imports to local no-op stubs so the dev server and a static
// build start without it. See DEPLOYMENT_SETUP.md §"astro.config.mjs".
//
// Detection must tolerate npm-workspace hoisting: in this monorepo the package
// installs into the repo-root node_modules, not the site's. createRequire +
// resolve walks the dependency tree the same way Node/Astro will at runtime, so
// it finds a hoisted install and only reports "missing" when it's genuinely
// absent (token-less dev / CI without the package).
const require = createRequire(import.meta.url);
function detectCmsPackage() {
  try {
    require.resolve('@sparkable-cms/cms/runtime/site-settings.ts');
    return true;
  } catch {
    // Fall back to a direct directory check (covers cases where the export
    // subpath can't be resolved but the package dir exists).
    return (
      existsSync(fileURLToPath(new URL('./node_modules/@sparkable-cms/cms', import.meta.url))) ||
      existsSync(fileURLToPath(new URL('../../node_modules/@sparkable-cms/cms', import.meta.url)))
    );
  }
}
const hasCmsPackage = detectCmsPackage();
const cmsAliases = hasCmsPackage ? {} : {
  '@sparkable-cms/cms/runtime/SparkableHead.astro': fileURLToPath(new URL('./src/stubs/SparkableHead.astro', import.meta.url)),
  '@sparkable-cms/cms/runtime/SparkableFooter.astro': fileURLToPath(new URL('./src/stubs/SparkableFooter.astro', import.meta.url)),
  '@sparkable-cms/cms/runtime': fileURLToPath(new URL('./src/stubs/sparkable-runtime.ts', import.meta.url)),
  '@sparkable-cms/cms/content': fileURLToPath(new URL('./src/stubs/sparkable-content.ts', import.meta.url)),
};

// Safeguards: make it obvious when stubs are active, and refuse to ship a
// stubbed build from CI (where the package is supposed to install via the
// GH packages token). Local dev still works — the warn is informational.
if (!hasCmsPackage) {
  console.warn('\n⚠️  @sparkable-cms/cms is not installed — using no-op stubs.');
  console.warn('   OK for local dev. In CI/Docker the package installs from GitHub Packages.');
  console.warn('   `astro build` from here will produce a build with empty SparkableHead/Footer.\n');

  if (process.env.CI && process.env.SKIP_CMS_CHECK !== '1') {
    throw new Error(
      'Refusing to build in CI without @sparkable-cms/cms. ' +
      'Set the GitHub Packages token before `npm ci` (the workflow writes it to ~/.npmrc), ' +
      'or set SKIP_CMS_CHECK=1 if you intentionally want a stubbed build.',
    );
  }
}

const integrations = [
  sitemap({
    // Keep noindex/draft routes out of the sitemap so we don't advertise
    // pages to search engines that we've explicitly told them not to index.
    filter: (page) => !page.includes('/about/careers-first-draft'),
  }),
];

// Conditionally load Sparkable CMS in dev/staging only. The integration
// injects the editor script + middleware, so it must NOT be present in the
// static production build that deploys to Cloudflare.
if (process.env.SPARKABLE_CMS === 'true') {
  const { default: sparkableCms } = await import('@sparkable-cms/cms');
  integrations.push(sparkableCms());
}

export default defineConfig({
  // Set this to your production URL (updated during deployment)
  site: 'https://wildwooddentalclinic.com',
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  integrations,
  server: {
    host: process.env.HOST || 'localhost',
  },
  vite: {
    resolve: {
      alias: cmsAliases,
    },
    plugins: [tailwindcss()],
    server: {
      // Leading-dot patterns allow the apex + any subdomain. `.fly.dev` covers
      // the staging app's hostname; `.spark0.io` / `.workers.dev` cover custom
      // CMS / preview domains. See CLAUDE.md gotcha #6.
      allowedHosts: ['.fly.dev', '.spark0.io', '.workers.dev'],
      // Fly.io's persistent volume drops inotify events for newly-created files,
      // so Tailwind v4 doesn't see new pages or utility classes until the dev
      // server is restarted. Polling on fly only — local dev keeps native fs events.
      watch: process.env.FLY_APP_NAME
        ? { usePolling: true, interval: 1000 }
        : undefined,
    },
  },
});
