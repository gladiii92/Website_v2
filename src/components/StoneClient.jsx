'use client';
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";
import { createPageUrl } from "../utils";
import { getLocalizedStoneName } from "../utils/stoneLocalization";
import Image from "next/image";
import { gemstones } from "../data/Gemstones";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
import { ArrowLeft, Play, Pause, Share2, Award, Shield, Sparkles, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Label } from "../components/ui/Label";
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
    contact_form_title: "Edelstein anfragen",
    inquire_now: "Unverbindlich anfragen",
    whatsapp_inquiry: "WhatsApp Beratung",
    link_copied: "Link kopiert!",
    guarantee_authentic: "100% Unbehandelt & Natürlich",
    guarantee_inspection: "30 Tage Rückgaberecht zur Prüfung",
    guarantee_shipping: "Vollversicherter Expressversand",
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
      fancy: "Unikat"
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
      17: "Roter Rubin",
      18: "Lebendig-Grüner Peridot",
      19: "Dunkel-Blau-Grüner Saphir",
      20: "Hellgrüner Smaragd",
      21: "Champagner Topaz",
      22: "Bi-Color Tourmalin"
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
      pinkishred: "Lila-Rot",
      darkteal: "Dunkel-Blau-Grün",
      lightgreen: "Hell-Grün",
      champagner: "Champagner",
      bicolor: "Bi-Color"
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
    contact_form_title: "Inquire about this Gemstone",
    inquire_now: "Inquire / Reserve",
    whatsapp_inquiry: "WhatsApp Consultation",
    link_copied: "Link copied!",
    guarantee_authentic: "100% Natural & Untreated",
    guarantee_inspection: "30-Day Inspection Period",
    guarantee_shipping: "Fully Insured Express Shipping",

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
      emerald: "Emerald-Cut",
      princess: "Princess-Cut",
      marquise: "Marquise",
      pear: "Pear",
      asscher: "Asscher",
      radiant: "Radiant",
      trilliant: "Trilliant",
      heart: "Heart",
      fancy: "Fancy"
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
      pinkishred: "Pinkish-Red",
      darkteal: "Dark-Teal",
      lightgreen: "Light-Green",
      champagner: "Champagne",
      bicolor: "Bi-Color"
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
      17: "Red Ruby",
      18: "Vivid-Green Peridot",
      19: "Dark-Teal Sapphire",
      20: "Light-Green Emerald",
      21: "Champagne Topaz",
      22: "Bi-Color Tourmaline"

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
    contact_form_title: "Demande sur cette Pierre",
    inquire_now: "Demander / Réserver",
    whatsapp_inquiry: "Conseil WhatsApp",
    link_copied: "Lien copié !",
    guarantee_authentic: "100% Naturel & Non Traité",
    guarantee_inspection: "Inspection 30 Jours Garantie",
    guarantee_shipping: "Livraison Express Entièrement Assurée",
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
      fancy: "Fantaisie"
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
      blaugruen: "Sarcelle",
      orangegelb: "Orange-Jaune",
      gelborange: "Jaune-Orangé",
      pinkishred: "Rouge-Pourpre",
      darkteal: "Sarcelle-Foncée",
      lightgreen: "Vert-Clair",
      champagner: "Champagneur",
      bicolor: "Bi-Color"

    },
    stone_names: {
      1: "Saphir Jaune",
      2: "Spinelle Bleu",
      3: "Saphir Sarcelle",
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
      17: "Rubis Rouge",
      18: "Péridot Vert-Vif",
      19: "Saphir Bleu-Sarcelle-Foncé",
      20: "Émeraude Vert-Clair",
      21: "Topaze Champagne",
      22: "Tourmaline Bicolore"

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

export default function StoneClient({ lang, slug }) {
  const router = useRouter();
  const [language, setLanguage] = useState("de");
  const [stone, setStone] = useState(null);
  const [loading, setLoading] = useState(true);
  const wishlistContext = useWishlist();
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
  const [copyFeedback, setCopyFeedback] = useState(false);
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
      router.push(`/${language}/collection`);
    }

    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, [router, slug]);

  const loadStoneBySlug = async (slug) => {
    try {
      const stoneData = gemstones.find(s => s.slug === slug);
      if (stoneData) {
        setStone(stoneData); 
        generateThumbnails(stoneData);
      } else {
        router.push(`/${language}/collection`);
      }
    } catch (error) {
      console.error('Error loading stone:', error);
      router.push(`/${language}/collection`);
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
    // Sicheres Preloading ausschließlich für statische Bilder
    if (stone && allMedia.length > 0) {
      allMedia.forEach((media) => {
        if (!media.endsWith('.mp4')) {
          const img = new window.Image();
          img.src = media;
        }
      });
    }
  }, [stone, allMedia]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const stoneTitle = getTranslatedStoneName(stone.id);
    const subject = encodeURIComponent(`Anfrage zu ${stoneTitle} (ID: ${stone.id})`);
    const body = encodeURIComponent(
      `Name: ${inquiryForm.full_name}\nE-Mail: ${inquiryForm.email}\nTelefon: ${inquiryForm.phone}\n\nStein: ${stoneTitle} (${stone.carat_weight}ct, ${stone.price_eur} €)\n\nNachricht:\n${inquiryForm.message}`
    );
    window.location.href = `mailto:info@noblecutgems.com?subject=${subject}&body=${body}`;
    setInquirySent(true);
    setTimeout(() => {
      setShowInquiryDialog(false);
      setInquirySent(false);
      setInquiryForm({ full_name: "", email: "", phone: "", message: "" });
    }, 2000);
  };

  const handleShare = async () => {
    const stoneTitle = getTranslatedStoneName(stone.id);
    const shareData = {
      title: `${stoneTitle} | NobleCutGems`,
      text: `${stoneTitle} - 100% Untreated Natural Gemstone from NobleCutGems`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2500);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fehler beim Teilen:', error);
      }
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
    return getLocalizedStoneName(stone, lang);
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
          <Link href={createPageUrl("Collection")}>
            <Button>{t.back_to_collection}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>

      <main className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back button */}
          <Link 
            href={createPageUrl("Collection")}
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
                  <Image
                    key={currentIndex}
                    src={allMedia[currentIndex] || ""}
                    alt={`${stone.name} Ansicht`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-opacity duration-300 opacity-100"
                    loading="eager"
                  />
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10"></div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    wishlistContext?.toggleWishlist(stone.id);
                  }}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 z-10 ${wishlistContext?.isInWishlist(stone.id) ? "bg-white text-red-500" : "bg-white/70 text-gray-700 hover:bg-white hover:text-red-500"}`}
                >
                  <Heart className="w-6 h-6" fill={wishlistContext?.isInWishlist(stone.id) ? "currentColor" : "none"} />
                </button>

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
                      <div className="relative w-full h-full">
                        <Image src={thumb} alt={`${stone.name} ${index + 1}`} fill sizes="100px" className="object-cover" />
                      </div>
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

                <div className="flex items-center gap-3 mb-6">
                  <div className="serif-heading text-4xl font-bold text-gray-900">
                    {formatPrice(stone.price_eur)}
                  </div>
                  {copyFeedback && (
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-medium">
                      ✓ {t.link_copied}
                    </span>
                  )}
                </div>

                {/* Refined Luxury Action & Assurance Block */}
                <div className="border border-stone-200/90 bg-stone-50/60 rounded-xl p-5 mb-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => setShowInquiryDialog(true)}
                      className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      {t.inquire_now || "Unverbindlich anfragen"}
                    </Button>
                    <a
                      href={`https://wa.me/4915168482909?text=${encodeURIComponent(
                        language === 'en'
                          ? `Hello NobleCutGems, I have a question about ${getTranslatedStoneName(stone.id)} (${stone.carat_weight}ct, ${stone.price_eur}€): ${typeof window !== 'undefined' ? window.location.href : ''}`
                          : language === 'fr'
                          ? `Bonjour NobleCutGems, j'ai une question concernant ${getTranslatedStoneName(stone.id)} (${stone.carat_weight}ct, ${stone.price_eur}€) : ${typeof window !== 'undefined' ? window.location.href : ''}`
                          : `Hallo NobleCutGems, ich habe eine Frage zu ${getTranslatedStoneName(stone.id)} (${stone.carat_weight}ct, ${stone.price_eur}€): ${typeof window !== 'undefined' ? window.location.href : ''}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300/90 text-xs sm:text-sm font-medium tracking-normal py-3.5 px-5 rounded-lg transition-all duration-200 hover:border-stone-400 shadow-sm"
                    >
                      <svg className="w-4 h-4 text-emerald-600 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      {t.whatsapp_inquiry || "WhatsApp Beratung"}
                    </a>
                  </div>

                  {/* Understated Luxury Trust Assurances */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-4 border-t border-stone-200/70 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{t.guarantee_authentic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{t.guarantee_inspection}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{t.guarantee_shipping}</span>
                    </div>
                  </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: stone[`description_${language}`] || stone.description_de }} className="text-gray-700 leading-relaxed mb-8" />

                {/* Specifications • direkt unter Beschreibung */}
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

                {/* Anfrage • unter Spezifikationen, nur 1x */}
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
                            placeholder={
                              language === 'en'
                                ? `I am interested in ${getTranslatedStoneName(stone.id)}...`
                                : language === 'fr'
                                ? `Je suis intéressé(e) par ${getTranslatedStoneName(stone.id)}...`
                                : `Ich interessiere mich für ${getTranslatedStoneName(stone.id)}...`
                            }
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
      </main>
    </>
  );
}






