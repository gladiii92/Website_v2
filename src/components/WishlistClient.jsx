'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Search, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { gemstones } from '../data/Gemstones';
import { useWishlist } from '../context/WishlistContext';

const translations = {
  de: {
    wishlist: 'Wunschliste',
    wishlist_desc: 'Ihre gespeicherten Edelsteine',
    empty_wishlist: 'Ihre Wunschliste ist leer.',
    empty_desc: 'Stöbern Sie in unserer Kollektion und speichern Sie Ihre Favoriten.',
    view_collection: 'Zur Kollektion',
    view_details: 'Details ansehen',
    send_inquiry: 'Gemeinsame Anfrage senden',
    stone_names: {
      1: 'Gelber Saphir', 2: 'Blauer Spinell', 3: 'Blau-Grüner Saphir', 4: 'Lavendel Spinell',
      5: 'Grüner Peridot', 6: 'Rot-Pinker Spinell', 7: 'Kashmir Saphir', 8: 'Electric-Blauer Saphir',
      9: 'Orange-Gelber Mali Granat', 10: 'Gelber Mali Granat', 11: 'Orangener Mali Granat', 12: 'Gelber Mali Granat',
      13: 'Gelblich-Grüner Mali Granat', 14: 'Gelblich-Brauner Mali Granat', 15: 'Roter Rubin',
      16: 'Lila-Roter Rubin', 17: 'Roter Rubin', 18: 'Lebendig-Grüner Peridot', 19: 'Dunkel-Blau-Grüner Saphir',
      20: 'Hellgrüner Smaragd', 21: 'Champagner Topaz', 22: 'Bi-Color Tourmalin'
    },
    cuts: {
      oval: 'Oval', cushion: 'Kissen', brilliant: 'Brillant', round: 'Rund',
      emerald: 'Smaragd', princess: 'Prinzessin', marquise: 'Marquise',
      pear: 'Birne', asscher: 'Asscher', radiant: 'Radiant',
      trilliant: 'Trilliant', heart: 'Herz', fancy: 'Unikat', triangle: 'Dreieck'
    },
    origins: {
      ceylon: 'Ceylon', myanmar: 'Myanmar', colombia: 'Kolumbien', zambia: 'Sambia', brazil: 'Brasilien',
      madagascar: 'Madagaskar', tanzania: 'Tansania', srilanka: 'Sri Lanka', india: 'Indien', mali: 'Mali',
      pakistan: 'Pakistan', afghanistan: 'Afghanistan', burma: 'Burma', unknown: 'Unbekannt'
    },
    raritylevels: {
      exceptional: 'Außergewöhnlich', rare: 'Selten', premium: 'Premium', select: 'Einsteiger', none: 'Keine Angabe'
    }
  },
  en: {
    wishlist: 'Wishlist',
    wishlist_desc: 'Your saved gemstones',
    empty_wishlist: 'Your wishlist is empty.',
    empty_desc: 'Browse our collection and save your favorites.',
    view_collection: 'To Collection',
    view_details: 'View Details',
    send_inquiry: 'Send joint inquiry',
    stone_names: {
      1: 'Yellow Sapphire', 2: 'Blue Spinel', 3: 'Blueish-Green Sapphire', 4: 'Lavender Spinel',
      5: 'Green Peridot', 6: 'Reddish-Pink Spinel', 7: 'Kashmir Sapphire', 8: 'Electric-Blue Sapphire',
      9: 'Orange-Yellow Mali Garnet', 10: 'Yellow Mali Garnet', 11: 'Orange Mali Garnet', 12: 'Yellow Mali Garnet',
      13: 'Yellowish-Green Mali Garnet', 14: 'Yellowish-Brown Mali Garnet', 15: 'Red Ruby',
      16: 'Pinkish-Red Ruby', 17: 'Red Ruby', 18: 'Vivid-Green Peridot', 19: 'Dark-Teal Sapphire',
      20: 'Light-Green Emerald', 21: 'Champagne Topaz', 22: 'Bi-Color Tourmaline'
    },
    cuts: {
      oval: 'Oval', cushion: 'Cushion', brilliant: 'Brilliant', round: 'Round',
      emerald: 'Emerald-Cut', princess: 'Princess-Cut', marquise: 'Marquise',
      pear: 'Pear', asscher: 'Asscher', radiant: 'Radiant',
      trilliant: 'Trilliant', heart: 'Heart', fancy: 'Fancy', triangle: 'Triangle'
    },
    origins: {
      ceylon: 'Ceylon', myanmar: 'Myanmar', colombia: 'Colombia', zambia: 'Zambia', brazil: 'Brazil',
      madagascar: 'Madagascar', tanzania: 'Tanzania', srilanka: 'Sri Lanka', india: 'India', mali: 'Mali',
      pakistan: 'Pakistan', afghanistan: 'Afghanistan', burma: 'Burma', unknown: 'Unknown'
    },
    raritylevels: {
      exceptional: 'Exceptional', rare: 'Rare', premium: 'Premium', select: 'Beginner', none: 'No Specification'
    }
  },
  fr: {
    wishlist: 'Liste de souhaits',
    wishlist_desc: 'Vos pierres précieuses sauvegardées',
    empty_wishlist: 'Votre liste de souhaits est vide.',
    empty_desc: 'Parcourez notre collection et sauvegardez vos favoris.',
    view_collection: 'Voir la Collection',
    view_details: 'Voir les Détails',
    send_inquiry: 'Envoyer une demande conjointe',
    stone_names: {
      1: 'Saphir Jaune', 2: 'Spinelle Bleu', 3: 'Saphir Bleu-Vert', 4: 'Spinelle Lavande',
      5: 'Péridot Vert', 6: 'Spinelle Rouge-Rose', 7: 'Saphir du Cachemire', 8: 'Saphir Bleu-Électrique',
      9: 'Grenat Orange-Jaune du Mali', 10: 'Grenat Jaune du Mali', 11: 'Grenat Orange du Mali', 12: 'Grenat Jaune du Mali',
      13: 'Grenat Vert-Jaunâtre du Mali', 14: 'Grenat Brun-Jaunâtre du Mali', 15: 'Rubis Rouge',
      16: 'Rubis Rouge-Pourpre', 17: 'Rubis Rouge', 18: 'Péridot Vert-Vif', 19: 'Saphir Bleu-Sarcelle-Foncé',
      20: 'Émeraude Vert-Clair', 21: 'Topaze Champagne', 22: 'Tourmaline Bicolore'
    },
    cuts: {
      oval: 'Ovale', cushion: 'Coussin', brilliant: 'Brillant', round: 'Rond',
      emerald: 'Émeraude', princess: 'Princesse', marquise: 'Marquise',
      pear: 'Poire', asscher: 'Asscher', radiant: 'Radiant',
      trilliant: 'Trilliant', heart: 'Cœur', fancy: 'Fantaisie', triangle: 'Triangle'
    },
    origins: {
      ceylon: 'Ceylan', myanmar: 'Birmanie', colombia: 'Colombie', zambia: 'Zambie', brazil: 'Brésil',
      madagascar: 'Madagascar', tanzania: 'Tanzanie', srilanka: 'Sri Lanka', india: 'Inde', mali: 'Mali',
      pakistan: 'Pakistan', afghanistan: 'Afghanistan', burma: 'Birmanie', unknown: 'Inconnu'
    },
    raritylevels: {
      exceptional: 'Exceptionnel', rare: 'Rare', premium: 'Premium', select: 'Débutants', none: 'Aucune Spécification'
    }
  }
};

