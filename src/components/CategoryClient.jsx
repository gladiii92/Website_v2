'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Shield, Award, ArrowRight, Heart, ArrowLeft } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useWishlist } from '../context/WishlistContext';

const categoryDetails = {
  sapphire: {
    de: {
      title: 'Unbehandelte Saphire',
      subtitle: '100% natürliche Saphire aus Ceylon & Madagaskar – ungebrannt mit faszinierender Brillanz.',
      facts: 'Mohshärte 9 • Unbehandelt (Unheated) • Herkunft: Sri Lanka (Ceylon) & Madagaskar',
      description: 'Saphire gehören zu den begehrtesten Edelsteinen der Welt. Unsere Kollektion umfasst ausschließlich unbehandelte Steine, deren Farbsättigung rein durch die Natur entstand – ganz ohne künstliche Hitzebehandlung oder Blei-Glas-Füllung.'
    },
    en: {
      title: 'Untreated Natural Sapphires',
      subtitle: '100% natural, unheated sapphires from Ceylon & Madagascar with exceptional fire.',
      facts: 'Mohs Hardness 9 • 100% Unheated • Provenance: Sri Lanka (Ceylon) & Madagascar',
      description: 'Sapphires are among the most revered gemstones in history. Our curated selection features strictly untreated stones with natural color zoning and vivid brilliance, ideal for custom heirloom rings or discerning collectors.'
    },
    fr: {
      title: 'Saphirs Naturels Non Traités',
      subtitle: 'Saphirs 100% naturels de Ceylan & Madagascar – non chauffés avec un éclat pur.',
      facts: 'Dureté Mohs 9 • Non Chauffé • Origine : Sri Lanka (Ceylan) & Madagascar',
      description: 'Joyaux de noblesse, nos saphirs de Ceylan et de Madagascar sont rigoureusement non traités, préservant la pureté originelle que la nature a façonnée sur des millions d’années.'
    }
  },
  spinel: {
    de: {
      title: 'Natürliche Spinelle',
      subtitle: 'Feurige blaue, rote und lavendelfarbene Spinelle aus Tansania und Burma.',
      facts: 'Mohshärte 8 • Einzelbrechend • Herkunft: Tansania (Mahenge) & Burma',
      description: 'Spinelle galten historisch als Steine der Könige. Durch ihre Einzelbrechung bieten sie ein unvergleichlich reines Farberlebnis ohne störende Nebentöne. Vollkommen unbehandelt und extrem rar.'
    },
    en: {
      title: 'Natural Rare Spinels',
      subtitle: 'Vibrant blue, red, and lavender spinels from Tanzania and Burma with intense fire.',
      facts: 'Mohs Hardness 8 • Singly Refractive • Provenance: Tanzania (Mahenge) & Burma',
      description: 'Spinels are the connoisseur’s gem. Singly refractive like diamonds, they exhibit unmatched spectral purity and brilliance. 100% untreated natural treasures for bespoke jewelry.'
    },
    fr: {
      title: 'Spinelles Naturels Rares',
      subtitle: 'Spinelles éclatants bleus, rouges et lavande de Tanzanie et de Birmanie.',
      facts: 'Dureté Mohs 8 • Réfraction Simple • Origine : Tanzanie & Birmanie',
      description: 'Longtemps confondus avec les plus beaux rubis et saphirs de la couronne, les spinelles naturels séduisent par leur feu cristallin et leur rareté géologique absolue.'
    }
  },
  peridot: {
    de: {
      title: 'Lebendige Grüne Peridote',
      subtitle: 'Intensive oliv- bis smaragdgrüne Peridote aus den Hochgebirgen Pakistans.',
      facts: 'Mohshärte 6.5–7 • Natürlich Unbehandelt • Herkunft: Pakistan (Kashmir-Region)',
      description: 'Der Edelstein des Lichts: Unsere pakistanischen Peridote stammen aus Höhenlagen von über 4.000 Metern und zeichnen sich durch ein leuchtendes, ungetrübtes Olivgrün von seltener Reinheit aus.'
    },
    en: {
      title: 'Vivid Green Peridots',
      subtitle: 'Intense olive to vivid-green natural peridots from the high mountains of Pakistan.',
      facts: 'Mohs Hardness 6.5–7 • Natural Untreated • Provenance: Pakistan',
      description: 'Known as the gem of the sun, our Pakistani peridots are ethically sourced from extreme altitudes. They showcase an electric, crisp green saturation unmatched by common deposits.'
    },
    fr: {
      title: 'Péridots Vert Vif',
      subtitle: 'Péridots naturels d’un vert olive profond issus des hautes montagnes du Pakistan.',
      facts: 'Dureté Mohs 6.5–7 • Non Traité • Origine : Pakistan',
      description: 'Éclatants sous toutes les lumières, nos péridots du Pakistan offrent une teinte verte vibrante et une clarté remarquable pour des créations joaillières contemporaines.'
    }
  },
  garnet: {
    de: {
      title: 'Seltene Mali Granate',
      subtitle: 'Feurige gelb-orange Grossular-Andradit Granate aus Mali mit enormer Dispersion.',
      facts: 'Mohshärte 7–7.5 • Außergewöhnliches Feuer • Herkunft: Mali (Westafrika)',
      description: 'Mali-Granate sind eine rare geologische Laune der Natur: Eine natürliche Kreuzung aus Grossular und Andradit. Sie besitzen eine Diamant-nahe Dispersion, die im Sonnenlicht wie reines Gold funkelt.'
    },
    en: {
      title: 'Rare Untreated Mali Garnets',
      subtitle: 'Fiery golden-yellow and orange Grossular-Andradite garnets with diamond-like fire.',
      facts: 'Mohs Hardness 7–7.5 • High Dispersion • Provenance: Mali (West Africa)',
      description: 'Mali garnets represent a rare geological phenomenon combining grossular and andradite varieties. Their refractive brilliance and warm honey-amber fire rival fine fancy diamonds.'
    },
    fr: {
      title: 'Grenats Rares du Mali',
      subtitle: 'Grenats jaune d’or et orangés d’une dispersion remarquable venus du Mali.',
      facts: 'Dureté Mohs 7–7.5 • Éclat Intense • Origine : Mali (Afrique de l’Ouest)',
      description: 'Découverts dans les années 1990 au Mali, ces grenats hybrides uniques se distinguent par une brillance exceptionnelle rappelant les diamants de couleur fancy.'
    }
  },
  ruby: {
    de: {
      title: 'Unbehandelte Natur-Rubine',
      subtitle: 'Echte, ungebrannte Rubine aus Madagaskar mit lebendigem Rot und samtiger Tiefe.',
      facts: 'Mohshärte 9 • 100% Unbehandelt • Herkunft: Madagaskar',
      description: '99% aller Rubine im Massenmarkt werden thermisch erhitzt oder mit Bleiglas stabilisiert. Unsere Madagaskar-Rubine sind vollkommen unbehandelt, rein und von bleibendem Sammlerwert.'
    },
    en: {
      title: 'Natural Unheated Rubies',
      subtitle: 'Authentic untreated rubies from Madagascar with velvety vivid red saturation.',
      facts: 'Mohs Hardness 9 • 100% Unheated • Provenance: Madagascar',
      description: 'While commercial rubies are overwhelmingly heat-treated or glass-filled, our Madagascar rubies retain their original earth-born purity and natural crimson fire.'
    },
    fr: {
      title: 'Rubis Naturels Non Chauffés',
      subtitle: 'Rubis authentiques de Madagascar d’un rouge profond et velouté.',
      facts: 'Dureté Mohs 9 • Non Traité • Origine : Madagascar',
      description: 'Rares et précieux, nos rubis de Madagascar sont exempts de tout traitement thermique, garantissant l’intégrité minérale absolue recherchée par les connaisseurs.'
    }
  },
  emerald: {
    de: {
      title: 'Feine Natur-Smaragde',
      subtitle: 'Kristallklare Smaragde aus Afghanistan mit edler Mint- bis Waldgrünfärbung.',
      facts: 'Mohshärte 7.5–8 • Natürlicher Kristall • Herkunft: Afghanistan (Pandschschir)',
      description: 'Smaragde aus dem afghanischen Pandschschir-Tal genießen weltweites Renommee für ihre unvergleichliche Transparenz und lebendige Grünnuance.'
    },
    en: {
      title: 'Fine Natural Emeralds',
      subtitle: 'Crystal-clear emeralds from Afghanistan featuring noble mint to forest-green hues.',
      facts: 'Mohs Hardness 7.5–8 • Natural Crystal • Provenance: Afghanistan (Panjshir)',
      description: 'Afghan Panjshir emeralds are celebrated among top gemologists for their exceptional transparency and lush, crystalline green life.'
    },
    fr: {
      title: 'Émeraudes Naturelles Fines',
      subtitle: 'Émeraudes cristallines d’Afghanistan aux teintes vert menthe et forêt.',
      facts: 'Dureté Mohs 7.5–8 • Cristal Naturel • Origine : Afghanistan',
      description: 'Réputées pour leur limpidité singulière, ces émeraudes afghanes offrent une pureté cristalline remarquable dans l’univers des gemmes vertes d’exception.'
    }
  },
  topaz: {
    de: {
      title: 'Natürliche Champagner-Topase',
      subtitle: 'Edle Katlang-Topase aus Pakistan mit warmem Champagner- und Pfirsichton.',
      facts: 'Mohshärte 8 • Unbehandelt • Herkunft: Pakistan (Katlang)',
      description: 'Anders als gängige bestrahlte Blautopase sind diese pakistanischen Champagner-Topase vollkommen natürlich gefärbt und bestechen durch warmen Luxusglanz.'
    },
    en: {
      title: 'Natural Champagne Topaz',
      subtitle: 'Precious Katlang topazes from Pakistan exhibiting warm champagne and peach tones.',
      facts: 'Mohs Hardness 8 • Natural Untreated • Provenance: Pakistan (Katlang)',
      description: 'Unlike commercial irradiated blue topazes, our Katlang topazes feature 100% natural champagne-peach hues with brilliant light performance.'
    },
    fr: {
      title: 'Topazes Champagne Naturelles',
      subtitle: 'Topazes précieuses de Katlang (Pakistan) aux nuances chaudes de champagne et pêche.',
      facts: 'Dureté Mohs 8 • Non Traité • Origine : Pakistan',
      description: 'D’une brillance douce et sophistiquée, ces topazes naturelles pakistanaises séduisent par leur couleur champagne authentique et leur éclat immaculé.'
    }
  },
  tourmaline: {
    de: {
      title: 'Bi-Color Turmaline',
      subtitle: 'Faszinierende mehrfarbige Turmaline mit spektakulärer Farbzonierung.',
      facts: 'Mohshärte 7–7.5 • Meisterunikat • Herkunft: Pakistan',
      description: 'Turmaline vereinen oft zwei oder mehr Farben in einem einzigen Kristall. Unsere Bi-Color Exemplare zeigen atemberaubende Farbzonierungen von Paraíba-Blau bis Smaragdgrün.'
    },
    en: {
      title: 'Bi-Color Tourmalines',
      subtitle: 'Fascinating multi-hued tourmalines showcasing dramatic natural color zoning.',
      facts: 'Mohs Hardness 7–7.5 • One-of-a-Kind • Provenance: Pakistan',
      description: 'Bi-color tourmalines capture two natural color realms within a single gem. From paraíba-tinted blues to vibrant greens, each stone is an unrepeatable collector piece.'
    },
    fr: {
      title: 'Tourmalines Bicolores',
      subtitle: 'Tourmalines fascinantes affichant un zonage de couleur naturel spectaculaire.',
      facts: 'Dureté Mohs 7–7.5 • Pièce Unique • Origine : Pakistan',
      description: 'Véritables tableaux minéraux, les tourmalines bicolores réunissent deux teintes distinctes dans un même prisme cristallin, sculpté avec art par nos maîtres lapidaires.'
    }
  }
};

