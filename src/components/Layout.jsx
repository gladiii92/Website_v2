import { createPageUrl } from "../utils";
import { Button } from "../components/ui/Button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../components/ui/Sheet";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation hier mitimportieren
import { Phone, Mail, Menu } from "lucide-react"; 

const translations = {
  de: {
    home: "Startseite",
    collection: "Kollektion",
    about: "Über uns",
    contact: "Kontakt",
    phone: "Telefon",
    email: "E-Mail",
    tagline: "Exquisite Edelsteine von außergewöhnlicher Qualität",
    seo_description: "NobleCutGems - Premium Edelsteine von außergewöhnlicher Qualität. Zertifizierte Diamanten, Rubine, Saphire und Smaragde aus aller Welt. Professionelle Beratung und IGS-Zertifizierung.",
    company_name: "NobleCutGems"
  },
  en: {
    home: "Home",
    collection: "Collection", 
    about: "About Us",
    contact: "Contact",
    phone: "Phone",
    email: "Email",
    tagline: "Exquisite Gemstones of Extraordinary Quality",
    seo_description: "NobleCutGems - Premium gemstones of extraordinary quality. Certified diamonds, rubies, sapphires and emeralds from around the world. Professional consultation and IGS certification.",
    company_name: "NobleCutGems"
  },
  fr: {
    home: "Accueil",
    collection: "Collection",
    about: "À propos",
    contact: "Contact", 
    phone: "Téléphone",
    email: "E-mail",
    tagline: "Pierres précieuses exquises d'une qualité extraordinaire",
    seo_description: "NobleCutGems - Pierres précieuses premium d'une qualité extraordinaire. Diamants, rubis, saphirs et émeraudes certifiés du monde entier. Consultation professionnelle et certification IGS.",
    company_name: "NobleCutGems"
  }
};

const navigationItems = [
  { key: "home", url: "Home" },
  { key: "collection", url: "Collection" },
  { key: "about", url: "About" },
  { key: "contact", url: "Contact" }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [language, setLanguage] = useState("de");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language];

  // Store language in localStorage and update URL
  useEffect(() => {
    const storedLang = localStorage.getItem('language') || 'de';
    setLanguage(storedLang);
  }, []);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    
    // Update URL with language parameter
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('lang', newLang);
    window.history.replaceState({}, '', currentUrl.toString());
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
  };

  const LanguageSelector = () => (
    <div className="flex items-center gap-1 bg-black/5 backdrop-blur-sm rounded-full p-1">
      {Object.keys(translations).map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
            language === lang
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  const getPageTitle = () => {
    const baseTitle = t.company_name;
    const pageNames = {
      'Home': language === 'de' ? 'Startseite' : language === 'fr' ? 'Accueil' : 'Home',
      'Collection': language === 'de' ? 'Kollektion' : 'Collection', 
      'About': language === 'de' ? 'Über uns' : language === 'fr' ? 'À propos' : 'About Us',
      'Contact': language === 'de' ? 'Kontakt' : 'Contact'
    };
    
    if (currentPageName && currentPageName !== 'Home') {
      return `${pageNames[currentPageName] || currentPageName} | ${baseTitle}`;
    }
    return `${baseTitle} - ${t.tagline}`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        :root {
          --primary-color: #1a73e8;
          --cta-color: #ff6f00;
          --success: #4caf50;
          --primary-dark: #1a1a1a;
          --pearl-white: #fefefe;
          --champagne: #f7f3e9;
          --warm-gray: #8b7355;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--pearl-white);
          color: var(--primary-dark);
          line-height: 1.6;
        }
        
        .serif-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        
        .luxury-nav {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 50%;
          background: var(--primary-color);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        
        .scroll-indicator {
          background: linear-gradient(90deg, transparent 0%, var(--primary-color) 50%, transparent 100%);
          height: 1px;
        }
        
        .primary-btn {
          background: var(--primary-color);
        }
        
        .primary-btn:hover {
          background: #1557b0;
        }
        
        .cta-btn {
          background: var(--cta-color);
        }
        
        .cta-btn:hover {
          background: #e65100;
        }
        
        .success-color {
          color: var(--success);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-pearl-white to-champagne">
        {/* Header */}
        <header className="luxury-nav fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Main navigation */}
            <div className="flex items-center justify-between h-20">
              {/* Linker Block: Logo + Name */}
              <div className="flex items-center space-x-4">
                <Link to={createPageUrl("Home")} className="flex items-center space-x-4">
                  <img src="/images/logo1.jpg" alt="NobleCutGems logo" className="h-12" />
                  <span className="serif-heading text-4xl font-bold">
                    {t.company_name}
                  </span>
                    <div className="hidden lg:flex items-center gap-8 mt-5 text-xs">
                      Premium Gemstones
                    </div>
                </Link>
              </div>
              
              {/* Rechts: Navigation + Sprache */}
              <div className="hidden lg:flex items-center gap-8">
                <nav className="flex items-center gap-8">
                  {navigationItems.map(item => (
                    <Link
                      key={item.key}
                      to={createPageUrl(item.url)}
                      className={`nav-link text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                        location.pathname === createPageUrl(item.url)
                          ? "active text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {t[item.key]}
                    </Link>
                  ))}
                </nav>
                <LanguageSelector />
              </div>

              {/* Mobile Menü */}
              <div className="lg:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl">
                    <div className="flex flex-col h-full">
                      <div className="border-b border-gray-200 pb-6 mb-8">
                        <div className="serif-heading text-xl font-bold text-gray-900">
                          {t.company_name}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{t.tagline}</p>
                      </div>
                      
                      <nav className="flex flex-col gap-6 flex-1">
                        {navigationItems.map((item) => (
                          <SheetClose key={item.key} asChild>
                            <Link
                              to={createPageUrl(item.url)}
                              className="text-lg font-medium text-gray-900 hover:text-primary-color transition-colors duration-300"
                            >
                              {t[item.key]}
                            </Link>
                          </SheetClose>
                        ))}
                      </nav>

                      <div className="border-t border-gray-200 pt-6 space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>+49 (0) 89 123 456 789</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>contact@noblecutgems.de</span>
                        </div>
                        <LanguageSelector />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-primary-dark text-pearl-white mt-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <div className="serif-heading text-3xl font-bold mb-4">
                  {t.company_name}
                </div>
                <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
                  {t.tagline}
                </p>
                <div className="flex gap-4">
                  <LanguageSelector />
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4" style={{color: 'var(--primary-color)'}}>Navigation</h3>
                <div className="space-y-3">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.key}
                      to={createPageUrl(item.url)}
                      className="block text-gray-600 hover:text-white transition-colors duration-300"
                    >
                      {t[item.key]}
                    </Link>
                    ))}
                    <Link to={createPageUrl("Impressum")} className="block text-gray-600 hover:text-white transition-colors duration-300">
                      Impressum
                    </Link>
                    <Link to={createPageUrl("Datenschutz")} className="block text-gray-600 hover:text-white transition-colors duration-300">
                      Datenschutz
                    </Link>
                    <Link to={createPageUrl("AGB")} className="block text-gray-600 hover:text-white transition-colors duration-300">
                      AGB
                    </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4" style={{color: 'var(--primary-color)'}}>{t.contact}</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+49 (0) 151 68482909</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>noblecutgems_official@gmx.de</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </footer>
      </div>
    </>
  );
}
