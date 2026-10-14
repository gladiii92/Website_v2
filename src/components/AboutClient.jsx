'use client';
import React, { useState, useEffect } from "react";
import { Award, Users, Globe, Heart, Sparkles, Crown, ZoomIn, X } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "../components/ui/Button";

const translations = {
  de: {
    page_title: "Über NobleCutGems",
    page_subtitle: "Eine Leidenschaft für außergewöhnliche Edelsteine",
    our_customers: "50+ Kunden",
    our_collectors: "Zufriedene Sammler weltweit",
    our_countrys: "10+ Länder",
    our_country_presence: "Internationale Präsenz",
    our_gems: "50+ Edelsteine",
    our_gem_collection: "Kuratierte Sammlung",
    our_story_title: "Unsere Geschichte",
    our_story_content: "NobleCutGems wurde aus einer klaren Vision heraus gegründet: Die schönsten Edelsteine aus allen Teilen der Welt zu finden und ihre wahre Brillanz durch präzise Schliffe zum Leben zu erwecken. Seit unseren Anfängen haben wir ein internationales Netzwerk aufgebaut, das uns direkten Zugang zu seltenen und außergewöhnlichen Steinen ermöglicht. Jedes Stück wird sorgfältig ausgewählt und mit höchster Präzision verarbeitet – für Sammler und Liebhaber, die das Außergewöhnliche suchen.",
    our_mission_title: "Unsere Mission",
    our_mission_content: "Wir glauben, dass jeder Edelstein eine einzigartige Geschichte erzählt – von seiner Entstehung tief in der Erde bis zu dem Moment, in dem er seine endgültige Form erhält. Unsere Mission ist es, diese Geschichten zu bewahren und außergewöhnliche Edelsteine in vollendeter Qualität für Menschen zugänglich zu machen, die höchste Ansprüche an Schönheit, Seltenheit und Verarbeitung stellen.",
    expertise_title: "Zertifizierte Expertise",
    expertise_desc: "Offizielle Zertifizierung durch die International Gem Society für höchste Fachkompetenz",
    exclusive_selection: "Exklusive Auswahl",
    exclusive_selection_text: "Handverlesen & meisterhaft geschliffen",
    global_title: "Weltweite Beschaffung",
    global_desc: "Direkter Zugang zu Minen in den wichtigsten Edelsteinregionen weltweit",
    craftsmanship_title: "Meisterhandwerk",
    craftsmanship_desc: "Traditionelle Schleifkunst kombiniert mit modernster Präzisionstechnologie",
    trust_title: "Vertrauen & Integrität",
    trust_desc: "Transparente Herkunft und geprüfte Qualität für jedes einzelne Stück",
    heritage_title: "Unser Weg",
    heritage_content: "NobleCutGems ist jung, aber mit einer klaren Mission gestartet: Die Standards im Edelsteinhandel neu zu definieren. Dank unserer IGS-Zertifizierung und einem internationalen Netzwerk an vertrauenswürdigen Partnern bringen wir Edelsteine in einer Qualität, wie sie zuvor nur schwer zugänglich war, direkt zu Sammlern und Liebhabern weltweit.",
    values_title: "Unsere Werte",
    igs_cert_title: "IGS-Zertifikat anzeigen",
    igs_modal_title: "International Gem Society Zertifikate",
    igs_description: "NobleCutGems ist stolz darauf, offiziell von der International Gem Society (IGS) zertifiziert zu sein. Diese Zertifizierung bestätigt unsere Expertise in der Bewertung, Authentifizierung und dem Handel mit Edelsteinen höchster Qualität.",
    close: "Schließen",
    click_to_zoom: "Klicken zum Vergrößern"
  },
  en: {
    page_title: "About NobleCutGems",
    page_subtitle: "A passion for exceptional gemstones",
    our_customers: "50+ Customers",
    our_collectors: "Satisfied collectors worldwide",
    our_countrys: "10+ Countries",
    our_country_presence: "International presence",
    our_gems: "50+ gemstones",
    our_gem_collection: "Curated collection",
    our_story_title: "Our Story",
    our_story_content: "NobleCutGems was founded with a clear vision: to find the most beautiful gemstones from all corners of the world and bring their true brilliance to life through precise cutting. Since our beginnings, we have built an international network that gives us direct access to rare and extraordinary stones. Each piece is carefully selected and crafted with the highest precision – for collectors and connoisseurs who seek the extraordinary.",
    our_mission_title: "Our Mission",
    our_mission_content: "We believe that every gemstone tells a unique story – from its formation deep within the earth to the moment it reaches its final form. Our mission is to preserve these stories and make exceptional gemstones, in perfect quality, accessible to those with the highest standards for beauty, rarity, and craftsmanship.",
    expertise_title: "Certified Expertise",
    expertise_desc: "Official certification by the International Gem Society for the highest professional competence",
    exclusive_selection: "Exclusive Selection",
    exclusive_selection_text: "Hand-picked & masterfully polished",
    global_title: "Global Sourcing",
    global_desc: "Direct access to selected mines and sources in the most important gemstone regions of the world",
    craftsmanship_title: "Master Craftsmanship",
    craftsmanship_desc: "Traditional cutting artistry combined with state-of-the-art precision technology",
    trust_title: "Trust & Integrity",
    trust_desc: "Transparent provenance and verified quality for every single piece",
    heritage_title: "Our Path",
    heritage_content: "NobleCutGems is young, but started with a clear mission: to redefine the standards in the gemstone trade. Thanks to our IGS certification and an international network of trusted partners, we bring gemstones of a quality that was previously difficult to access directly to collectors and gemstone enthusiasts worldwide.",
    values_title: "Our Values",
    igs_cert_title: "View IGS Certificate",
    igs_modal_title: "International Gem Society Certificate",
    igs_description: "NobleCutGems is proud to be officially certified by the International Gem Society (IGS). This certification confirms our expertise in evaluating, authenticating, and trading gemstones of the highest quality.",
    close: "Close",
    click_to_zoom: "Click to enlarge"
  },
  fr: {
    page_title: "À propos de NobleCutGems",
    page_subtitle: "Une passion pour les pierres précieuses d’exception",
    our_customers: "50+ Clients",
    our_collectors: "Collectionneurs satisfaits dans le monde entier",
    our_countrys: "10+ Pays",
    our_country_presence: "Présence internationale",
    our_gems: "50+ Pierres précieuses",
    our_gem_collection: "Collection soigneusement sélectionnée",
    our_story_title: "Notre histoire",
    our_story_content: "NobleCutGems est née d’une vision claire : trouver les plus belles pierres précieuses aux quatre coins du monde et révéler toute leur brillance grâce à des tailles précises. Depuis nos débuts, nous avons construit un réseau international qui nous donne un accès direct à des pierres rares et extraordinaires. Chaque pièce est soigneusement sélectionnée et façonnée avec la plus grande précision – pour les collectionneurs et amateurs en quête d’exception.",
    our_mission_title: "Notre mission",
    our_mission_content: "Nous croyons que chaque pierre précieuse raconte une histoire unique – de sa formation au plus profond de la terre jusqu’au moment où elle atteint sa forme finale. Notre mission est de préserver ces histoires et de rendre accessibles des pierres précieuses d’exception, dans une qualité parfaite, à ceux qui ont les plus hautes exigences en matière de beauté, de rareté et de savoir-faire.",
    expertise_title: "Expertise certifiée",
    expertise_desc: "Certification officielle par l’International Gem Society pour la plus haute compétence professionnelle",
    exclusive_selection: "Sélection exclusive",
    exclusive_selection_text: "Sélectionnés avec soin et soigneusement polis",
    global_title: "Approvisionnement mondial",
    global_desc: "Accès direct aux mines des régions de pierres précieuses les plus importantes du monde",
    craftsmanship_title: "Artisanat d’excellence",
    craftsmanship_desc: "Art traditionnel de la taille combiné aux technologies de précision les plus modernes",
    trust_title: "Confiance & intégrité",
    trust_desc: "Origine transparente et qualité vérifiée pour chaque pièce",
    heritage_title: "Notre parcours",
    heritage_content: "NobleCutGems est jeune, mais a commencé avec une mission claire : redéfinir les standards du commerce des pierres précieuses. Grâce à notre certification IGS et à un réseau international de partenaires de confiance, nous apportons directement aux collectionneurs et passionnés du monde entier des pierres d’une qualité jusqu’alors difficilement accessible.",
    values_title: "Nos valeurs",
    igs_cert_title: "Voir le certificat IGS",
    igs_modal_title: "Certificat de l’International Gem Society",
    igs_description: "NobleCutGems est fier d’être officiellement certifié par l’International Gem Society (IGS). Cette certification confirme notre expertise dans l’évaluation, l’authentification et le commerce de pierres précieuses de la plus haute qualité.",
    close: "Fermer",
    click_to_zoom: "Cliquer pour agrandir"
  }
};

