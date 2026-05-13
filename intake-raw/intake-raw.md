PROJECT GOALS (from CDS leadership)
-----------------------------------

Verbatim priorities pulled from the May 11 discovery call and intake notes:

1.  **Drive new-patient bookings.** The North Star metric. Online booking (or a request-an-appointment flow that _feels_ like booking when online booking is not yet live) must be the most frictionless action on every page.
    
2.  **Modern, clean, "elevated" feel** — get away from the "1990s-looking" current WordPress sites. Mariana's exact words: clean, modern, depth via subtle shadows, satisfying hover/micro-interactions, visually intuitive iconography.
    
3.  **Localize hard.** This clinic does **no paid ads** — it lives or dies on organic search. Every page should reinforce _Saskatoon-ness_: neighborhood (the clinic sits on 8th Street East), local landmarks, the doctors' Saskatchewan training/credentials, community connection.
    
4.  **Patient-education hub**, not just a booking funnel. Existing patients should have somewhere to land when their dentist says "you have periodontal disease" or "we're recommending a crown." Plan for an expandable education section even if v1 is light.
    
5.  **Marketing-team autonomy.** The new site must be easy for CDS's marketing team to update — adding pages, swapping imagery, changing copy, posting blogs — **without engineering tickets**. Build with an obvious, low-friction content model.
    
6.  **CDCP (Canada Dental Care Plan) education.** The federal program has under-performed on adoption. CDS wants Wildwood's site to help patients understand whether they qualify and how to enroll. This needs a dedicated page and visible homepage entry point.
    

### Success metrics the team will judge the build on

*   Booking volume (form submissions + online booking clicks)
    
*   Page views, especially on services and CDCP pages
    
