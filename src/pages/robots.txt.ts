import type { APIRoute } from 'astro';

/**
 * Live/indexing robots.txt (flipped at launch, 2026-07-28, together with
 * BaseLayout noindex=false). Remember: AI crawlers (GPTBot, OAI-SearchBot,
 * PerplexityBot, ClaudeBot, Google-Extended) must not be blocked in Cloudflare.
 */
const getRobotsTxt = () =>
  [
    'User-agent: *',
    'Allow: /',
    '',
    'Sitemap: https://ablefamilydental.com/sitemap-index.xml',
  ].join('\n');

export const GET: APIRoute = () => {
  return new Response(getRobotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