export default function WishlistClient({ lang }) {
  const [language, setLanguage] = useState(lang);
  const [isMobile, setIsMobile] = useState(false);
  const { wishlist, toggleWishlist, isInWishlist, isLoaded } = useWishlist();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = translations[language] || translations.de;

  const getTranslatedCut = (cut) => t.cuts?.[cut?.toLowerCase()] || cut || 'N/A';
  const getTranslatedOrigin = (origin) => t.origins?.[origin?.toLowerCase()] || origin || 'N/A';
  const getTranslatedRarity = (rarity) => t.raritylevels?.[rarity?.toLowerCase()] || rarity || t.raritylevels.none;
  const getTranslatedStoneName = (stoneId) => {
    if (t.stone_names?.[stoneId]) return t.stone_names[stoneId];
    const found = gemstones.find(s => s.id === stoneId);
    return found?.name || '';
  };

  const getRarityColor = (rarity) => {
    const colors = {
      exceptional: 'bg-purple-100 text-purple-800 border-purple-200',
      rare:        'bg-amber-100 text-amber-800 border-amber-200',
      premium:     'bg-blue-100 text-blue-800 border-blue-200',
      select:      'bg-green-100 text-green-800 border-green-200',
    };
    return colors[rarity] || colors.select;
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(price);

  const wishlistStones = gemstones.filter(stone => wishlist.includes(stone.id));

  if (!isLoaded) return <div className="min-h-screen py-24" />;

  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-4">
            <Heart className="w-10 h-10 text-cta-color" fill="currentColor" /> {t.wishlist}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t.wishlist_desc} ({wishlistStones.length})
          </p>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary-color)' }} />
        </div>

        {wishlistStones.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.empty_wishlist}</h3>
            <p className="text-gray-600 mb-8">{t.empty_desc}</p>
            <Link href={`/${language}/collection`}>
              <Button className="bg-primary-color hover:bg-blue-600 text-white transition-all duration-300">
                {t.view_collection}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlistStones.map((stone) => (
                <Link key={stone.id} href={`/${language}/stone/${stone.slug}`}>
                  <div className={`group bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 ${!isMobile ? 'hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2' : ''}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {stone.main_image_url && (
                        <Image src={stone.main_image_url} alt={`${stone.name} Ansicht`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={`w-full h-full object-cover ${!isMobile ? 'group-hover:scale-110 transition-transform duration-700' : ''}`} loading="lazy" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <Badge className={`${getRarityColor(stone.rarity_level)} border backdrop-blur-sm`}>
                          {getTranslatedRarity(stone.rarity_level)}
                        </Badge>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(stone.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 z-10 ${isInWishlist(stone.id) ? 'bg-white text-red-500' : 'bg-white/70 text-gray-700 hover:bg-white hover:text-red-500'}`}
                        >
                          <Heart className="w-5 h-5" fill={isInWishlist(stone.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="serif-heading text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {getTranslatedStoneName(stone.id)}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {stone.carat_weight}ct • {getTranslatedCut(stone.cut)} • {getTranslatedOrigin(stone.origin)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="serif-heading text-xl font-bold text-gray-900">
                          {formatPrice(stone.price_eur)}
                        </span>
                        <Button className="bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300">
                          {t.view_details}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-16 text-center">
               <Link href={`/${language}/contact?stones=${wishlistStones.map(s => s.id).join(',')}`}>
                  <Button className="bg-cta-color hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-none transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
                    {t.send_inquiry}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
               </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

