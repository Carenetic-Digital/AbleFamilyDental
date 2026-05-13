# Sitemap

Per the discovery call, the current Wildwood site's flat structure is being restructured into four parent service categories with grouped patient pages and an education hub. Source: `intake-raw/intake-raw.md`.

## Your Sitemap

- Home (/)
- About (/about)
  - Meet the Team (/about/our-team)
  - Our Difference (/about/our-difference)
  - Office Tour (/about/office-tour)
  - Technology (/about/technology)
  - Join Our Team (/about/careers)
- Services (/services)
  - Preventive Dental Care (/services/preventive)
    - Cleanings & Check-ups (/services/preventive/cleanings-checkups)
    - Sealants (/services/preventive/sealants)
    - Fluoride (/services/preventive/fluoride)
    - X-Rays & 3D Imaging (/services/preventive/x-rays)
    - Periodontal Treatment (/services/preventive/periodontal-treatment)
    - Oral Cancer Screening (/services/preventive/oral-cancer-screening)
  - Restorative Dental Care (/services/restorative)
    - Fillings (/services/restorative/fillings)
    - Bridges (/services/restorative/bridges)
    - Crowns (/services/restorative/crowns)
    - Dentures (/services/restorative/dentures)
    - Implants (/services/restorative/implants)
    - Root Canal Treatment (/services/restorative/root-canal)
  - Cosmetic Dentistry (/services/cosmetic)
    - Teeth Whitening (/services/cosmetic/whitening)
    - Porcelain Veneers (/services/cosmetic/veneers)
    - Dental Bonding (/services/cosmetic/bonding)
    - Tooth Reshaping (/services/cosmetic/reshaping)
    - Crowns (cross-linked from Restorative) (/services/cosmetic/crowns)
    - Bite Correction (/services/cosmetic/bite-correction)
    - Invisalign & Clear Aligners (/services/cosmetic/invisalign)
  - Oral Surgery & Other (/services/oral-surgery)
    - Children's Dentistry (/services/oral-surgery/childrens-dentistry)
    - Emergency Dental Care (/services/oral-surgery/emergency-care)
    - Wisdom Tooth Extraction (/services/oral-surgery/wisdom-teeth)
    - TMJ Treatment & Night Guards (/services/oral-surgery/tmj-night-guards)
    - Sports Guards (/services/oral-surgery/sports-guards)
    - Snoring & Sleep Apnea (/services/oral-surgery/sleep-apnea)
    - Sedation Dentistry (/services/oral-surgery/sedation)
- Patient Center (/patients)
  - Schedule an Appointment (/patients/book)
  - New Patient Info (/patients/new-patients)
  - Digital Patient Forms (/patients/forms)
  - Financial Options (/patients/financial-options)
  - Canadian Dental Care Plan (/patients/canadiandentalcareplan)
  - FAQs (/patients/faqs)
- Learn (/learn)
  - Article template (/learn/[slug])
- Contact (/contact)
- Privacy Policy (/privacy-policy)
- Accessibility Statement (/accessibility-statement)
- Commitment to Clean (/commitment-to-clean)

## Navigation Decisions (from discovery)

- **Demote the blog** from primary navigation. Surface educational content via inline CTAs on service pages, a homepage education rail, and footer link. Promote `/learn` back to primary nav once it has real depth.
- **Group patient-facing pages** under "Patient Center" (financial options, forms, FAQs, CDCP, new patient info).
- **Restructure services** into the four parent categories above, cross-linking where the same procedure lives in more than one (e.g. crowns, implants, gum contouring).
- **Persistent "Book Appointment" CTA** in the header on every page, sticky on scroll. Mobile: persistent bottom bar with **Call** + **Book** side-by-side.

## Redirects from Current Site

The existing WordPress URL structure is flat (e.g. `/dental-implants/`, `/teeth-whitening/`). Map each legacy URL in `public/_redirects` to its new nested path during the `/generate-pages` phase. Legacy URLs to redirect are listed in the live sitemap and the page list pulled during `/intake`.
