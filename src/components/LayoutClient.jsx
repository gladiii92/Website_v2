'use client';
import { createPageUrl } from "../utils";
import { Button } from "../components/ui/Button";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Phone, Mail, Menu, X, Heart, Moon, Sun } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "next-themes";
import CookieConsent from "./CookieConsent";

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
    company_name: "NobleCutGems",
    wishlist: "Wishlist",
    blog: "Journal"
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
    company_name: "NobleCutGems",
    wishlist: "Wishlist",
    blog: "Journal"
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
    company_name: "NobleCutGems",
    wishlist: "Wishlist",
    blog: "Journal"
  }
};

const navigationItems = [
  { key: "home", url: "Home" },
  { key: "collection", url: "Collection" },
  { key: "about", url: "About" },
  { key: "contact", url: "Contact" },
  { key: "blog", url: "blog" }
];

export default function LayoutClient({ children, lang }) {
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguage] = useState(lang || "de");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const t = translations[language] || translations.de;
  const wishlistContext = useWishlist();
  const wishlistCount = wishlistContext?.wishlist?.length || 0;
  
  
  

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && storedLang !== lang && translations[storedLang]) {
      setLanguage(storedLang);
      router.replace(`/${storedLang}`);
    } else {
      setLanguage(lang || "de");
    }
  }, [lang, router]);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    
    // Replace current language prefix in URL
    const newPath = pathname.replace(`/${language}`, `/${newLang}`);
    router.push(newPath || `/${newLang}`);
    
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
  };

  // Neu: Handle Click Outside für mobiles Menü
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

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
    return `${baseTitle} - ${t.tagline}`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        :root {
          --bg-color: #fefefe;
          --text-color: #1a1a1a;
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
              <div className="flex items-center space-x-4 mx-auto lg:mx-0">
                <Link href={createPageUrl("Home", language)} className="flex items-center space-x-3">
                  <Image src="/images/logo1.jpg" width={48} height={48} alt="NobleCutGems logo" className="h-10 lg:h-12" />
                  {/* Für Mobile: Nur NobleCutGems, kleiner */}
                  <span className="serif-heading text-2xl font-bold lg:hidden">
                    {t.company_name}
                  </span>
                  {/* Für Desktop: NobleCutGems + Premium Gemstones */}
                  <div className="hidden lg:flex flex-col">
                    <span className="serif-heading text-3xl font-bold">
                      {t.company_name}
                    </span>
                    <span className="text-xs tracking-wide mt-1 text-gray-600">
                      Premium Gemstones
                    </span>
                  </div>
                </Link>
              </div>
              
              {/* Rechts: Navigation + Sprache (Desktop) */}
              <div className="hidden lg:flex items-center gap-8">
                <nav className="flex items-center gap-8">
                  {navigationItems.map(item => (
                    <Link
                      key={item.key}
                      href={createPageUrl(item.url, language)}
                      className={`nav-link text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                        pathname === createPageUrl(item.url, language)
                          ? "active text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {t[item.key]}
                    </Link>
                  ))}
                  <Link
                        href={`/${language}/wishlist`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-cta-color flex items-center gap-2"
                      >
                        <Heart className="w-5 h-5" />
                        {t.wishlist} ({wishlistCount})
                      </Link>
                    </nav>
                <Link href={`/${language}/wishlist`} className="relative text-gray-600 dark:text-gray-300 hover:text-cta-color transition-colors mr-4" title={t.wishlist}>
                  <Heart className="w-6 h-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-cta-color text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                
                <LanguageSelector />
              </div>
              
              {/* Mobile Menu-Trigger und Overlay */}
              <div className="lg:hidden relative" ref={menuRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>

                {/* Overlay-Menü, fixed positioniert für Full-Width und Zentrierung */}
                {mobileMenuOpen && (
                  <div
                    className="
                      fixed
                      left-0 right-0
                      top-20  /* Direkt unter dem Header (h-20 = 5rem ≈ 80px) */
                      z-40
                      bg-white/95
                      backdrop-blur-lg
                      border-t border-gray-100
                      px-6 py-8
                      space-y-6
                      overflow-visible  /* Stellt sicher, dass nichts abgeschnitten wird */
                      min-h-[300px]    /* Mindesthöhe, um alle Items sichtbar zu machen; passe an */
                    "
                  >
                    <nav className="flex flex-col items-center gap-6">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.key}
                          href={createPageUrl(item.url, language)}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-medium text-gray-900 hover:text-primary-color transition-colors duration-300"
                        >
                          {t[item.key]}
                        </Link>
                      ))}
                    </nav>

                    <div className="border-t border-gray-200 pt-6 space-y-4 text-center text-sm text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>+49 (0) 151 6848 2909</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>info@noblecutgems.com</span>
                      </div>
                      <div className="flex justify-center">
                        <LanguageSelector />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main>
          {children}
        </main>
        <CookieConsent language={language} />
        {/* Footer */}
        <footer className="bg-primary-dark text-pearl-white mt-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="md:col-span-2 text-center md:text-left">
                <div className="serif-heading text-3xl font-bold mb-4">
                  {t.company_name}
                </div>
                <p className="text-gray-600 mb-6 max-w-md leading-relaxed mx-auto md:mx-0">
                  {t.tagline}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <LanguageSelector />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="font-semibold mb-4" style={{color: 'var(--primary-color)'}}>Navigation</h3>
                <div className="space-y-3">
                  <Link href={createPageUrl("Impressum", language)} className="block text-gray-600 hover:text-white transition-colors duration-300">
                    Impressum
                  </Link>
                  <Link href={createPageUrl("Datenschutz", language)} className="block text-gray-600 hover:text-white transition-colors duration-300">
                    Datenschutz
                  </Link>
                  <Link href={createPageUrl("AGB", language)} className="block text-gray-600 hover:text-white transition-colors duration-300">
                    AGB
                  </Link>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="font-semibold mb-4" style={{color: 'var(--primary-color)'}}>{t.contact}</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="w-4 h-4" />
                    <span>+49 (0) 151 68482909</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-4 h-4" />
                    <span>info@noblecutgems.com</span>
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

