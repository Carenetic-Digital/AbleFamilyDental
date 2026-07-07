# Spark Site Template

A template for building websites with Claude Code. The developer provides a reference URL and intake materials, and Claude builds the site through a series of commands.

## Commands

Run these in order. Each command checks state before proceeding.

| Command | What it does | Requires |
|---------|-------------|----------|
| `/intake` | Crawl reference site, process intake files, reconcile sitemap, download images | `intake/INTAKE.md` and `intake/sitemap.md` filled in |
| `/homepage` | Build design system, generate homepage, create 404 page, run design review | State: `intake_complete` |
| `/generate-pages` | Build all remaining pages, create redirects, run tests and SEO audit | State: `homepage_approved` |
| `/review` | Comprehensive pre-launch review (accessibility, images, responsiveness, scripts, links, build) | Any time |
| `/test` | Playwright tests, responsive spot-checks, link verification | Any time |
| `/launch` | Remove staging artifacts, verify scripts/SEO, build, deploy to production | After client sign-off |

### Utility commands

- `/review` and `/test` — Can be run anytime, not just pre-launch. Useful during homepage iteration or after generating pages.

## State Management

`.site-factory/state.json` tracks progress. Commands check state before running.

```
intake_complete → homepage_pending_approval → homepage_approved → pages_pending_approval → complete
```

| State | Set by | Means |
|-------|--------|-------|
| `intake_complete` | `/intake` | Intake processed, reference site crawled, sitemap reconciled |
| `homepage_pending_approval` | `/homepage` | Homepage generated, awaiting dev review |
| `homepage_approved` | `/homepage` (on approval) | Dev approved homepage, ready for remaining pages |
| `pages_pending_approval` | `/generate-pages` | All pages built, awaiting review |
| `complete` | `/generate-pages` (on approval) | All pages approved |

## Project Structure

```
intake/                 # Client inputs
  INTAKE.md             # Business info, goals, audience, references
  sitemap.md            # Pages to build
  branding/
    colors.md           # Brand colors
    fonts.md            # Font families
    intake-quick.md     # Free-form intake notes, transcript excerpts
  images/               # Client-provided assets

reference/              # Output from /intake crawl
  analysis.md           # Design values, content, section ordering
  screenshots/          # Visual reference captures

src/                    # Website source
  components/           # Reusable UI (Header, Footer, sections)
  layouts/              # Page templates (BaseLayout)
  pages/                # Route pages (index.astro, 404.astro, etc.)
  styles/               # Global CSS with Tailwind v4 @theme
  DESIGN.md             # Design system documentation

public/                 # Static files
  images/               # All site images (never hotlink externally)
  _redirects            # Cloudflare redirect rules

.site-factory/          # Build state
  state.json            # Current phase, page inventory

.claude/
  commands/             # Slash command definitions
  agents/               # Agent instruction files
```

## Agents

Agent definitions in `.claude/agents/` provide detailed instructions for specialized tasks. Commands reference these agents internally — you don't invoke agents directly.

- **site-analyzer** — Crawl reference site, discover pages, extract design values, capture screenshots
- **color-system-generator** — Brand colors → full Tailwind v4 palettes with WCAG AA contrast
- **typography-system-generator** — Fonts → fluid type scale, loading strategy, heading hierarchy
- **component-builder** — Generate responsive, accessible Astro components
- **content-writer** — Generate brand-aligned copy
- **image-sourcer** — Download, optimize, and prepare images (no hotlinking, proper formats/dimensions)
- **visual-qa** — Screenshot all breakpoints, compare against reference
- **design-reviewer** — WCAG 2.2 AA compliance, responsive design, visual consistency
- **seo-auditor** — Meta tags, structured data, Core Web Vitals readiness

## Tech Stack

- Astro 5.x (static output)
- Tailwind CSS v4 (CSS-first with @theme, no tailwind.config.js)
- Playwright (functional testing)
- Cloudflare Workers (deployment via wrangler)

## Third-Party Scripts

When adding any external script (GTM, BugHerd, Hotjar, chat widgets, etc.), two things will break it:

1. **Always use `is:inline`** on external `<script>` tags — Astro will try to bundle them otherwise, causing CORS errors
2. **Always update `public/_headers` CSP** — add the script's domains to the appropriate CSP directives

See `docs/third-party-scripts.md` for the full guide, common scripts and their CSP requirements, and troubleshooting steps.

## Conventions

- Components in `src/components/` use PascalCase
- Pages follow `state.pages.planned` list
- Design system documented in `src/DESIGN.md`
- All images go in `public/images/` — never hotlink to external URLs
- Redirects go in `public/_redirects` (Cloudflare format)
- Use `compound-engineering:frontend-design` skill for page generation
- **All internal page links must have a trailing slash** — Cloudflare routes to trailing slash by default, so `/about` must be `/about/`, `/services/cosmetic-dentistry` must be `/services/cosmetic-dentistry/`, etc. The root `/` is already correct. This applies to `href` attributes in `<a>` tags in `.astro` files. **Exception:** static asset paths (`.ico`, `.svg`, `.png`, `.webp`, `.webmanifest`, `.pdf`, etc.) must NOT have a trailing slash — only page route paths get the trailing slash.

## Commands Reference

- `npm run dev` — Start development server (localhost:4321)
- `npm run build` — Build for production
- `npm run test` — Run Playwright tests
- `npm run deploy` — Build and deploy to Cloudflare Workers

## Deployment

There is no auto-deploy GitHub Action for this project — pushing to `origin/main` does **not** publish the site by itself. Deploys are manual: run `npm run deploy` (`astro build && wrangler deploy`). The site goes live at **https://able-family-dental.spark0.io/** within about a minute of running that command.

When the user says "deploy" (or "commit, push, and deploy"), always run `npm run deploy` as part of the request — don't assume the push alone covers it.

## Process Documentation

Full process documentation (for PMs, strategists, and developers) lives at the sibling project `../spark-docs/` and is deployed at https://spark-process.carenetic-digital.workers.dev
