
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Gemstone, ContactInquiry } from "@/entities/all";
import { ArrowLeft, Play, Pause, Heart, Share2, Award, Shield, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const translations = {
  de: {
    back_to_collection: "Zurück zur Kollektion",
    inquiry_button: "Anfrage senden",
    specifications: "Spezifikationen",
    carat_weight: "Karat-Gewicht",
    color: "Farbe",
    clarity: "Reinheit",
    cut: "Schliff",
    origin: "Herkunft",
    certification: "Zertifizierung",
    rarity: "Seltenheit",
    price: "Preis",
    contact_form_title: "Anfrage für diesen Edelstein",
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
    // Gemstone types
    diamond: "Diamant",
    ruby: "Rubin",
    sapphire: "Saphir",
    emerald: "Smaragd",
    tanzanite: "Tansanit"
  },
  en: {
    back_to_collection: "Back to Collection",
    inquiry_button: "Send Inquiry",
    specifications: "Specifications",
    carat_weight: "Carat Weight",
    color: "Color",
    clarity: "Clarity", 
    cut: "Cut",
    origin: "Origin",
    certification: "Certification",
    rarity: "Rarity",
    price: "Price",
    contact_form_title: "Inquiry for this Gemstone",
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
    // Gemstone types
    diamond: "Diamond",
    ruby: "Ruby",
    sapphire: "Sapphire",
    emerald: "Emerald",
    tanzanite: "Tanzanite"
  },
  fr: {
    back_to_collection: "Retour à la Collection",
    inquiry_button: "Envoyer une Demande",
    specifications: "Spécifications",
    carat_weight: "Poids en Carats",
    color: "Couleur",
    clarity: "Pureté",
    cut: "Taille",
    origin: "Origine",
    certification: "Certification",
    rarity: "Rareté",
    price: "Prix",
    contact_form_title: "Demande pour cette Pierre Précieuse",
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
    // Gemstone types
    diamond: "Diamant",
    ruby: "Rubis",
    sapphire: "Saphir",
    emerald: "Émeraude",
    tanzanite: "Tanzanite"
  }
};

export default function StonePage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("de");
  const [stone, setStone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: ""
  });

  const t = translations[language];

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };
    
    const storedLang = localStorage.getItem('language') || 'de';
    setLanguage(storedLang);
    
    window.addEventListener('languageChange', handleLanguageChange);
    
    const urlParams = new URLSearchParams(window.location.search);
    const stoneId = urlParams.get('id');
    
    if (stoneId) {
      loadStone(stoneId);
    } else {
      navigate(createPageUrl("Collection"));
    }
    
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, [navigate]);

  const loadStone = async (stoneId) => {
    try {
      const stones = await Gemstone.filter({ id: stoneId });
      if (stones.length > 0) {
        setStone(stones[0]);
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

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await ContactInquiry.create({
        ...inquiryForm,
        inquiry_type: "stone_inquiry",
        gemstone_interest: stone.name,
        preferred_language: language
      });
      setInquirySent(true);
      setTimeout(() => {
        setShowInquiryDialog(false);
        setInquirySent(false);
        setInquiryForm({ full_name: "", email: "", phone: "", message: "" });
      }, 2000);
    } catch (error) {
      console.error('Error sending inquiry:', error);
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

  const getTranslatedType = (type) => {
    return t[type] || type;
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

  const allImages = [stone.main_image_url, ...(stone.gallery_images || [])].filter(Boolean);

  return (
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
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={allImages[currentImageIndex] || "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                alt={stone.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Video overlay */}
              {stone.video_url && currentImageIndex === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="bg-black/70 hover:bg-black/80 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                  >
                    {isVideoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail navigation */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex ? "border-gold-accent" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={image} alt={`${stone.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stone Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className={`${getRarityColor(stone.rarity_level)} border mb-3`}>
                    {stone.rarity_level}
                  </Badge>
                  <h1 className="serif-heading text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stone.name}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {getTranslatedType(stone.type)} • {stone.carat_weight} ct
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="serif-heading text-4xl font-bold text-gray-900 mb-6">
                {formatPrice(stone.price_eur)}
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                {stone[`description_${language}`] || stone.description_de}
              </p>

              <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full cta-btn hover:bg-orange-600 text-white py-3 text-lg font-semibold transition-all duration-300">
                    {t.inquiry_button}
                  </Button>
                </DialogTrigger>
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
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="full_name">{t.full_name}</Label>
                        <Input
                          id="full_name"
                          value={inquiryForm.full_name}
                          onChange={(e) => setInquiryForm({...inquiryForm, full_name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t.email}</Label>
                        <Input
                          id="email"
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
                          value={inquiryForm.phone}
                          onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">{t.message}</Label>
                        <Textarea
                          id="message"
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

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="serif-heading text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" style={{color: 'var(--cta-color)'}} />
                  {t.specifications}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {stone.carat_weight && (
                    <div className="border-b border-gray-100 pb-3">
                      <dt className="font-medium text-gray-600 mb-1">{t.carat_weight}</dt>
                      <dd className="text-gray-900 font-semibold">{stone.carat_weight} ct</dd>
                    </div>
                  )}
                  {stone.color && (
                    <div className="border-b border-gray-100 pb-3">
                      <dt className="font-medium text-gray-600 mb-1">{t.color}</dt>
                      <dd className="text-gray-900 font-semibold">{stone.color}</dd>
                    </div>
                  )}
                  {stone.clarity && (
                    <div className="border-b border-gray-100 pb-3">
                      <dt className="font-medium text-gray-600 mb-1">{t.clarity}</dt>
                      <dd className="text-gray-900 font-semibold">{stone.clarity}</dd>
                    </div>
                  )}
                  {stone.cut && (
                    <div className="border-b border-gray-100 pb-3">
                      <dt className="font-medium text-gray-600 mb-1">{t.cut}</dt>
                      <dd className="text-gray-900 font-semibold">{stone.cut}</dd>
                    </div>
                  )}
                  {stone.origin && (
                    <div className="border-b border-gray-100 pb-3">
                      <dt className="font-medium text-gray-600 mb-1">{t.origin}</dt>
                      <dd className="text-gray-900 font-semibold">{stone.origin}</dd>
                    </div>
                  )}
                  {stone.rarity_level && (
                    <div className="border-b border-gray-100 pb-3">
                      <dt className="font-medium text-gray-600 mb-1">{t.rarity}</dt>
                      <dd className="text-gray-900 font-semibold">{stone.rarity_level}</dd>
                    </div>
                  )}
                </div>
                {stone.certification && (
                  <div className="mt-6 p-4 rounded-lg border" style={{backgroundColor: 'var(--success)', opacity: 0.1, borderColor: 'var(--success)', opacity: 0.3}}>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4" style={{color: 'var(--success)'}} />
                      <span className="font-medium" style={{color: 'var(--success)'}}>
                        {t.certification}
                      </span>
                    </div>
                    <p className="text-sm" style={{color: 'var(--success)'}}>{stone.certification}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
