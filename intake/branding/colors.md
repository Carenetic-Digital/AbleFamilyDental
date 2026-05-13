# Brand Colors

Wildwood's existing palette, pulled from the live site's CSS. Anchored by the deep navy + warm gold the clinic has used for years. Build the palette as CSS variables so other CDS clinic sites can re-theme later without component changes.

## Primary Colors

**Primary:** #1e3352 (Deep Navy)
- Used for: Header text/links, top strip background, primary headings, navigation
- Hover state: slight lightening or accent gold underline

**Primary (heading variant):** #274567 (Navy)
- Used for: Body headings (h1–h6) where the deeper navy is too heavy

**Accent:** #d59639 (Wildwood Gold)
- Used for: Primary CTAs (Book Appointment), key links, icon backgrounds, focus states
- Hover state: #eeb663 (Lighter Gold)

**Secondary:** #cbd9de (Pale Blue-Gray)
- Used for: Borders, dividers, soft surface tints, decorative card edges

## Neutral Colors

**Text:** #1f2937 (Near-Black) — body copy on white
**Muted Text:** #808080 (Mid Gray) — secondary text, captions, meta
**Footer Muted Link:** #93b1bb (Muted Blue-Gray) — footer link color on navy
**Background:** #ffffff (White) — primary canvas
**Surface:** #f2f2f2 (Light Gray) — alternating section background
**Surface (subtle blue tint):** #f6f9fa — optional warmer alternate surface
**Border:** #e5e7eb (Gray 200) — default UI borders

## Semantic Colors

**Success:** #10b981 (Emerald)
**Warning:** #d59639 (Wildwood Gold — reuse brand accent)
**Error:** #b91c1c (Red 700 — chosen over bright red for medical context restraint)
**Info:** #1e3352 (Deep Navy — reuse brand primary)

## Usage Notes

- The deep navy (#1e3352) and Wildwood gold (#d59639) are the brand. Lean on them. Avoid introducing additional hues — the design should feel calm, clinical-modern, and trustworthy.
- The pale blue-gray (#cbd9de) is the third brand color and works well for borders, card outlines, and soft backgrounds beneath the Saskatoon skyline line art.
- For Tailwind v4 with oklch, these will be converted automatically. Treat the hex values above as the source of truth.
- Multi-clinic theming: build all components against semantic tokens (`--color-brand-primary`, `--color-brand-accent`, etc.), never hardcoded hex, so sister CDS clinics can re-theme by overriding the root variables.
