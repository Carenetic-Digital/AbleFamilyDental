# Brand Typography

Wildwood's discovery notes call for a "modern humanist sans for body, something with character (but not novelty) for headlines." The CDS team has not locked a brand font. Going with **Playfair Display (display) + Inter (body)** — Playfair Display gives a high-contrast editorial serif feel that pairs with the clinic's 35+ year history, while Inter keeps body copy clean and readable.

## Font Families

### Display Font (Headings)
**Font:** Playfair Display
**Weights:** 500 (Medium), 600 (Semibold), 700 (Bold)
**Style notes:** High-contrast transitional serif with sharp terminals. Reserve heaviest weights for largest sizes; favor 500–600 for mid-size headings to avoid feeling over-dressed.
**Google Fonts URL:** https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap

### Body Font (Text)
**Font:** Inter
**Weights:** 400 (Regular), 500 (Medium), 600 (Semibold for inline emphasis and small UI labels)
**Google Fonts URL:** https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap

### Combined Loader
**Google Fonts URL (single request):** https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap

## Hierarchy Notes

- **Page hero (h1):** Playfair Display 600, fluid clamp from ~36px mobile to ~64px desktop
- **Section headings (h2):** Playfair Display 600, ~28–44px fluid
- **Subsection headings (h3):** Playfair Display 500 or Inter 600 — TBD per layout
- **Body:** Inter 400, 16–18px with 1.6 line-height for long-form content
- **UI labels / nav:** Inter 500–600, 14–15px, slight letter-spacing on uppercase utility labels only
- **Numbers (phone, hours):** Inter tabular figures where alignment matters

## Font Loading Strategy

Loaded via Google Fonts with `display=swap` to prevent layout shift. Browser shows the system sans fallback until the custom fonts arrive. Self-host later if Core Web Vitals demand it — for v1, the Google CDN is fine.

## Fallback Stack

```
--font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

## If CDS Team Pushes Back

Alternatives worth keeping in our pocket:
- **Inter + Fraunces** — warmer old-style serif if Playfair Display reads too editorial/dressy
- **Inter + Inter** — safest, cleanest, but loses the warmth a serif display brings
- **Inter + General Sans** — both sans, more contemporary, less "established practice" feel

Confirm against any official brand guideline in the CDS Drive folder before locking. If a brand guideline specifies fonts, override this file.
