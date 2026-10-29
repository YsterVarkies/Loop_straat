// Specials at Loop St. Prices in rand; null means no price is known.
// The blackboard groups are copied from chalkboards in Loop St.'s own photos (2025), so mark them as
// "last chalked up" until the owner confirms today's board.

export const specials = [
  {
    id: 'happy-hour',
    title: 'Happy hour',
    note: 'Every open day',
    items: [
      {
        name: 'Happy hour',
        price: null,
        priceLabel: '17:00–19:00',
        description: 'Ask at the bar for this week’s happy-hour drinks.',
        status: 'partial',
        source: 'Time from Google Business Profile and The Go-To Guy. The drinks on offer are a placeholder.'
      }
    ]
  },
  {
    id: 'beer-board',
    title: 'On the beer board',
    note: 'As last chalked up',
    items: [
      { name: 'Loop Lager', price: 55 },
      { name: 'Leffe', price: 70 },
      { name: 'Hoegaarden', price: 70 },
      { name: 'Erdinger Dunkel', price: 72 },
      { name: 'La Chouffe', price: 76 },
      { name: 'Cherry Chouffe', price: 92 }
    ],
    status: 'photo',
    source: 'Beer blackboard in a Loop St. Instagram photo (media/567419549…jpg).'
  },
  {
    id: 'drink-of-the-day',
    title: 'Drink of the day',
    note: 'Changes daily',
    items: [{ name: 'Cucumber gimlet', price: 80, description: 'The last drink of the day we saw on the board.' }],
    status: 'photo',
    source: '"Drink of the day" board behind the bar (media/358151278…png).'
  },
  {
    id: 'sweet-treats',
    title: 'Sweet treats board',
    note: 'As last chalked up',
    items: [
      { name: 'Sourdough bread pudding', price: 60 },
      { name: 'Brownie & ice cream', price: 65 },
      { name: 'Caramel cheesecake', price: null },
      { name: 'Feta & olive platter for two', price: null }
    ],
    status: 'photo',
    source: 'Chalkboards on the bench in a Loop St. Instagram photo (media/566249105…jpg). Cheesecake and platter prices are cut off.'
  },
  {
    id: 'weekly',
    title: 'Every week',
    note: 'Details on Instagram',
    items: [
      { name: 'Pizza Thursdays', price: null, priceLabel: 'Thursdays' },
      { name: 'Ladies night', price: null, priceLabel: 'See Instagram' }
    ],
    status: 'partial',
    source: 'Instagram highlights "Pizza Thursdays" and "Ladies Night". Offers are placeholders.'
  }
];
