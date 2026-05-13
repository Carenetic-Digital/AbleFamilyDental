# Project Intake

## Business Information

**Business Name:** Wildwood Dental Clinic
**Tagline:** Your family-friendly dental office in Saskatoon, SK
**Industry:** Healthcare — General & Family Dentistry
**Location:** 105 - 1526 8th Street East, Saskatoon, SK S7H 0T3
**Phone:** 306.374.7272
**Email:** reception@wildwooddentalclinic.com
**Hours:** Mon/Tue/Thu 7:30am–4:30pm · Wed 7:30am–8:30pm · Fri 7:30am–4:00pm
**In business since:** Over 35 years serving Saskatoon
**Parent organization:** Canadian Dental Services Corp (CDS)

## Target Audience

**Primary audience:** Saskatoon-area families and individuals searching for a long-term general dentist on the east side of the city. Includes new patients shopping for a clinic, existing patients researching a recommended treatment, and prospective CDCP (Canadian Dental Care Plan) enrollees.

**What action should visitors take?** Book a new-patient appointment. Online booking (or a Jotform-backed request flow that *feels* like booking) is the North Star action on every page. Secondary actions: call the clinic, complete the new-patient or health-history form, learn about CDCP.

## Reference Sites

**Primary reference:** https://wildwooddentalclinic.com/ — current site, treated as content source of truth for v1 (with the services CSV in `intake-raw/` overriding where they conflict).

**Design inspiration:**
- https://dentix24.com/ — visual rhythm, services dropdown structure, pre-footer treatment, textured backgrounds, footer hierarchy
- https://docbraces.com/clinics/toronto-west — multi-location dental brand pattern (model for how future CDS clinic sites will relate)
- https://www.markmurphydds.com/ — family-dentistry warmth with modern type and mega-menu services taxonomy

## Brand Voice

**Tone:** Warm, dignified, professional, locally rooted. Not corporate, not clinical-cold, not folksy. The "doctor's office printed brochure" test: if a phrase would feel out of place there, cut it.

**Key messages:**
1. A specific Saskatoon clinic on 8th Street East — not an interchangeable corporate dental brand. Reference the neighborhood, the doctors' Saskatchewan training, and the 35+ year history.
2. Family-friendly comprehensive care under one roof — preventive, restorative, cosmetic, oral surgery, sedation, and TMJ/sleep services.
3. Modern technology and a comfortable patient experience (massage chairs, ample free parking, minimal wait times) — stated factually, never with superlatives.
4. CDCP-ready: clear, neutral education on the Canadian Dental Care Plan so patients can understand whether they qualify and how to enroll.
5. Patient education is core to the practice — when a dentist says "you need a crown" or "you have periodontal disease," patients have somewhere on this site to learn what that means.

**Hard rules — Canadian dental advertising compliance (CDSS, approved Oct 2024):**
- NO patient testimonials, reviews, or "what our patients say" content of any kind
- NO superlative/comparative claims ("best," "top-rated," "leading," "#1," "state-of-the-art," "cutting-edge")
- NO outcome guarantees ("pain-free," "perfect smile," guaranteed results)
- NO discounts, coupons, contests, or incentive offers
- NO deprecating language about other clinics
- "Specialist" only when formally registered with CDSS in that specialty; otherwise "general dentist with a focus on…"
- Mandatory: CDSS, Canadian Dental Association, and provincial body logos in a reusable three-box credentials component
- Mandatory: discoverable "Commitment to Clean" statement (small footer shield + dedicated short page or modal)

## Content Sources

