
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Gemstone } from "@/entities/Gemstone";
import { ArrowRight, Sparkles, Crown, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const translations = {
  de: {
    hero_title: "Exquisite Edelsteine von außergewöhnlicher Qualität",
    hero_subtitle: "Entdecken Sie unsere sorgfältig kuratierte Kollektion seltener und außergewöhnlicher Edelsteine, jeder einzelne handverlesen für seine einzigartige Schönheit und Perfektion.",
    view_collection: "Kollektion ansehen",
    featured_stones: "Ausgewählte Edelsteine",
    view_details: "Details ansehen",
    why_choose: "Warum NobleCutGems wählen",
    expertise_title: "IGS-Zertifizierte Expertise",
    expertise_desc: "Über drei Jahrzehnte Erfahrung und offizielle Zertifizierung durch die International Gem Society.",
    certification_title: "Höchste Qualitätsstandards",
    certification_desc: "Jeder Edelstein wird von anerkannten internationalen Laboren zertifiziert und authentifiziert.",
    heritage_title: "Traditionelles Handwerk",
    heritage_desc: "Unsere Meisterhandwerker vereinen jahrhundertealte Techniken mit moderner Präzision.",
    exclusivity_title: "Absolute Exklusivität",
    exclusivity_desc: "Limitierte Kollektion seltener Steine, die in den entlegensten Ecken der Welt entdeckt wurden.",
    cta_consultation: "Beratungstermin vereinbaren"
  },
  en: {
    hero_title: "Exquisite Gemstones of Extraordinary Quality",
    hero_subtitle: "Discover our carefully curated collection of rare and exceptional gemstones, each handpicked for its unique beauty and perfection.",
    view_collection: "View Collection",
    featured_stones: "Featured Gemstones", 
    view_details: "View Details",
    why_choose: "Why Choose NobleCutGems",
    expertise_title: "IGS-Certified Expertise",
    expertise_desc: "Over three decades of experience and official certification by the International Gem Society.",
    certification_title: "Highest Quality Standards",
    certification_desc: "Every gemstone is certified and authenticated by recognized international laboratories.",
    heritage_title: "Traditional Craftsmanship", 
    heritage_desc: "Our master craftsmen combine centuries-old techniques with modern precision.",
    exclusivity_title: "Absolute Exclusivity", 
    exclusivity_desc: "Limited collection of rare stones discovered in the most remote corners of the world.",
    cta_consultation: "Schedule Consultation"
  },
  fr: {
    hero_title: "Pierres précieuses exquises d'une qualité extraordinaire",
    hero_subtitle: "Découvrez notre collection soigneusement sélectionnée de pierres précieuses rares et exceptionnelles, chacune choisie pour sa beauté unique et sa perfection.",
    view_collection: "Voir la Collection",
    featured_stones: "Pierres Précieuses en Vedette",
    view_details: "Voir les Détails",
    why_choose: "Pourquoi Choisir NobleCutGems",
    expertise_title: "Expertise Certifiée IGS",
    expertise_desc: "Plus de trois décennies d'expérience et certification officielle par l'International Gem Society.",
    certification_title: "Standards de Qualité Supérieurs",
    certification_desc: "Chaque pierre précieuse est certifiée et authentifiée par des laboratoires internationaux reconnus.",
    heritage_title: "Artisanat Traditionnel", 
    heritage_desc: "Nos maîtres artisans allient techniques séculaires et précision moderne.",
    exclusivity_title: "Exclusivité Absolue",
    exclusivity_desc: "Collection limitée de pierres rares découvertes dans les coins les plus reculés du monde.",
    cta_consultation: "Planifier une Consultation"
  }
};

export default function HomePage() {
  const [language, setLanguage] = useState("de");
  const [featuredStones, setFeaturedStones] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = translations[language];

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

  const loadFeaturedStones = async () => {
    try {
      const stones = await Gemstone.filter({ is_featured: true, is_sold: false }, '-created_date', 6);
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
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
            <Link to={createPageUrl("Collection")}>
              <Button className="primary-btn hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-none transition-all duration-300 transform hover:scale-105">
                {t.view_collection}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Stones Section */}
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
              {featuredStones.map((stone) => (
                <div 
                  key={stone.id} 
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={stone.main_image_url || "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                      alt={stone.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className={`${getRarityColor(stone.rarity_level)} border backdrop-blur-sm`}>
                        {stone.rarity_level}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-2">
                      {stone.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{stone.type} • {stone.carat_weight} ct</p>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {stone[`description_${language}`] || stone.description_de}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="serif-heading text-2xl font-bold text-gray-900">
                        {formatPrice(stone.price_eur)}
                      </span>
                      <Link to={createPageUrl(`Stone?id=${stone.id}`)}>
                        <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
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
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
          <p className="text-xl text-gray-300 mb-8">
            {language === 'de' ? 'Lassen Sie sich von unseren IGS-zertifizierten Experten bei der Auswahl Ihres perfekten Edelsteins beraten.' : language === 'fr' ? 'Laissez nos experts certifiés IGS vous conseiller dans le choix de votre pierre précieuse parfaite.' : 'Let our IGS-certified experts advise you in selecting your perfect gemstone.'}
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button className="cta-btn hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-none transition-all duration-300">
              {t.cta_consultation}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
