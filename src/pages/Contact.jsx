
import React, { useState, useEffect } from "react";
import { ContactInquiry } from "@/entities/ContactInquiry";
import { Phone, Mail, MapPin, Clock, Send, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const translations = {
  de: {
    page_title: "Kontakt",
    page_subtitle: "Lassen Sie sich von unseren IGS-zertifizierten Experten beraten",
    contact_form_title: "Ihre Anfrage",
    consultation_title: "Persönliche Beratung",
    consultation_desc: "Vereinbaren Sie einen Termin für eine persönliche Beratung in unserem Münchner Showroom oder virtuell.",
    full_name: "Vollständiger Name",
    email: "E-Mail-Adresse", 
    phone: "Telefonnummer",
    inquiry_type: "Art der Anfrage",
    inquiry_consultation: "Beratungstermin",
    inquiry_stone: "Interesse an einem Edelstein",
    inquiry_custom: "Individuelle Anfertigung",
    inquiry_appraisal: "Bewertung/Gutachten",
    inquiry_general: "Allgemeine Anfrage",
    budget_range: "Budgetrahmen",
    budget_under_5k: "Unter €5.000",
    budget_5k_15k: "€5.000 - €15.000", 
    budget_15k_50k: "€15.000 - €50.000",
    budget_50k_100k: "€50.000 - €100.000",
    budget_above_100k: "Über €100.000",
    budget_prefer_not_to_say: "Möchte ich nicht angeben",
    message: "Ihre Nachricht",
    message_placeholder: "Beschreiben Sie Ihre Vorstellungen oder Fragen...",
    send_inquiry: "Anfrage senden",
    inquiry_sent: "Anfrage gesendet!",
    inquiry_success: "Vielen Dank für Ihr Interesse! Unser IGS-zertifiziertes Team wird sich innerhalb von 24 Stunden bei Ihnen melden.",
    visit_showroom: "Showroom besuchen",
    contact_info: "Kontaktinformationen",
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
    full_name: "Full Name",
    email: "Email Address",
    phone: "Phone Number", 
    inquiry_type: "Type of Inquiry",
    inquiry_consultation: "Consultation Appointment",
    inquiry_stone: "Interest in a Gemstone",
    inquiry_custom: "Custom Design",
    inquiry_appraisal: "Appraisal/Evaluation",
    inquiry_general: "General Inquiry",
    budget_range: "Budget Range",
    budget_under_5k: "Under €5,000",
    budget_5k_15k: "€5,000 - €15,000",
    budget_15k_50k: "€15,000 - €50,000", 
    budget_50k_100k: "€50,000 - €100,000",
    budget_above_100k: "Over €100,000",
    budget_prefer_not_to_say: "Prefer not to say",
    message: "Your Message",
    message_placeholder: "Describe your ideas or questions...",
    send_inquiry: "Send Inquiry",
    inquiry_sent: "Inquiry Sent!",
    inquiry_success: "Thank you for your interest! Our IGS-certified team will contact you within 24 hours.",
    visit_showroom: "Visit Showroom",
    contact_info: "Contact Information",
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
    full_name: "Nom Complet",
    email: "Adresse E-mail",
    phone: "Numéro de Téléphone",
    inquiry_type: "Type de Demande", 
    inquiry_consultation: "Rendez-vous de Consultation",
    inquiry_stone: "Intérêt pour une Pierre Précieuse",
    inquiry_custom: "Conception Personnalisée",
    inquiry_appraisal: "Évaluation/Expertise",
    inquiry_general: "Demande Générale",
    budget_range: "Gamme de Budget",
    budget_under_5k: "Moins de 5 000€",
    budget_5k_15k: "5 000€ - 15 000€",
    budget_15k_50k: "15 000€ - 50 000€",
    budget_50k_100k: "50 000€ - 100 000€", 
    budget_above_100k: "Plus de 100 000€",
    budget_prefer_not_to_say: "Préfère ne pas dire",
    message: "Votre Message",
    message_placeholder: "Décrivez vos idées ou questions...",
    send_inquiry: "Envoyer la Demande",
    inquiry_sent: "Demande Envoyée!",
    inquiry_success: "Merci pour votre intérêt ! Notre équipe certifiée IGS vous contactera dans les 24 heures.",
    visit_showroom: "Visiter le Showroom",
    contact_info: "Informations de Contact",
    opening_hours: "Heures d'Ouverture",
    monday_friday: "Lundi - Vendredi: 10:00 - 18:00",
    saturday: "Samedi: 10:00 - 16:00",
    sunday: "Dimanche: Sur rendez-vous",
    address_title: "Adresse",
    phone_title: "Téléphone", 
    email_title: "E-mail"
  }
};

export default function ContactPage() {
  const [language, setLanguage] = useState("de");
  const [inquirySent, setInquirySent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    inquiry_type: "",
    budget_range: "",
    message: ""
  });

  const t = translations[language];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await ContactInquiry.create({
        ...formData,
        preferred_language: language
      });
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
      }, 3000);
    } catch (error) {
      console.error('Error sending inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-2xl">
              <CardHeader className="p-8">
                <CardTitle className="serif-heading text-2xl font-bold text-gray-900">
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
                      <div>
                        <Label htmlFor="inquiry_type" className="text-sm font-medium text-gray-700 mb-2">
                          {t.inquiry_type} *
                        </Label>
                        <Select
                          value={formData.inquiry_type}
                          onValueChange={(value) => handleInputChange('inquiry_type', value)}
                          required
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={t.inquiry_type} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">{t.inquiry_consultation}</SelectItem>
                            <SelectItem value="stone_inquiry">{t.inquiry_stone}</SelectItem>
                            <SelectItem value="custom_design">{t.inquiry_custom}</SelectItem>
                            <SelectItem value="appraisal">{t.inquiry_appraisal}</SelectItem>
                            <SelectItem value="general">{t.inquiry_general}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="budget_range" className="text-sm font-medium text-gray-700 mb-2">
                        {t.budget_range}
                      </Label>
                      <Select
                        value={formData.budget_range}
                        onValueChange={(value) => handleInputChange('budget_range', value)}
                      >
                        <SelectTrigger className="mt-1">
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
                      className="w-full cta-btn hover:bg-orange-600 text-white py-3 text-lg font-semibold transition-all duration-300 disabled:opacity-50"
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
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-none shadow-xl">
              <CardHeader className="p-6">
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
                    <h3 className="font-semibold text-gray-900 mb-2">{t.address_title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      NobleCutGems GmbH<br />
                      Maximilianstraße 15<br />
                      80539 München<br />
                      Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--success)', opacity: 0.2}}>
                    <Phone className="w-6 h-6" style={{color: 'var(--success)'}} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t.phone_title}</h3>
                    <p className="text-gray-600">+49 (0) 89 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'var(--cta-color)', opacity: 0.2}}>
                    <Mail className="w-6 h-6" style={{color: 'var(--cta-color)'}} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t.email_title}</h3>
                    <p className="text-gray-600">contact@noblecutgems.de</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
              <CardHeader className="p-6">
                <CardTitle className="serif-heading text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5" style={{color: 'var(--primary-color)'}} />
                  {t.opening_hours}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t.monday_friday}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t.saturday}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">{t.sunday}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 to-blue-25">
              <CardContent className="p-6">
                <h3 className="serif-heading text-lg font-bold text-gray-900 mb-3">
                  {t.consultation_title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {t.consultation_desc}
                </p>
                <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  {t.visit_showroom}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
