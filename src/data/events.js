// Events at Loop St. Add new shows to `events`; they drop off the home page by themselves once their date has passed.
// Dates are South African time. `photo` is a slug from src/data/photos.js; `poster` (optional) is a path in /public.
//
// status: 'verified'    checked against Loop St.'s own posts on 29 Oct 2026
//         'partial'     the night exists (named on Loop St.'s Instagram) but the details are placeholders
//         'placeholder' invented wording for the owner to replace

export const events = [
  {
    id: 'frank-freeman-schwabie',
    title: 'Frank Freeman & Schwabie',
    kind: 'Loop live music',
    date: '2026-10-29',
    start: '19:00',
    price: 'R150',
    tickets: 'Tickets at the door',
    blurb:
      'Raw energy meets good soul music. Frank Freeman opens with his alternative rock before Schwabie takes the stage.',
    photo: 'two-guitars',
    status: 'verified',
    source: 'Loop St. Facebook and Instagram post, 14 Oct 2026 ("Loop Live Music", Do 29 Oktober 2026, 19:00, R150, kaartjies by die deur)'
  },
  {
    id: 'neil-sandilands',
    title: 'Neil Sandilands with Jaco Mans',
    kind: 'Friday the 13th',
    date: '2026-11-13',
    start: '19:30',
    price: 'R230',
    tickets: 'Book on 082 571 8557, limited seating',
    blurb: 'A Friday-the-13th night at Loopstraat. Seats are limited, so book early.',
    photo: 'stage-lamp',
    status: 'verified',
    source: 'Poster shared with Loop St. on Instagram by @realsandilands, 28 Oct 2026 (13 November 2026, 7.30PM, R230, kaartjies 082 571 8557, beperkte sitplek)'
  }
];

export const regulars = [
  {
    id: 'live-music',
    title: 'Live music',
    when: 'Most Thursdays',
    blurb: 'Acoustic sets and bands on the courtyard stage. Line-ups go up on Instagram first.',
    photo: 'duo-closeup',
    status: 'partial',
    source: '"Live Music Thursday" posts on Facebook; recent shows on Thursdays (27 Aug, 29 Oct 2026). The weekly rhythm is not confirmed.'
  },
  {
    id: 'pizza-thursdays',
    title: 'Pizza Thursdays',
    when: 'Thursdays',
    blurb: 'Pizza on Thursdays. Ask us what is on the board this week.',
    photo: 'white-wine-table',
    status: 'partial',
    source: '"Pizza Thursdays" highlight on Loop St. Instagram. The offer and price are placeholders.'
  },
  {
    id: 'quiz-night',
    title: 'Loop quiz night',
    when: 'Wednesdays at 19:00, when announced',
    blurb: 'Bring a team and play for prizes. WhatsApp 082 571 8557 to book a table.',
    photo: 'listening',
    status: 'partial',
    source: 'Quiz night poster, Instagram 2 Sep 2026 (Wednesday, 19:00, WhatsApp to book). How often it runs is not confirmed.'
  },
  {
    id: 'ladies-night',
    title: 'Ladies night',
    when: 'Dates on Instagram',
    blurb: 'Watch Instagram for the next ladies night.',
    photo: 'front-row',
    status: 'partial',
    source: '"Ladies Night" highlight on Loop St. Instagram. Day and offer are placeholders.'
  }
];

// Recent shows, for the events page. Newest first.
export const pastEvents = [
  { title: 'Loop quiz night', date: '2026-09-02', source: 'Instagram poster' },
  { title: 'Acoustic evening with Landré', date: '2026-08-27', source: 'Instagram poster' },
  { title: 'Valiant Swart & Illmar Neitz', date: '2025-11-08', note: 'R249', source: 'Instagram post' },
  { title: 'Jan Blohm: Breyten se Brief', date: null, note: 'Sold out', source: 'Loop St. film (the hero video)' }
];

// Private functions Loop St. hosts, from The Go-To Guy article (19 Apr 2025).
export const functions = [
  'Birthday celebrations',
  'Corporate functions',
  'Private dinner parties',
  'Sports team gatherings',
  'Networking evenings',
  'Creative workshops'
];
