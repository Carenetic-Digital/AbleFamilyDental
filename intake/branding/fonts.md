# Brand Typography

Wildwood's discovery notes call for a "modern humanist sans for body, something with character (but not novelty) for headlines." The CDS team has not locked a brand font, but flagged Inter + Fraunces (or General Sans) as the preferred direction. Going with **Fraunces (display) + Inter (body)** — Fraunces gives the warm, slightly old-style character that pairs with the clinic's 35+ year history, while Inter keeps body copy clean and readable.

## Font Families

### Display Font (Headings)
**Font:** Fraunces
**Weights:** 500 (Medium), 600 (Semibold), 700 (Bold)
**Style notes:** Use the optical-size axis at larger settings for the warmer, more characterful display feel. Avoid the most novelty-leaning soft variants.
**Google Fonts URL:** https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap

### Body Font (Text)
**Font:** Inter
**Weights:** 400 (Regular), 500 (Medium), 600 (Semibold for inline emphasis and small UI labels)
**Google Fonts URL:** https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap

### Combined Loader
**Google Fonts URL (single request):** https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap

## Hierarchy Notes

- **Page hero (h1):** Fraunces 600, fluid clamp from ~36px mobile to ~64px desktop
- **Section headings (h2):** Fraunces 600, ~28–44px fluid
- **Subsection headings (h3):** Fraunces 500 or Inter 600 — TBD per layout
- **Body:** Inter 400, 16–18px with 1.6 line-height for long-form content
- **UI labels / nav:** Inter 500–600, 14–15px, slight letter-spacing on uppercase utility labels only
- **Numbers (phone, hours):** Inter tabular figures where alignment matters

## Font Loading Strategy

Loaded via Google Fonts with `display=swap` to prevent layout shift. Browser shows the system sans fallback until the custom fonts arrive. Self-host later if Core Web Vitals demand it — for v1, the Google CDN is fine.

## Fallback Stack

```
--font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
--font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

## If CDS Team Pushes Back

The discovery notes called out three alternatives worth keeping in our pocket:
- **Inter + Inter** — safest, cleanest, but loses the warmth Fraunces brings
- **Inter + General Sans** — both sans, more contemporary, less "established practice" feel
- **Source Sans Pro + Playfair Display** — more traditional pairing if Fraunces reads too distinctive

Confirm against any official brand guideline in the CDS Drive folder before locking. If a brand guideline specifies fonts, override this file.
