import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { createPageUrl } from "../utils";
import { gemstones } from "../data/Gemstones";
import { ArrowLeft, Play, Pause, Share2, Award, Shield, Sparkles, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Label } from "../components/ui/Label";
import { useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/Accordion";

const translations = {
  de: {
    back_to_collection: "Zurück zur Kollektion",
    specifications: "Spezifikationen",
    carat_weight: "Karat-Gewicht",
    color: "Farbe",
    clarity: "Reinheit",
    cut: "Schliff",
    origin: "Herkunft",
    certification: "Zertifizierung",
    price: "Preis",
    price_per_carat: "Preis pro Karat",
    full_name: "Vollständiger Name",
    email: "E-Mail",
    phone: "Telefon",
    message: "Nachricht",
    send_inquiry: "Anfrage senden",
    inquiry_sent: "Anfrage gesendet",
    inquiry_success: "Vielen Dank für Ihr Interesse! Wir werden uns bald bei Ihnen melden.",
    play_video: "Video abspielen",
    share_stone: "Edelstein teilen",
    add_wishlist: "Zur Wunschliste hinzufügen",
    stone_not_found: "Edelstein nicht gefunden",
    loading: "Wird geladen...",
    // Edelstein-Typen
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
    treatments: {
      untreated: "Unbehandelt",
      treated: "Behandelt",
      none: "Keine Angabe"
    },
    treatment: "Unbehandelt",
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
    colors: {
      gelb: "Gelb",
      blau: "Blau",
      gruen: "Grün",
      rot: "Rot",
      electricblue: "Elektrisch-Blau",
      lila: "Lila",
      reddishpink: "Rötlich-Pink",
      violett: "Violett",
      blaugruen: "Bläulich-Grün",
      gelborange: "Gelb-Orange",
      orangegelb: "Orange-Gelb",
      pinkishred: "Lila-Rot"
    },
    certifications: {
      aig: "AIG-Zertifikat",
      igi: "IGI-Zertifikat",
      guebelin: "Gübelin-Zertifikat",
      gia: "GIA-Zertifikat",
      ssef: "SSEF-Zertifikat",
      none: "Nicht zertifiziert - auf Anfrage"
    },
    rarity_levels: {
      exceptional: "Außergewöhnlich",
      rare: "Selten",
      premium: "Premium",
      select: "Einsteiger"
    },
    rarity: "Seltenheit",
    rarity_descriptions: {
      exceptional: "Außergewöhnlich - top 1%",
      rare: "Selten - top 3%",
      premium: "Premium - top 10%",
      select: "Einsteiger - top 20%"
    },
    clarities: {
      lupenrein: "Lupenrein - Keine Einschlüsse sichtbar",
      vvs: "VVS - Sehr sehr kleine Einschlüsse",
      vs: "VS - Sehr kleine Einschlüsse",
      augenrein: "Augenrein - Mit dem bloßen Auge keine Einschlüsse sichtbar",
      si: "SI - Kleine Einschlüsse",
      i: "I - Sichtbare Einschlüsse"
    },
    lexicon_title: "Edelstein-Lexikon",
    lexicon_clarity_title: "Reinheit (Clarity)",
    lexicon_rarity_title: "Seltenheitsstufen (Rarity Levels)",
    lexicon_clarity_desc: "Die Reinheit beschreibt Einschlüsse im Stein. Hier die Stufen:",
    lexicon_rarity_desc: "Seltenheit gibt die Exklusivität an. Hier die Stufen:"
  },
  en: {
    back_to_collection: "Back to Collection",
    specifications: "Specifications",
    carat_weight: "Carat Weight",
    color: "Color",
    clarity: "Clarity",
    cut: "Cut",
    origin: "Origin",
    certification: "Certification",
    price: "Price",
    price_per_carat: "Price per Carat",
    full_name: "Full Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    send_inquiry: "Send Inquiry",
    inquiry_sent: "Inquiry Sent",
    inquiry_success: "Thank you for your interest! We will contact you soon.",
    play_video: "Play Video",
    share_stone: "Share Gemstone",
    add_wishlist: "Add to Wishlist",
    stone_not_found: "Gemstone not found",
    loading: "Loading...",

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
    treatments: {
      untreated: "Untreated",
      treated: "Treated",
      none: "No Information"
    },
    treatment: "Untreated",
    colors: {
      gelb: "Yellow",
      blau: "Blue",
      gruen: "Green",
      rot: "Red",
      electricblue: "Electric-Blue",
      lila: "Purple",
      reddishpink: "Reddish-Pink",
      violett: "Violet",
      blaugruen: "Blueish-Green",
      yelloworange: "Yellowih-Orange",
      orangeyellow: "Orange-Yellow",
      pinkishred: "Pinkish-Red"
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
      13: "Yellowish-Green Mali Garnet",
      14: "Yellowish-Brown Mali Garnet",
      15: "Red Ruby",
      16: "Pinkish-Red Ruby",
      17: "Red Ruby"
    },
    certifications: {
      aig: "AIG Certificate",
      igi: "IGI Certificate",
      guebelin: "Gübelin Certificate",
      gia: "GIA Certificate",
      ssef: "SSEF Certificate",
      none: "Not Certified - on request"
    },
    rarity_levels: {
      exceptional: "Exceptional",
      rare: "Rare",
      premium: "Premium",
      select: "Beginners"
    },
    rarity: "Rarity",
    rarity_descriptions: {
      exceptional: "Exceptional - top 1%",
      rare: "Rare - top 3%",
      premium: "Premium - top 10%",
      select: "Beginner - top 20%"
    },
    clarities: {
      lupenrein: "Flawless - No inclusions visible",
      vvs: "VVS - Very very slightly included",
      vs: "VS - Very slightly included",
      augenrein: "Eye Clean - No inclusions visible to the naked eye",
      si: "SI - Slightly included",
      i: "I - Included"
    },
    lexicon_title: "Gemstone Lexicon",
    lexicon_clarity_title: "Clarity",
    lexicon_rarity_title: "Rarity Levels",
    lexicon_clarity_desc: "Clarity describes inclusions in the stone. Here are the levels:",
    lexicon_rarity_desc: "Rarity indicates exclusivity. Here are the levels:"
  },
  fr: {
    back_to_collection: "Retour à la Collection",
    specifications: "Spécifications",
    carat_weight: "Poids en Carats",
    color: "Couleur",
    clarity: "Pureté",
    cut: "Taille",
    origin: "Origine",
    certification: "Certification",
    price: "Prix",
    price_per_carat: "Prix par Carat",
    full_name: "Nom Complet",
    email: "E-mail",
    phone: "Téléphone",
    message: "Message",
    send_inquiry: "Envoyer la Demande",
    inquiry_sent: "Demande Envoyée",
    inquiry_success: "Merci pour votre intérêt ! Nous vous contacterons bientôt.",
    play_video: "Lire la Vidéo",
    share_stone: "Partager la Pierre",
    add_wishlist: "Ajouter aux Favoris",
    stone_not_found: "Pierre précieuse non trouvée",
    loading: "Chargement...",
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
    treatments: {
      untreated: "Non Traité",
      treated: "Traité",
      none: "Aucune Information"
    },
    treatment: "Non Traité",
    colors: {
      gelb: "Jaune",
      blau: "Bleu",
      gruen: "Vert",
      rot: "Rouge",
      electricblue: "Bleu-Électrique",
      lila: "Violet",
      reddishpink: "Rouge-Rose",
      violett: "Violet",
      blaugruen: "Bleu-Vert",
      orangegelb: "Orange-Jaune",
      gelborange: "Jaune-Orangé",
      pinkishred: "Rouge-Pourpre"

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
      13: "Grenat Vert-Jaunâtre du Mali",
      14: "Grenat Brun-Jaunâtre du Mali",
      15: "Rubis Rouge",
      16: "Rubis Rouge-Pourpre",
      17: "Rubis Rouge"
    },
    certifications: {
      aig: "Certificat AIG",
      igi: "Certificat IGI",
      guebelin: "Certificat Gübelin",
      gia: "Certificat GIA",
      ssef: "Certificat SSEF",
      none: "Non Certifié - sur demande"
    },
    rarity_levels: {
      exceptional: "Exceptionnel",
      rare: "Rare",
      premium: "Premium",
      select: "Débutants"
    },
    rarity: "Rareté",
    rarity_descriptions: {
      exceptional: "Exceptionnel - top 1%",
      rare: "Rare - top 3%",
      premium: "Premium - top 10%",
      select: "Débutants - top 20%"
    },
    clarities: {
      lupenrein: "Lupenrein - Aucune inclusion visible",
      vvs: "VVS - Très très petites inclusions",
      vs: "VS - Très petites inclusions",
      augenrein: "Eye Clean - Aucune inclusion visible à l'œil nu",
      si: "SI - Petites inclusions",
      i: "I - Inclusions visibles"
    },
    lexicon_title: "Lexique des Pierres Précieuses",
    lexicon_clarity_title: "Pureté (Clarity)",
    lexicon_rarity_title: "Niveaux de Rareté (Rarity Levels)",
    lexicon_clarity_desc: "La pureté décrit les inclusions dans la pierre. Voici les niveaux :",
    lexicon_rarity_desc: "La rareté indique l'exclusivité. Voici les niveaux :"
  }
};

export default function StonePage() {
  const navigate = useNavigate();
  const { slug } = useParams(); // Neu: Hole Slug aus URL
  const location = useLocation();
  const [language, setLanguage] = useState("de");
  const [stone, setStone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [thumbnails, setThumbnails] = useState([]);
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % allMedia.length),
    onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length),
    trackMouse: false,
  });

  const t = translations[language];

  const allMedia = useMemo(() => 
    stone ? [stone.main_image_url, ...(stone.gallery_images || [])].filter(Boolean) : [],
    [stone]
  );

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };

    const storedLang = localStorage.getItem('language') || 'de';
    setLanguage(storedLang);

    window.addEventListener('languageChange', handleLanguageChange);

    // Neu: Lade Stone basierend auf Slug
    if (slug) {
      loadStoneBySlug(slug);
    } else {
      navigate(createPageUrl("Collection"));
    }

    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, [navigate, slug]);

  const loadStoneBySlug = async (slug) => {
    try {
      const stoneData = gemstones.find(s => s.slug === slug);
      if (stoneData) {
        setStone(stoneData); 
        generateThumbnails(stoneData);
      } else {
        navigate(createPageUrl("Collection"));
      }
    } catch (error) {
      console.error('Error loading stone:', error);
      navigate(createPageUrl("Collection"));
    } finally {
      setLoading(false);
    }
  };

  const generateThumbnails = (stoneData) => {
    const allMedia = [stoneData.main_image_url, ...(stoneData.gallery_images || [])].filter(Boolean);
    const thumbs = allMedia.map((media) => {
      if (media.endsWith('.mp4')) {
        // Erzeuge Thumbnail aus erstem Frame
        const video = document.createElement('video');
        video.src = media;
        video.muted = true;
        video.preload = 'metadata';
        video.onloadeddata = () => {
          video.currentTime = 0;
        };
        video.onseeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbUrl = canvas.toDataURL('image/png');
          setThumbnails((prev) => {
            const newThumbs = [...prev];
            newThumbs[allMedia.indexOf(media)] = thumbUrl;
            return newThumbs;
          });
        };
        return stoneData.main_image_url;  // Fallback bis Thumbnail generiert
      }
      return media;
    });
    setThumbnails(thumbs);
  };

  useEffect(() => {
    // Neu: Preload-Funktion
    const preloadMedia = () => {
      allMedia.forEach((media) => {
        if (media.endsWith('.mp4')) {
          const video = document.createElement('video');
          video.src = media;
          video.preload = 'auto'; // Lädt das Video im Voraus
          video.style.display = 'none'; // Unsichtbar
          document.body.appendChild(video); // Fügt zum DOM hinzu, um zu laden
          // Entferne nach Laden, um Speicher zu sparen (optional)
          video.onloadeddata = () => document.body.removeChild(video);
        } else {
          const img = new Image();
          img.src = media; // Lädt Bilder im Voraus
        }
      });
    };

    if (stone && allMedia.length > 0) {
      preloadMedia(); // Starte Preloading nach Laden der Stone-Daten
    }
  }, [stone, allMedia]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage zu ${stone.name}`);
    const body = encodeURIComponent(
      `Name: ${inquiryForm.full_name}\nE-Mail: ${inquiryForm.email}\nTelefon: ${inquiryForm.phone}\n\n${inquiryForm.message}`
    );
    window.location.href = `mailto:noblecutgems_official@gmx.de?subject=${subject}&body=${body}`;
    setInquirySent(true);
    setTimeout(() => {
      setShowInquiryDialog(false);
      setInquirySent(false);
      setInquiryForm({ full_name: "", email: "", phone: "", message: "" });
    }, 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: stone.stone_names,
      text: `Schauen Sie sich diesen wundervollen ${stone.stone_names} an!`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Kopiere URL in Clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert('Link kopiert!');
      }
    } catch (error) {
      console.error('Fehler beim Teilen:', error);
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

  const getRarityColor = (rarity_level) => {
    const colors = {
      exceptional: "bg-purple-100 text-purple-800 border-purple-200",
      rare: "bg-amber-100 text-amber-800 border-amber-200",
      premium: "bg-blue-100 text-blue-800 border-blue-200",
      select: "bg-green-100 text-green-800 border-green-200"
    };
    return colors[rarity_level] || colors.select;
  };

  const getTranslatedType = (type) => {
    return t.types?.[type?.toLowerCase()] || type || 'N/A';
  };

  const getTranslatedCut = (cut) => {
    return t.cuts?.[cut?.toLowerCase()] || cut || 'N/A';
  };

  const getTranslatedOrigin = (origin) => {
    return t.origins?.[origin?.toLowerCase()] || origin || 'N/A';
  };

  const getTranslatedColor = (color) => {
    return t.colors?.[color?.toLowerCase()] || color || 'N/A';
  };

  const getTranslatedCertification = (cert) => {
    return t.certifications?.[cert?.toLowerCase()] || cert || t.certifications.none;
  };

  const getTranslatedStoneName = (id) => {
    return t.stone_names?.[id] || stone.name;
  };

  const getTranslatedTreatment = (treatment) => {
    return t.treatments?.[treatment?.toLowerCase()] || treatment || t.treatments.none;
  };

  const getTranslatedRarity = (rarity) => {
    return t.rarity_levels?.[rarity?.toLowerCase()] || rarity;
  };
  
  const getTranslatedRarityDescription = (rarity) => {
    return t.rarity_descriptions?.[rarity?.toLowerCase()] || rarity;
  };

  const getTranslatedClarityDescription = (clarity) => {
    return t.clarities?.[clarity?.toLowerCase()] || clarity;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-accent mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!stone) {
    return (
      <div className="min-h-screen bg-white py-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.stone_not_found}</h2>
          <Link to={createPageUrl("Collection")}>
            <Button>{t.back_to_collection}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getTranslatedStoneName(stone?.id) || 'Edelstein'} | NobleCutGems</title>
        <meta name="description" content={stone ? stone[`description_${language}`]?.substring(0, 160) : 'Entdecken Sie exklusive Edelsteine bei NobleCutGems.'} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back button */}
          <Link 
            to={createPageUrl("Collection")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back_to_collection}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Media Gallery */}
            <div className="space-y-4 w-full max-w-md mx-auto lg:max-w-lg ">
              <div 
                {...handlers}
                className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group touch-pan-x media-container"
              >
                {allMedia[currentIndex].endsWith('.mp4') ? (
                  <video
                    src={allMedia[currentIndex]}
                    autoPlay
                    loop
                    muted
                    preload="auto"
                    poster={thumbnails[currentIndex]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    key={currentIndex}
                    src={allMedia[currentIndex] || ""}
                    alt={stone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-opacity duration-300 opacity-100"
                    loading="eager"
                  />
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10"></div>

                {/* Navigation arrows */}
                {allMedia.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) => (prev + 1) % allMedia.length)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail navigation */}
              {allMedia.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {thumbnails.map((thumb, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentIndex
                          ? "border-gold-accent"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img src={thumb} alt={`${stone.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Neu: Lexikon unter der Gallery (im freien Feld) */}
              <div className="mt-8">
                <h3 className="serif-heading text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" style={{color: 'var(--primary-color)'}} />
                  {t.lexicon_title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="clarity">
                    <AccordionTrigger>{t.lexicon_clarity_title}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 mb-2">{t.lexicon_clarity_desc}</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>{t.clarities.lupenrein}</li>
                        <li>{t.clarities.vvs}</li>
                        <li>{t.clarities.vs}</li>
                        <li>{t.clarities.augenrein}</li>
                        <li>{t.clarities.si}</li>
                        <li>{t.clarities.i}</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rarity">
                    <AccordionTrigger>{t.lexicon_rarity_title}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 mb-2">{t.lexicon_rarity_desc}</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>{t.rarity_descriptions.exceptional}</li>
                        <li>{t.rarity_descriptions.rare}</li>
                        <li>{t.rarity_descriptions.premium}</li>
                        <li>{t.rarity_descriptions.select}</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Stone Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className={`${getRarityColor(stone.rarity_level)} border mb-3`}>
                      {getTranslatedRarity(stone.rarity_level)}
                    </Badge>
                    <h1 className="serif-heading text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {getTranslatedStoneName(stone.id)}
                    </h1>
                    <p className="text-xl text-gray-600">
                      {getTranslatedType(stone.type)} • {stone.carat_weight}ct • {getTranslatedCut(stone.cut)} • {getTranslatedOrigin(stone.origin)} • {getTranslatedTreatment(stone.treatment)} • {stone.clarity || 'N/A'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="serif-heading text-4xl font-bold text-gray-900 mb-6">
                  {formatPrice(stone.price_eur)}
                </div>

                <div dangerouslySetInnerHTML={{ __html: stone[`description_${language}`] || stone.description_de }} className="text-gray-700 leading-relaxed mb-8" />

                {/* Specifications – direkt unter Beschreibung */}
                <Card className="mb-20">
                  <CardContent className="p-6 ">
                    <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-2 flex items-center p-2">
                      <Sparkles className="w-8 h-5" style={{color: 'var(--cta-color)'}} />
                      {t.specifications}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm p-4 space-y-2">
                      {stone.carat_weight && (
                        <div className="border-b border-gray-100 pb-3">
                          <dt className="font-medium text-gray-600 mb-1">{t.carat_weight}</dt>
                          <dd className="text-gray-900 font-semibold">{stone.carat_weight}ct</dd>
                        </div>
                      )}
                      {stone.color && (
                        <div className="border-b border-gray-100 pb-3">
                          <dt className="font-medium text-gray-600 mb-1">{t.color}</dt>
                          <dd className="text-gray-900 font-semibold">{getTranslatedColor(stone.color)}</dd>
                        </div>
                      )}
                      {stone.clarity && (
                        <div className="border-b border-gray-100 pb-3">
                          <dt className="font-medium text-gray-600 mb-1">{t.clarity}</dt>
                          <dd className="text-gray-900 font-semibold">{getTranslatedClarityDescription(stone.clarity)}</dd>
                        </div>
                      )}
                      {stone.cut && (
                        <div className="border-b border-gray-100 pb-3">
                          <dt className="font-medium text-gray-600 mb-1">{t.cut}</dt>
                          <dd className="text-gray-900 font-semibold">{getTranslatedCut(stone.cut)}</dd>
                        </div>
                      )}
                      {stone.origin && (
                        <div className="border-b border-gray-100 pb-3">
                          <dt className="font-medium text-gray-600 mb-1">{t.origin}</dt>
                          <dd className="text-gray-900 font-semibold">{getTranslatedOrigin(stone.origin)}</dd>
                        </div>
                      )}
                      
                      <div className="border-b border-gray-100 pb-3">
                        <dt className="font-medium text-gray-600 mb-1">{t.treatment}</dt>
                        <dd className="text-gray-900 font-semibold">{getTranslatedTreatment(stone.treatment)}</dd>
                      </div>

                      {stone.rarity_level && (
                        <div className="border-b border-gray-100 pb-3">
                          <dt className="font-medium text-gray-600 mb-1">{t.rarity}</dt>
                          <dd className="text-gray-900 font-semibold">{getTranslatedRarityDescription(stone.rarity_level)}</dd>
                        </div>
                      )}

                      <div className="border-b border-gray-100 pb-3">
                        <dt className="font-medium text-gray-600 mb-1">{t.certification}</dt>
                        <dd className="text-gray-900 font-semibold">{getTranslatedCertification(stone.certification)}</dd>
                      </div>
                      
                      <div className="border-b border-gray-100 pb-3">
                        <dt className="font-medium text-gray-600 mb-1">{t.price_per_carat}</dt>
                        <dd className="text-gray-900 font-semibold">
                          {formatPrice(stone.price_eur / stone.carat_weight)} / ct
                        </dd>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Anfrage – unter Spezifikationen, nur 1x */}
                <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{t.contact_form_title}</DialogTitle>
                    </DialogHeader>
                    {inquirySent ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'var(--success)', opacity: 0.1}}>
                          <Award className="w-8 h-8" style={{color: 'var(--success)'}} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--success)'}}>{t.inquiry_sent}</h3>
                        <p className="text-gray-600">{t.inquiry_success}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-4 mt-1">
                        <div>
                          <Label htmlFor="full_name">{t.full_name}</Label>
                          <Input
                            id="full_name"
                            name="full_name"
                            value={inquiryForm.full_name}
                            onChange={(e) => setInquiryForm({...inquiryForm, full_name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t.email}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={inquiryForm.email}
                            onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">{t.phone}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={inquiryForm.phone}
                            onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">{t.message}</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={inquiryForm.message}
                            onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                            placeholder={`Ich interessiere mich für ${stone.name}...`}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full cta-btn hover:bg-orange-600 text-white">
                          {t.send_inquiry}
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
