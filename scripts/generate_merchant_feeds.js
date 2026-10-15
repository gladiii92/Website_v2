const fs = require('fs');
const path = require('path');

const gemstones = require('../src/data/gemstones.json');

const DOMAIN = 'https://noblecutgems.com';

const STONE_NAMES = {
  1: { en: "Yellow Sapphire", fr: "Saphir Jaune", de: "Gelber Saphir" },
  2: { en: "Blue Spinel", fr: "Spinelle Bleu", de: "Blauer Spinell" },
  3: { en: "Blueish-Green Sapphire", fr: "Saphir Bleu-Vert", de: "Grün-Blauer Saphir" },
  4: { en: "Lavender Spinel", fr: "Spinelle Lavande", de: "Lavendel-Spinell" },
  5: { en: "Green Peridot", fr: "Péridot Vert", de: "Grüner Peridot" },
  6: { en: "Reddish-Pink Spinel", fr: "Spinelle Rouge-Rose", de: "Rot-Pinker Spinell" },
  7: { en: "Kashmir Sapphire", fr: "Saphir du Cachemire", de: "Kashmir Saphir" },
  8: { en: "Electric Blue Sapphire", fr: "Saphir Bleu Électrique", de: "Electric-Blue Saphir" },
  9: { en: "Orange-Yellow Mali Garnet", fr: "Grenat du Mali Orange-Jaune", de: "Orange-Gelber Mali Granat" },
  10: { en: "Yellow Mali Garnet", fr: "Grenat du Mali Jaune", de: "Gelber Mali Granat" },
  11: { en: "Orange Mali Garnet", fr: "Grenat du Mali Orange", de: "Orangener Mali Granat" },
  12: { en: "Golden Mali Garnet", fr: "Grenat du Mali Doré", de: "Goldener Mali Granat" },
  13: { en: "Yellowish-Green Mali Garnet", fr: "Grenat du Mali Vert-Jaune", de: "Gelblich-Grüner Mali Granat" },
  14: { en: "Yellowish-Brown Mali Garnet", fr: "Grenat du Mali Brun-Jaune", de: "Gelblich-Brauner Mali Granat" },
  15: { en: "Red Ruby", fr: "Rubis Rouge", de: "Roter Rubin" },
  16: { en: "Pinkish-Red Ruby", fr: "Rubis Rouge-Pourpre", de: "Lila-Roter Rubin" },
  17: { en: "Crimson Ruby", fr: "Rubis Rouge Vif", de: "Roter Rubin" },
  18: { en: "Vivid Green Peridot", fr: "Péridot Vert Éclatant", de: "Lebendig-Grüner Peridot" },
  19: { en: "Dark Teal Sapphire", fr: "Saphir Sarcelle Foncé", de: "Dunkel-Blau-Grüner Saphir" },
  20: { en: "Light Green Emerald", fr: "Émeraude Vert Clair", de: "Hellgrüner Smaragd" },
  21: { en: "Champagne Katlang Topaz", fr: "Topaze Katlang Champagne", de: "Katlang Topas Champagner" },
  22: { en: "Bi-Color Tourmaline", fr: "Tourmaline Bicolore", de: "Bi-Color Turmalin" },
  23: { en: "Pink-Purple Spinel", fr: "Spinelle Rose-Pourpre", de: "Rosa-Lila Spinell" },
  24: { en: "White Spinel", fr: "Spinelle Blanc", de: "Weißer Spinell" },
  25: { en: "Pink Spinel", fr: "Spinelle Rose", de: "Rosa Spinell" },
  26: { en: "Light Pink Spinel", fr: "Spinelle Rose Clair", de: "Leichter-Rosa Spinell" },
  27: { en: "Reddish-Pink Spinel", fr: "Spinelle Rose Rougeâtre", de: "Rötlich-Rosa Spinell" },
  28: { en: "Purple Spinel", fr: "Spinelle Violet", de: "Lila Spinell" },
  29: { en: "Purple-Grey Spinel", fr: "Spinelle Gris-Violet", de: "Lila-Grauer Spinell" },
  30: { en: "Soft Pink Spinel", fr: "Spinelle Rose Tendre", de: "Hellrosa Spinell" },
  31: { en: "Grey Spinel", fr: "Spinelle Gris", de: "Grauer Spinell" },
  32: { en: "Intense Purple Spinel", fr: "Spinelle Violet Intense", de: "Lila Spinell" },
  33: { en: "Silver-Grey Spinel", fr: "Spinelle Gris Argenté", de: "Grauer Spinell" },
  34: { en: "White-Grey Spinel", fr: "Spinelle Blanc-Gris", de: "Weiß-Grauer Spinell" }
};

const ORIGIN_MAP = {
  ceylon: { en: "Sri Lanka (Ceylon)", fr: "Sri Lanka (Ceylan)", de: "Sri Lanka (Ceylon)" },
  tanzania: { en: "Tanzania", fr: "Tanzanie", de: "Tansania" },
  srilanka: { en: "Sri Lanka", fr: "Sri Lanka", de: "Sri Lanka" },
  pakistan: { en: "Pakistan", fr: "Pakistan", de: "Pakistan" },
  madagascar: { en: "Madagascar", fr: "Madagascar", de: "Madagaskar" },
  mali: { en: "Mali", fr: "Mali", de: "Mali" },
  afghanistan: { en: "Afghanistan", fr: "Afghanistan", de: "Afghanistan" },
  burma: { en: "Myanmar (Burma)", fr: "Birmanie (Burma)", de: "Myanmar (Burma)" }
};

