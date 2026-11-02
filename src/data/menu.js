// The Loop St. menu, by category. Prices in rand.
//
// Source: photos of the printed menu, taken 2 Nov 2026.
// price: null means the printed menu shows no price for the item; the page shows "Ask us" for those.
// priceLabel: shown instead of a single price when an item has several (sizes, options).
// tags: 'vegan', 'vegetarian', 'gluten free' come from the menu's own V*, VG* and GF* marks.
//   On the printed menu a * means "available with the specified substitutions".
// hidden: true keeps a section in the file without showing it.
//
// Not on the printed menu photos: bottled white and sparkling wine. The 'white' section below
// is carried over from the previous menu and needs checking against the current wine list.

export const menu = [
  {
    id: 'snacks',
    title: 'Snack shack',
    kind: 'food',
    items: [
      {
        name: 'Snack board',
        priceLabel: 'R280 for two · R520 for four',
        description:
          'Smoked cheese wors, chicken strips, steak with chimichurri, hot-honey halloumi, sweet potato fries, pita bread and sourdough with whipped feta, house sriracha aioli and chutney. Extra sourdough R25.'
      },
      {
        name: 'Fries',
        price: 52,
        description: 'Potato fries, hand-cut sweet potato fries or hand-cut potato crisps, with house sriracha aioli.'
      },
      {
        name: 'Biltong dusted fries',
        price: 120,
        description: 'Fries of your choice, dusted with parmesan and biltong, topped with sriracha aioli.'
      },
      {
        name: 'Corn chips, salsa & guacamole',
        price: 68,
        description: 'Gluten-free corn chips with fresh salsa and guacamole.',
        tags: ['gluten free']
      },
      {
        name: 'Smoked cheese wors & fries',
        price: 90,
        description: 'Our in-house smoked Warthog cheese wors bites with sweet potato fries and curry tomato sauce.'
      },
      {
        name: 'Chicken strips',
        price: 79,
        description: 'Amazi-marinated, crumbed and fried to order or grilled, with sriracha aioli.',
        tags: ['gluten free']
      },
      {
        name: 'Jalapeño poppers',
        price: 78,
        description:
          'Three jalapeño poppers filled with cream cheese, mozzarella and dates, crumbed and deep fried, with chilli chutney. An extra popper is R30.'
      },
      {
        name: 'Halloumi & hot honey drizzle',
        price: 72,
        description: 'Three grilled halloumi pieces, whipped feta, house hot honey and herbs. Extra halloumi R25.',
        tags: ['gluten free']
      }
    ]
  },
  {
    id: 'street',
    title: 'Street eats',
    kind: 'food',
    note: 'For gluten-free tacos and quesadillas, swap the flour tortillas for vegetable wraps (R15 extra). The wraps contain cheese.',
    items: [
      {
        name: 'Nachos',
        priceLabel: 'Black bean R129 · Chicken R145 · Pork R155',
        description:
          'Your choice of smoky black beans, house-smoked BBQ chicken or pulled pork, under melted cheese with fresh salsa, guacamole and spicy sour cream.',
        tags: ['vegetarian', 'gluten free']
      },
      {
        name: 'Big Mac taco',
        price: 140,
        description: 'Flour tortillas with kudu mince, cheese, chopped pickles, fresh onion, cabbage, guacamole and house burger sauce.',
        tags: ['gluten free']
      },
      {
        name: 'Steak taco',
        price: 160,
        description: 'Flour tortillas with steak strips, fresh salsa, pickled onions, sour cream, guacamole and chimichurri dressing.',
        tags: ['gluten free']
      },
      {
        name: 'Chicken quesadilla',
        price: 132,
        description:
          'Tortillas filled with house-smoked BBQ chicken, warm tomato salsa, green peppers and melted cheese, with fresh salsa, guacamole and spicy sour cream.',
        tags: ['gluten free']
      },
      {
        name: 'Greenland quesadilla',
        price: 132,
        description:
          'Tortillas filled with fresh spinach, basil pesto, guacamole, feta and melted cheese, and toasted almond flakes, with fresh salsa and spicy sour cream.',
        tags: ['vegetarian', 'gluten free']
      }
    ]
  },
  {
    id: 'burgers',
    title: 'Burgers',
    kind: 'food',
    note: 'Choose a side: potato fries, hand-cut sweet potato fries, hand-cut potato crisps, house crunch salad or roasted vegetables.',
    items: [
      {
        name: 'Kudu cheese smash burger',
        price: 149,
        description:
          'Two homemade smash patties (100% meat) on a brioche bun with cheese, lettuce, fresh onions, pickles and our house burger sauce.'
      },
      {
        name: 'Mushroom & fig burger',
        price: 155,
        description:
          'Two homemade kudu smash patties (100% meat) on a brioche bun with cheese, lettuce, mushroom sauce and preserved figs.'
      },
      {
        name: 'Black bean burger',
        price: 142,
        description: 'Homemade bean patty on a brioche bun with lettuce, pickled onion, tomato, guacamole and lemon-garlic yoghurt dressing.',
        tags: ['vegetarian']
      },
      {
        name: 'Crispy chicken burger',
        price: 158,
        description: 'Crispy chicken fillet on a brioche bun, with cheese, crunchy pickle slaw, guacamole and our house burger sauce.'
      }
    ]
  },
  {
    id: 'favourites',
    title: 'House favourites',
    kind: 'food',
    items: [
      {
        name: 'Steak & chips, 200g fillet',
        price: 179,
        description:
          'Cut of your choice seared in garlic butter and rosemary, with fries, roasted vegetables or house crunch salad. Add a sauce for R28: cheese, mushroom or chimichurri.',
        tags: ['gluten free']
      },
      { name: 'Steak & chips, 300g rump', price: 199 },
      { name: 'Steak & chips, 400g ribeye', price: 259 },
      {
        name: 'Crumbed pork chops',
        price: 169,
        description: 'Two pork chops with mash, green beans, sauerkraut and mustard. Add a sauce, see extras.'
      },
      {
        name: 'The Meltdown',
        price: 170,
        description:
          'House-crumbed sourdough chicken schnitzel topped with tomato marinara, mozzarella, crispy bacon, fresh greens and hot honey, with chips of your choice.'
      },
      { name: 'Oxtail', price: 255, description: '500g slow-cooked oxtail with mash and veggies.' }
    ]
  },
  {
    id: 'bowls',
    title: 'Fresh bowls',
    kind: 'food',
    items: [
      {
        name: 'Burrito bowl',
        priceLabel: 'Mushroom R129 · Chicken R145 · Pork R155',
        description:
          'Smoky chipotle mushrooms, house-smoked BBQ chicken or pulled pork, with brown rice, bean and corn mix, house crunch salad, fresh salsa, guacamole, spicy sour cream and lemon-garlic yoghurt, finished with a crispy tortilla triangle. The vegan option is served without dairy.',
        tags: ['vegan']
      },
      {
        name: 'Thai noodle bowl',
        priceLabel: 'Vegan R120 · Grilled chicken R145',
        description:
          'Warm noodles with chilled crunchy cabbage, carrots and broccoli, tossed in a spicy peanut sauce and finished with spring onion and toasted seeds.',
        tags: ['vegan']
      },
      {
        name: 'Loaded burger bowl',
        price: 149,
        description:
          'A deconstructed burger without the bun: homemade kudu cheese or vegan bean patty on fresh greens with pickled onion, atchar, fresh salsa, guacamole, sweet potato fries and sriracha aioli or vegan mayo. Fried chips may contain traces of gluten, so skip the fries for extra greens and guacamole.',
        tags: ['vegan', 'gluten free']
      },
      {
        name: 'Caramelised pecan salad',
        price: 99,
        description: 'Baby leaves topped with caramelised pecans and crumbled feta, finished with balsamic glaze.',
        tags: ['vegetarian', 'gluten free']
      }
    ]
  },
  {
    id: 'pizza',
    title: 'Pizza',
    kind: 'food',
    note: 'Homemade sourdough base with tomato base, mozzarella and parmesan.',
    items: [
      { name: 'Old Napoli', price: 120, description: 'Tomato base, parmesan, mozzarella and fresh basil.' },
      { name: 'Capo', price: 130, description: 'Ham and mushrooms.' },
      { name: 'The Goodfella', price: 145, description: 'Bacon, feta and fresh avocado (seasonal).' },
      { name: 'Bella Donna', price: 140, description: 'Feta, salami and olives.' },
      {
        name: 'The Gardener',
        price: 140,
        description: 'Feta, green pepper, artichoke, mushrooms, baby tomatoes and peppadews, topped with fresh baby leaves and balsamic glaze.',
        tags: ['vegetarian']
      },
      { name: 'El Pollo Loco', price: 145, description: 'House-smoked BBQ chicken and peppadews.' },
      { name: 'Wise Guy', price: 185, description: '200g steak strips and house onion marmalade.' },
      { name: 'Don Blue', price: 179, description: 'Biltong, preserved figs and blue cheese.' },
      { name: 'Don Fegato', price: 135, description: 'Peri-peri chicken livers and pickled onions.' }
    ]
  },
  {
    id: 'pizza-extras',
    title: 'Pizza extras',
    kind: 'food',
    items: [
      { name: 'Onion, pickled onion, jalapeños, baby tomatoes, baby leaves', price: 15 },
      { name: 'Mushrooms, olives, peppadews, figs, onion marmalade, pesto', price: 20 },
      { name: 'Parmesan, feta, ham, chicken livers, artichokes', price: 25 },
      { name: 'Mozzarella, bacon, salami, smoked chicken, avocado, blue cheese', price: 35 },
      { name: 'Biltong', price: 45 },
      { name: 'Steak strips', price: 85 }
    ]
  },
  {
    id: 'sweet',
    title: 'Something sweet',
    kind: 'food',
    items: [
      { name: 'Warm chocolate brownie', price: 70, description: 'With ice cream and chocolate ganache.' },
      { name: 'Caramel cheesecake', price: 70 },
      {
        name: 'Sourdough bread pudding',
        price: 65,
        description: 'Sourdough bread baked in a rich custard with warm spices and dates, with your choice of cream or ice cream.'
      },
      { name: 'Espresso affogato', price: 55, description: 'Vanilla ice cream and a shot of espresso.' },
      {
        name: 'Brownie affogato',
        price: 75,
        description:
          'Warm chocolate brownie with vanilla ice cream and a shot of espresso. Add a shot of Shanky’s Whip for R36 or Kahlúa for R29.'
      },
      { name: 'Whipped Elephant', price: 65, description: 'A shot of Amarula and Shanky’s Whip on crushed ice.' }
    ]
  },
  {
    id: 'extras',
    title: 'Extras',
    kind: 'food',
    items: [
      { name: 'Fried egg', price: 15 },
      { name: 'Halloumi (1)', price: 25 },
      { name: 'Sliced jalapeños', price: 15 },
      { name: 'Sourdough slice (2)', price: 25 },
      { name: 'House crunch salad', price: 45 },
      { name: 'Veggies or mash', price: 45 },
      { name: 'Sauerkraut', price: 15 },
      { name: 'Cheese sauce', price: 28 },
      { name: 'Chimichurri sauce', price: 28 },
      { name: 'Mushroom sauce', price: 28 },
      { name: 'Guacamole', price: 35 },
      { name: 'Sour cream', price: 25 },
      { name: 'Whipped feta', price: 28 }
    ]
  },
  {
    id: 'cocktails',
    title: 'House cocktails',
    kind: 'drinks',
    items: [
      {
        name: 'Sangria affair',
        priceLabel: 'Glass R85 · Jug (4) R275',
        description: 'Dry red wine, brandy, orange juice, lemon.'
      },
      { name: 'Fandango blush', price: 85, description: 'Brandy, Campari, vermouth, orange juice.' },
      { name: 'Irish lemonade', price: 95, description: 'Whisky, Honey Bärenjäger, lemon juice, soda water.' },
      { name: 'Naartjie margarita', price: 92, description: 'Tequila, naartjie simple syrup, lime, salt rim.' },
      { name: 'Caribbean cooler', price: 99, description: 'Bumbu rum, lemon juice, passion fruit syrup.' },
      { name: 'El Diablo', price: 95, description: 'Tequila, crème de cassis, ginger ale, lime.' },
      { name: 'Dark & stormy', price: 85, description: 'Dark rum, lime, ginger ale.' },
      { name: 'Hocus pocus', price: 95, description: 'Gin, elderflower syrup, lime, cranberry juice, berries.' },
      { name: 'Loop cooler', price: 90, description: 'Gin, vermouth, pink tonic, cucumber, mint.' },
      { name: 'Dry Camino', price: 90, description: 'Rum, triple sec, dry lemon, bitters, lime.' },
      { name: 'Whisky revival', price: 95, description: 'Whisky, crème de cassis, lemon, simple syrup, bitters.' },
      { name: 'Espresso martini', price: 90, description: 'Freshly brewed espresso, vodka, Kahlúa, simple syrup.' }
    ]
  },
  {
    id: 'classic',
    title: 'Classic cocktails',
    kind: 'drinks',
    items: [
      { name: 'Aperol spritz special', priceLabel: 'R165 for two', description: 'Champagne, Aperol, soda water.' },
      { name: 'Cosmopolitan', price: 90, description: 'Vodka, triple sec, lime, cranberry juice.' },
      { name: 'Mojito', price: 95, description: 'White rum, lime, fresh mint, simple syrup, soda water.' },
      { name: 'Margarita', price: 95, description: 'Tequila, Cointreau, lime.' },
      { name: 'Piña colada', price: 95, description: 'Rum, piña colada syrup, lime, coconut cream, pineapple juice.' },
      { name: 'Godfather', price: 80, description: 'Whisky, Disaronno.' },
      { name: 'Caipirinha', price: 90, description: 'White rum, fresh lime, simple syrup.' },
      { name: 'Gin martini', price: 85, description: 'Gin, vermouth, olives.' },
      { name: 'Negroni', price: 85, description: 'Gin, Campari, vermouth, orange peel.' },
      { name: 'Old fashioned', price: 95, description: 'Woodford Reserve, bitters, simple syrup, orange peel.' },
      {
        name: 'Bloody Mary',
        price: 90,
        description: 'Tomato juice, vodka, lemon juice, Worcestershire sauce, Tabasco, salt, black pepper.'
      },
      { name: 'Whiskey sour', price: 95, description: 'Tullamore Dew whiskey, lemon, simple syrup, aquafaba.' },
      { name: 'White Russian', price: 80, description: 'Full-cream milk, vodka, Kahlúa.' },
      { name: 'Black Russian', price: null, description: 'Vodka and Kahlúa.' }
    ]
  },
  {
    id: 'mocktails',
    title: 'Mocktails',
    kind: 'drinks',
    items: [
      { name: 'Savanna fizz', price: 95, description: 'Mango rooibos, Mahala botanical, lemon, soda water.' },
      { name: 'Mahala mule', price: 95, description: 'Mahala botanical, ginger ale, lime.' },
      { name: 'M&T', price: 85, description: 'Mahala botanical, pink tonic, lemon zest, rosemary.' },
      { name: 'Virgin mojito', price: 80, description: 'Soda water, mint, simple syrup, lime.' },
      {
        name: 'Lime in the coconut',
        price: 90,
        description: 'Mahala botanical, piña colada syrup, lime, coconut cream, soda water.'
      },
      { name: 'Citrus bloom', price: 95, description: 'Mahala botanical, naartjie syrup, lemon, tonic.' }
    ]
  },
  {
    id: 'beer',
    title: 'Ciders & alcohol-free beers',
    kind: 'drinks',
    note: 'Look out for the blackboard for our beers on tap.',
    items: [
      { name: 'Corona', price: 42 },
      { name: 'Rekorderlig', price: 58 },
      { name: 'Savanna Dry', price: 42 },
      { name: 'Savanna Light', price: 42 },
      { name: 'Chouffe Cherry', price: 95 },
      { name: 'Bitburger alcohol-free', price: 46 },
      { name: 'Corona alcohol-free', price: 46 },
      { name: 'Erdinger alcohol-free', price: 52 }
    ]
  },
  {
    id: 'glass',
    title: 'Wine by the glass',
    kind: 'drinks',
    items: [
      { name: 'KWV Dry Red Blend', price: 49 },
      { name: 'Koelenberg 2024 Red Blend', price: 80 },
      { name: 'Delheim Pinotage Rosé', price: 54 },
      { name: 'KWV Chenin Blanc', price: 49 }
    ]
  },
  {
    id: 'red',
    title: 'Red wine by the bottle',
    kind: 'drinks',
    items: [
      { name: 'Cabernet Sauvignon: Cederberg', price: 475 },
      { name: 'Cabernet Sauvignon: Bosman Generation 8', price: 195 },
      { name: 'Shiraz: Alto', price: 475 },
      { name: 'Shiraz: Stettyn Cellar', price: 185 },
      { name: 'Merlot: Creation', price: 420 },
      { name: 'Merlot: Riebeeck Cellars', price: 185 },
      { name: 'Merlot: Hermanuspietersfontein Posmeester', price: 249 },
      { name: 'Pinotage: Groot Constantia', price: 580 },
      { name: 'Pinotage: Kanonkop Kadette', price: 270 },
      { name: 'Pinotage: Beyerskloof', price: 220 },
      { name: 'Pinotage: KWV', price: 180 },
      { name: 'Red blend: Constantia Lady of Abundance', price: 320 },
      { name: 'Red blend: Kanonkop Kadette Cape Blend', price: 250 },
      { name: 'Red blend: Alto Rouge', price: 235 },
      { name: 'Red blend: Koelenberg 2024 Blend', price: 180 },
      { name: 'Pinot Noir: Benguela Cove', price: 490 }
    ]
  },
  {
    // Carried over from the previous menu; the printed menu photos do not show a white wine page.
    id: 'white',
    title: 'White & rosé by the bottle',
    kind: 'drinks',
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
    id: 'whisky',
    title: 'Whisky & bourbon',
    kind: 'drinks',
    note: 'Per single shot.',
    items: [
      { name: 'Aberlour 12', price: 85 },
      { name: 'Akashi Red', price: 38 },
      { name: 'Bain’s', price: 30 },
      { name: 'Gentleman Jack', price: 40 },
      { name: 'Glenfiddich 12', price: 56 },
      { name: 'Glenfiddich 15', price: 84 },
      { name: 'Glenfiddich 18', price: 155 },
      { name: 'Glenlivet 15', price: 92 },
      { name: 'Glenmorangie Triple Cask', price: 44 },
      { name: 'Jack Daniel’s', price: 29 },
      { name: 'Jack Daniel’s Fire', price: 29 },
      { name: 'Jack Daniel’s Apple', price: 29 },
      { name: 'Jack Daniel’s Honey', price: 32 },
      { name: 'Jameson', price: 35 },
      { name: 'Jameson Select Reserve', price: 46 },
      { name: 'Johnnie Walker Black Label', price: 42 },
      { name: 'Macallan 12', price: 135 },
      { name: 'Monkey Shoulder', price: 38 },
      { name: 'Tullamore Dew', price: 30 },
      { name: 'Tullamore Dew Rum Cask', price: 36 },
      { name: 'Umiki', price: 84 },
      { name: 'Woodford Reserve Bourbon', price: 42 }
    ]
  },
  {
    id: 'rum',
    title: 'Rum',
    kind: 'drinks',
    note: 'Per single shot.',
    items: [
      { name: 'Afrikanis', price: 40 },
      { name: 'Bumbu Original', price: 44 },
      { name: 'Captain Morgan Dark', price: 24 },
      { name: 'Captain Morgan Spiced', price: 24 },
      { name: 'Diplomático Reserva Exclusiva', price: 85 },
      { name: 'Diplomático Single Vintage 2005', price: 135 },
      { name: 'Don Papa', price: 48 },
      { name: 'Elephantom', price: 44 },
      { name: 'Goldsmith Rum', price: 74 },
      { name: 'Kraken', price: 40 },
      { name: 'Redemption Rum', price: 38 },
      { name: 'Red Heart Dark', price: 24 },
      { name: 'Santa Teresa 1796', price: 98 },
      { name: 'Pacto Navío Cuba', price: 95 }
    ]
  },
  {
    id: 'brandy',
    title: 'Brandy & cognac',
    kind: 'drinks',
    note: 'Per single shot.',
    items: [
      { name: 'Brandefyn', price: 36 },
      { name: 'Hennessy VS', price: 58 },
      { name: 'Hennessy VSOP', price: 94 },
      { name: 'Martell Blue Swift', price: 94 },
      { name: 'Klipdrift Premium', price: 25 },
      { name: 'KWV 5', price: 24 },
      { name: 'KWV 10', price: 34 },
      { name: 'KWV 12', price: 44 },
      { name: 'KWV 15', price: 89 },
      { name: 'KWV 20', price: 140 }
    ]
  },
  {
    id: 'tequila',
    title: 'Tequila & mezcal',
    kind: 'drinks',
    note: '100% agave. Per single shot.',
    items: [
      { name: 'Alipús San Andrés Mezcal', price: 68 },
      { name: 'Alipús San Juan Mezcal', price: 70 },
      { name: 'Clase Azul Ultra Premium', price: 299 },
      { name: 'Don Julio Blanco', price: 72 },
      { name: 'Don Julio Reposado', price: 85 },
      { name: 'Espolòn Reposado', price: 45 },
      { name: 'El Jimador Blanco', price: 35 },
      { name: 'El Jimador Reposado', price: 35 },
      { name: 'Herradura Añejo', price: 84 },
      { name: 'Leonista Blanco', price: 46 },
      { name: 'Leonista Reposado Black', price: 48 },
      { name: 'Volcán Reposado', price: 78 },
      { name: 'Volcán XA', price: 299 }
    ]
  },
  {
    id: 'gin',
    title: 'Gin',
    kind: 'drinks',
    note: 'Per single shot.',
    items: [
      { name: 'An Dulaman', price: 32 },
      { name: 'Bloedlemoen Amber', price: 35 },
      { name: 'Bloedlemoen Original', price: 35 },
      { name: 'Bombay Dry', price: 28 },
      { name: 'Bombay Sapphire', price: 32 },
      { name: 'Cape St Blaize Classic', price: 42 },
      { name: 'Cape St Blaize Floristic', price: 42 },
      { name: 'Cape St Blaize Oceanic', price: 42 },
      { name: 'Cruxland Black Winter Truffle', price: 34 },
      { name: 'Cruxland Kalahari', price: 34 },
      { name: 'Drumshanbo Gunpowder', price: 38 },
      { name: 'Hendrick’s', price: 44 },
      { name: 'Inverroche Amber', price: 40 },
      { name: 'Inverroche Classic', price: 40 },
      { name: 'Inverroche Verdant', price: 40 },
      { name: 'Malachite Fynbos', price: 44 }
    ]
  },
  {
    id: 'other',
    title: 'Shots, liqueurs & other',
    kind: 'drinks',
    items: [
      { name: 'Bobbejaan', price: 35 },
      { name: 'Firewater', price: 25 },
      { name: 'Jägermeister', price: 32 },
      { name: 'Kleiner Keller', price: 36 },
      { name: 'Mampoer', price: 35 },
      { name: 'Oestertjie met ’n P', price: 25 },
      { name: 'Shanky’s Whip', price: 36 },
      { name: 'Amarula', price: 25 },
      { name: 'Bärenjäger Honey', price: 36 },
      { name: 'Disaronno', price: 34 },
      { name: 'Frangelico', price: 29 },
      { name: 'Kahlúa', price: 29 },
      { name: 'Mahala non-alcoholic botanical', price: 35 }
    ]
  },
  {
    id: 'hot',
    title: 'Hot drinks',
    kind: 'drinks',
    items: [
      { name: 'Cappuccino, single', price: 38 },
      { name: 'Cappuccino, double', price: 44 },
      { name: 'Espresso', price: 26 },
      { name: 'Hot chocolate', price: 45 },
      { name: 'Chai latte', price: 50 },
      { name: 'Dirty chai', price: 62 },
      { name: 'Five Roses', price: 26 },
      { name: 'Rooibos', price: 26 },
      { name: 'Masala chai rooibos', price: 34 },
      { name: 'Rooibos cappuccino', price: 42 }
    ]
  }
];

export const menuSections = menu.filter(section => !section.hidden);

export const formatPrice = price => (price === null || price === undefined ? 'Ask us' : `R${price}`);
