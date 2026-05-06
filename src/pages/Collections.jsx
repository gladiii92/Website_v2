import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Search, Filter, ChevronDown, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/Select';
import { gemstones } from '../data/Gemstones';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function StoneDetails({ stone, getTranslatedCut, getTranslatedOrigin }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [showOrigin, setShowOrigin] = useState(true);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      setShowOrigin(textWidth <= containerWidth);
    }
  }, [stone]);

  return (
    <p ref={containerRef} className="text-gray-600 text-sm mb-2 relative overflow-hidden whitespace-nowrap">
      {stone.carat_weight}ct • {getTranslatedCut(stone.cut)}{showOrigin ? ` • ${getTranslatedOrigin(stone.origin)}` : ''}
      <span ref={textRef} className="absolute invisible whitespace-nowrap">
        {stone.carat_weight}ct • {getTranslatedCut(stone.cut)} • {getTranslatedOrigin(stone.origin)}
      </span>
    </p>
  );
}

const translations = {
  de: {
    collectiontitle: 'Unsere Kollektion',
    collectionsubtitle: 'Entdecken Sie außergewöhnliche Edelsteine aus aller Welt',
    searchplaceholder: 'Nach Edelsteinen suchen...',
    filtertype: 'Typ...',
    filterprice: 'Preis',
    filterrarity: 'Seltenheit',
    sortby: 'Sortieren nach',
    sortnewest: 'Neueste',
    sortpricelow: 'Preis aufsteigend',
    sortpricehigh: 'Preis absteigend',
    sortcarat: 'Karat',
    alltypes: 'Alle Typen',
    allprices: 'Alle Preise',
    allrarity: 'Alle Seltenheiten',
    priceunder5k: 'Unter 50 €',
    price5k15k: '50 – 500 €',
    price15k50k: '500 – 5.000 €',
    priceover50k: 'Über 5.000 €',
    viewdetails: 'Details ansehen',
    noresults: 'Keine Edelsteine gefunden',
    noresultsdesc: 'Versuchen Sie, Ihre Suchkriterien zu ändern',
    stonesfound: 'Edelsteine gefunden',
    resetfilters: 'Filter zurücksetzen',
    cuts: {
      oval: 'Oval', cushion: 'Kissen', brilliant: 'Brillant', round: 'Rund',
      emerald: 'Smaragd', princess: 'Prinzessin', marquise: 'Marquise',
      pear: 'Birne', asscher: 'Asscher', radiant: 'Radiant',
      trilliant: 'Trilliant', heart: 'Herz', fancy: 'Unikat',
      triangle: 'Dreieck',
    },
    origins: {
      ceylon: 'Ceylon', myanmar: 'Myanmar', colombia: 'Kolumbien',
      zambia: 'Sambia', brazil: 'Brasilien', madagascar: 'Madagaskar',
      tanzania: 'Tansania', srilanka: 'Sri Lanka', india: 'Indien',
      mali: 'Mali', pakistan: 'Pakistan', afghanistan: 'Afghanistan',
      burma: 'Burma', unknown: 'Unbekannt',
    },
    types: {
      diamond: 'Diamant', ruby: 'Rubin', sapphire: 'Saphir',
      spinel: 'Spinell', emerald: 'Smaragd', tanzanite: 'Tansanit',
      tourmaline: 'Turmalin', garnet: 'Granat', amethyst: 'Amethyst',
      citrine: 'Citrin', topaz: 'Topas', peridot: 'Peridot',
      aquamarine: 'Aquamarin', opal: 'Opal', jade: 'Jade',
      pearl: 'Perle', other: 'Andere',
    },
    // ─── STEINAMEN (DE) ─────────────────────────────────────────────────────
    // NUR für Steine 1–22 nötig. Ab ID 23 wird stone.name direkt verwendet.
    // Um einen neuen Stein hinzuzufügen: nur in Gemstones.js eintragen!
    stonenames: {
      1: 'Gelber Saphir',
      2: 'Blauer Spinell',
      3: 'Blau-Grüner Saphir',
      4: 'Lavendel Spinell',
      5: 'Grüner Peridot',
      6: 'Rot-Pinker Spinell',
      7: 'Kashmir Saphir',
      8: 'Electric-Blauer Saphir',
      9: 'Orange-Gelber Mali Granat',
      10: 'Gelber Mali Granat',
      11: 'Orangener Mali Granat',
      12: 'Gelber Mali Granat',
      13: 'Gelblich-Grüner Mali Granat',
      14: 'Gelblich-Brauner Mali Granat',
      15: 'Roter Rubin',
      16: 'Lila-Roter Rubin',
      17: 'Roter Rubin',
      18: 'Lebendig-Grüner Peridot',
      19: 'Dunkel-Blau-Grüner Saphir',
      20: 'Hellgrüner Smaragd',
      21: 'Champagner Topaz',
      22: 'Bi-Color Tourmalin',
    },
    raritylevels: {
      exceptional: 'Außergewöhnlich',
      rare: 'Selten',
      premium: 'Premium',
      select: 'Einsteiger',
      none: 'Keine Angabe',
    },
  },

  en: {
    collectiontitle: 'Our Collection',
    collectionsubtitle: 'Discover exceptional gemstones from around the world',
    searchplaceholder: 'Search for gemstones...',
    filtertype: 'Type',
    filterprice: 'Price',
    filterrarity: 'Rarity',
    sortby: 'Sort by',
    sortnewest: 'Newest',
    sortpricelow: 'Price ascending',
    sortpricehigh: 'Price descending',
    sortcarat: 'Carat',
    alltypes: 'All Types',
    allprices: 'All Prices',
    allrarity: 'All Rarities',
    priceunder5k: 'Under €50',
    price5k15k: '€50 – €500',
    price15k50k: '€500 – €5,000',
    priceover50k: 'Over €5,000',
    viewdetails: 'View Details',
    noresults: 'No gemstones found',
    noresultsdesc: 'Try adjusting your search criteria',
    stonesfound: 'gemstones found',
    resetfilters: 'Reset filters',
    cuts: {
      oval: 'Oval', cushion: 'Cushion', brilliant: 'Brilliant', round: 'Round',
      emerald: 'Emerald-Cut', princess: 'Princess-Cut', marquise: 'Marquise',
      pear: 'Pear', asscher: 'Asscher', radiant: 'Radiant',
      trilliant: 'Trilliant', heart: 'Heart', fancy: 'Fancy',
      triangle: 'Triangle',
    },
    origins: {
      ceylon: 'Ceylon', myanmar: 'Myanmar', colombia: 'Colombia',
      zambia: 'Zambia', brazil: 'Brazil', madagascar: 'Madagascar',
      tanzania: 'Tanzania', srilanka: 'Sri Lanka', india: 'India',
      mali: 'Mali', pakistan: 'Pakistan', afghanistan: 'Afghanistan',
      burma: 'Burma', unknown: 'Unknown',
    },
    types: {
      diamond: 'Diamond', ruby: 'Ruby', sapphire: 'Sapphire',
      spinel: 'Spinel', emerald: 'Emerald', tanzanite: 'Tanzanite',
      tourmaline: 'Tourmaline', garnet: 'Garnet', amethyst: 'Amethyst',
      citrine: 'Citrine', topaz: 'Topaz', peridot: 'Peridot',
      aquamarine: 'Aquamarine', opal: 'Opal', jade: 'Jade',
      pearl: 'Pearl', other: 'Other',
    },
    stonenames: {
      1: 'Yellow Sapphire',
      2: 'Blue Spinel',
      3: 'Blueish-Green Sapphire',
      4: 'Lavender Spinel',
      5: 'Green Peridot',
      6: 'Reddish-Pink Spinel',
      7: 'Kashmir Sapphire',
      8: 'Electric-Blue Sapphire',
      9: 'Orange-Yellow Mali Garnet',
      10: 'Yellow Mali Garnet',
      11: 'Orange Mali Garnet',
      12: 'Yellow Mali Garnet',
      13: 'Yellowish-Green Mali Garnet',
      14: 'Yellowish-Brown Mali Garnet',
      15: 'Red Ruby',
      16: 'Pinkish-Red Ruby',
      17: 'Red Ruby',
      18: 'Vivid-Green Peridot',
      19: 'Dark-Teal Sapphire',
      20: 'Light-Green Emerald',
      21: 'Champagne Topaz',
      22: 'Bi-Color Tourmaline',
    },
    raritylevels: {
      exceptional: 'Exceptional',
      rare: 'Rare',
      premium: 'Premium',
      select: 'Beginner',
      none: 'No Specification',
    },
  },

  fr: {
    collectiontitle: 'Notre Collection',
    collectionsubtitle: 'Découvrez des pierres précieuses exceptionnelles du monde entier',
    searchplaceholder: 'Rechercher des pierres précieuses...',
    filtertype: 'Type',
    filterprice: 'Prix',
    filterrarity: 'Rareté',
    sortby: 'Trier par',
    sortnewest: 'Plus récent',
    sortpricelow: 'Prix croissant',
    sortpricehigh: 'Prix décroissant',
    sortcarat: 'Carat',
    alltypes: 'Tous les Types',
    allprices: 'Tous les Prix',
    allrarity: 'Toutes les Raretés',
    priceunder5k: 'Moins de 50 €',
    price5k15k: '50 – 500 €',
    price15k50k: '500 – 5.000 €',
    priceover50k: 'Plus de 5.000 €',
    viewdetails: 'Voir les Détails',
    noresults: 'Aucune pierre précieuse trouvée',
    noresultsdesc: 'Essayez de modifier vos critères de recherche',
    stonesfound: 'pierres précieuses trouvées',
    resetfilters: 'Réinitialiser les filtres',
    cuts: {
      oval: 'Ovale', cushion: 'Coussin', brilliant: 'Brillant', round: 'Rond',
      emerald: 'Émeraude', princess: 'Princesse', marquise: 'Marquise',
      pear: 'Poire', asscher: 'Asscher', radiant: 'Radiant',
      trilliant: 'Trilliant', heart: 'Cœur', fancy: 'Fantaisie',
      triangle: 'Triangle',
    },
    origins: {
      ceylon: 'Ceylan', myanmar: 'Birmanie', colombia: 'Colombie',
      zambia: 'Zambie', brazil: 'Brésil', madagascar: 'Madagascar',
      tanzania: 'Tanzanie', srilanka: 'Sri Lanka', india: 'Inde',
      mali: 'Mali', pakistan: 'Pakistan', afghanistan: 'Afghanistan',
      burma: 'Birmanie', unknown: 'Inconnu',
    },
    types: {
      diamond: 'Diamant', ruby: 'Rubis', sapphire: 'Saphir',
      spinel: 'Spinelle', emerald: 'Émeraude', tanzanite: 'Tanzanite',
      tourmaline: 'Tourmaline', garnet: 'Grenat', amethyst: 'Améthyste',
      citrine: 'Citrine', topaz: 'Topaze', peridot: 'Péridot',
      aquamarine: 'Aigue-marine', opal: 'Opale', jade: 'Jade',
      pearl: 'Perle', other: 'Autre',
    },
    stonenames: {
      1: 'Saphir Jaune',
      2: 'Spinelle Bleu',
      3: 'Saphir Bleu-Vert',
      4: 'Spinelle Lavande',
      5: 'Péridot Vert',
      6: 'Spinelle Rouge-Rose',
      7: 'Saphir du Cachemire',
      8: 'Saphir Bleu-Électrique',
      9: 'Grenat Orange-Jaune du Mali',
      10: 'Grenat Jaune du Mali',
      11: 'Grenat Orange du Mali',
      12: 'Grenat Jaune du Mali',
      13: 'Grenat Vert-Jaunâtre du Mali',
      14: 'Grenat Brun-Jaunâtre du Mali',
      15: 'Rubis Rouge',
      16: 'Rubis Rouge-Pourpre',
      17: 'Rubis Rouge',
      18: 'Péridot Vert-Vif',
      19: 'Saphir Bleu-Sarcelle-Foncé',
      20: 'Émeraude Vert-Clair',
      21: 'Topaze Champagne',
      22: 'Tourmaline Bicolore',
    },
    raritylevels: {
      exceptional: 'Exceptionnel',
      rare: 'Rare',
      premium: 'Premium',
      select: 'Débutants',
      none: 'Aucune Spécification',
    },
  },
};

