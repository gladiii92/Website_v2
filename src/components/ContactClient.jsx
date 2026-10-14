'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Clock, Send, Award } from "lucide-react";
import { gemstones } from "../data/Gemstones";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Label } from "../components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";

const translations = {
  de: {
    page_title: "Kontakt",
    page_subtitle: "Lassen Sie sich von unseren IGS-zertifizierten Experten beraten",
    contact_form_title: "Ihre Anfrage",
    consultation_title: "Persönliche Beratung",
    consultation_desc: "Vereinbaren Sie einen Termin für eine persönliche Beratung in unserem Münchner Showroom oder virtuell.",
    consultation_short: "Vereinbaren Sie einen Termin für eine persönliche Beratung",
    consultation_button: "Anfrage",
    full_name: "Vollständiger Name",
    email: "E-Mail-Adresse", 
    phone: "Telefonnummer",
    inquiry_type: "Art der Anfrage",
    inquiry_consultation: "Beratungstermin",
    inquiry_stone: "Interesse an einem Edelstein",
    inquiry_custom: "Individuelle Anfertigung",
    inquiry_general: "Allgemeine Anfrage",
    budget_range: "Budgetrahmen",
    budget_under_5k: "Unter 50€",
    budget_5k_15k: "50€ - 500€", 
    budget_15k_50k: "500€ - 5.000€",
    budget_50k_100k: "5.000€ - 15.000€",
    budget_above_100k: "Über 15.000€",
    budget_prefer_not_to_say: "Möchte ich nicht angeben",
    message: "Ihre Nachricht",
    message_placeholder: "Beschreiben Sie Ihre Vorstellungen oder Fragen...",
    send_inquiry: "Anfrage senden",
    inquiry_sent: "Anfrage gesendet!",
    inquiry_success: "Vielen Dank für Ihr Interesse! Unser IGS-zertifiziertes Team wird sich innerhalb von 24 Stunden bei Ihnen melden.",
    visit_showroom: "Showroom besuchen",
    social_title: "Soziale Medien & Shop",
    whatsapp_title: "WhatsApp-Anfrage senden",
    opening_hours: "Öffnungszeiten",
    monday_friday: "Montag - Freitag: 10:00 - 18:00",
    saturday: "Samstag: 10:00 - 16:00",
    sunday: "Sonntag: Nach Vereinbarung",
    address_title: "Adresse",
    phone_title: "Telefon",
    email_title: "E-Mail"
  },
  en: {
    page_title: "Contact",
    page_subtitle: "Get expert advice from our IGS-certified specialists",
    contact_form_title: "Your Inquiry",
    consultation_title: "Personal Consultation",
    consultation_desc: "Schedule an appointment for a personal consultation in our Munich showroom or virtually.",
    consultation_short: "Schedule an appointment for a personal consultation",
    consultation_button: "Inquiry",
    full_name: "Full Name",
    email: "Email Address",
    phone: "Phone Number", 
    inquiry_type: "Type of Inquiry",
    inquiry_consultation: "Consultation Appointment",
    inquiry_stone: "Interest in a Gemstone",
    inquiry_custom: "Custom Design",
    inquiry_general: "General Inquiry",
    budget_range: "Budget Range",
    budget_under_5k: "Under 50€",
    budget_5k_15k: "50€ - 500€",
    budget_15k_50k: "500€ - 5.000€", 
    budget_50k_100k: "5.000€ - 15.000€",
    budget_above_100k: "Over 15.000€",
    budget_prefer_not_to_say: "Prefer not to say",
    message: "Your Message",
    message_placeholder: "Describe your ideas or questions...",
    send_inquiry: "Send Inquiry",
    inquiry_sent: "Inquiry Sent!",
    inquiry_success: "Thank you for your interest! Our IGS-certified team will contact you within 24 hours.",
    visit_showroom: "Visit Showroom",
    social_title: "Social Media & Shop",
    whatsapp_title: "Send WhatsApp Inquiry",
    opening_hours: "Opening Hours",
    monday_friday: "Monday - Friday: 10:00 - 18:00",
    saturday: "Saturday: 10:00 - 16:00",
    sunday: "Sunday: By appointment",
    address_title: "Address",
    phone_title: "Phone",
    email_title: "Email"
  },
  fr: {
    page_title: "Contact",
    page_subtitle: "Obtenez des conseils d'experts de nos spécialistes certifiés IGS",
    contact_form_title: "Votre Demande",
    consultation_title: "Consultation Personnelle",
    consultation_desc: "Prenez rendez-vous pour une consultation personnelle dans notre showroom de Munich ou virtuellement.",
    consultation_short: "Prenez rendez-vous pour une consultation personnelle",
    consultation_button: "Demande",
    full_name: "Nom Complet",
    email: "Adresse E-mail",
    phone: "Numéro de Téléphone",
    inquiry_type: "Type de Demande", 
    inquiry_consultation: "Rendez-vous de Consultation",
    inquiry_stone: "Intérêt pour une Pierre Précieuse",
    inquiry_custom: "Conception Personnalisée",
    inquiry_general: "Demande Générale",
    budget_range: "Gamme de Budget",
    budget_under_5k: "Moins de 50€",
    budget_5k_15k: "50€ - 500€",
    budget_15k_50k: "500€ - 5000€",
    budget_50k_100k: "5.000€ - 15.000€", 
    budget_above_100k: "Plus de 15.000€",
    budget_prefer_not_to_say: "Préfère ne pas dire",
    message: "Votre Message",
    message_placeholder: "Décrivez vos idées ou questions...",
    send_inquiry: "Envoyer la Demande",
    inquiry_sent: "Demande Envoyée!",
    inquiry_success: "Merci pour votre intérêt ! Notre équipe certifiée IGS vous contactera dans les 24 heures.",
    visit_showroom: "Visiter le Showroom",
    social_title: "Réseaux Sociaux & Boutique",
    whatsapp_title: "Envoyer une demande WhatsApp",
    opening_hours: "Heures d'Ouverture",
    monday_friday: "Lundi - Vendredi: 10:00 - 18:00",
    saturday: "Samedi: 10:00 - 16:00",
    sunday: "Dimanche: Sur rendez-vous",
    address_title: "Adresse",
    phone_title: "Téléphone", 
    email_title: "E-mail"
  }
};

