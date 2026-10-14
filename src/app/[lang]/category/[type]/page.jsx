import { notFound } from 'next/navigation';
import CategoryClient from '@/components/CategoryClient';
import { gemstones } from '@/data/Gemstones';

const validTypes = [
  'sapphire',
  'spinel',
  'peridot',
  'garnet',
  'ruby',
  'emerald',
  'topaz',
  'tourmaline'
];

const categorySeo = {
  sapphire: {
    de: {
      title: 'Unbehandelte Saphire kaufen | Ceylon & Madagaskar | NobleCutGems',
      desc: 'Handverlesene, 100% unbehandelte Saphire aus Sri Lanka (Ceylon) & Madagaskar. Ungebrannt, reinste Farbintensität, fancy Schliffe. 30 Tage Rückgaberecht.'
    },
    en: {
      title: 'Buy Untreated Natural Sapphires | Ceylon & Madagascar | NobleCutGems',
      desc: 'Browse our collection of 100% natural, unheated sapphires from Ceylon and Madagascar. Eye-clean clarity, exquisite fancy cuts, ethical mine-direct pricing.'
    },
    fr: {
      title: 'Acheter des Saphirs Naturels Non Traités | Ceylan | NobleCutGems',
      desc: 'Collection exclusive de saphirs naturels non chauffés de Ceylan et Madagascar. Éclat pur, certifications de laboratoires, livraison assurée dans le monde entier.'
    }
  },
  spinel: {
    de: {
      title: 'Natürliche Spinelle kaufen | Blau, Pink & Lavendel | NobleCutGems',
      desc: 'Seltene unbehandelte Spinelle aus Tansania (Mahenge) und Burma. Diamantgleiches Feuer, höchste Brillanz, 100% naturbelassen.'
    },
    en: {
      title: 'Buy Natural Loose Spinels | Blue, Pink & Lavender | NobleCutGems',
      desc: 'Fine natural spinels from Tanzania and Burma. Singly refractive, unheated, vivid fire. Ideal for bespoke engagement rings and gemstone collectors.'
    },
    fr: {
      title: 'Acheter des Spinelles Naturels Rares | Tanzanie | NobleCutGems',
      desc: 'Spinelles précieux de Birmanie et de Tanzanie. Couleurs intenses non traitées, éclat vif diamanté, pierres uniques pour haute joaillerie.'
    }
  },
  peridot: {
    de: {
      title: 'Pakistanische Peridote kaufen | Vivid Green | NobleCutGems',
      desc: 'Strahlend grüne Peridote aus den Hochgebirgen Pakistans. Unbehandelt, augenrein, meisterhaft geschliffen.'
    },
    en: {
      title: 'Buy Vivid Green Pakistani Peridots | Natural Loose Gems | NobleCutGems',
      desc: 'Natural unheated peridots from high-altitude Pakistan mines. Intense olive-to-emerald green tones, eye-clean clarity, direct sourcing.'
    },
    fr: {
      title: 'Péridots Vert Intense du Pakistan | Pierres Fines | NobleCutGems',
      desc: 'Péridots naturels non traités du Pakistan. Couleur verte solaire éclatante, pureté cristalline exceptionnelle.'
    }
  },
  garnet: {
    de: {
      title: 'Seltene Mali Granate kaufen | Grossular-Andradit | NobleCutGems',
      desc: 'Unbehandelte Mali Granate mit feuriger Dispersion. Warme Gold-, Gelb- und Orangetöne, seltene Sammlerrarität.'
    },
    en: {
      title: 'Buy Rare Untreated Mali Garnets | High Dispersion | NobleCutGems',
      desc: 'Natural Grossular-Andradite garnets from Mali. Incredible diamond-like sparkle, warm golden-orange fire, 100% untreated.'
    },
    fr: {
      title: 'Grenats Rares du Mali Non Traités | Vente en Ligne | NobleCutGems',
      desc: 'Grenats hybrides exceptionnels du Mali. Dispersion étincelante et teintes ambrées chaleureuses, pierres naturelles certifiées.'
    }
  },
  ruby: {
    de: {
      title: 'Unbehandelte Madagaskar Rubine kaufen | NobleCutGems',
      desc: 'Echte, ungebrannte Naturrubine aus Madagaskar. Lebendiges Rot ohne Bleiglasfüllung oder thermische Behandlung.'
    },
    en: {
      title: 'Buy Natural Unheated Rubies | Madagascar Loose Gems | NobleCutGems',
      desc: 'Genuine untreated natural rubies from Madagascar. Vivid velvety red color, zero heat, zero glass-filling. Collector investment quality.'
    },
    fr: {
      title: 'Rubis Naturels Non Chauffés de Madagascar | NobleCutGems',
      desc: 'Rubis authentiques non traités de Madagascar. Teinte rouge sang veloutée, pierres précieuses naturelles sans traitement chimique.'
    }
  },
  emerald: {
    de: {
      title: 'Natürliche Smaragde kaufen | Afghanistan Panjshir | NobleCutGems',
      desc: 'Feine afghanische Smaragde mit kristalliner Transparenz und lebendigem Mint- bis Waldgrün.'
    },
    en: {
      title: 'Buy Natural Emeralds | Afghan Panjshir | NobleCutGems',
      desc: 'Fine natural emeralds from Afghanistan’s famed Panjshir Valley. Outstanding crystalline transparency and vivid green life.'
    },
    fr: {
      title: 'Émeraudes Naturelles d’Afghanistan | Panjshir | NobleCutGems',
      desc: 'Émeraudes fines de la vallée du Panjshir en Afghanistan. Clarté cristalline remarquable et couleur verte intense.'
    }
  },
  topaz: {
    de: {
      title: 'Natürlicher Champagner Topas kaufen | Katlang | NobleCutGems',
      desc: 'Unbehandelte Champagner-Topase aus Katlang (Pakistan). 100% natürliche Farbe, warmer Pfirsichglanz.'
    },
    en: {
      title: 'Buy Natural Champagne Topaz | Pakistan Katlang | NobleCutGems',
      desc: 'Natural untreated champagne topazes from Katlang, Pakistan. Warm peach and honey brilliance, zero radiation treatment.'
    },
    fr: {
      title: 'Topazes Champagne Naturelles | Katlang Pakistan | NobleCutGems',
      desc: 'Topazes précieuses de couleur champagne naturelle du Pakistan. Éclat chaleureux non irradié.'
    }
  },
  tourmaline: {
    de: {
      title: 'Bi-Color Turmaline kaufen | Unikatschliff | NobleCutGems',
      desc: 'Mehrfarbige Bi-Color Turmaline mit faszinierenden Farbzonen von Paraíba-Blau bis Smaragdgrün.'
    },
    en: {
      title: 'Buy Bi-Color Tourmalines | Multi-Color Collector Gems | NobleCutGems',
      desc: 'Exquisite bi-color tourmalines displaying spectacular natural color zoning. One-of-a-kind collector cuts direct from mine.'
    },
    fr: {
      title: 'Tourmalines Bicolores Rares | Tailles de Précision | NobleCutGems',
      desc: 'Tourmalines bicolores d’exception aux zonages spectaculaires. Pièces uniques pour créations sur-mesure.'
    }
  }
};

