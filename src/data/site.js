// Business details for Loop St. Edit here; every page reads from this file.
// status: 'verified' = checked against a live source on 29 Oct 2026, 'placeholder' = needs the owner to confirm.

export const site = {
  name: 'Loop St.',
  longName: 'Loop St. by Kraught Republique',
  afrikaansName: 'Loopstraat',
  tagline: 'Social gatherings are best when food and drinks are involved.',
  address: {
    street: '37 Loop St',
    town: 'Potchefstroom',
    postcode: '2531',
    area: 'Die Bult',
    directions:
      'The last address on your left before you enter the Fanie du Toit rugby fields of the NWU Pukke.',
    lat: -26.6937361,
    lng: 27.0981856
  },
  phone: { display: '082 571 8557', tel: '+27825718557', whatsapp: 'https://wa.me/27825718557' },
  email: 'looptherestaurant@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/looppotch/',
    facebook: 'https://www.facebook.com/LoopPotch/',
    bakery: 'https://www.instagram.com/loopcoffeebakery/'
  },
  mapsUrl: 'https://www.google.com/maps/place/Loop+St/@-26.6937361,27.0981856,17z/data=!4m6!3m5!1s0x1e96813f9b98ac13:0xd5243f97e6253b5d',
  priceRange: 'R200–300 a person',
  rules: ['No under 21s', 'Parking for about 10 cars, so carpool if you can'],
  founded: { founders: ['Riaan May', 'Mitchell Coetzee'] },
  sources: {
    address: 'Google Business Profile, Facebook page',
    phone: 'Google Business Profile, Facebook page, event posters',
    email: 'Facebook page (their older site lists info@loopstraat.com)',
    hours: 'Google Business Profile, Instagram bio',
    happyHour: 'Google Business Profile ("Happy hours 5–7 pm"), The Go-To Guy article',
    rules: 'Instagram bio (no under 21s), loop-st.web.app FAQ (parking)',
    priceRange: 'Google Business Profile (reported by 29 people)'
  }
};

// Opening hours in South African time. close '24:00' means midnight.
// Index 0 is Sunday, to match Date.getDay().
export const hours = [
  { day: 'Sunday', short: 'Sun', open: '15:00', close: '22:00' },
  { day: 'Monday', short: 'Mon', open: null, close: null },
  { day: 'Tuesday', short: 'Tue', open: '13:00', close: '24:00' },
  { day: 'Wednesday', short: 'Wed', open: '13:00', close: '24:00' },
  { day: 'Thursday', short: 'Thu', open: '13:00', close: '24:00' },
  { day: 'Friday', short: 'Fri', open: '13:00', close: '24:00' },
  { day: 'Saturday', short: 'Sat', open: '13:00', close: '24:00' }
];

// Google lists happy hour without days; we show it on every open day.
export const happyHour = { start: '17:00', end: '19:00' };

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/visit', label: 'Visit' }
];
