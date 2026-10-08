export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVegetarian: boolean;
  isSignature: boolean;
  image: string;
  tag?: string;
}

export const menuCategories = [
  'SIGNATURES',
  'RAW BAR & CAVIAR',
  'SMALL PLATES',
  'SOUPS & SALADS',
  'MAINS & ROBATA',
  'BREADS & RICE',
  'DESSERTS',
  'COCKTAILS & RESERVE',
  'MOCKTAILS & ZERO PROOF'
];

export const menuItems: MenuItem[] = [
  // ==================== SIGNATURES ====================
  {
    id: 'sig-1',
    name: 'Imperial Kaluga Caviar Service',
    description: 'Royal Kaluga hybrid caviar (30g), smoked malai blinis, chive-infused cultured Normandy butter, cured egg mimosa & 24k gold leaf.',
    price: 4850,
    category: 'SIGNATURES',
    isVegetarian: false,
    isSignature: true,
    tag: 'Imperial Reserve',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: 'sig-2',
    name: 'A5 Miyazaki Wagyu Tenderloin',
    description: 'Grade A5 Japanese Wagyu, smoked bone marrow emulsion, shaved Périgord black truffle, crispy garlic chips & 10-year aged tare glaze.',
    price: 4950,
    category: 'SIGNATURES',
    isVegetarian: false,
    isSignature: true,
    tag: "Chef's Cut",
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: 'sig-3',
    name: 'Charred Brittany Blue Lobster',
    description: 'Butter-poached blue lobster tail, Kashmiri saffron brandy emulsion, Gruyère foam & Oscietra caviar beads.',
    price: 3950,
    category: 'SIGNATURES',
    isVegetarian: false,
    isSignature: true,
    tag: 'Tableside Pour',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2665&auto=format&fit=crop'
  },
  {
    id: 'sig-4',
    name: 'Miso Caramelized Chilean Sea Bass',
    description: 'Wild Chilean sea bass cured for 48 hours in Kyoto saikyo sweet miso, pickled hajikami ginger & edamame velvet mousse.',
    price: 2850,
    category: 'SIGNATURES',
    isVegetarian: false,
    isSignature: true,
    tag: 'House Classic',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'sig-5',
    name: 'Truffle & Morel (Gucchi) Malai',
    description: 'Himalayan wild morels stuffed with smoked paneer & pistachio cream, winter black truffle reduction and 24k gold leaf.',
    price: 1650,
    category: 'SIGNATURES',
    isVegetarian: true,
    isSignature: true,
    tag: 'Rare Ingredient',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'sig-6',
    name: 'Ember Butter Chicken Royale',
    description: 'Charcoal-smoked organic poulet tikka, velvety San Marzano tomato & cashew makhani, fenugreek dust & gold leaf.',
    price: 1250,
    category: 'SIGNATURES',
    isVegetarian: false,
    isSignature: true,
    tag: 'Heritage Recipe',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'sig-7',
    name: '24-Karat Gold Crème Brûlée',
    description: 'Single-origin 72% Madagascar dark chocolate, smoked Tahitian vanilla custard, delicate brittle caramel & 24k gold leaf.',
    price: 850,
    category: 'SIGNATURES',
    isVegetarian: true,
    isSignature: true,
    tag: '24K Gold Edition',
    image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?q=80&w=2673&auto=format&fit=crop'
  },

  // ==================== RAW BAR & CAVIAR ====================
  {
    id: 'raw-1',
    name: 'Bluefin Otoro Tartare',
    description: 'Prime bluefin tuna belly, yuzu ponzu gel, whipped Hass avocado, royal Oscietra caviar & crisp nori wafers.',
    price: 2450,
    category: 'RAW BAR & CAVIAR',
    isVegetarian: false,
    isSignature: true,
    tag: 'Fresh Air-Flown',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'raw-2',
    name: 'Hokkaido Scallop Carpaccio',
    description: 'Thinly sliced wild Japanese scallops, Australian finger lime pearls, white truffle essence, sea grapes & edible gold blossoms.',
    price: 2150,
    category: 'RAW BAR & CAVIAR',
    isVegetarian: false,
    isSignature: false,
    tag: 'Raw Bar',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: 'raw-3',
    name: 'Yellowtail Hamachi & Truffle Ponzu',
    description: 'Air-flown Japanese yellowtail sashimi, charred serrano peppers, white truffle ponzu drizzle & crispy shallot dust.',
    price: 1950,
    category: 'RAW BAR & CAVIAR',
    isVegetarian: false,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'raw-4',
    name: 'Charred Pugliese Burrata & Saffron Peach',
    description: 'Artisanal burrata heart, saffron-poached white peaches, 25-year aged Modena balsamic caviar & toasted brioche crisps.',
    price: 1150,
    category: 'RAW BAR & CAVIAR',
    isVegetarian: true,
    isSignature: false,
    tag: 'Artisanal Cheese',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2792&auto=format&fit=crop'
  },

  // ==================== SMALL PLATES ====================
  {
    id: 'sp-1',
    name: 'Edamame & Black Truffle Crystal Dim Sum',
    description: 'Translucent steamed parcels filled with young edamame puree, water chestnuts, winter black truffle shavings & aromatic ponzu broth.',
    price: 950,
    category: 'SMALL PLATES',
    isVegetarian: true,
    isSignature: false,
    tag: 'Handcrafted',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'sp-2',
    name: 'Charcoal Robata New Zealand Lamb Chops',
    description: 'Grass-fed lamb cutlets marinated with smoked cloves, Kashmiri chili & raw papaya glaze, finished with mint-coriander emulsion.',
    price: 2250,
    category: 'SMALL PLATES',
    isVegetarian: false,
    isSignature: true,
    tag: 'Robata Smoked',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: 'sp-3',
    name: 'Crispy Lotus Root in Himalayan Hot Honey',
    description: 'Wok-tossed lotus stem crisps, organic wild honey, Sichuan peppercorns, scallions & toasted white sesame.',
    price: 750,
    category: 'SMALL PLATES',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2792&auto=format&fit=crop'
  },
  {
    id: 'sp-4',
    name: 'Spanish Ibérico Pork Belly Kakuni',
    description: 'Slow-braised acorn-fed Ibérico pork belly, star anise jaggery glaze, pickled mustard seeds & baby microgreens.',
    price: 1850,
    category: 'SMALL PLATES',
    isVegetarian: false,
    isSignature: false,
    tag: 'Ibérico De Bellota',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: 'sp-5',
    name: 'Wild Forest Morel & Shiitake Bao',
    description: 'Activated charcoal steamed bao buns, glazed wild morel & king oyster mushroom ragout, smoked truffle aioli.',
    price: 890,
    category: 'SMALL PLATES',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'sp-6',
    name: 'Jumbo Bengal Tiger Prawns Kaffir Butter',
    description: 'Flame-charred jumbo sea prawns, kaffir lime infused Normandy butter, roasted garlic crumble & chili strands.',
    price: 1650,
    category: 'SMALL PLATES',
    isVegetarian: false,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2665&auto=format&fit=crop'
  },

  // ==================== SOUPS & SALADS ====================
  {
    id: 'ss-1',
    name: 'Roasted Wild Morel & Truffle Velouté',
    description: 'Slow-roasted Himalayan morels, porcini essence, winter black truffle cream float & warm brioche crouton.',
    price: 850,
    category: 'SOUPS & SALADS',
    isVegetarian: true,
    isSignature: false,
    tag: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'ss-2',
    name: 'Lemongrass Galangal Seafood Bisque',
    description: 'Mud crab meat, butter-poached prawns, velvety coconut broth infused with fresh galangal, kaffir lime oil & coriander sprouts.',
    price: 950,
    category: 'SOUPS & SALADS',
    isVegetarian: false,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'ss-3',
    name: 'Ember Artisanal Burrata & Heirloom Salad',
    description: 'Handcrafted buffalo burrata, heirloom organic cherry tomatoes, wild arugula, caramelized pistachios & aged balsamic reduction.',
    price: 920,
    category: 'SOUPS & SALADS',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2792&auto=format&fit=crop'
  },
  {
    id: 'ss-4',
    name: 'Smoked Gressingham Duck & Fig Salad',
    description: 'Delicately smoked duck breast, caramelized Turkish figs, whipped French goat cheese, candied walnuts & raspberry vinaigrette.',
    price: 1250,
    category: 'SOUPS & SALADS',
    isVegetarian: false,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2580&auto=format&fit=crop'
  },

  // ==================== MAINS & ROBATA ====================
  {
    id: 'main-1',
    name: '36-Hour Slow-Braised Lamb Shank Rogan Josh',
    description: 'New Zealand prime lamb shank braised in Kashmiri ratan jot, whole spices, saffron jus & roasted bone marrow reduction.',
    price: 2350,
    category: 'MAINS & ROBATA',
    isVegetarian: false,
    isSignature: true,
    tag: 'Slow Braised',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: 'main-2',
    name: 'Périgord Black Truffle Risotto',
    description: 'Aged Acquerello carnaroli rice, 24-month Parmigiano-Reggiano, French cultured butter & generous tableside shaved winter truffle.',
    price: 1850,
    category: 'MAINS & ROBATA',
    isVegetarian: true,
    isSignature: true,
    tag: 'Chef Choice',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'main-3',
    name: 'Smoked Dal Makhani Grand Reserve',
    description: 'Slow-simmered black urad lentils cooked for 48 hours over charcoal embers, churned white butter & fenugreek aromatic smoke.',
    price: 750,
    category: 'MAINS & ROBATA',
    isVegetarian: true,
    isSignature: true,
    tag: '48-Hour Simmer',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'main-4',
    name: 'Pan-Seared Chilean Sea Bass in Turmeric Saffron Broth',
    description: 'Pan-roasted wild sea bass fillet, fragrant coconut-turmeric curry, crisp bok choy, kaffir lime drizzle & lotus crisps.',
    price: 2650,
    category: 'MAINS & ROBATA',
    isVegetarian: false,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'main-5',
    name: 'Artisanal Paneer Tikka Pinwheel Roulade',
    description: 'Organic buffalo paneer rolled with sun-dried tomatoes, toasted pine nuts, smoked bell pepper coulis & mint glaze.',
    price: 1150,
    category: 'MAINS & ROBATA',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2580&auto=format&fit=crop'
  },
  {
    id: 'main-6',
    name: 'Charred Gressingham Duck Breast with Spiced Plum Jus',
    description: 'Crisp skin duck breast, spiced five-spice plum reduction, parsnip velvet puree & caramelized shallot petals.',
    price: 1950,
    category: 'MAINS & ROBATA',
    isVegetarian: false,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'main-7',
    name: 'Himalayan Morel & Edamame Kofta Royale',
    description: 'Delicate dumplings of wild Kashmir morels and young edamame in rich royal cashew, mace & saffron gravy.',
    price: 1450,
    category: 'MAINS & ROBATA',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2670&auto=format&fit=crop'
  },

  // ==================== BREADS & RICE ====================
  {
    id: 'br-1',
    name: 'Black Truffle & Aged Gruyère Naan',
    description: 'Tandoor-baked leavened artisanal bread stuffed with Swiss Gruyère cheese, brushed with French cultured butter & shaved black truffle.',
    price: 550,
    category: 'BREADS & RICE',
    isVegetarian: true,
    isSignature: true,
    tag: 'Must Try',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'br-2',
    name: 'Himalayan Gucchi & Wild Morel Pulao',
    description: 'Aged Himalayan long-grain basmati rice, wild Kashmiri morels, saffron strands, caramelized shallots & edible silver vark.',
    price: 1750,
    category: 'BREADS & RICE',
    isVegetarian: true,
    isSignature: true,
    tag: 'Imperial',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'br-3',
    name: 'Dum Pukht Awadhi Lamb Biryani',
    description: 'Tender baby lamb cuts and aged basmati rice cooked in a sealed clay handi with Kashmiri saffron, rose water & kewra essence.',
    price: 1650,
    category: 'BREADS & RICE',
    isVegetarian: false,
    isSignature: true,
    tag: 'Clay Pot Dum',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2580&auto=format&fit=crop'
  },
  {
    id: 'br-4',
    name: 'Smoked Goat Cheese & Kalamata Olive Kulcha',
    description: 'Flaky tandoori kulcha stuffed with artisanal French goat cheese, crushed Kalamata olives & fresh rosemary butter.',
    price: 450,
    category: 'BREADS & RICE',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2792&auto=format&fit=crop'
  },
  {
    id: 'br-5',
    name: 'Artisanal Indian Bread Basket',
    description: 'An assorted selection of Zaatar garlic naan, multi-grain laccha paratha, roomali roti & chili cheese naan.',
    price: 480,
    category: 'BREADS & RICE',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2670&auto=format&fit=crop'
  },

  // ==================== DESSERTS ====================
  {
    id: 'des-1',
    name: 'The Golden Valrhona Sphere',
    description: '80% Valrhona dark chocolate dome, roasted Piedmont hazelnut praline mousse, warm smoked bourbon salted caramel poured tableside.',
    price: 950,
    category: 'DESSERTS',
    isVegetarian: true,
    isSignature: true,
    tag: 'Tableside Pour',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2757&auto=format&fit=crop'
  },
  {
    id: 'des-2',
    name: 'Saffron & 24K Gold Leaf Kulfi Gelato',
    description: 'Artisanal saffron & Iranian pistachio gelato, falooda pearls, Damascus rose water mist & 24k edible gold leaf.',
    price: 820,
    category: 'DESSERTS',
    isVegetarian: true,
    isSignature: true,
    tag: '24K Gold',
    image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?q=80&w=2673&auto=format&fit=crop'
  },
  {
    id: 'des-3',
    name: 'Smoked Japanese Matcha Basque Cheesecake',
    description: 'Ceremonial grade Uji matcha, burnt caramelized top, Madagascar vanilla bean chantilly cream & fresh yuzu gel.',
    price: 780,
    category: 'DESSERTS',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2764&auto=format&fit=crop'
  },
  {
    id: 'des-4',
    name: 'Japanese Yuzu & Green Cardamom Tart',
    description: 'Tangy yuzu curd, fragrant cardamom sablé crust, toasted Italian meringue peaks & candied Buddha’s hand zest.',
    price: 720,
    category: 'DESSERTS',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2757&auto=format&fit=crop'
  },
  {
    id: 'des-5',
    name: 'Dark Chocolate & Smoked Sea Salt Crème Brûlée',
    description: 'Caramelized demerara sugar crust, 70% Guanaja chocolate silky custard, flaked Maldon smoked sea salt.',
    price: 650,
    category: 'DESSERTS',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?q=80&w=2673&auto=format&fit=crop'
  },

  // ==================== COCKTAILS & RESERVE ====================
  {
    id: 'ck-1',
    name: 'The Sovereign Reserve Old Fashioned',
    description: 'The Macallan 18 Double Cask, smoked Madagascar vanilla reduction, Angostura & blood orange bitters, hand-carved 24k gold leaf ice stamp.',
    price: 2600,
    category: 'COCKTAILS & RESERVE',
    isVegetarian: true,
    isSignature: true,
    tag: 'Macallan 18',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'ck-2',
    name: 'Midnight Velvet Smoke Martini',
    description: 'Belvedere Single Estate Vodka, Kahlúa, freshly pulled dark espresso, activated charcoal, golden edible shimmer & aromatic coffee oil.',
    price: 1450,
    category: 'COCKTAILS & RESERVE',
    isVegetarian: true,
    isSignature: true,
    tag: 'Signature Pour',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 'ck-3',
    name: 'Sakura & White Peach Highball',
    description: 'Roku Japanese Gin, cherry blossom liqueur, white peach puree, clarified lemon & Bollinger Brut Champagne float.',
    price: 1350,
    category: 'COCKTAILS & RESERVE',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=2572&auto=format&fit=crop'
  },
  {
    id: 'ck-4',
    name: 'Smoked Rosemary Mezcalita',
    description: 'Del Maguey Vida Mezcal, fresh Sicilian blood orange, organic blue agave, flaming smoked rosemary sprig & black lava salt rim.',
    price: 1250,
    category: 'COCKTAILS & RESERVE',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'ck-5',
    name: 'Saffron & Green Cardamom Cloud',
    description: 'Woodford Reserve Bourbon, house saffron tincture, green cardamom syrup, lemon foam & aromatic Damascus mist.',
    price: 1350,
    category: 'COCKTAILS & RESERVE',
    isVegetarian: true,
    isSignature: true,
    tag: 'Artisanal Infusion',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=2574&auto=format&fit=crop'
  },

  // ==================== MOCKTAILS & ZERO PROOF ====================
  {
    id: 'zp-1',
    name: 'Smoked Ruby Pomegranate & Rose Elixir',
    description: 'Cold-pressed ruby pomegranate, organic Damascus rose water, smoked rosemary vapor & Fever-Tree botanical tonic.',
    price: 580,
    category: 'MOCKTAILS & ZERO PROOF',
    isVegetarian: true,
    isSignature: false,
    tag: 'Zero Proof',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'zp-2',
    name: 'Yuzu & Sparkling Elderflower Blossom',
    description: 'Distilled non-alcoholic botanical essence, Japanese yuzu, sparkling elderflower, fresh garden mint & crystal crushed ice.',
    price: 580,
    category: 'MOCKTAILS & ZERO PROOF',
    isVegetarian: true,
    isSignature: true,
    tag: 'Botanical',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=2572&auto=format&fit=crop'
  },
  {
    id: 'zp-3',
    name: 'Wild Blackberry & Saffron Sparkle',
    description: 'Muddled mountain blackberries, Kashmiri saffron syrup, fresh lime juice & sparkling artisanal mineral water.',
    price: 540,
    category: 'MOCKTAILS & ZERO PROOF',
    isVegetarian: true,
    isSignature: false,
    tag: 'Zero Proof',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'zp-4',
    name: 'Charred Pineapple & Jalapeño Swizzle',
    description: 'Roasted pineapple juice, organic agave nectar, fresh lime, muddled green jalapeño & smoked Maldon paprika salt.',
    price: 520,
    category: 'MOCKTAILS & ZERO PROOF',
    isVegetarian: true,
    isSignature: false,
    tag: 'Zero Proof',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=2670&auto=format&fit=crop'
  }
];