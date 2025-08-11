
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Gemstone } from "@/entities/Gemstone";
import { Search, Filter, ChevronDown, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    price_under_5k: "Unter €5.000",
    price_5k_15k: "€5.000 - €15.000",
    price_15k_50k: "€15.000 - €50.000", 
    price_over_50k: "Über €50.000",
    view_details: "Details ansehen",
    add_wishlist: "Zur Wunschliste",
    no_results: "Keine Edelsteine gefunden",
    no_results_desc: "Versuchen Sie, Ihre Suchkriterien zu ändern",
    stones_found: "Edelsteine gefunden",
    // Gemstone types in German
    diamond: "Diamant",
    ruby: "Rubin", 
    sapphire: "Saphir",
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
    other: "Andere"
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
    price_under_5k: "Under €5,000",
    price_5k_15k: "€5,000 - €15,000",
    price_15k_50k: "€15,000 - €50,000",
    price_over_50k: "Over €50,000",
    view_details: "View Details",
    add_wishlist: "Add to Wishlist",
    no_results: "No gemstones found",
    no_results_desc: "Try adjusting your search criteria",
    stones_found: "gemstones found",
    // Gemstone types in English
    diamond: "Diamond",
    ruby: "Ruby",
    sapphire: "Sapphire", 
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
    other: "Other"
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
    price_under_5k: "Moins de 5 000€",
    price_5k_15k: "5 000€ - 15 000€",
    price_15k_50k: "15 000€ - 50 000€",
    price_over_50k: "Plus de 50 000€",
    view_details: "Voir les Détails",
    add_wishlist: "Ajouter aux Favoris",
    no_results: "Aucune pierre précieuse trouvée",
    no_results_desc: "Essayez de modifier vos critères de recherche",
    stones_found: "pierres précieuses trouvées",
    // Gemstone types in French
    diamond: "Diamant",
    ruby: "Rubis",
    sapphire: "Saphir",
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
    other: "Autre"
  }
};

export default function CollectionPage() {
  const [language, setLanguage] = useState("de");
  const [stones, setStones] = useState([]);
  const [filteredStones, setFilteredStones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: "all",
    rarity: "all"
  });
  const [sortBy, setSortBy] = useState("-created_date");

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
    try {
      const allStones = await Gemstone.filter({ is_sold: false }, '-created_date');
      setStones(allStones);
    } catch (error) {
      console.error('Error loading stones:', error);
    } finally {
      setLoading(false);
    }
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
          case "under_5k": return price < 5000;
          case "5k_15k": return price >= 5000 && price <= 15000;
          case "15k_50k": return price >= 15000 && price <= 50000;
          case "over_50k": return price > 50000;
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

  const getTranslatedType = (type) => {
    // Lookup translated type using lowercase key, fallback to capitalized original if not found
    return t[type.toLowerCase()] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const uniqueTypes = [...new Set(stones.map(stone => stone.type))];

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
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={t.search_placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                  <SelectTrigger className="w-40">
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
                  <SelectTrigger className="w-48">
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
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder={t.filter_rarity} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all_rarity}</SelectItem>
                    <SelectItem value="exceptional">Exceptional</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-40">
                      {t.sort_by} <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("-created_date")}>
                      {t.sort_newest}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price_asc")}>
                      {t.sort_price_low}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price_desc")}>
                      {t.sort_price_high}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("carat")}>
                      {t.sort_carat}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
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
              {filteredStones.map((stone) => (
                <div 
                  key={stone.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={stone.main_image_url || "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                      alt={stone.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <Badge className={`${getRarityColor(stone.rarity_level)} border backdrop-blur-sm`}>
                        {stone.rarity_level}
                      </Badge>
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={createPageUrl(`Stone?id=${stone.id}`)}>
                        <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
                          <Eye className="w-4 h-4 mr-2" />
                          {t.view_details}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="serif-heading text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {stone.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {getTranslatedType(stone.type)} • {stone.carat_weight} ct
                    </p>
                    {stone.color && (
                      <p className="text-gray-500 text-xs mb-3">{stone.color}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="serif-heading text-xl font-bold text-gray-900">
                        {formatPrice(stone.price_eur)}
                      </span>
                      <Link to={createPageUrl(`Stone?id=${stone.id}`)}>
                        <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                          {t.view_details}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