export default function CollectionPage() {
  const [language, setLanguage] = useState('de');
  const [loading, setLoading] = useState(true);
  const [stones, setStones] = useState([]);
  const [filteredStones, setFilteredStones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: 'all', priceRange: 'all', rarity: 'all' });
  const [sortBy, setSortBy] = useState('-createddate');
  const [shuffledStoneIds, setShuffledStoneIds] = useState([]);
  const isMobile = window.innerWidth < 768;
  const t = translations[language];

  // Sprach-Init
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const storedLang = localStorage.getItem('language');
    let initialLang = 'de';
    if (langParam && translations[langParam]) initialLang = langParam;
    else if (storedLang && translations[storedLang]) initialLang = storedLang;
    setLanguage(initialLang);

    const handleLanguageChange = (event) => {
      if (event.detail && translations[event.detail]) setLanguage(event.detail);
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => { loadStones(); }, []);
  useEffect(() => { filterAndSortStones(); }, [stones, searchTerm, filters, sortBy, language]);

  const loadStones = async () => {
    setLoading(true);
    try {
      const available = gemstones.filter(s => !s.is_sold);
      setStones(available);
      const ids = available.map(s => s.id);
      setShuffledStoneIds(shuffleArray([...ids]));
    } catch (error) {
      console.error('Error loading stones', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortStones = () => {
    let filtered = [...stones];

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.origin?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(s => s.type?.toLowerCase() === filters.type.toLowerCase());
    }

    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(s => {
        const price = s.price_eur;
        switch (filters.priceRange) {
          case 'under5k':   return price < 50;
          case '5k15k':     return price >= 50 && price < 500;
          case '15k50k':    return price >= 500 && price < 5000;
          case 'over50k':   return price >= 5000;
          default:          return true;
        }
      });
    }

    if (filters.rarity !== 'all') {
      filtered = filtered.filter(s => s.rarity_level === filters.rarity);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priceasc':  return a.price_eur - b.price_eur;
        case 'pricedesc': return b.price_eur - a.price_eur;
        case 'carat':     return (b.carat_weight || 0) - (a.carat_weight || 0);
        default:          return new Date(b.created_date) - new Date(a.created_date);
      }
    });

    setFilteredStones(filtered);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency', currency: 'EUR',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(price);

  const getRarityColor = (rarity) => {
    const colors = {
      exceptional: 'bg-purple-100 text-purple-800 border-purple-200',
      rare:        'bg-amber-100 text-amber-800 border-amber-200',
      premium:     'bg-blue-100 text-blue-800 border-blue-200',
      select:      'bg-green-100 text-green-800 border-green-200',
    };
    return colors[rarity] || colors.select;
  };

  // Steine die ohne Filter angezeigt werden (gemischt)
  const stonesToDisplay =
    !searchTerm && filters.type === 'all' && filters.priceRange === 'all' && filters.rarity === 'all'
      ? shuffledStoneIds.map(id => stones.find(s => s.id === id)).filter(Boolean)
      : filteredStones;

  // ─── ÜBERSETZUNGS-HELFER ────────────────────────────────────────────────────
  const getTranslatedType = (type) =>
    t.types?.[type?.toLowerCase()] || type || 'N/A';

  const getTranslatedCut = (cut) =>
    t.cuts?.[cut?.toLowerCase()] || cut || 'N/A';

  const getTranslatedOrigin = (origin) =>
    t.origins?.[origin?.toLowerCase()] || origin || 'N/A';

  const getTranslatedRarity = (rarity) =>
    t.raritylevels?.[rarity?.toLowerCase()] || rarity || t.raritylevels.none;

  /**
   * getTranslatedStoneName
   * Priorität: stonenames-Lookup (IDs 1–22) → stone.name (alle neuen Steine ab ID 23+)
   * NEUEN STEIN HINZUFÜGEN: Nur in Gemstones.js eintragen — hier nichts ändern!
   */
  const getTranslatedStoneName = (stoneId) => {
    if (t.stonenames?.[stoneId]) return t.stonenames[stoneId];
    const found = stones.find(s => s.id === stoneId);
    return found?.name || '';
  };

  const uniqueTypes = [...new Set(stones.map(s => s.type?.toLowerCase()).filter(Boolean))];

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({ type: 'all', priceRange: 'all', rarity: 'all' });
    setSortBy('-createddate');
  };

  // ─── LOADING SKELETON ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-64 mx-auto" />
            <div className="h-4 bg-gray-200 rounded mb-8 w-96 mx-auto" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(9).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-200 aspect-square rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>{t.collectiontitle} | NobleCutGems</title>
        <meta name="description" content={t.collectionsubtitle} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-white py-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.collectiontitle}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {t.collectionsubtitle}
            </p>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary-color)' }} />
          </div>

          {/* Filter-Leiste */}
          <div className="bg-gray-50 rounded-lg p-4 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Suche */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={t.searchplaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Filter */}
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end">
                {/* Typ */}
                <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
                  <SelectTrigger className="w-40 border-gray-300 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder={t.filtertype} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.alltypes}</SelectItem>
                    {uniqueTypes.map((type) => (
                      <SelectItem key={type} value={type}>{getTranslatedType(type)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Preis */}
                <Select value={filters.priceRange} onValueChange={(v) => setFilters({ ...filters, priceRange: v })}>
                  <SelectTrigger className="w-40 border-gray-300 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder={t.filterprice} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allprices}</SelectItem>
                    <SelectItem value="under5k">{t.priceunder5k}</SelectItem>
                    <SelectItem value="5k15k">{t.price5k15k}</SelectItem>
                    <SelectItem value="15k50k">{t.price15k50k}</SelectItem>
                    <SelectItem value="over50k">{t.priceover50k}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Seltenheit */}
                <Select value={filters.rarity} onValueChange={(v) => setFilters({ ...filters, rarity: v })}>
                  <SelectTrigger className="w-40 border-gray-300 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder={t.filterrarity} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allrarity}</SelectItem>
                    <SelectItem value="exceptional">{getTranslatedRarity('exceptional')}</SelectItem>
                    <SelectItem value="rare">{getTranslatedRarity('rare')}</SelectItem>
                    <SelectItem value="premium">{getTranslatedRarity('premium')}</SelectItem>
                    <SelectItem value="select">{getTranslatedRarity('select')}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sortierung */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-gray-300 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder={t.sortby} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-createddate">{t.sortnewest}</SelectItem>
                    <SelectItem value="priceasc">{t.sortpricelow}</SelectItem>
                    <SelectItem value="pricedesc">{t.sortpricehigh}</SelectItem>
                    <SelectItem value="carat">{t.sortcarat}</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="border-gray-300 hover:border-blue-500 transition-colors"
                >
                  {t.resetfilters}
                </Button>
              </div>
            </div>

            {/* Anzahl */}
            <div className="mt-4 text-sm text-gray-600 text-center md:text-left">
              {filteredStones.length} {t.stonesfound}
            </div>
          </div>

          {/* Grid */}
          {stonesToDisplay.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noresults}</h3>
              <p className="text-gray-600">{t.noresultsdesc}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {stonesToDisplay.map((stone) => (
                <Link key={stone.id} to={`/stone/${stone.slug}`}>
                  <div
                    className={`group bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 ${
                      !isMobile ? 'hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2' : ''
                    }`}
                  >
                    {/* Bild */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={stone.main_image_url}
                        alt={stone.name}
                        className={`w-full h-full object-cover ${
                          !isMobile ? 'group-hover:scale-110 transition-transform duration-700' : ''
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                      {/* Badge */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <Badge className={`${getRarityColor(stone.rarity_level)} border backdrop-blur-sm`}>
                          {getTranslatedRarity(stone.rarity_level)}
                        </Badge>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="serif-heading text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {getTranslatedStoneName(stone.id)}
                      </h3>

                      <StoneDetails
                        stone={stone}
                        getTranslatedCut={getTranslatedCut}
                        getTranslatedOrigin={getTranslatedOrigin}
                      />

                      <div className="flex items-center justify-between">
                        <span className="serif-heading text-xl font-bold text-gray-900">
                          {formatPrice(stone.price_eur)}
                        </span>
                        <Button className="bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300">
                          {t.viewdetails}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