const CERTIFICATES = [
  { src: "/images/igs_spinel.png", nameDe: "IGS Spinell Zertifikat", nameEn: "IGS Spinel Certificate", nameFr: "Certificat IGS Spinelle" },
  { src: "/images/igs_aquamarine.png", nameDe: "IGS Aquamarin Zertifikat", nameEn: "IGS Aquamarine Certificate", nameFr: "Certificat IGS Aigue-marine" },
  { src: "/images/igs_emerald.png", nameDe: "IGS Smaragd Zertifikat", nameEn: "IGS Emerald Certificate", nameFr: "Certificat IGS Émeraude" },
  { src: "/images/igs_garnet.png", nameDe: "IGS Granat Zertifikat", nameEn: "IGS Garnet Certificate", nameFr: "Certificat IGS Grenat" },
  { src: "/images/igs_ruby.png", nameDe: "IGS Rubin Zertifikat", nameEn: "IGS Ruby Certificate", nameFr: "Certificat IGS Rubis" },
  { src: "/images/igs_sapphire.png", nameDe: "IGS Saphir Zertifikat", nameEn: "IGS Sapphire Certificate", nameFr: "Certificat IGS Saphir" },
  { src: "/images/igs_topaz.png", nameDe: "IGS Topas Zertifikat", nameEn: "IGS Topaz Certificate", nameFr: "Certificat IGS Topaze" },
  { src: "/images/igs_tourmaline.png", nameDe: "IGS Turmalin Zertifikat", nameEn: "IGS Tourmaline Certificate", nameFr: "Certificat IGS Tourmaline" },
  { src: "/images/igs_zircon.png", nameDe: "IGS Zirkon Zertifikat", nameEn: "IGS Zircon Certificate", nameFr: "Certificat IGS Zircon" },
  { src: "/images/igs_citrine.png", nameDe: "IGS Citrin Zertifikat", nameEn: "IGS Citrine Certificate", nameFr: "Certificat IGS Citrine" },
];

