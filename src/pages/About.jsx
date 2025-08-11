
import React, { useState, useEffect } from "react";
import { Award, Users, Globe, Heart, Sparkles, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Added import for Button component

const translations = {
  de: {
    page_title: "Über NobleCutGems",
    page_subtitle: "Eine Leidenschaft für außergewöhnliche Edelsteine seit drei Jahrzehnten",
    our_story_title: "Unsere Geschichte",
    our_story_content: "NobleCutGems wurde 1994 aus der Vision geboren, die außergewöhnlichsten Edelsteine der Welt zu entdecken und zu kuratieren. Als Familienunternehmen mit Sitz in München haben wir uns über drei Jahrzehnte hinweg einen internationalen Ruf als Experten für seltene und wertvolle Edelsteine erworben. Unsere Leidenschaft für Perfektion und unser unermüdliches Streben nach den schönsten Exemplaren der Natur haben uns zu einem der führenden Namen im Premium-Edelsteinhandel gemacht.",
    our_mission_title: "Unsere Mission",
    our_mission_content: "Bei NobleCutGems glauben wir, dass jeder Edelstein eine Geschichte erzählt - eine Geschichte von Millionen Jahren geologischer Entstehung, von der Entdeckung in entlegenen Minen und von der meisterhaften Bearbeitung durch erfahrene Handwerker. Unsere Mission ist es, diese Geschichten zu bewahren und Sammlern sowie Liebhabern Zugang zu den außergewöhnlichsten Edelsteinen der Welt zu ermöglichen.",
    expertise_title: "IGS-Zertifizierte Expertise",
    expertise_desc: "Offizielle Zertifizierung durch die International Gem Society für höchste Fachkompetenz",
    global_title: "Weltweite Beschaffung",
    global_desc: "Direkter Zugang zu den besten Minen und Quellen in über 25 Ländern",
    craftsmanship_title: "Meisterhandwerk",
    craftsmanship_desc: "Traditionelle Schleiftechniken kombiniert mit modernster Technologie",
    trust_title: "Vertrauen & Integrität",
    trust_desc: "30 Jahre Erfahrung und über 5.000 zufriedene Kunden weltweit",
    heritage_title: "Unser Erbe",
    heritage_content: "Was 1994 als kleine Sammlung begann, ist heute zu einem der angesehensten Namen im internationalen Edelsteinhandel geworden. Unsere Expertise wird von Sammlern, Museen und Juwelieren auf der ganzen Welt geschätzt. Mit der offiziellen Zertifizierung durch die International Gem Society (IGS) bestätigen wir unser Engagement für höchste Qualitätsstandards und fachliche Exzellenz.",
    values_title: "Unsere Werte",
    igs_cert_title: "IGS-Zertifikat anzeigen",
    igs_modal_title: "International Gem Society Zertifikat",
    igs_description: "NobleCutGems ist stolz darauf, offiziell von der International Gem Society (IGS) zertifiziert zu sein. Diese prestigeträchtige Zertifizierung bestätigt unsere Expertise in der Bewertung, Authentifizierung und dem Handel mit Edelsteinen höchster Qualität.",
    close: "Schließen"
  },
  en: {
    page_title: "About NobleCutGems",
    page_subtitle: "A passion for exceptional gemstones for three decades",
    our_story_title: "Our Story",
    our_story_content: "NobleCutGems was born in 1994 from the vision to discover and curate the world's most exceptional gemstones. As a family business based in Munich, we have built an international reputation as experts in rare and valuable gemstones over three decades. Our passion for perfection and relentless pursuit of nature's most beautiful specimens has made us one of the leading names in premium gemstone trading.",
    our_mission_title: "Our Mission",
    our_mission_content: "At NobleCutGems, we believe that every gemstone tells a story - a story of millions of years of geological formation, of discovery in remote mines, and of masterful processing by experienced craftsmen. Our mission is to preserve these stories and provide collectors and enthusiasts with access to the world's most exceptional gemstones.",
    expertise_title: "IGS-Certified Expertise",
    expertise_desc: "Official certification by the International Gem Society for the highest professional competence",
    global_title: "Global Sourcing",
    global_desc: "Direct access to the finest mines and sources in over 25 countries",
    craftsmanship_title: "Master Craftsmanship",
    craftsmanship_desc: "Traditional cutting techniques combined with state-of-the-art technology",
    trust_title: "Trust & Integrity",
    trust_desc: "30 years of experience and over 5,000 satisfied customers worldwide",
    heritage_title: "Our Heritage",
    heritage_content: "What began as a small collection in 1994 has grown into one of the most respected names in international gemstone trading. Our expertise is valued by collectors, museums, and jewelers around the world. With official certification from the International Gem Society (IGS), we confirm our commitment to the highest quality standards and professional excellence.",
    values_title: "Our Values",
    igs_cert_title: "View IGS Certificate",
    igs_modal_title: "International Gem Society Certificate",
    igs_description: "NobleCutGems is proud to be officially certified by the International Gem Society (IGS). This prestigious certification confirms our expertise in evaluating, authenticating, and trading gemstones of the highest quality.",
    close: "Close"
  },
  fr: {
    page_title: "À propos de NobleCutGems",
    page_subtitle: "Une passion pour les pierres précieuses exceptionnelles depuis trois décennies",
    our_story_title: "Notre Histoire",
    our_story_content: "NobleCutGems est né en 1994 de la vision de découvrir et de curer les pierres précieuses les plus exceptionnelles au monde. En tant qu'entreprise familiale basée à Munich, nous avons construit une réputation internationale en tant qu'experts en pierres précieuses rares et précieuses sur trois décennies. Notre passion pour la perfection et notre quête incessante des plus beaux spécimens de la nature ont fait de nous l'un des noms leaders du commerce de pierres précieuses premium.",
    our_mission_title: "Notre Mission",
    our_mission_content: "Chez NobleCutGems, nous croyons que chaque pierre précieuse raconte une histoire - une histoire de millions d'années de formation géologique, de découverte dans des mines reculées, et de traitement magistral par des artisans expérimentés. Notre mission est de préserver ces histoires et de fournir aux collectionneurs et passionnés un accès aux pierres précieuses les plus exceptionnelles du monde.",
    expertise_title: "Expertise Certifiée IGS",
    expertise_desc: "Certification officielle par l'International Gem Society pour la plus haute compétence professionnelle",
    global_title: "Approvisionnement Mondial",
    global_desc: "Accès direct aux meilleures mines et sources dans plus de 25 pays",
    craftsmanship_title: "Artisanat de Maître",
    craftsmanship_desc: "Techniques de taille traditionnelles combinées à la technologie de pointe",
    trust_title: "Confiance & Intégrité",
    trust_desc: "30 ans d'expérience et plus de 5 000 clients satisfaits dans le monde entier",
    heritage_title: "Notre Héritage",
    heritage_content: "Ce qui a commencé comme une petite collection en 1994 est devenu l'un des noms les plus respectés du commerce international de pierres précieuses. Notre expertise est appréciée par des collectionneurs, des musées et des bijoutiers du monde entier. Avec la certification officielle de l'International Gem Society (IGS), nous confirmons notre engagement envers les plus hauts standards de qualité et l'excellence professionnelle.",
    values_title: "Nos Valeurs",
    igs_cert_title: "Voir le Certificat IGS",
    igs_modal_title: "Certificat International Gem Society",
    igs_description: "NobleCutGems est fier d'être officiellement certifié par l'International Gem Society (IGS). Cette certification prestigieuse confirme notre expertise dans l'évaluation, l'authentification et le commerce de pierres précieuses de la plus haute qualité.",
    close: "Fermer"
  }
};

export default function AboutPage() {
  const [language, setLanguage] = useState("de");
  const [showIGSModal, setShowIGSModal] = useState(false);

  const t = translations[language];

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
      {/*
        Removed react-helmet usage to fix application errors due to unsupported package.
        Head elements (title, meta, script) might need to be handled by a different mechanism
        like Next.js Head component or a custom solution for SEO/metadata.
      */}
      {/* <Helmet>
        <title>{t.page_title} | NobleCutGems</title>
        <meta name="description" content={t.page_subtitle} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": t.page_title,
            "description": t.page_subtitle,
            "url": "https://noblecutgems.de/about"
          })}
        </script>
      </Helmet> */}

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
              <div>
                <h2 className="serif-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {t.our_story_title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {t.our_story_content}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--primary-color)', opacity: 0.2}}>
                    <Heart className="w-6 h-6" style={{color: 'var(--primary-color)'}} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Seit 1994</div>
                    <div className="text-sm text-gray-600">Drei Jahrzehnte Leidenschaft</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Gemstone workshop"
                  className="rounded-lg shadow-2xl"
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
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4">
                    {t.expertise_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {t.expertise_desc}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowIGSModal(true)}
                    className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    {t.igs_cert_title}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--success)', opacity: 0.2}}>
                    <Globe className="w-8 h-8" style={{color: 'var(--success)'}} />
                  </div>
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4">
                    {t.global_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.global_desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--cta-color)', opacity: 0.2}}>
                    <Sparkles className="w-8 h-8" style={{color: 'var(--cta-color)'}} />
                  </div>
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4">
                    {t.craftsmanship_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.craftsmanship_desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--success)', opacity: 0.2}}>
                    <Award className="w-8 h-8" style={{color: 'var(--success)'}} />
                  </div>
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-4">
                    {t.trust_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.trust_desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-primary-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Gemstones"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="serif-heading text-3xl md:text-4xl font-bold mb-8">
              {t.our_mission_title}
            </h2>
            <p className="text-xl text-gray-100 leading-relaxed">
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
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Heritage craftsman"
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="serif-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {t.heritage_title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {t.heritage_content}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6" style={{color: 'var(--primary-color)'}} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">5000+ Kunden</div>
                      <div className="text-sm text-gray-600">Zufriedene Sammler weltweit</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6" style={{color: 'var(--success)'}} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">25+ Länder</div>
                      <div className="text-sm text-gray-600">Internationale Präsenz</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6" style={{color: 'var(--cta-color)'}} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">10.000+ Edelsteine</div>
                      <div className="text-sm text-gray-600">Kuratierte Sammlung</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* IGS Certificate Modal */}
      <Dialog open={showIGSModal} onOpenChange={setShowIGSModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="serif-heading text-2xl font-bold text-gray-900 mb-4">
              {t.igs_modal_title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <Award className="w-16 h-16" style={{color: 'var(--primary-color)'}} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{color: 'var(--primary-color)'}}>
                International Gem Society
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.igs_description}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{borderLeftColor: 'var(--primary-color)'}}>
                <div className="text-left space-y-2">
                  <div><strong>Zertifikat-Nr.:</strong> IGS-2024-NCG-001</div>
                  <div><strong>Ausgestellt:</strong> Januar 2024</div>
                  <div><strong>Gültig bis:</strong> Januar 2027</div>
                  <div><strong>Status:</strong> <span style={{color: 'var(--success)'}} className="font-semibold">Aktiv</span></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={() => setShowIGSModal(false)} className="cta-btn hover:bg-orange-600 text-white px-8">
                {t.close}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