**Existing content:**
- Live site at https://wildwooddentalclinic.com/ — content baseline for v1
- `intake-raw/intake-raw.md` — full discovery notes (project goals, design direction, IA, compliance, imagery direction)
- `intake-raw/2026 GP Services & Treatments.xlsx - MASTER Services & Treatments.csv` — current and new services Wildwood offers (overrides anything on the live site where they conflict)
- `intake-raw/Saskatoon-Skyline.svg` — sketch of Saskatoon's skyline for use as hero/section graphic, treated as line art or soft watermark (NOT a stock cityscape photo)
- `intake-raw/Icons SVG/` — Mariana's curated service-category icons (may need cleanup)
- CDSS/PIPEDA compliance docs: https://drive.google.com/drive/folders/1vieDbKqLL03JX6H4hAgpJtOAgKLlaFBq
- Wildwood photoshoot (dark, will need brightening + possible AI augmentation): https://drive.google.com/drive/folders/166JRXp8eCUFG9oT4lIHKFCVKfMB0DM-K
- Regulatory body logos: https://drive.google.com/drive/folders/1obvB8e3I45iWMqO4KzV2dXyoFJLBKXkY

**Dentists (for bio pages):**
- Dr. Adam Koob — DMD, University of Saskatchewan (2013)
- Dr. James Dessouki — DMD, University of Saskatchewan (2004); B.Sc with Advanced Certificate in Anatomy; contemporary & esthetic dentistry, University of Minnesota; Board of Directors, CDSS
- Dr. Jay Stevens — DMD, College of Dentistry, University of Saskatchewan (2004)
- Dr. Christy MacPherson — DMD (2019); B.Sc Biology & B.Ed, University of Saskatchewan; founding member of DIRECT Dental student clinic
- Dr. Richard Kerby — DMD, University of Saskatchewan (2021); B.Sc Biochemistry (medical specialization), UBC Okanagan
- Dr. Madyson Burgess — DMD, University of Saskatchewan; B.Sc Physiology & Pharmacology, University of Saskatchewan

**Content to generate:**
- Localizing rewrite of any generic/corporate copy from the existing site (mention 8th Street East, Saskatoon, doctors' Saskatchewan training, 35+ year history)
- New service pages for services in the 2026 services CSV that aren't on the current site
- Dedicated `/patients/canadiandentalcareplan` page
- `/learn/` patient-education hub (light v1, expandable) - use blog articles from current site here
- `/commitment-to-clean` page or modal content

## Technical Requirements

**Forms — existing Jotform integration (DO NOT replace):**
- Contact Us form
- New Patient Booking form
- Existing Patient Health History Update form
Embed via Jotform iframe or feed submissions through their API — confirm preferred path with CDS team.
Note: Right now we don't have the Jotforms. Create the fields on the site.

**Analytics:** Inherit existing GA4 + GTM properties (do not create new). Live container is currently `GTM-WQKBTTT` — confirm whether to reuse or issue a fresh container before launch.
Note: Add closer to launch.

**Deployment:** wildwooddentalclinic.com (clean URLs at root; DNS cutover handled by CDS). Cloudflare Workers via wrangler per template defaults.

**Persistent header CTA:** "Book Appointment" — sticky on scroll, visible on every page. Mobile: persistent bottom bar with **Call** + **Book** side-by-side. Header strip on desktop shows clickable phone **306.374.7272** + hours summary.

**Special features:**
- Mega-menu services navigation with broad categories + nested treatments (width-selector style per Dentix24, not card grid)
- Three-box mandatory credentials component (CDSS, CDA, provincial body logos)
- Patient-education hub at `/learn/` (re-frame of current "Blog")
- Multi-clinic-ready theming: build palette as CSS variables so future CDS sister clinics can re-theme without component changes
- Reduced-motion media query honored for all scroll/hover animations
- Skip-to-content link, visible keyboard focus indicators, labeled form fields, alt text everywhere — WCAG 2.1 AA throughout
- `/accessibility-statement` page

**SEO:** Local-first. No paid ads — the site lives or dies on organic search. Reinforce Saskatoon and 8th Street East signals throughout, doctors' Saskatchewan credentials, neighborhood references, local landmarks. Existing SEMrush subscription stays — do not replace.
