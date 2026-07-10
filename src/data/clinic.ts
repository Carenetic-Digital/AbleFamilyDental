/** Canonical clinic contact details — keep hours/phones/address in sync sitewide. */
export const clinic = {
  name: 'Able Family Dental',
  phoneDisplay: '403.327.7202',
  phoneTel: '+14033277202',
  phoneSchema: '+1-403-327-7202',
  tollFreeDisplay: '1.877.627.7202',
  tollFreeTel: '+18776277202',
  email: 'reception@ablefamilydental.com',
  streetAddress: '511 5th Street South',
  city: 'Lethbridge',
  region: 'Alberta',
  regionAbbr: 'AB',
  country: 'CA',
  hoursNote:
    '*Saturdays available by appointment only. Call to inquire about which Saturdays we are open.',
  hours: [
    { day: 'Monday', hours: '8:00 am – 5:00 pm' },
    { day: 'Tuesday', hours: '8:00 am – 6:00 pm' },
    { day: 'Wednesday', hours: '7:00 am – 5:00 pm' },
    { day: 'Thursday', hours: '8:00 am – 6:00 pm' },
    { day: 'Friday', hours: '8:00 am – 5:00 pm' },
    { day: 'Saturday', hours: '9:00 am – 2:00 pm*' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  /** Compact header utility-bar summary */
  hoursSummary: 'Mon–Fri from 7:00 am · Sat by appointment',
} as const;

export const openingHoursSpecification = [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '08:00', closes: '17:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '08:00', closes: '18:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '07:00', closes: '17:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '08:00', closes: '18:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '08:00', closes: '17:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
];
