// The Loop St. menu, by category. Prices in rand.
//
// Source: the menu on Loop St.'s Google Business Profile, read on 29 Oct 2026.
// Beer prices come from the beer blackboard in a photo on Loop St.'s Instagram (2025), so they may have moved.
// price: null means Google lists the item without a price; the page shows "Ask us" for those.
// tags: 'vegan', 'vegetarian', 'gluten free' come from the menu's own (vegan), (v) and (gf) marks.
// hidden: true keeps an item in the file without showing it (older items Google still lists).

export const menu = [
  {
    id: 'burgers',
    title: 'Burgers & sandwiches',
    kind: 'food',
    items: [
      {
        name: 'Kudu cheese burger',
        price: 149,
        description:
          'Homemade kudu patty on a bun with cheese, caramelised onions, pickles, tomato, guacamole and a tangy dressing.'
      },
      {
        name: 'Mushroom & fig burger',
        price: 149,
        description: 'Homemade kudu patty on a bun with cheese, mushroom sauce and preserved figs.'
      },
      {
        name: 'Black bean burger',
        price: 132,
        description:
          'Homemade vegan bean patty on a bun with caramelised onions, pickles, tomato, guacamole and a vegan mayo dressing.',
        tags: ['vegan']
      },
      {
        name: 'Crispy chicken burger',
        price: 149,
        description:
          'Crispy chicken fillet on a bun with cheese, mayo-mustard coleslaw, lettuce, tomato and guacamole.'
      },
      {
        name: 'The dirty Hamburg',
        price: 95,
        description:
          'Asian-style pulled pork belly and fresh cabbage on a bun. Go XL: 200g pulled pork belly and cabbage on a toasted ciabatta.'
      },
      {
        name: 'Pesto, sun-dried tomato & feta toasty',
        price: 110,
        description: 'Sourdough, Danish feta, sun-dried tomato and basil pesto.',
        tags: ['vegetarian']
      },
      {
        name: 'Loaded burger bowl',
        price: 149,
        description:
          'The burger without the bun: kudu cheese or vegan bean patty on greens with caramelised onions, achar, salsa, guacamole, sweet potato fries and mustard-mayo. Skip the chips for gluten free.'
      }
    ]
  },
  {
    id: 'tacos',
    title: 'Nachos & Loop-style tacos',
    kind: 'food',
    items: [
      {
        name: 'Nachos',
        price: 120,
        description:
          'Smoky black beans, BBQ smoked chicken or pork belly, under melted cheese with fresh salsa, guacamole and spicy sour cream.',
        tags: ['gluten free']
      },
      {
        name: 'Big Mac taco',
        price: 130,
        description: 'Flour tortillas with our homemade kudu patty, cheese, pickles, cabbage, guacamole and Big Mac sauce.'
      },
      {
        name: 'Pork belly taco',
        price: 135,
        description:
          'Flour tortillas with Asian-style pulled pork belly, cabbage, roasted pineapple, fresh salsa and spicy sour cream.'
      },
      {
        name: 'Steak taco',
        price: 150,
        description: 'Flour tortillas with steak strips, fresh salsa, sour cream, guacamole and chimichurri dressing.'
      },
      {
        name: 'Chicken taco',
        price: 130,
        description: 'Flour tortillas with BBQ smoked chicken, fresh salsa, sour cream, guacamole and cilantro dressing.'
      },
      {
        name: 'Black bean & zesty salsa taco',
        price: 120,
        description: 'Flour tortillas with smoky black beans, fresh salsa, guacamole and cilantro dressing.',
        tags: ['vegan']
      }
    ]
  },
  {
    id: 'snacks',
    title: 'Snack shack',
    kind: 'food',
    items: [
      {
        name: 'Snack board for two',
        price: 250,
        description:
          'Smoked cheese wors, chicken strips, steak with chimichurri, local halloumi and feta, sweet potato fries, pita and sourdough with whipped feta and dips. R500 for four.'
      },
      {
        name: 'Loaded fries',
        price: 75,
        description:
          'Small-plate fries under cheese sauce and cilantro dressing, with BBQ smoked chicken, pork belly and jalapeño, or cheese and jalapeño.'
      },
      {
        name: 'Fries',
        price: 49,
        description: "Potato fries, hand-cut sweet potato fries or Nelly's hand-cut potato fries, with a dip."
      },
      {
        name: 'Corn chips, salsa & guacamole',
        price: 65,
        description: 'Gluten-free corn chips with fresh salsa and guacamole.',
        tags: ['gluten free']
      },
      {
        name: 'Smoked cheese wors & fries',
        price: 70,
        description: 'Our own smoked cheese wors bites with sweet potato fries and a dip.'
      },
      {
        name: 'Chicken strips',
        price: 75,
        description: 'Freshly crumbed and fried, or grilled, with sriracha mayo.'
      },
      {
        name: 'Jalapeño poppers',
        price: 59,
        description: 'Two jalapeños filled with cream cheese and dates, crumbed and fried.'
      },
      { name: 'Halloumi & hot honey', price: 60, description: 'Fried halloumi with a hot honey drizzle.' }
    ]
  },
  {
    id: 'specialities',
    title: 'Specialities',
    kind: 'food',
    note: 'Listed without prices, so ask us what is on today.',
    items: [
      { name: 'Beef & vegetable soup', price: null, description: 'With sourdough.' },
      { name: 'Pork chops', price: null, description: 'With mash or chips, and sauerkraut.' },
      { name: 'Beef short rib', price: null, description: 'With rice or mash.' }
    ]
  },
  {
    id: 'sweet',
    title: 'Something sweet',
    kind: 'food',
    items: [
      { name: 'Pecan & maple Danish with ice cream', price: 65 },
      { name: 'Warm chocolate brownie', price: 65, description: 'With ice cream and chocolate ganache.' },
      { name: 'Affogato al caffè', price: 65 },
      { name: 'Whipped Elephant', price: 65 }
    ]
  },
  {
    id: 'extras',
    title: 'Extras',
    kind: 'food',
    items: [
      { name: 'Fried egg', price: 15 },
      { name: 'Halloumi', price: 20 },
      { name: 'Jalapeños', price: 15 },
      { name: 'Sourdough slice', price: 20 },
      { name: 'Side salad', price: 30 },
      { name: 'Table salad for two', price: 60 },
      { name: 'Guacamole', price: 25 },
      { name: 'Thai peanut sauce', price: 25 },
      { name: 'Cheese sauce', price: 20 },
      { name: 'Chimichurri', price: 20 },
      { name: 'Mushroom sauce', price: 20 },
      { name: 'Sour cream', price: 20 },
      { name: 'Chocolate ganache', price: 20 }
    ]
  },
  {
    id: 'cocktails',
    title: 'House cocktails',
    kind: 'drinks',
    items: [
      { name: 'Sour Son', price: 90, description: 'Suncamino floral rum, simple syrup, fresh lime.' },
      { name: 'El Diablo', price: 90, description: 'Tequila, crème de cassis, ginger ale, fresh lime.' },
      { name: 'Espresso martini', price: 95, description: 'Freshly brewed espresso, vodka, Kahlúa, simple syrup.' },
      { name: 'Dry Camino', price: 85, description: 'Suncamino floral rum, triple sec, dry lemon, bitters, lime.' },
      { name: 'Loop cooler', price: 80, description: 'Bombay dry gin, vermouth, pink tonic, cucumber, mint.' },
      {
        name: 'Bourbon renewal',
        price: 80,
        description: 'Woodford Reserve, crème de cassis, fresh lemon, simple syrup, bitters.'
      },
      {
        name: 'Camino mojito',
        price: 95,
        description: 'Suncamino floral rum, fresh lime, mint, simple syrup, soda water.'
      }
    ]
  },
  {
    id: 'mocktails',
    title: 'Mocktails',
    kind: 'drinks',
    items: [
      { name: 'Mahala mule', price: 85, description: 'Mahala botanical, ginger ale, lime.' },
      { name: "Mahala bee's knees", price: 90, description: 'Mahala botanical, honey, soda water, fresh orange.' },
      { name: 'M&T', price: 85, description: 'Mahala botanical, pink tonic, lemon zest, rosemary.' },
      { name: 'Virgin mojito', price: 80, description: 'Soda water, mint, simple syrup, lime.' }
    ]
  },
  {
    id: 'beer',
    title: 'Beer & cider',
    kind: 'drinks',
    note: 'Beer prices as chalked on the blackboard; the board has the day’s list.',
    items: [
      { name: 'Loop Lager', price: 55, source: 'blackboard' },
      { name: 'Leffe', price: 70, source: 'blackboard' },
      { name: 'Hoegaarden', price: 70, source: 'blackboard' },
      { name: 'Erdinger Dunkel', price: 72, source: 'blackboard' },
      { name: 'La Chouffe', price: 76, source: 'blackboard' },
      { name: 'Cherry Chouffe', price: 92, source: 'blackboard' },
      { name: 'Corona', price: null },
      { name: 'Bitburger alcohol-free', price: null },
      { name: 'Savanna Dry', price: null },
      { name: 'Savanna Light', price: null },
      { name: 'Rekorderlig', price: null }
    ]
  },
  {
    id: 'wine',
    title: 'Wine by the bottle',
    kind: 'drinks',
    note: 'Ask for the red wine list.',
    items: [
      { name: 'Kleine Zalze Vineyard Selection Sauvignon Blanc', price: 260 },
      { name: 'Kleine Zalze Cellar Selection Sauvignon Blanc', price: 170 },
      { name: 'Tokara Sauvignon Blanc', price: 190 },
      { name: 'Benguela Cove Chardonnay', price: 490 },
      { name: 'Babylonstoren Viognier', price: 280 },
      { name: 'Boschendal Blanc de Noir', price: 165 },
      { name: 'Delheim Pinotage Rosé', price: 180 }
    ]
  },
  {
    id: 'rum',
    title: 'Rum',
    kind: 'drinks',
    note: 'Per single shot.',
    items: [
      { name: 'Suncamino Floral Rum', price: 35 },
      { name: 'Kraken', price: 32 },
      { name: 'Redemption Rum', price: 38 },
      { name: 'Don Papa', price: 42 },
      { name: 'Elephantom', price: 35 },
      { name: 'Afrikaanis', price: 40 },
      { name: 'Bumbu Original', price: 48 },
      { name: 'Diplomático Reserva Exclusiva', price: 58 },
      { name: 'Goldsmith Rum', price: 74 },
      { name: 'Pacto Navío Cuba', price: 95 },
      { name: 'Santa Teresa 1796', price: 98 },
      { name: 'Diplomático Single Vintage 2005', price: 135 },
      { name: 'Captain Morgan Dark', price: 24 },
      { name: 'Captain Morgan Spiced', price: 24 },
      { name: 'Red Heart Dark', price: 24 }
    ]
  },
  {
    id: 'brandy',
    title: 'Brandy & cognac',
    kind: 'drinks',
    note: 'Per single shot.',
    items: [
      { name: 'Klipdrift Premium', price: 24 },
      { name: 'KWV 5', price: 24 },
      { name: 'KWV 10', price: 29 },
      { name: 'Brandefyn', price: 30 },
      { name: 'KWV 12', price: 42 },
      { name: 'Hennessy VS', price: 49 },
      { name: 'Hennessy VSOP', price: 82 },
      { name: 'Martell Blue Swift', price: 88 },
      { name: 'KWV 20', price: 130 }
    ]
  },
  {
    id: 'hot',
    title: 'Hot drinks',
    kind: 'drinks',
    items: [
      { name: 'Cappuccino', price: null },
      { name: 'Espresso', price: null },
      { name: 'Hot chocolate', price: null },
      { name: 'Golden latte', price: null, description: 'Turmeric, cinnamon and ginger.' },
      { name: 'Rooibos tea', price: null },
      { name: 'Citrus chai rooibos', price: null },
      { name: 'Ceylon tea', price: null },
      { name: 'Earl Grey tea', price: null },
      { name: 'Glühwein', price: null, description: 'Mulled wine with cinnamon and citrus, in season.' }
    ]
  },
  {
    // Older menu items Google still lists without prices. Kept for reference, not shown.
    id: 'older',
    title: 'Older menu',
    kind: 'food',
    hidden: true,
    items: [
      { name: 'Dirty loaded fries', price: null },
      { name: 'The Dirty Rotterdam', price: null },
      { name: 'Grilled feta cheese', price: null },
      { name: 'Quesadilla', price: null },
      { name: 'Black bean & avocado quesadilla', price: null }
    ]
  }
];

export const menuSections = menu.filter(section => !section.hidden);

export const formatPrice = price => (price === null || price === undefined ? 'Ask us' : `R${price}`);