const CUT_MAP = {
  oval: { en: "Oval", fr: "Ovale", de: "Oval" },
  cushion: { en: "Cushion", fr: "Coussin", de: "Kissen" },
  brilliant: { en: "Brilliant", fr: "Brillant", de: "Brillant" },
  round: { en: "Round", fr: "Rond", de: "Rund" },
  emerald: { en: "Emerald Cut", fr: "Taille Émeraude", de: "Smaragdschliff" },
  fancy: { en: "Fancy Cut", fr: "Taille Fantaisie", de: "Fancy-Schliff" },
  triangle: { en: "Triangle Cut", fr: "Taille Triangle", de: "Dreieckschliff" }
};

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateFeed(lang) {
  const headers = [
    'id',
    'title',
    'description',
    'link',
    'image_link',
    'availability',
    'price',
    'brand',
    'condition',
    'google_product_category',
    'product_type',
    'identifier_exists',
    'custom_label_0',
    'custom_label_1',
    'custom_label_2',
    'custom_label_3',
    'custom_label_4'
  ];

  const rows = [headers.join('\t')];

  gemstones.forEach((stone) => {
    const id = stone.id;
    const names = STONE_NAMES[id] || { en: stone.name, fr: stone.name, de: stone.name };
    const originObj = ORIGIN_MAP[stone.origin.toLowerCase()] || { en: stone.origin, fr: stone.origin, de: stone.origin };
    const cutObj = CUT_MAP[stone.cut.toLowerCase()] || { en: stone.cut, fr: stone.cut, de: stone.cut };

    let title = '';
    let rawDesc = '';
    let specs = '';
    let productType = '';

    if (lang === 'en') {
      title = `Natural ${names.en} | ${stone.carat_weight}ct ${cutObj.en} | Untreated ${originObj.en}`;
      rawDesc = stripHtml(stone.description_en || stone.description_de);
      specs = `| Clarity: ${stone.clarity.toUpperCase()} | Cut: ${cutObj.en} | Origin: ${originObj.en} | Weight: ${stone.carat_weight}ct | Treatment: 100% Untreated Natural Gemstone`;
      productType = `Gemstones > ${stone.type.charAt(0).toUpperCase() + stone.type.slice(1)}`;
    } else if (lang === 'fr') {
      title = `${names.fr} Naturel | ${stone.carat_weight}ct ${cutObj.fr} | Non Traité ${originObj.fr}`;
      rawDesc = stripHtml(stone.description_fr || stone.description_de);
      specs = `| Pureté: ${stone.clarity.toUpperCase()} | Taille: ${cutObj.fr} | Origine: ${originObj.fr} | Poids: ${stone.carat_weight}ct | Traitement: 100% Pierre Naturelle Non Traitée`;
      productType = `Pierres Précieuses > ${stone.type.charAt(0).toUpperCase() + stone.type.slice(1)}`;
    } else {
      title = `${names.de} | ${stone.carat_weight}ct | Natur-Edelstein Unbehandelt | ${originObj.de}`;
      rawDesc = stripHtml(stone.description_de);
      specs = `| Reinheit: ${stone.clarity.toUpperCase()} | Schliff: ${cutObj.de} | Herkunft: ${originObj.de} | Karat: ${stone.carat_weight}ct | Behandlung: 100% Unbehandelter Natur-Edelstein`;
      productType = `Edelsteine > ${stone.type.charAt(0).toUpperCase() + stone.type.slice(1)}`;
    }

    const fullDesc = `${rawDesc} ${specs}`.replace(/[\t\r\n]+/g, ' ').trim();
    const link = `${DOMAIN}/${lang}/stone/${stone.slug}`;
    const imageLink = `${DOMAIN}${stone.main_image_url}`;
    const price = `${stone.price_eur.toFixed(2)} EUR`;

    const row = [
      id,
      title,
      fullDesc,
      link,
      imageLink,
      'in stock',
      price,
      'NobleCutGems',
      'new',
      'Arts & Entertainment > Hobbies & Creative Arts > Collectibles > Rocks, Fossils & Minerals',
      productType,
      'no',
      stone.rarity_level || 'exceptional',
      originObj[lang] || stone.origin,
      stone.treatment || 'untreated',
      stone.certification || 'none',
      `${stone.carat_weight}ct`
    ];

    rows.push(row.join('\t'));
  });

  return rows.join('\n');
}

const enFeed = generateFeed('en');
const frFeed = generateFeed('fr');
const deFeed = generateFeed('de');

fs.writeFileSync(path.join(__dirname, '../src/data/google_merchant_feed_en.txt'), enFeed, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/data/google_merchant_feed_fr.txt'), frFeed, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/data/google_merchant_feed_de.txt'), deFeed, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/data/google_merchant_feed_final.txt'), deFeed, 'utf8');

console.log('Successfully generated EN, FR, and DE Google Merchant feeds with 34 items each.');