export default function AboutPage({ lang }) {
  const [language, setLanguage] = useState(lang || "de");
  const [selectedCert, setSelectedCert] = useState(null);
  const t = translations[language];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };
    
    // Prioritize URL param, then localStorage, then default
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && translations[langParam]) {
      setLanguage(langParam);
      localStorage.setItem('language', langParam); // Store in localStorage if from URL
    } else {
      const storedLang = localStorage.getItem('language');
      if (storedLang && translations[storedLang]) {
        setLanguage(storedLang);
      } else {
        setLanguage('de'); // Default language
        localStorage.setItem('language', 'de'); // Store default in localStorage
      }
    }
    
    window.addEventListener('languageChange', handleLanguageChange);
        
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  return (
    <>
      
      <div className="min-h-screen bg-white py-24">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-champagne to-white overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border border-gold-accent rounded-full"></div>
            <div className="absolute top-1/3 right-20 w-24 h-24 border border-gold-accent rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-gold-accent rounded-full"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="serif-heading text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              {t.page_title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.page_subtitle}
            </p>
            <div className="w-24 h-1 mx-auto mt-8" style={{backgroundColor: 'var(--primary-color)'}}></div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <h2 className="serif-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {t.our_story_title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {t.our_story_content}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--primary-color)', opacity: 0.2}}>
                    <Heart className="w-6 h-6" style={{color: 'var(--primary-color)'}} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.exclusive_selection}</div>
                    <div className="text-sm text-gray-600">{t.exclusive_selection_text}</div>
                  </div>
                </div>
              </div>
              <div className="relative opacity-90">
                <img
                  src="/images/Logo.jpg"
                  alt="Gemstone workshop"
                  style={{ maxWidth: '80%', maxHeight: '80%' }}
                  className="rounded-lg shadow-2xl mx-auto"
                />
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-sm" style={{backgroundColor: 'var(--cta-color)', opacity: 0.2}}>
                  <Sparkles className="w-12 h-12" style={{color: 'var(--cta-color)'}} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="serif-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t.values_title}
              </h2>
              <div className="w-24 h-1 mx-auto" style={{backgroundColor: 'var(--primary-color)'}}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--primary-color)', opacity: 0.2}}>
                    <Crown className="w-8 h-8" style={{color: 'var(--primary-color)'}} />
                  </div>
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4 text-center md:text-center">
                    {t.expertise_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-center md:text-center">
                    {t.expertise_desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--success)', opacity: 0.2}}>
                    <Globe className="w-8 h-8" style={{color: 'var(--success)'}} />
                  </div>
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4 text-center md:text-center">
                    {t.global_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center md:text-center">
                    {t.global_desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--cta-color)', opacity: 0.2}}>
                    <Sparkles className="w-8 h-8" style={{color: 'var(--cta-color)'}} />
                  </div>
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4 text-center md:text-center">
                    {t.craftsmanship_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center md:text-center">
                    {t.craftsmanship_desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--success)', opacity: 0.2}}>
                    <Award className="w-8 h-8" style={{color: 'var(--success)'}} />
                  </div>
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4 text-center md:text-center">
                    {t.trust_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center md:text-center">
                    {t.trust_desc}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Carousel für IGS-Zertifikate */}
            <div className="mt-14">
              <h3 className="serif-heading text-2xl font-bold text-gray-900 mb-2 text-center">
                {t.igs_modal_title}
              </h3>
              <p className="text-sm text-stone-500 mb-8 text-center max-w-xl mx-auto">
                {language === 'de' 
                  ? 'Offizielle Prüf- und Qualitätszertifikate der International Gem Society für NobleCutGems.'
                  : language === 'fr'
                  ? 'Certificats officiels d’inspection et de qualité de l’International Gem Society pour NobleCutGems.'
                  : 'Official inspection and quality certificates from the International Gem Society for NobleCutGems.'}
              </p>
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <Carousel 
                  showThumbs={false} 
                  infiniteLoop={true} 
                  autoPlay={true} 
                  interval={4000}
                  showStatus={false}
                  className="igs-carousel shadow-sm rounded-2xl bg-stone-50/60 p-4 border border-stone-200"
                >
                  {CERTIFICATES.map((cert, index) => {
                    const certTitle = language === 'de' ? cert.nameDe : language === 'fr' ? cert.nameFr : cert.nameEn;
                    return (
                      <div key={index} className="text-center pb-6 pt-2 px-2">
                        <div 
                          onClick={() => setSelectedCert({ ...cert, title: certTitle })}
                          className="group relative inline-block cursor-zoom-in bg-white p-3 rounded-xl border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 max-w-md mx-auto"
                        >
                          <img 
                            src={cert.src} 
                            alt={certTitle} 
                            className="mx-auto rounded-lg max-h-[380px] w-auto object-contain"
                          />
                          <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900/90 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm border border-stone-700">
                              <ZoomIn className="w-4 h-4 text-emerald-400" />
                              {t.click_to_zoom}
                            </span>
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold mt-4 text-stone-900">
                          {certTitle}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setSelectedCert({ ...cert, title: certTitle })}
                          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-emerald-700 transition-colors font-medium cursor-pointer mt-1"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                          {t.click_to_zoom}
                        </button>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/images/banner.jpg"
              alt="Gemstones"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="serif-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {t.our_mission_title}
            </h2>
            <p className="text-xl text-gray-900 leading-relaxed">
              {t.our_mission_content}
            </p>
          </div>
        </section>

        {/* Heritage Section */}
        <section className="py-24 bg-champagne">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <img
                  src="/images/ueber_uns.png"
                  alt="Heritage craftsman"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
                  className="rounded-lg shadow-2xl mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="serif-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {t.heritage_title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {t.heritage_content}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6" style={{color: 'var(--primary-color)'}} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{t.our_customers}</div>
                      <div className="text-sm text-gray-600">{t.our_collectors}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6" style={{color: 'var(--success)'}} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{t.our_countrys}</div>
                      <div className="text-sm text-gray-600">{t.our_country_presence}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6" style={{color: 'var(--cta-color)'}} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{t.our_gems}</div>
                      <div className="text-sm text-gray-600">{t.our_gem_collection}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox Modal for High-Res Inspection */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center bg-white rounded-2xl shadow-2xl p-4 md:p-6 border border-stone-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                <h3 className="serif-heading text-lg md:text-xl font-bold text-stone-900">
                  {selectedCert.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={t.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full flex-1 overflow-auto flex items-center justify-center p-2">
                <img 
                  src={selectedCert.src} 
                  alt={selectedCert.title} 
                  className="max-h-[72vh] w-auto object-contain rounded-lg shadow-inner"
                />
              </div>
              <p className="text-xs text-stone-500 mt-3 text-center">
                International Gem Society (IGS) • Verified Professional Certification
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

