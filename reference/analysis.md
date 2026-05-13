# Reference Site Analysis — wildwooddentalclinic.com

Crawl + design audit of the live WordPress site, performed during `/intake`. Sources: `reference/pages-discovered.json` (47-page inventory), `reference/screenshots/` (14 PNGs), plus CSS extracted from the live homepage.

## Top-level read

The current site is a Beaver Builder / WordPress build that has accumulated content since the mid-2010s. The brand colors and warmth are intact; the structure, typography, and many service pages have aged out. The clinic's voice on the team page (Drs. Koob, Dessouki, Stevens, MacPherson, Kerby, Burgess) is the single best asset to carry forward — personal-interest blurbs (fishing, Emma Lake, Meewasin trail, scuba, family) give the practice real Saskatoon character that the rest of the site lacks.

## Design values

### Brand palette (extracted from live CSS variables)

| Token | Hex | Where it's used live |
|---|---|---|
| Brand navy (deep) | `#1e3352` | Top strip bg, header text/links, primary buttons, dark sections |
| Brand navy (heading) | `#274567` | h1–h6 body headings |
| Brand gold | `#d59639` | Accent, link hover, social-icon bg, focus states |
| Brand gold (hover) | `#eeb663` | Button + icon hover state |
| Pale blue-gray | `#cbd9de` | Borders, dividers, soft accents, dark-section heading color |
| Footer muted link | `#93b1bb` | Footer links on navy background |
| Surface | `#f2f2f2` | Alternating section background |
| Body text | `#808080` | Default body copy |

These are confirmed and locked in `intake/branding/colors.md`.

### Typography (live)

Beaver Builder defaults — Roboto / Helvetica fallback. No distinctive type voice. Replacement direction (Fraunces display + Inter body) is set in `intake/branding/fonts.md`.

### Section patterns worth borrowing

- **Hero with full-bleed photo + brand wordmark + tagline.** The pattern works; the photo needs replacing with the upcoming Wildwood photoshoot or local Saskatoon-specific imagery (no stock dental).
- **Four-card intro grid on the homepage** (About / Services / Appointments / Commitment to Clean) — solid IA shortcut; carry forward with refreshed iconography (use the SVGs in `public/images/icons/`).
- **Office hours + address strip** — keep, redesign cleaner.
- **Dark navy services band before footer** — keep the rhythm, replace with Dentix24-style pre-footer treatment per Mariana.

### Patterns to drop or rework

- Stock dental clip-art and generic operatory shots — replace per intake direction ("no clip-art / generic stock photos of dentistry — that is the look they are running from").
- Beaver Builder parallax effects — replace with subtle, reduced-motion-respecting scroll fades.
- Identical-looking service pages (most pages share one template). New site needs differentiated service-detail treatment that lets cross-category content (crowns, implants) cross-link cleanly.
- Floating chat widget / popups on the current site (if any persist) — remove for compliance + performance.

## Content to reuse

| What | Where | Why |
|---|---|---|
| Six doctor bios (with personal-interest blurbs) | `/meet-the-team/` | Strongest "feels like Wildwood" content on the site |
| 35+ year history mention | `/about-us/`, footer | Verifiable, factual, on-brand for CDSS compliance |
| 8th Street East / Preston / Cumberland neighborhood references | `/about-us/`, `/contact/` | The localization the new site needs more of, not less |
| Office hours + address | All pages | Keep; surface in header on desktop |
| Massage chairs, free parking, minimal wait | `/about-us/`, `/our-difference/` | Factual differentiation, allowed under CDSS standard |
| Three existing blog posts (2018) | `/blog/` | Seed content for `/learn/` patient-education hub |

## Content to rewrite (CDSS compliance)

### Superlative / comparative claims flagged

