import type { APIRoute } from 'astro';

/**
 * Staging currently blocks all crawlers (pairs with BaseLayout noindex=true).
 * Before launch:
 *  1. Set BaseLayout `noindex` default to false
 *  2. Replace this robots.txt with Allow + Sitemap
 *  3. Confirm AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended) are not blocked in Cloudflare
 */
const getRobotsTxt = () =>
  [
    'User-agent: *',
    'Disallow: /',
    '',
    '# Launch-ready template (uncomment when indexing):',
    '# User-agent: *',
    '# Allow: /',
    '# Sitemap: https://ablefamilydental.com/sitemap-index.xml',
  ].join('\n');

export const GET: APIRoute = () => {
  return new Response(getRobotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
