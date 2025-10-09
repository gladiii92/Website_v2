import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const translations = {
  de: {
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    intro: "Diese AGB gelten für alle Verträge mit NobleCutGems.",
    payment: "Zahlung per Banküberweisung, Paypal. Lieferung innerhalb 7 Tage innerhalb Deutschlands & 30 Tage ins Ausland.",
    withdrawal: "Widerrufsrecht: 14 Tage ab Erhalt. Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.",
    liability: "Haftung beschränkt auf Vorsatz und grobe Fahrlässigkeit.",
    guarantee: "Es gelten die gesetzlichen Gewährleistungsrechte.",
    jurisdiction: "Gerichtsstand für alle Streitigkeiten ist Coburg, Deutschland."
  },
  en: {
    title: "Terms and Conditions",
    intro: "These T&Cs apply to all contracts with NobleCutGems GmbH.",
    payment: "Payment by bank transfer, PayPal. Delivery within 7 days within Germany & 30 days abroad.",
    withdrawal: "Right of withdrawal: 14 days from receipt. You have the right to withdraw from this contract within 14 days without giving any reason.",
    liability: "Liability limited to intent and gross negligence.",
    guarantee: "The statutory warranty rights apply.",
    jurisdiction: "The place of jurisdiction for all disputes is Coburg, Germany."
  },
  fr: {
    title: "Conditions Générales de Vente",
    intro: "Ces CGV s'appliquent à tous les contrats avec NobleCutGems GmbH.",
    payment : "Paiement par virement bancaire ou PayPal. Livraison sous 7 jours en Allemagne et 30 jours à l’étranger.",
    withdrawal : "Droit de rétractation : 14 jours à compter de la réception. Vous avez le droit de vous rétracter de ce contrat dans un délai de 14 jours sans donner de motif.",
    liability: "Responsabilité limitée à l'intention et à la négligence grave.",
    guarantee: "Les droits légaux de garantie s'appliquent.",
    jurisdiction: "Le lieu de juridiction pour tous les litiges est Cobourg, Allemagne."
  }
};

export default function AGB() {
  const [language, setLanguage] = useState("de");
  const t = translations[language];

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };
    
    const storedLang = localStorage.getItem('language') || 'de';
    setLanguage(storedLang);
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t.title} | NobleCutGems</title>
        <meta name="description" content={t.intro} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className="max-w-4xl mx-auto py-16 px-4 pt-24">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
        <p>{t.intro}</p>
        <p className="mt-4">{t.payment}</p>
        <p className="mt-4">{t.withdrawal}</p>
        <p className="mt-4 mb-3">{t.liability}</p>
        <p className="mt-4 mb-3">{t.guarantee}</p>
        <p className="mt-4 mb-3">{t.jurisdiction}</p>
        {/* Erweitere mit vollständigen AGB-Details */}
      </div>
    </>
  );
}