export function generateStaticParams() {
  const languages = ['de', 'en', 'fr'];
  const params = [];

  for (const lang of languages) {
    for (const type of validTypes) {
      params.push({ lang, type });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { lang, type } = await params;
  const lowerType = type.toLowerCase();

  if (!validTypes.includes(lowerType)) return {};

  const seo = categorySeo[lowerType]?.[lang] || categorySeo[lowerType]?.en || categorySeo.sapphire.en;
  const url = `https://www.noblecutgems.com/${lang}/category/${lowerType}`;

  return {
    title: seo.title,
    description: seo.desc,
    alternates: {
      canonical: url,
      languages: {
        de: `https://www.noblecutgems.com/de/category/${lowerType}`,
        en: `https://www.noblecutgems.com/en/category/${lowerType}`,
        fr: `https://www.noblecutgems.com/fr/category/${lowerType}`,
        'x-default': `https://www.noblecutgems.com/en/category/${lowerType}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.desc,
      url,
      siteName: 'NobleCutGems',
      locale: lang,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }) {
  const { lang, type } = await params;
  const lowerType = type.toLowerCase();

  if (!validTypes.includes(lowerType)) {
    notFound();
  }

  const stones = gemstones.filter(
    (s) => s.type?.toLowerCase() === lowerType && !s.is_sold
  );

  const seo = categorySeo[lowerType]?.[lang] || categorySeo[lowerType]?.en || categorySeo.sapphire.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: seo.title,
    description: seo.desc,
    url: `https://www.noblecutgems.com/${lang}/category/${lowerType}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: stones.map((stone, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.noblecutgems.com/${lang}/stone/${stone.slug}`,
        name: stone.name,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryClient lang={lang} type={lowerType} stones={stones} />
    </>
  );
}