export default function ContactPage({ lang }) {
  const searchParams = useSearchParams();
  const stonesParam = searchParams.get('stones');

  const [language, setLanguage] = useState(lang || "de");
  const [inquirySent, setInquirySent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    inquiry_type: stonesParam ? "custom" : "",
    budget_range: "",
    message: ""
  });

  const t = translations[language];

  // Vorbefüllung bei Übernahme aus Wishlist (?stones=1,2,...)
  useEffect(() => {
    if (stonesParam) {
      const stoneIds = stonesParam.split(',').map(id => parseInt(id, 10)).filter(Boolean);
      const selectedStones = gemstones.filter(s => stoneIds.includes(s.id));
      if (selectedStones.length > 0) {
        const stoneList = selectedStones.map(s => `- ${s.name} (${s.carat_weight}ct, ${s.price_eur} €)`).join('\n');
        const initialMsg = language === 'en'
          ? `Hello NobleCutGems Team,\n\nI am interested in the following gemstone(s) from my selection:\n\n${stoneList}\n\nPlease contact me regarding availability, certification and shipping.`
          : language === 'fr'
          ? `Bonjour l'équipe NobleCutGems,\n\nJe suis intéressé(e) par la/les pierre(s) précieuse(s) suivante(s) de ma sélection :\n\n${stoneList}\n\nMerci de me contacter concernant la disponibilité et l'expédition.`
          : `Hallo NobleCutGems-Team,\n\nich interessiere mich für folgende(n) Edelstein(e) aus meiner Auswahl:\n\n${stoneList}\n\nBitte kontaktieren Sie mich bezüglich Verfügbarkeit und Abwicklung.`;

        setFormData(prev => ({
          ...prev,
          inquiry_type: 'custom',
          message: initialMsg
        }));
      }
    }
  }, [stonesParam, language]);

  // Listen for language changes and initialize from localStorage
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };
    
    const storedLang = localStorage.getItem('language') || 'de';
    setLanguage(storedLang);
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const handleSubmit = (e, presetInquiryType = null) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      ...formData,
      inquiry_type: presetInquiryType || formData.inquiry_type,
      preferred_language: language
    };

    // Erstellen der mailto-URL mit vorab gef?llten Daten
    const emailSubject = encodeURIComponent(`Anfrage: ${dataToSend.inquiry_type || 'Allgemein'}`);
    const emailBody = encodeURIComponent(
      `Name: ${dataToSend.full_name}\n` +
      `E-Mail: ${dataToSend.email}\n` +
      `Telefon: ${dataToSend.phone}\n` +
      `Anfragetyp: ${dataToSend.inquiry_type}\n` +
      `Budget: ${dataToSend.budget_range}\n` +
      `Nachricht: ${dataToSend.message}\n` +
      `Sprache: ${dataToSend.preferred_language}`
    );

    const mailtoUrl = `mailto:info@noblecutgems.com?subject=${emailSubject}&body=${emailBody}`;

    // ?ffnen des E-Mail-Clients
    window.location.href = mailtoUrl;

    // Erfolgszustand simulieren (da keine echte API verwendet wird)
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        inquiry_type: "",
        budget_range: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConsultationClick = (e) => {
    // Setze einen voreingestellten Inquiry-Typ und sende das Formular
    handleSubmit(e, 'consultation');  // 'consultation' als voreingestellter Typ
  };

  return (
    <>
      
      <div className="min-h-screen bg-white py-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-champagne to-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.page_title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.page_subtitle}
            </p>
            <div className="w-24 h-1 mx-auto mt-8" style={{backgroundColor: 'var(--primary-color)'}}></div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-2">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              
                <CardHeader className="p-8 pl-0">
                  <CardTitle className="serif-heading text-2xl font-bold text-gray-900 text-left">
                    {t.contact_form_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  {inquirySent ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: 'var(--success)', opacity: 0.2}}>
                        <Award className="w-10 h-10" style={{color: 'var(--success)'}} />
                      </div>
                      <h3 className="serif-heading text-2xl font-bold text-gray-900 mb-4">
                        {t.inquiry_sent}
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {t.inquiry_success}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="full_name" className="text-sm font-medium text-gray-700 mb-2">
                            {t.full_name} *
                          </Label>
                          <Input
                            id="full_name"
                            value={formData.full_name}
                            onChange={(e) => handleInputChange('full_name', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                            {t.email} *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
                            {t.phone}
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inquiry_type" className="text-sm font-medium text-gray-700 block">
                            {t.inquiry_type} *
                          </Label>

                          <div className="border border-gray-900 rounded-md inline-block">
                            <Select
                              value={formData.inquiry_type}
                              onValueChange={(value) => handleInputChange('inquiry_type', value)}
                              required
                            >
                              <SelectTrigger className="w-auto h-10 flex items-center px-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                                <SelectValue placeholder={t.inquiry_type} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="consultation">{t.inquiry_consultation}</SelectItem>
                                <SelectItem value="stone_inquiry">{t.inquiry_stone}</SelectItem>
                                <SelectItem value="custom_design">{t.inquiry_custom}</SelectItem>
                                <SelectItem value="general">{t.inquiry_general}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label
                          htmlFor="budget_range"
                          className="text-sm font-medium text-gray-700 block"
                        >
                          {t.budget_range}
                        </Label>

                        <div className="border border-gray-900 rounded-md w-[250px] inline-block">
                          <Select
                            value={formData.budget_range}
                            onValueChange={(value) => handleInputChange('budget_range', value)}
                          >
                            <SelectTrigger className="w-full h-10 flex items-center px-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                              <SelectValue placeholder={t.budget_range} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under_5k">{t.budget_under_5k}</SelectItem>
                              <SelectItem value="5k_15k">{t.budget_5k_15k}</SelectItem>
                              <SelectItem value="15k_50k">{t.budget_15k_50k}</SelectItem>
                              <SelectItem value="50k_100k">{t.budget_50k_100k}</SelectItem>
                              <SelectItem value="above_100k">{t.budget_above_100k}</SelectItem>
                              <SelectItem value="prefer_not_to_say">{t.budget_prefer_not_to_say}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                          {t.message} *
                        </Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder={t.message_placeholder}
                          required
                          className="mt-1"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cta-btn hover:bg-orange-600 text-white py-3 text-lg font-semibold transition-all duration-300 disabled:opacity-50 flex justify-center items-center"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            {language === 'de' ? 'Wird gesendet...' : language === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            {t.send_inquiry}
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              
                <CardHeader className="p-3">
                  <CardTitle className="serif-heading text-xl font-bold text-gray-900">
                    {t.contact_info}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--primary-color)', opacity: 0.2}}>
                      <MapPin className="w-6 h-6" style={{color: 'var(--primary-color)'}} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{t.social_title}</h3>
                      <div className="flex gap-3 items-center">
                        <a
                          href="https://www.instagram.com/noblecutgems.official/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Instagram"
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-900 text-stone-700 hover:text-white transition-all duration-300 border border-stone-200/80 shadow-sm"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                        <a
                          href="https://www.tiktok.com/@noblecutgems"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="TikTok"
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-900 text-stone-700 hover:text-white transition-all duration-300 border border-stone-200/80 shadow-sm"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.96-4.48V8.78a8.18 8.18 0 0 0 4.81 1.54v-3.5a4.86 4.86 0 0 1-1-.13z"/>
                          </svg>
                        </a>
                        <a
                          href="https://www.facebook.com/profile.php?id=61575753926549"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Facebook"
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-900 text-stone-700 hover:text-white transition-all duration-300 border border-stone-200/80 shadow-sm"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a
                          href="https://noblecutgems.etsy.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Etsy Shop"
                          className="h-10 px-3 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-900 text-stone-700 hover:text-white transition-all duration-300 border border-stone-200/80 shadow-sm font-serif font-bold text-xs tracking-tight"
                        >
                          Etsy
                        </a>
                      </div>
                    </div>
                  </div>

                  <a href="https://wa.me/4915168482909" target="_blank" rel="noopener noreferrer" className="mt-8 flex items-start gap-4 hover:opacity-80 transition-opacity">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--success)', opacity: 0.2}}>
                      <Phone className="w-6 h-6" style={{color: 'var(--success)'}} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-0">{t.whatsapp_title}</h3>
                      <p className="text-gray-600 mt-0">+49 151 6848 2909</p>
                    </div>
                  </a>

                  <a href="mailto:info@noblecutgems.com" className="mt-8 flex items-start gap-4 hover:opacity-80 transition-opacity">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--cta-color)', opacity: 0.2}}>
                      <Mail className="w-6 h-6" style={{color: 'var(--cta-color)'}} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-0">{t.email_title}</h3>
                      <p className="text-gray-600 mt-5 mb-8">info@noblecutgems.com</p>
                    </div>
                  </a>
                </CardContent>
              

              
                <CardHeader className="p-5 ">
                  <CardTitle className="serif-heading text-xl font-bold text-gray-900 flex items-center gap-2 justify-start">
                    <Clock className="w-5 h-5" style={{color: 'var(--primary-color)'}} />
                    {t.opening_hours}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">{t.monday_friday}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">{t.saturday}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 mb-6">{t.sunday}</span>
                  </div>
                </CardContent>
              

              

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

