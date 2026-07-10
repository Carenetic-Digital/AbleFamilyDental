# Sitemap

Revised sitemap based on client-provided `revised_sitemap.md`. Supersedes the original discovery-call structure.

Services expanded from 4 to 11 top-level categories. Patient section split into New Patients and Existing Patients. Blog & News moved under About. Legacy WordPress redirects updated to match new paths.

## URL Structure

- Home (`/`)
- About Us (`/about`)
  - Our Clinic (`/about/our-clinic`)
  - Our Team (`/about/our-team`)
  - Careers (`/about/careers`)
  - Blog & News (`/blog`)
    - Article (`/blog/[slug]`)
- Services (`/services`)
  - Emergency Services (`/services/emergency`)
    - Emergency Appointments (`/services/emergency/appointments`)
    - Same-Day Emergency Appointments (`/services/emergency/same-day`)
    - Toothache Relief (`/services/emergency/toothache`)
    - Broken/Chipped Tooth Emergency Repair (`/services/emergency/broken-tooth`)
    - Knocked-Out Tooth Treatment (`/services/emergency/knocked-out-tooth`)
  - Preventive Dentistry (`/services/preventive`)
    - Fluoride Treatments (`/services/preventive/fluoride`)
    - Routine Cleanings & Exams (`/services/preventive/cleanings-exams`)
    - Dental Sealants (`/services/preventive/sealants`)
    - Night Guards & Mouthguards (`/services/preventive/guards`)
    - Patient Comfort Techniques (`/services/preventive/comfort`)
  - Diagnostic Services (`/services/diagnostic`)
    - X-Rays & 3D Imaging (`/services/diagnostic/x-rays`) — includes CBCT / 3D imaging content
    - Intraoral Cameras (`/services/diagnostic/intraoral-cameras`)
    - Oral Cancer Screenings (`/services/diagnostic/oral-cancer-screening`)
  - Children's Dentistry (`/services/childrens`)
    - Children's Dental Exams & Cleanings (`/services/childrens/exams-cleanings`)
    - Infant Oral Care — First Visit by Age 1 (`/services/childrens/infant-oral-care`)
    - Child Comfort Techniques (`/services/childrens/comfort`)
    - Fluoride Treatments (`/services/childrens/fluoride`)
    - Dental Sealants (`/services/childrens/sealants`)
    - X-Rays & Imaging (`/services/childrens/x-rays`)
    - Space Maintainers (`/services/childrens/space-maintainers`)
  - Orthodontics (`/services/orthodontics`)
    - Invisalign® Clear Aligners (`/services/orthodontics/invisalign`) ← canonical Invisalign page; cross-linked from Cosmetic
    - Invisalign, Retainers & Braces (`/services/orthodontics/retainers-braces`)
  - Restorative (`/services/restorative`)
    - Tooth-Colored Fillings (`/services/restorative/fillings`)
    - Crowns & Bridges (`/services/restorative/crowns-bridges`)
    - Inlays & Onlays (`/services/restorative/inlays-onlays`)
  - Prosthodontic Care — Tooth Replacement & Smile Restoration (`/services/prosthodontics`)
    - Crowns & Bridges (`/services/prosthodontics/crowns-bridges`)
    - Full & Partial Dentures (`/services/prosthodontics/dentures`)
    - Implant-Supported Restorations (`/services/prosthodontics/implant-restorations`)
    - Inlays & Onlays (`/services/prosthodontics/inlays-onlays`)
    - Replacing Worn Dental Work (`/services/prosthodontics/replacement`)
  - Oral Surgery (`/services/oral-surgery`)
    - Extractions (`/services/oral-surgery/extractions`)
    - Wisdom Tooth Extraction (`/services/oral-surgery/wisdom-teeth`)
    - Dental Implants — Single & Multiple (`/services/oral-surgery/implants`)
  - Periodontal (Gum) Care (`/services/periodontal`)
    - Gum Disease Treatment (`/services/periodontal/gum-disease`)
  - Endodontic Services (`/services/endodontics`)
    - Root Canal Treatment (`/services/endodontics/root-canal`)
    - Treatment of Traumatic Dental Injuries (`/services/endodontics/traumatic-injuries`)
    - Cracked Tooth Treatment (`/services/endodontics/cracked-tooth`)
    - Internal Tooth Bleaching (`/services/endodontics/internal-bleaching`)
  - Cosmetic Dentistry (`/services/cosmetic`)
    - Teeth Whitening (`/services/cosmetic/whitening`)
    - Porcelain Veneers (`/services/cosmetic/veneers`)
    - Smile Makeovers (`/services/cosmetic/smile-makeovers`)
    - Dental Bonding (`/services/cosmetic/bonding`)
    - Invisalign & Clear Aligners → cross-link to `/services/orthodontics/invisalign`
  - IVS (Sedation) (`/services/ivs`)
    - Relaxation Dentistry for Nervous Patients (`/services/ivs/relaxation`)
    - Sedation Options for Sensitive Teeth or Gag Reflex (`/services/ivs/sensitive-teeth`)
    - Stress-Free Dental Visits with IV Sedation (`/services/ivs/stress-free`)
    - Monitoring and Safe Sedation Care (`/services/ivs/monitoring`)
  - TMJ & Jaw (`/services/tmj`)
    - TMJ Diagnosis (`/services/tmj/diagnosis`)
    - Botulinum Toxin for Jaw Pain (`/services/tmj/botox`)
    - Night Guards (`/services/tmj/night-guards`)
    - Bite Correction (`/services/tmj/bite-correction`)
