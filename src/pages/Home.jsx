import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowRight, Sparkles, Crown, Shield, Award } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { gemstones } from "../data/Gemstones";



const translations = {
  de: {
    hero_title: "Exquisite Edelsteine von außergewöhnlicher Qualität",
    hero_subtitle: "Entdecken Sie unsere sorgfältig kuratierte Kollektion seltener und außergewöhnlicher Edelsteine, jeder einzelne handverlesen für seine einzigartige Schönheit und Perfektion.",
    view_collection: "Kollektion ansehen",
    featured_stones: "Ausgewählte Edelsteine",
    view_details: "Details ansehen",
    why_choose: "Warum NobleCutGems wählen",
    expertise_title: "IGS-Zertifizierte Expertise",
    expertise_desc: "Jahrelange Erfahrung und offizielle Zertifizierungen durch die International Gem Society.",
    certification_title: "Höchste Qualitätsstandards",
    certification_desc: "Jeder Edelstein wird bei Bedarf von anerkannten internationalen Laboren zertifiziert und authentifiziert.",
    heritage_title: "Traditionelles Handwerk",
    heritage_desc: "Unsere Meisterhandwerker-Schleifer vereinen jahrhundertealte Techniken mit moderner Präzision.",
    exclusivity_title: "Absolute Exklusivität",
    exclusivity_desc: "Limitierte Kollektion seltener Steine, die in den entlegensten Ecken der Welt entdeckt wurden.",
    cta_consultation: "Persöhnliche Anfrage",
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
      13: "Gelblich-Grüner Mali Granat",
      14: "Gelblich-Brauner Mali Granat",
      15: "Roter Rubin",
      16: "Lila-Roter Rubin",
      17: "Roter Rubin"
    },
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
      unknown: "Unbekannt",
    },
    rarity_levels: {
      exceptional: "Außergewöhnlich",
      rare: "Selten",
      premium: "Premium",
      select: "Einsteiger",
      none: "Keine Angabe"
    }
  },
  en: {
    hero_title: "Exquisite Gemstones of Extraordinary Quality",
    hero_subtitle: "Discover our carefully curated collection of rare and exceptional gemstones, each handpicked for its unique beauty and perfection.",
    view_collection: "View Collection",
    featured_stones: "Featured Gemstones", 
    view_details: "View Details",
    why_choose: "Why Choose NobleCutGems",
    expertise_title: "IGS-Certified Expertise",
    expertise_desc: "Years of experience and official certifications by the International Gem Society.",
    certification_title: "Highest Quality Standards",
    certification_desc: "Each gemstone is certified and authenticated by recognized international laboratories if necessary.",
    heritage_title: "Traditional Craftsmanship", 
    heritage_desc: "Our master craftsmen grinders combine centuries-old techniques with modern precision.",
    exclusivity_title: "Absolute Exclusivity", 
    exclusivity_desc: "Limited collection of rare stones discovered in the most remote corners of the world.",
    cta_consultation: "Personal inquiry",
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
      13: "Yellowish-Green Mali Garnet",
      14: "Yellowish-Brown Mali Garnet",
      15: "Red Ruby",
      16: "Pinkish-Red Ruby",
      17: "Red Ruby"
    },
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
      unknown: "Unknown",
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
    hero_title: "Pierres précieuses exquises d'une qualité extraordinaire",
    hero_subtitle: "Découvrez notre collection soigneusement sélectionnée de pierres précieuses rares et exceptionnelles, chacune choisie pour sa beauté unique et sa perfection.",
    view_collection: "Voir la Collection",
    featured_stones: "Pierres Précieuses en Vedette",
    view_details: "Voir les Détails",
    why_choose: "Pourquoi Choisir NobleCutGems",
    expertise_title: "Expertise Certifiée IGS",
    expertise_desc: "Des années d'expérience et des certifications officielles de l'International Gem Society.",
    certification_title: "Standards de Qualité Supérieurs",
    certification_desc: "Chaque pierre précieuse est certifiée et authentifiée par des laboratoires internationaux reconnus si nécessaire.",
    heritage_title: "Artisanat Traditionnel", 
    heritage_desc: "Nos maîtres artisans meuleurs allient des techniques séculaires à une précision moderne.",
    exclusivity_title: "Exclusivité Absolue",
    exclusivity_desc: "Collection limitée de pierres rares découvertes dans les coins les plus reculés du monde.",
    cta_consultation: "Demande personnelle",
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
      13: "Grenat Vert-Jaunâtre du Mali",
      14: "Grenat Brun-Jaunâtre du Mali",
      15: "Rubis Rouge",
      16: "Rubis Rouge-Pourpre",
      17: "Rubis Rouge"
    },
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
      myanmar: "Myanmar",
      colombia: "Colombie",
      zambia: "Zambie",
      brazil: "Brésil",
      madagascar: "Madagascar",
      tanzania: "Tanzanie",
      srilanka: "Sri Lanka",
      india: "Inde",
      unknown: "Inconnu",
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

