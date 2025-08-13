import React, { useState, useEffect } from "react";

const translations = {
  de: {
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    intro: "Diese AGB gelten für alle Verträge mit NobleCutGems.",
    payment: "Zahlung per Banküberweisung, Paypal. Lieferung innerhalb 7 Tage innerhalb Deutschlands & 30 Tage ins Ausland.",
    withdrawal: "Widerrufsrecht: 14 Tage ab Erhalt.",
    liability: "Haftung beschränkt auf Vorsatz und grobe Fahrlässigkeit."
  },
  en: {
    title: "Terms and Conditions",
    intro: "These T&Cs apply to all contracts with NobleCutGems GmbH.",
    payment: "Payment by bank transfer, PayPal. Delivery within 7 days within Germany & 30 days abroad.",
    withdrawal: "Right of withdrawal: 14 days from receipt.",
    liability: "Liability limited to intent and gross negligence."
  },
  fr: {
    title: "Conditions Générales de Vente",
    intro: "Ces CGV s'appliquent à tous les contrats avec NobleCutGems GmbH.",
    payment : "Paiement par virement bancaire ou PayPal. Livraison sous 7 jours en Allemagne et 30 jours à l’étranger.",
    withdrawal : "Droit de rétractation : 14 jours à compter de la réception.",
    liability: "Responsabilité limitée à l'intention et à la négligence grave."
  }
};

export default function AGB() {
  const [language, setLanguage] = useState("de");
  const t = translations[language];

  useEffect(() => {
    const storedLang = localStorage.getItem('language') || 'de';
    setLanguage(storedLang);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 pt-24">
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <p>{t.intro}</p>
      <p className="mt-4">{t.payment}</p>
      <p className="mt-4">{t.withdrawal}</p>
      <p className="mt-4">{t.liability}</p>
      {/* Erweitere mit vollständigen AGB-Details */}
    </div>
  );
}