const allCategories = [
  { key: 'sapphire', labelDe: 'Saphir', labelEn: 'Sapphire', labelFr: 'Saphir' },
  { key: 'spinel', labelDe: 'Spinell', labelEn: 'Spinel', labelFr: 'Spinelle' },
  { key: 'peridot', labelDe: 'Peridot', labelEn: 'Peridot', labelFr: 'Péridot' },
  { key: 'garnet', labelDe: 'Mali Granat', labelEn: 'Mali Garnet', labelFr: 'Grenat' },
  { key: 'ruby', labelDe: 'Rubin', labelEn: 'Ruby', labelFr: 'Rubis' },
  { key: 'emerald', labelDe: 'Smaragd', labelEn: 'Emerald', labelFr: 'Émeraude' },
  { key: 'topaz', labelDe: 'Topas', labelEn: 'Topaz', labelFr: 'Topaze' },
  { key: 'tourmaline', labelDe: 'Turmalin', labelEn: 'Tourmaline', labelFr: 'Tourmaline' }
];

export default function CategoryClient({ lang, type, stones }) {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const details = categoryDetails[type]?.[lang] || categoryDetails[type]?.en || categoryDetails.sapphire.en;

  const formatPrice = (price) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const getRarityColor = (rarity) => {
    const colors = {
      exceptional: 'bg-purple-100 text-purple-800 border-purple-200',
      rare: 'bg-amber-100 text-amber-800 border-amber-200',
      premium: 'bg-blue-100 text-blue-800 border-blue-200',
      select: 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[rarity] || colors.select;
  };

  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/${lang}/collection`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'en' ? 'Back to All Gemstones' : lang === 'fr' ? 'Retour à la collection' : 'Zurück zur Gesamtkollektion'}
        </Link>

        {/* Hero Category Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-amber-100 text-amber-900 border-amber-200 mb-4 px-3 py-1 text-xs uppercase tracking-widest font-semibold">
            {details.facts}
          </Badge>
          <h1 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {details.title}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            {details.subtitle}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            {details.description}
          </p>
          <div className="w-24 h-1 mx-auto bg-cta-color" />
        </div>

        {/* Trust Badges Strip */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 mb-16 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-800 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">{lang === 'en' ? '100% Untreated Natural Gems' : lang === 'fr' ? '100% Pierres Naturelles Non Traitées' : '100% Unbehandelte Natursteine'}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="font-medium">{lang === 'en' ? '30-Day Inspection & Money-Back' : lang === 'fr' ? 'Garantie d\'inspection de 30 jours' : '30 Tage Ansichts- & Rückgaberecht'}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{lang === 'en' ? 'Worldwide Fully Insured Shipping' : lang === 'fr' ? 'Expédition Internationale Assurée' : 'Vollversicherter Expressversand'}</span>
          </div>
        </div>

        {/* Products Grid */}
        {stones.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-gray-600 text-lg mb-4">
              {lang === 'en' ? 'Currently all stones in this category are reserved or sold.' : lang === 'fr' ? 'Toutes les pierres de cette catégorie sont actuellement réservées.' : 'Aktuell sind alle Steine dieser Kategorie reserviert oder vergriffen.'}
            </p>
            <Link href={`/${lang}/collection`}>
              <Button className="bg-cta-color text-white">
                {lang === 'en' ? 'Browse Full Collection' : lang === 'fr' ? 'Voir toute la collection' : 'Gesamte Kollektion ansehen'}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {stones.map((stone) => (
              <Link key={stone.id} href={`/${lang}/stone/${stone.slug}`} className="group block">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
                  {/* Media Preview */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={stone.main_image_url}
                      alt={stone.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`${getRarityColor(stone.rarity_level)} border text-xs`}>
                        {stone.rarity_level}
                      </Badge>
                      <Badge className="bg-white/90 text-gray-800 border text-xs font-semibold">
                        {stone.carat_weight}ct
                      </Badge>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(stone.id);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 z-10 ${
                        isInWishlist(stone.id) ? 'bg-white text-red-500' : 'bg-white/80 text-gray-700 hover:bg-white hover:text-red-500'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className="w-5 h-5" fill={isInWishlist(stone.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="serif-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-800 transition-colors">
                        {stone.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {stone.cut} • {stone.origin} • {stone.treatment === 'untreated' ? 'Unheated' : stone.treatment}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="serif-heading text-2xl font-bold text-gray-900">
                        {formatPrice(stone.price_eur)}
                      </span>
                      <Button className="bg-cta-color hover:bg-orange-600 text-white text-sm font-semibold flex items-center gap-1">
                        {lang === 'en' ? 'Details' : lang === 'fr' ? 'Détails' : 'Details'}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Other Categories Internal Links (SEO Equity) */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="serif-heading text-2xl font-bold text-gray-900 mb-6 text-center">
            {lang === 'en' ? 'Explore Other Untreated Gemstone Varieties' : lang === 'fr' ? 'Découvrir nos autres variétés de pierres précieuses' : 'Weitere unbehandelte Edelstein-Arten entdecken'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {allCategories
              .filter((c) => c.key !== type)
              .map((c) => (
                <Link key={c.key} href={`/${lang}/category/${c.key}`}>
                  <Button variant="outline" className="border-gray-200 hover:border-amber-600 hover:text-amber-800 transition-colors">
                    {lang === 'en' ? c.labelEn : lang === 'fr' ? c.labelFr : c.labelDe}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

