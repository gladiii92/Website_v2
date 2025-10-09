import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Search, Filter, ChevronDown, Eye } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";

import { gemstones } from "../data/Gemstones";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const translations = {
  de: {
    collection_title: "Unsere Kollektion",
    collection_subtitle: "Entdecken Sie außergewöhnliche Edelsteine aus aller Welt",
    search_placeholder: "Nach Edelsteinen suchen...",
    filter_type: "Typ",
    filter_price: "Preis", 
    filter_rarity: "Seltenheit",
    sort_by: "Sortieren nach",
    sort_newest: "Neueste",
    sort_price_low: "Preis aufsteigend",
    sort_price_high: "Preis absteigend",
    sort_carat: "Karat",
    all_types: "Alle Typen",
    all_prices: "Alle Preise",
    all_rarity: "Alle Seltenheiten",
    price_under_5k: "Unter 50€",
    price_5k_15k: "50€ - 500€",
    price_15k_50k: "500€ - 5.000€", 
    price_over_50k: "Über 5.000€",
    view_details: "Details ansehen",
    no_results: "Keine Edelsteine gefunden",
    no_results_desc: "Versuchen Sie, Ihre Suchkriterien zu ändern",
    stones_found: "Edelsteine gefunden",
    reset_filters: "Filter zurücksetzen",
    cuts: {
      oval: "Oval",
      cushion: "Kissen",
      brilliant: "Brillant",
      round: "Rund",
      emerald: "Smaragd-Schliff",
      princess: "Prinzessin-Schliff",
      marquise: "Marquise",
      pear: "Birne",
      asscher: "Asscher",
      radiant: "Radiant",
      trilliant: "Trilliant",
      heart: "Herz",
      fancy: "Fancy",
    },
    origins: {
      ceylon: "Ceylon",
      myanmar: "Myanmar",
      colombia: "Kolumbien",
      zambia: "Sambia",
      brazil: "Brasilien",
      madagascar: "Madagaskar",
      tanzania: "Tansania",
      srilanka: "Sri Lanka",
      india: "Indien",
      mali: "Mali",
      unknown: "Unbekannt",
    },
    // Gemstone types in German
    types: {
      diamond: "Diamant",
      ruby: "Rubin", 
      sapphire: "Saphir",
      spinel: "Spinell",
      emerald: "Smaragd",
      tanzanite: "Tansanit",
      tourmaline: "Turmalin",
      garnet: "Granat",
      amethyst: "Amethyst",
      citrine: "Citrin",
      topaz: "Topas",
      peridot: "Peridot",
      aquamarine: "Aquamarin",
      opal: "Opal",
      jade: "Jade",
      pearl: "Perle",
      other: "Andere",
    },

    stone_names: {
      1: "Gelber Saphir",
      2: "Blauer Spinell",
      3: "Blau-Grüner Saphir",
      4: "Lavendel Spinell",
      5: "Grüner Peridot",
      6: "Rot-Pinker Spinell",
      7: "Kashmir Saphir",
      8: "Electric-Blauer Saphir",
      9: "Orange-Gelber Mali Granat",
      10: "Gelber Mali Granat",
      11: "Orangener Mali Granat",
      12: "Gelber Mali Granat",
      13: "Gelblich-Grüner Granat"
    },
    // Neu: Übersetzte Rarity-Levels (mit 4 Kategorien)
    rarity_levels: {
      exceptional: "Außergewöhnlich",
      rare: "Selten",
      premium: "Premium",
      select: "Einsteiger",
      none: "Keine Angabe"
    }
  },
  en: {
    collection_title: "Our Collection",
    collection_subtitle: "Discover exceptional gemstones from around the world",
    search_placeholder: "Search for gemstones...",
    filter_type: "Type",
    filter_price: "Price",
    filter_rarity: "Rarity", 
    sort_by: "Sort by",
    sort_newest: "Newest",
    sort_price_low: "Price ascending",
    sort_price_high: "Price descending",
    sort_carat: "Carat",
    all_types: "All Types",
    all_prices: "All Prices", 
    all_rarity: "All Rarities",
    price_under_5k: "Under 50€",
    price_5k_15k: "50€ - 500€",
    price_15k_50k: "500€ - 5.000€",
    price_over_50k: "Over 5.000€",
    view_details: "View Details",
    no_results: "No gemstones found",
    no_results_desc: "Try adjusting your search criteria",
    stones_found: "gemstones found",
    reset_filters: "Reset filters",
    cuts: {
      oval: "Oval",
      cushion: "Cushion",
      brilliant: "Brilliant",
      round: "Round",
      emerald: "Emerald Cut",
      princess: "Princess Cut",
      marquise: "Marquise",
      pear: "Pear",
      asscher: "Asscher",
      radiant: "Radiant",
      trilliant: "Trilliant",
      heart: "Heart",
      fancy: "Fancy",
    },
    origins: {
      ceylon: "Ceylon",
      myanmar: "Myanmar",
      colombia: "Colombia",
      zambia: "Zambia",
      brazil: "Brazil",
      madagascar: "Madagascar",
      tanzania: "Tanzania",
      srilanka: "Sri Lanka",
      india: "India",
      mali: "Mali",
      unknown: "Unknown",
    },
    // Gemstone types in English
    types: {
      diamond: "Diamond",
      ruby: "Ruby",
      sapphire: "Sapphire", 
      spinel: "Spinel",
      emerald: "Emerald",
      tanzanite: "Tanzanite",
      tourmaline: "Tourmaline",
      garnet: "Garnet",
      amethyst: "Amethyst",
      citrine: "Citrine",
      topaz: "Topaz",
      peridot: "Peridot",
      aquamarine: "Aquamarine",
      opal: "Opal",
      jade: "Jade",
      pearl: "Pearl",
      other: "Other",
    },

    stone_names: {
      1: "Yellow Sapphire",
      2: "Blue Spinel",
      3: "Blueish-Green Sapphire",
      4: "Lavender Spinel",
      5: "Green Peridot",
      6: "Reddish-Pink Spinel",
      7: "Kashmir Sapphire",
      8: "Electric-Blue Sapphire",
      9: "Orange-Yellow Mali Garnet",
      10: "Yellow Mali Garnet",
      11: "Orange Mali Garnet",
      12: "Yellow Mali Garnet",
      13: "Yellowish-Green Garnet"
    },
    rarity_levels: {
      exceptional: "Exceptional",
      rare: "Rare",
      premium: "Premium",
      select: "Beginner",
      none: "No Specification"
    }
  },
  fr: {
    collection_title: "Notre Collection",
    collection_subtitle: "Découvrez des pierres précieuses exceptionnelles du monde entier",
    search_placeholder: "Rechercher des pierres précieuses...",
    filter_type: "Type",
    filter_price: "Prix",
    filter_rarity: "Rareté",
    sort_by: "Trier par",
    sort_newest: "Plus récent", 
    sort_price_low: "Prix croissant",
    sort_price_high: "Prix décroissant",
    sort_carat: "Carat",
    all_types: "Tous les Types",
    all_prices: "Tous les Prix",
    all_rarity: "Toutes les Raretés",
    price_under_5k: "Moins de 50€",
    price_5k_15k: "50€ - 500€",
    price_15k_50k: "500€ - 5.000€",
    price_over_50k: "Plus de 5.000€",
    view_details: "Voir les Détails",
    no_results: "Aucune pierre précieuse trouvée",
    no_results_desc: "Essayez de modifier vos critères de recherche",
    stones_found: "pierres précieuses trouvées",
    reset_filters: "Réinitialiser les filtres",
    cuts: {
      oval: "Ovale",
      cushion: "Coussin",
      brilliant: "Brillant",
      round: "Rond",
      emerald: "Émeraude",
      princess: "Princesse",
      marquise: "Marquise",
      pear: "Poire",
      asscher: "Asscher",
      radiant: "Radiant",
      trilliant: "Trilliant",
      heart: "Cœur",
      fancy: "Fancy",
    },
    origins: {
      ceylon: "Ceylan",
      myanmar: "Birmanie",
      colombia: "Colombie",
      zambia: "Zambie",
      brazil: "Brésil",
      madagascar: "Madagascar",
      tanzania: "Tanzanie",
      srilanka: "Sri Lanka",
      india: "Inde",
      unknown: "Inconnu",
    },
    // Gemstone types in French
    types: {
      diamond: "Diamant",
      ruby: "Rubis",
      sapphire: "Saphir",
      spinel: "Spinelle",
      emerald: "Émeraude",
      tanzanite: "Tanzanite",
      tourmaline: "Tourmaline",
      garnet: "Grenat",
      amethyst: "Améthyste",
      citrine: "Citrine",
      topaz: "Topaze",
      peridot: "Péridot",
      aquamarine: "Aigue-marine",
      opal: "Opale",
      jade: "Jade",
      pearl: "Perle",
      other: "Autre",
    },

    stone_names: {
      1: "Saphir Jaune",
      2: "Spinelle Bleu",
      3: "Saphir Bleu-Vert",
      4: "Spinelle Lavande",
      5: "Péridot Vert",
      6: "Spinelle Rouge-Rose",
      7: "Saphir du Cachemire",
      8: "Saphir Bleu-Electrique",
      9: "Grenat Orange-Jaune du Mali",
      10: "Grenat Jaune du Mali",
      11: "Grenat Orange du Mali",
      12: "Grenat Jaune du Mali",
      13: "Grenat Vert-Jaunâtre"

    },

    rarity_levels: {
      exceptional: "Exceptionnel",
      rare: "Rare",
      premium: "Premium",
      select: "Débutants",
      none: "Aucune Spécification"
    }
  }
};