- New Patients (`/new-patients`)
  - What to Expect (`/new-patients/what-to-expect`)
  - Patient Forms (`/new-patients/forms`)
  - Online Booking (`/book`)
  - Insurance & Payment (`/new-patients/insurance-payment`)
- Existing Patients (`/existing-patients`)
  - Request an Appointment (`/book`)
  - Post-Visit Instructions (`/existing-patients/post-visit`)
- Contact Us (`/contact`)
- Book Appointment (`/book`)
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)

## Navigation Structure

**Primary nav:** About Us | Services (mega-menu) | New Patients | Existing Patients | Contact Us | **Book Appointment** (gold CTA)

Services mega-menu lists all 11 categories. Each category links to its hub page; sub-pages are surfaced within hub pages, not in nav.

**Footer columns:** Services | Quick Links (Home, About, New Patients, Contact, Book) | Doctor Bios | Privacy Policy · Terms of Service · Accessibility

**Social links in footer:** Facebook, Instagram, YouTube, Google, Yelp

## Cross-Link Notes

- **Invisalign** — canonical page at `/services/orthodontics/invisalign`. Cosmetic Dentistry hub cross-links to it rather than hosting a duplicate.
- **Fluoride / Sealants** — appear in both Preventive and Children's. Separate pages per category (context differs); no redirect needed.

## Redirects from WordPress (legacy flat URLs)

| From (old) | To (new) |
|---|---|
| `/about-us/` | `/about` |
| `/meet-the-team/` | `/about/our-team` |
| `/our-difference/` | `/about/our-clinic` |
| `/office-tour/` | `/about/our-clinic` |
| `/dental-technology/` | `/about/our-clinic` |
| `/join-our-team/` | `/about/careers` |
| `/dental-services/` | `/services` |
| `/preventive-dental-care/` | `/services/preventive` |
| `/dental-cleanings-and-checkups/` | `/services/preventive/cleanings-exams` |
| `/dental-sealants/` | `/services/preventive/sealants` |
| `/fluoride-treatment/` | `/services/preventive/fluoride` |
| `/diagnostic-imaging-digital-x-rays/` | `/services/diagnostic/x-rays` |
| `/periodontal-gum-disease-treatment/` | `/services/periodontal/gum-disease` |
| `/oral-cancer-screening/` | `/services/diagnostic/oral-cancer-screening` |
| `/restorative-dental-care/` | `/services/restorative` |
| `/dental-fillings/` | `/services/restorative/fillings` |
| `/dental-bridges/` | `/services/restorative/crowns-bridges` |
| `/dental-crowns/` | `/services/restorative/crowns-bridges` |
| `/ceramic-crowns/` | `/services/restorative/crowns-bridges` |
| `/full-and-partial-dentures/` | `/services/prosthodontics/dentures` |
| `/dental-implants/` | `/services/oral-surgery/implants` |
| `/root-canal-treatment/` | `/services/endodontics/root-canal` |
| `/cosmetic-dentistry/` | `/services/cosmetic` |
| `/teeth-whitening/` | `/services/cosmetic/whitening` |
| `/porcelain-veneers/` | `/services/cosmetic/veneers` |
| `/dental-bonding/` | `/services/cosmetic/bonding` |
| `/tooth-reshaping-and-contouring/` | `/services/cosmetic` |
| `/bite-correction/` | `/services/tmj/bite-correction` |
| `/invisalign/` | `/services/orthodontics/invisalign` |
| `/oral-surgery-and-other/` | `/services/oral-surgery` |
| `/dental-care-for-children/` | `/services/childrens` |
| `/emergency-dental-care/` | `/services/emergency` |
| `/wisdom-tooth-extraction/` | `/services/oral-surgery/wisdom-teeth` |
| `/tmj-tmjd-treatment-and-night-guards/` | `/services/tmj` |
| `/mouth-and-sports-guards/` | `/services/preventive/guards` |
| `/snoring-and-sleep-apnea-treatment/` | `/services/tmj` |
| `/sedation-dentistry/` | `/services/preventive/comfort` |
| `/schedule-a-dental-appointment/` | `/book` |
| `/patient-forms/` | `/new-patients/forms` |
| `/digital-patient-forms/` | `/new-patients/forms` |
| `/financial-options/` | `/new-patients/insurance-payment` |
| `/faqs/` | `/new-patients` |
| `/covid-form/` | `/new-patients/forms` |
| `/privacy-policy/` | `/privacy` |
| `/blog/` | `/blog` |