*   Organic keyword rankings in Saskatoon (they currently use SEMrush and will keep it — don't replace)
    
*   Marketing-team time-to-publish for new content
    
*   Subjective: does walking into the homepage _feel_ like walking into Wildwood's lobby — warm, modern, clean?

TECH details
------------

*   **Forms:** Existing **Jotform** integration. Three Jotforms are already in use:
    
    *   Contact Us form
        
    *   New Patient Booking form
        
    *   Existing Patient Health History Update form Embed via Jotform's iframe or feed submissions through their API — confirm with team. Do not replace these.
        
*   **Analytics:** GA4 + GTM (existing properties — inherit, do not create new). Container ID currently on the live site is GTM-WQKBTTT — confirm before reuse vs. fresh container.
    
*   **Deployment domain:** wildwooddentalclinic.com (DNS will be cut over by CDS — design the build assuming clean URLs at root)


CANADIAN DENTAL ADVERTISING COMPLIANCE — NON-NEGOTIABLE
-------------------------------------------------------

Saskatchewan-licensed dentists are governed by the **College of Dental Surgeons of Saskatchewan (CDSS)** Advertising Standard (approved October 2024). The site must comply. **Hard rules:**

*   **No patient testimonials or reviews on-site.** Do not embed Google reviews, do not write fake/generic patient quotes, do not include a "What our patients say" section. (Mariana explicitly called this out on the discovery call: "We can't do testimonials in Canada.") This is the single most common mistake on US-inspired dental sites — do not import this pattern.
    
*   **No superlative or comparative claims.** Avoid "best dentist in Saskatoon," "top-rated," "leading," "#1," "state-of-the-art," "cutting-edge," "unmatched," etc. Verifiable factual statements are fine ("over 35 years serving Saskatoon," "open evenings on Wednesday").
    
*   **No guarantees of outcome.** Don't promise pain-free, perfect smiles, results, etc.
    
*   **No incentive offers, coupons, giveaways, contests, or discounts** in advertising copy. (A neutral mention of the CDCP federal program is fine because it's a government plan, not a clinic incentive.)
    
*   **No deprecating language about other clinics or providers.**
    
*   **Specialist designations require certification.** Only call a provider a "specialist" (orthodontist, endodontist, etc.) if they are formally registered in that specialty with CDSS. Otherwise use "general dentist with a focus on…" or "experienced in…".
    
*   **Credentials display:** the three regulatory/college logos (CDSS, Canadian Dental Association, and the appropriate provincial body) must appear on the site — Mariana said these are mandatory and must be in the "three boxes" treatment. Build this as a reusable component. (The logos they provided are in this folder https://drive.google.com/drive/folders/1obvB8e3I45iWMqO4KzV2dXyoFJLBKXkY)
    
*   **Commitment to Clean** statement (CDS shared the language in March) must be present and discoverable — likely a small footer-area shield + a dedicated short page or modal.
    
*   The client provided the College of Dental Surgeons of Saskatchewan/PIPEDA standards in a few documents which are all in this Google Folder ([https://drive.google.com/drive/folders/1vieDbKqLL03JX6H4hAgpJtOAgKLlaFBq](https://drive.google.com/drive/folders/1vieDbKqLL03JX6H4hAgpJtOAgKLlaFBq))
    

When writing any copy, when in doubt, write the **factual, dignified, profession-respecting** version. If a phrase would feel out of place in a doctor's office printed brochure, cut it.

DESIGN DIRECTION
----------------

### Inspirations (from the CDS team)

*   [**dentix24.com**](https://dentix24.com/) — Mariana's primary reference. She specifically liked:
    
    *   The services dropdown structure (broad categories with nested treatments) — _width-selector style, not card-grid_
        
    *   Textured backgrounds throughout (subtle, not noisy)
        
    *   Pre-footer treatment — large, organized, with strong CTA
        
    *   Footer organization and clean bottom-of-page hierarchy
        
    *   The site is built on Astro; we don't need to match the stack, but **match the visual rhythm**: generous whitespace, clear sectioning, micro-shadows for depth, modern sans-serif type, considered hover states
        
*   [**docbraces.com/clinics/toronto-west**](https://docbraces.com/clinics/toronto-west) — multi-location dental brand with per-clinic pages. Note the location-aware nav and "Book at this location" pattern; this is the model for how CDS clinic sites will eventually relate to one another.
    
*   [**markmurphydds.com**](https://www.markmurphydds.com/) — family-dentistry feel, warm but modern, strong service taxonomy with a generous mega-menu.
    

### Visual language (synthesized from the call)

*   **Clean, modern, light.** White and near-white dominant. Subtle drop shadows for card depth — not heavy.
    
*   **Texture, used sparingly.** A soft paper or topographic texture on hero/section backgrounds gives Mariana the "depth" she wants. Don't tile loud patterns.
    
*   **Localized art.** The team has provided a **sketch of Saskatoon's skyline** — use it. It should appear as a hero/section graphic element, treated as line art or a soft watermark, **not** a stock-photo cityscape. This is the visual hook that makes Wildwood feel like Saskatoon.
    
    *   Here is a link to the Saskatoon skyline sketch that was referenced ( Saskatoon-Skyline.svg )
        
*   **Iconography.** Custom or curated icon set, consistent stroke weight, used for service categories, "what to expect" rails, trust badges, and step-by-step explainers. Mariana approved AI-generated icons as long as they're consistent — keep a single style across the site. (She also has a Canva file of preferred icons — check the Drive folder.)
    
    *   Here is a link to the icons that Mariana put together ( in the "Icons SVG" folder - these svgs might need to be cleaned up )
        
*   **Color.** Wildwood's existing brand colors should anchor the palette (pull from the existing logo and brand guidelines in the Drive folder). Build the palette as CSS variables so other CDS clinics can theme later without changing components.
    
*   **Type.** Modern humanist sans for body, something with character (but not novelty) for headlines. Suggested pairings if no brand font is specified: **Inter** (body) + **Fraunces** or **General Sans** (display). Confirm against any brand guideline in the Drive folder before locking.
    
*   **Motion / interactivity.** Mariana specifically called out enjoying **hover reveals and timed appearance of elements** ("when you hover, this happens"). Use subtle fade/slide-in on scroll for major sections, animated icon hovers on service cards, and a polished mobile menu transition. Don't overdo it — quality over quantity.


### Imagery direction

*   **Use real Wildwood photography wherever possible.** Elaine mentioned a folder called "Saskatoon Photoshoot" ([https://drive.google.com/drive/folders/166JRXp8eCUFG9oT4lIHKFCVKfMB0DM-K](https://drive.google.com/drive/folders/166JRXp8eCUFG9oT4lIHKFCVKfMB0DM-K)) with Wildwood-specific photos. These are dark and will need to be brightened and possibly have people added via AI tools (the team is fine with this).
    
*   **No clip-art / generic stock photos of dentistry.** That is the look they are running from.
    
*   **Operatory, lobby, team headshots** should feel like the actual Wildwood space, not a stock office.
    
*   **Localized supporting imagery** — the AI-generated Saskatoon skyline graphic the team has been using on creative should be incorporated as a background or banner element on the homepage.


INFORMATION ARCHITECTURE
------------------------

### Sitemap (proposed — refine after reviewing existing site map and team feedback)

/                                  Home

/about                             About Wildwood

  /about/our-team                  Meet the Team

  /about/our-difference            What makes us different (factual, no superlatives)

  /about/office-tour               Office Tour

  /about/technology                Technology

  /about/careers                   Join Our Team

/services                          All services (overview + filterable)

  /services/preventive             Preventive Dental Care

    /services/preventive/cleanings-checkups

    /services/preventive/sealants

    /services/preventive/fluoride

    /services/preventive/x-rays

    /services/preventive/periodontal-treatment

    /services/preventive/oral-cancer-screening

  /services/restorative            Restorative Dental Care

    /services/restorative/fillings

    /services/restorative/bridges

    /services/restorative/crowns

    /services/restorative/dentures

    /services/restorative/implants

    /services/restorative/root-canal

  /services/cosmetic               Cosmetic Dentistry

    /services/cosmetic/whitening

    /services/cosmetic/veneers

    /services/cosmetic/bonding

    /services/cosmetic/reshaping

    /services/cosmetic/crowns      (cross-linked from restorative)

    /services/cosmetic/bite-correction

  /services/oral-surgery           Oral Surgery & Other

    /services/oral-surgery/childrens-dentistry

    /services/oral-surgery/emergency-care

    /services/oral-surgery/wisdom-teeth

    /services/oral-surgery/tmj-night-guards

    /services/oral-surgery/sports-guards

    /services/oral-surgery/sleep-apnea

    /services/oral-surgery/sedation

/patients                          Patient Center (renamed from "Patient Info")

  /patients/book                   Schedule an Appointment (primary CTA destination)

  /patients/new-patients           New Patient Info + new patient Jotform

  /patients/forms                  Digital Patient Forms (existing-patient health history Jotform)

  /patients/financial-options      Financial Options

  /patients/canadiandentalcareplan                   Canadian Dental Care Plan (NEW — high priority)

  /patients/faqs                   FAQs

/learn                             Patient education hub (was "Blog" — re-frame)

  /learn/\[slug\]                    Individual articles

/contact                           Contact (form + map + hours + phone)

/privacy-policy

/accessibility-statement

/commitment-to-clean

**Navigation decisions made on the discovery call (per Kyle):**

*   **Demote the blog** from primary navigation. Surface educational content via inline CTAs on service pages, the homepage education rail, and a dropdown / footer link. Promote back to primary nav once /learn is built out.
    
*   **Group patient-facing pages** under a "Patient Info" / "Patient Center" parent (financial options, forms, FAQs, CDCP).
    
*   **Restructure the current services hierarchy** — it's cluttered. Use the four parent categories above (Preventive, Restorative, Cosmetic, Oral Surgery & Other) with cross-linking where the same procedure appears in multiple categories (crowns, implants).


### Persistent header CTA

**"Book Appointment"** — primary button, visible in header on every page, sticky on scroll. Mobile: persistent bottom-of-viewport bar with **Call** + **Book** side-by-side.

### Persistent contact info

Header strip: **306.374.7272** clickable + clinic hours summary on desktop.

ACCESSIBILITY & CANADIAN PROVINCIAL REQUIREMENTS
------------------------------------------------

*   WCAG 2.1 AA compliance throughout
    
*   Skip-to-content link
    
*   Visible keyboard focus indicators
    
*   All form fields labeled, errors announced
    
*   Alt text on all meaningful images
    
*   Color contrast verified
    
*   Reduced-motion media query respected for any motion / scroll animations
    
*   Add a /accessibility-statement page

CONTENT MIGRATION FROM EXISTING SITE
------------------------------------

Treat the live wildwooddentalclinic.com as the **content source of truth for v1**, with two caveats from the team:

1.  There are **new services Wildwood now offers** that aren't on the current site — This content should override anything on the current site.
    
    *   This spreadsheet was provided by Mariana for their services: [2026 GP Services & Treatments.csv]
        
2.  Some current copy is generic / corporate and needs a localizing rewrite. Where you find copy that could apply to any dental practice anywhere, rewrite it with a Saskatoon / Wildwood specificity. Mention the neighborhood, the doctors, the 35+ year history.

### One last thing

The single most important success criterion that won't show up in any analytics dashboard is this: when someone in Saskatoon lands on this homepage, it should feel unmistakably like Wildwood — a specific clinic on 8th Street East with specific dentists who trained at specific Saskatchewan schools — and not like one of fifty interchangeable corporate dental websites. Every design decision should be tested against that.
