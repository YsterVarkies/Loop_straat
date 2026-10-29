// Alt text, captions, gallery groups and crop focus (CSS object-position) for every photo in /Media.
// Sizes and widths are generated into media.json by `npm run media`.
import media from './media.json';

const info = {
  'the-bar': {
    alt: 'The bar at Loop St. under timber beams, licence plates and woven pendant lamps',
    caption: 'The bar',
    group: 'The place'
  },
  'the-tree': { alt: 'Guests on the deck under the big tree at dusk', caption: 'The tree at dusk', group: 'The place' },
  'the-steps': {
    alt: 'Lamp-lit brick steps leading up to the open front door at night',
    caption: 'The steps up to number 37',
    group: 'The place'
  },
  'courtyard-beer-board': {
    alt: 'The courtyard at dusk with festoon lights, plants and the beer blackboard',
    caption: 'The courtyard and the beer board',
    group: 'The place'
  },
  'bar-red-wine': {
    alt: 'A glass of red wine and a bottle of Creation Merlot on the bar',
    caption: 'A red at the bar',
    group: 'Food & drink'
  },
  'bar-at-night': {
    alt: 'Friends at the bar under red shelf lights and hanging lamps',
    caption: 'The bar after dark',
    group: 'The place'
  },
  'courtyard-function': {
    focus: '40% 55%',
    alt: 'A function in the courtyard under red and white festoon lights, with the Loop logo on the wall',
    caption: 'A private function in the courtyard',
    group: 'Nights'
  },
  'white-wine-table': {
    focus: '30% 50%',
    alt: 'A bottle of Van Loveren Chenin Blanc and a glass on a candlelit table',
    caption: 'Chenin by candlelight',
    group: 'Food & drink'
  },
  'tree-acoustic-set': {
    focus: '40% 60%',
    alt: 'A guitarist playing under the green-lit tree while guests eat by candlelight',
    caption: 'An acoustic set under the tree',
    group: 'Music'
  },
  'deck-applause': {
    focus: '50% 60%',
    alt: 'A full deck of guests applauding by candlelight under the thatched roof',
    caption: 'Applause on the deck',
    group: 'Nights'
  },
  'stage-lamp': {
    focus: '45% 55%',
    alt: 'A singer with an acoustic guitar on the courtyard stage beside a standing lamp',
    caption: 'The courtyard stage',
    group: 'Music'
  },
  'courtyard-guitarist': {
    alt: 'A guitarist in a pale suit playing to a candlelit courtyard full of guests',
    caption: 'A full courtyard',
    group: 'Music'
  },
  'accordion-duo': {
    focus: '45% 50%',
    alt: 'An accordion and guitar duo performing in red stage light',
    caption: 'Accordion and guitar',
    group: 'Music'
  },
  'sweet-treats-board': {
    focus: '50% 45%',
    alt: 'A guest on a bench beside the sweet treats and feta platter blackboards',
    caption: 'The sweet treats board',
    group: 'Food & drink'
  },
  'after-the-show': {
    focus: '50% 40%',
    alt: 'Five people with their arms around each other under the tree after a show',
    caption: 'After the show',
    group: 'Nights'
  },
  'two-guitars': {
    focus: '45% 50%',
    alt: 'Two guitarists playing in front of a hanging rug on the courtyard stage',
    caption: 'Two guitars and a rug',
    group: 'Music'
  },
  listening: {
    focus: '35% 40%',
    alt: 'Guests at tables on the deck, listening to a set',
    caption: 'Listening on the deck',
    group: 'Nights'
  },
  'duo-closeup': {
    focus: '30% 40%',
    alt: 'A singer with a tambourine and a guitarist singing into microphones',
    caption: 'Mid-song',
    group: 'Music'
  },
  'beer-board': {
    focus: '78% 38%',
    alt: 'Two guests by the brick braai beside the beer blackboard listing Loop Lager, Leffe, Hoegaarden and Chouffe',
    caption: 'The beer board by the braai',
    group: 'Food & drink'
  },
  photographer: {
    alt: 'A photographer checking a camera during a show',
    caption: 'Behind the camera',
    group: 'Nights'
  },
  'front-row': {
    focus: '50% 35%',
    alt: 'Three guests smiling in the front row during a show',
    caption: 'The front row',
    group: 'Nights'
  }
};

export const photos = Object.fromEntries(
  Object.entries(info).map(([slug, data]) => [slug, { slug, ...data, ...media[slug] }])
);

export const photo = slug => photos[slug];

export const galleryOrder = [
  'tree-acoustic-set',
  'the-steps',
  'deck-applause',
  'beer-board',
  'accordion-duo',
  'the-bar',
  'courtyard-guitarist',
  'sweet-treats-board',
  'two-guitars',
  'bar-at-night',
  'duo-closeup',
  'the-tree',
  'courtyard-function',
  'white-wine-table',
  'stage-lamp',
  'listening',
  'after-the-show',
  'bar-red-wine',
  'front-row',
  'photographer',
  'courtyard-beer-board'
];