export default function CollectionPage() {
  const [language, setLanguage] = useState("de");
  const [loading, setLoading] = useState(true);
  const [stones, setStones] = useState([]);
  const [filteredStones, setFilteredStones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: "all",
    rarity: "all"
  });
  const [sortBy, setSortBy] = useState("-created_date");
  const [shuffledStoneIds, setShuffledStoneIds] = useState([]);
  const isMobile = window.innerWidth < 768; // md breakpoint

  const t = translations[language];

  // Language responsiveness setup
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const storedLang = localStorage.getItem('language');

    // Determine initial language based on hierarchy: URL param > localStorage > default 'de'
    let initialLang = 'de';
    if (langParam && translations[langParam]) {
      initialLang = langParam;
    } else if (storedLang && translations[storedLang]) {
      initialLang = storedLang;
    }
    setLanguage(initialLang);

    // Event listener for dynamic language changes (e.g., from a language switcher component)
    const handleLanguageChange = (event) => {
      if (event.detail && translations[event.detail]) {
        setLanguage(event.detail);
      }
    };
    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // Load stones on component mount
  useEffect(() => {
    loadStones();
  }, []);

  // Filter and sort stones whenever dependencies change
  useEffect(() => {
    filterAndSortStones();
  }, [stones, searchTerm, filters, sortBy, language]); // Added language to dependencies

  const loadStones = async () => {
    setLoading(true);
    try {
      setStones(gemstones.filter(s => !s.is_sold));
    } catch (error) {
      console.error('Error loading stones:', error);
    } finally {
      setLoading(false);
    }
    const ids = gemstones.map(stone => stone.id);
    setShuffledStoneIds(shuffleArray(ids));
  };

  const filterAndSortStones = () => {
    let filtered = [...stones];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(stone => 
        stone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stone.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stone.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stone.origin?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== "all") {
      filtered = filtered.filter(stone => stone.type === filters.type);
    }

    // Price filter
    if (filters.priceRange !== "all") {
      filtered = filtered.filter(stone => {
        const price = stone.price_eur;
        switch (filters.priceRange) {
          case "under_5k": return price < 50;
          case "5k_15k": return price >= 50 && price <= 500;
          case "15k_50k": return price >= 500 && price <= 5000;
          case "over_50k": return price > 5000;
          default: return true;
        }
      });
    }

    // Rarity filter
    if (filters.rarity !== "all") {
      filtered = filtered.filter(stone => stone.rarity_level === filters.rarity);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_asc": return a.price_eur - b.price_eur;
        case "price_desc": return b.price_eur - a.price_eur;
        case "carat": return (b.carat_weight || 0) - (a.carat_weight || 0);
        default: return new Date(b.created_date) - new Date(a.created_date);
      }
    });

    setFilteredStones(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getRarityColor = (rarity) => {
    const colors = {
      exceptional: "bg-purple-100 text-purple-800 border-purple-200",
      rare: "bg-amber-100 text-amber-800 border-amber-200", 
      premium: "bg-blue-100 text-blue-800 border-blue-200",
      select: "bg-green-100 text-green-800 border-green-200"
    };
    return colors[rarity] || colors.select;
  };

  const stonesToDisplay = 
    // Wenn keine Filter aktiv sind (Suchbegriff leer & alle Filter auf 'all')
    (searchTerm === '' && filters.type === 'all' && filters.priceRange === 'all' && filters.rarity === 'all')
    // dann anhand gemischter IDs zusammenstellen
    ? shuffledStoneIds.map(id => stones.find(stone => stone.id === id)).filter(Boolean) 
    // sonst die gefilterte und sortierte Liste
    : filteredStones;

  const getTranslatedType = (types) => {
    // Lookup translated type using lowercase key, fallback to capitalized original if not found
    return t.types?.[types?.toLowerCase()] || type || 'N/A';
  };

  const getTranslatedCut = (cut) => {
    return t.cuts?.[cut?.toLowerCase()] || cut || 'N/A';
  };

  const getTranslatedOrigin = (origin) => {
    return t.origins?.[origin?.toLowerCase()] || origin || 'N/A';
  };

  // Neue Funktion (füge nach getTranslatedType ein)
  const getTranslatedStoneName = (id) => {
    return t.stone_names?.[id] || stone.name;  // Fallback auf originalen Namen
  };

  // Neu: Funktion für übersetzte Rarity-Levels
  const getTranslatedRarity = (rarity) => {
    return t.rarity_levels?.[rarity?.toLowerCase()] || rarity || t.rarity_levels.none;
  };

  const uniqueTypes = [...new Set(stones.map(stone => stone.type))];

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      type: "all",
      priceRange: "all",
      rarity: "all"
    });
    setSortBy("-created_date");
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-white py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-64 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded mb-8 w-96 mx-auto"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-200 aspect-square rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t.collection_title} | NobleCutGems</title>
        <meta name="description" content={t.collection_subtitle} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className="min-h-screen bg-white py-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.collection_title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {t.collection_subtitle}
            </p>
            <div className="w-24 h-1 mx-auto" style={{backgroundColor: 'var(--primary-color)'}}></div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-50 rounded-lg p-4 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={t.search_placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end">
                <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                  <SelectTrigger className="w-40 border-gray-300 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder={t.filter_type} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all_types}</SelectItem>
                    {uniqueTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {getTranslatedType(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                  <SelectTrigger className="w-40 border-gray-300 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder={t.filter_price} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all_prices}</SelectItem>
                    <SelectItem value="under_5k">{t.price_under_5k}</SelectItem>
                    <SelectItem value="5k_15k">{t.price_5k_15k}</SelectItem>
                    <SelectItem value="15k_50k">{t.price_15k_50k}</SelectItem>
                    <SelectItem value="over_50k">{t.price_over_50k}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.rarity} onValueChange={(value) => setFilters({...filters, rarity: value})}>
                  <SelectTrigger className="w-40 border-gray-300 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder={t.filter_rarity} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all_rarity}</SelectItem>
                    <SelectItem value="exceptional">{getTranslatedRarity('exceptional')}</SelectItem>
                    <SelectItem value="rare">{getTranslatedRarity('rare')}</SelectItem>
                    <SelectItem value="premium">{getTranslatedRarity('premium')}</SelectItem>
                    <SelectItem value="select">{getTranslatedRarity('select')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-gray-300 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder={t.sort_by} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-created_date">{t.sort_newest}</SelectItem>
                    <SelectItem value="price_asc">{t.sort_price_low}</SelectItem>
                    <SelectItem value="price_desc">{t.sort_price_high}</SelectItem>
                    <SelectItem value="carat">{t.sort_carat}</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={resetFilters} className="border-gray-300 hover:border-blue-500 transition-colors">
                  {t.reset_filters}
                </Button>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600 text-center md:text-left">
              {filteredStones.length} {t.stones_found}
            </div>
          </div>

          {/* Stones Grid */}
          {filteredStones.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.no_results}</h3>
              <p className="text-gray-600">{t.no_results_desc}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {stonesToDisplay.map((stone) => (
                <Link key={stone.id} to={`/stone/${stone.slug}`}>
                  <div  // Entfernt: key={stone.id}
                    className={`group bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 ${ !isMobile ? "hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" : "" }`}
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={stone.main_image_url || ""}
                        alt={stone.name}
                        className={`w-full h-full object-cover ${ !isMobile ? "group-hover:scale-110 transition-transform duration-700" : "" }`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <Badge className={`${getRarityColor(stone.rarity_level)} border backdrop-blur-sm`}>
                          {getTranslatedRarity(stone.rarity_level)}
                        </Badge>
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
          )}
        </div>
      </div>
    </>
  );
}