export default function HomePage() {
  const [language, setLanguage] = useState("de");
  const [featuredStones, setFeaturedStones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const shuffledFeaturedStones = useMemo(() => {
    return shuffleArray(featuredStones).slice(0, 6);
  }, [featuredStones]);

  const t = translations[language];

  function shuffleArray(array) {
    const newArr = [...array]; // Kopie, um Original nicht zu verändern
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial prüfen
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };
    // Get language from localStorage
    const storedLang = localStorage.getItem('language') || 'de';
    if (translations[storedLang]) { // Ensure storedLang is a valid key
      setLanguage(storedLang);
    } else {
      setLanguage('de'); // Fallback to default if storedLang is invalid
    }
    
    loadFeaturedStones();

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const loadFeaturedStones = () => {
    setLoading(true);
    try {
      // nur die Steine nehmen, die als "featured" markiert und nicht verkauft sind
      const stones = gemstones.filter(s => s.is_featured && !s.is_sold);
      setFeaturedStones(stones);
    } catch (error) {
      console.error('Error loading featured stones:', error);
    } finally {
      setLoading(false);
    }
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

  const getTranslatedCut = (cut) => {
    return t.cuts?.[cut?.toLowerCase()] || cut || 'N/A';
  };

  const getTranslatedOrigin = (origin) => {
    return t.origins?.[origin?.toLowerCase()] || origin || 'N/A';
  };

  const getTranslatedStoneName = (id) => {
    return t.stone_names?.[id] || stone.name;  // Fallback auf originalen Namen
  };

  const getTranslatedRarity = (rarity) => {
    return t.rarity_levels?.[rarity?.toLowerCase()] || rarity || t.rarity_levels.none;
  };

  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/banner.jpg";
    img.onload = () => setBgLoaded(true);
  }, []);

  const featuredStonesMemo = useMemo(() => featuredStones, [featuredStones]);

  const StoneCard = React.memo(({ stone }) => (
    <div 
      className={`group bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 ${!isMobile ? "hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" : ""}`} >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={stone.main_image_url || ""}
          alt={stone.name}
          className={`w-full h-full object-cover ${!isMobile ? "group-hover:scale-110 transition-transform duration-700" : ""}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-black/0 ${!isMobile ? "group-hover:bg-black/20 transition-colors duration-300" : ""}`}></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className={`${getRarityColor(stone.rarity_level)} border backdrop-blur-sm`}>
            {getTranslatedRarity(stone.rarity_level)}
          </Badge>
        </div>

        {/* Hover overlay – nur leichter Overlay und Zoom, kein Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10"></div>
      </div>

      <div className="p-6">
        <h3 className="serif-heading text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {getTranslatedStoneName(stone.id)}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {stone.carat_weight} ct • {getTranslatedCut(stone.cut)} • {getTranslatedOrigin(stone.origin)}
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
  ));

  return (
    <>
      <Helmet>
        <title>NobleCutGems - Exquisite Edelsteine</title>
        <meta name="description" content={t.hero_subtitle} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 opacity-90 transition-opacity duration-500 hero-bg"
            style={{
              backgroundColor: '#1a1a1a', // fallback color, z.B. dunkelgrau, damit nicht weiß
              backgroundImage: bgLoaded 
                ? 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url("/images/banner.jpg")'
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: bgLoaded ? 1 : 0,
            }}
          />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
            {/* Removed: <div className="mb-8"><Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2 text-sm backdrop-blur-sm"><Sparkles className="w-4 h-4 mr-2" />Premium Collection 2024</Badge></div> */}
            
            <h1 className="serif-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight pt-16">
              {t.hero_title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-3xl mx-auto leading-relaxed">
              {t.hero_subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/Collection">
                <Button className="primary-btn hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-none transition-all duration-300 transform hover:scale-105 flex items-center mx-auto sm:mx-0">
                  {t.view_collection}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Featured Stones Section – jetzt identisch zur Collections-Präsentation */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.featured_stones}
              </h2>
              <div className="w-24 h-1 mx-auto" style={{backgroundColor: 'var(--primary-color)'}}></div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shuffledFeaturedStones.map((stone) => (
                  <Link key={stone.id} to={`/stone/${stone.slug}`}>
                    <StoneCard stone={stone} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-32 bg-champagne">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.why_choose}
              </h2>
              <div className="w-24 h-1 mx-auto" style={{backgroundColor: 'var(--primary-color)'}}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 ${!isMobile ? "group-hover:scale-110 transition-transform duration-300 shadow-lg" : "shadow"}`}>
                  <Crown className="w-10 h-10" style={{color: 'var(--primary-color)'}} />
                </div>
                <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4">
                  {t.expertise_title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.expertise_desc}
                </p>
              </div>

              <div className="text-center group">
                <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 ${!isMobile ? "group-hover:scale-110 transition-transform duration-300 shadow-lg" : "shadow"}`}>
                  <Shield className="w-10 h-10" style={{color: 'var(--success)'}} />
                </div>
                <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4">
                  {t.certification_title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.certification_desc}
                </p>
              </div>

              <div className="text-center group">
                <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 ${!isMobile ? "group-hover:scale-110 transition-transform duration-300 shadow-lg" : "shadow"}`}>
                  <Sparkles className="w-10 h-10" style={{color: 'var(--cta-color)'}} />
                </div>
                <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4">
                  {t.heritage_title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.heritage_desc}
                </p>
              </div>

              <div className="text-center group">
                <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 ${!isMobile ? "group-hover:scale-110 transition-transform duration-300 shadow-lg" : "shadow"}`}>
                  <Award className="w-10 h-10" style={{color: 'var(--primary-color)'}} />
                </div>
                <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4">
                  {t.exclusivity_title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.exclusivity_desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-primary-dark text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="serif-heading text-3xl md:text-4xl font-bold mb-6">
              {language === 'de' ? 'Bereit für Ihre persönliche Beratung?' : language === 'fr' ? 'Prêt pour votre consultation personnelle ?' : 'Ready for your personal consultation?'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'de' ? 'Lassen Sie sich von unseren zertifizierten Experten bei der Auswahl Ihres perfekten Edelsteins beraten.' : language === 'fr' ? 'Laissez nos experts certifiés vous conseiller dans le choix de votre pierre précieuse parfaite.' : 'Let our certified experts advise you on choosing your perfect gemstone.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button className="cta-btn hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-none transition-all duration-300 flex items-center mx-auto sm:mx-0">
                  {t.cta_consultation}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