- `/meet-the-team/` — meta description: "best dental care we can to all of our patients" (soft, but borderline)
- `/our-difference/` — meta mentions "specialists" — only use if CDSS-registered; otherwise "general dentists with a focus on…"
- `/dental-cleanings-and-checkups/` — "the best teeth are your own" (soft superlative)
- `/dental-sealants/` — "excellent way to protect"
- `/oral-cancer-screening/` — "your best option" (prevention context)
- `/dental-bridges/` — "excellent solution"
- `/teeth-whitening/` — "most effective", "stronger than any solution you can get over the counter" (comparative claim — rewrite as factual concentration), "up to eight shades lighter" (keep with "results will vary" qualifier)
- `/porcelain-veneers/` — "dramatically change"
- `/dental-bonding/` — "best results", "more dramatic result"
- `/tooth-reshaping-and-contouring/` — "one of the most convenient and cost-effective", "excellent cosmetic dentistry solution"
- `/invisalign/` — "clear winner over metal braces" (comparative claim — rewrite as factual description), "virtually invisible", "subtler teeth-straightening solution"
- `/dental-care-for-children/` — "experts in dentistry for children in Saskatoon" — "expert" is similarly risky to "specialist"; rewrite
- `/emergency-dental-care/` — "urgent and quality emergency dental care"

### Outcome-guarantee risks

- `/dental-implants/` — "durable and permanent solution", "permanently affixed" — rewrite as factual/qualified language
- `/root-canal-treatment/` — "pain-free" phrasing around sedation — rewrite

### Content gaps + factual errors

- `/privacy-policy/` — **HIPAA referenced** (US framework). Canadian clinic falls under **PIPEDA + Saskatchewan HIPA**. Rewrite from scratch using CDSS/PIPEDA docs in `intake-raw/` Drive folder.
- `/financial-options/` — LendCare "pre-approved loans" + "interest rates as low as 9.9%" reads as partner promotional terms. Keep factual, drop the promotional framing.
- `/schedule-a-dental-appointment/` — title implies booking but **page has no booking form**. New site needs the Jotform-backed flow this page promises.
- `/faqs/` — empty in current crawl. Author from scratch (brainstorm top patient questions with team).
- `/covid-form/` — deprecated, redirect to `/patients/forms`.
- `/ceramic-crowns/` — duplicates `/dental-crowns/` (same content, same meta title). Consolidate on new site.
- `/office-tour/` — typos in title ("Wildwdood") and meta ("say awhile"); needs real new photography.
- `/blog/` — only three posts, all dated **August 28, 2018**. Reframe as `/learn/` per intake direction.
- `/join-our-team/` — stub; no application path, no role list. Needs real content if careers stays in primary nav.

### Patterns we will NOT bring forward (CDSS hard rules)

- No patient testimonials/reviews. None currently embedded site-wide, but watch for the temptation when migrating; flag any "what our patients say" wording.
- No third-party review embeds (Google, Yelp, Facebook).
- No incentive offers, coupons, contests, or "free consultation" framing.
- No deprecating language about other providers.
- "Specialist" only when CDSS-registered. "Expert" carries similar risk — prefer "general dentists with a focus on…" or "experienced in…".

## Sitemap reconciliation

Discovered: **47 pages** (live WP).
Planned: **38 routes** (per `intake/sitemap.md`, plus the `/learn/[slug]` template).

Every legacy URL maps to a new path; the redirects are written into `public/_redirects` during `/generate-pages`. New pages with no live equivalent: `/patients` hub, `/patients/new-patients`, `/patients/canadiandentalcareplan` (high-priority per intake), `/accessibility-statement`, `/commitment-to-clean`, `/learn` (reframed from `/blog/`).

## Single biggest takeaway

The clinic's character lives on the team page and in three factual differentiators (8th Street East / Saskatchewan-trained doctors / 35+ years). The new site should anchor every page to one or more of those three signals. Every other section is design + writing work to bring up to compliance and modern standards.

## Single biggest CDSS compliance landmine

The privacy policy referencing **HIPAA** is a real problem — it's the wrong country's framework on a regulated Canadian health-care provider's site. Rewriting against PIPEDA + Saskatchewan HIPA is non-negotiable before launch.
