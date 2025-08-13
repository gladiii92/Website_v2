import React, { useState, useEffect } from "react";

const translations = {
  de: {
    title: "Datenschutzerklärung",
    intro: "Wir nehmen den Schutz Ihrer persönlichen Daten ernst. Diese Erklärung erläutert, wie wir Daten verarbeiten.",
    data: "Wir erheben Name, E-Mail, Adresse bei Bestellungen. Rechtsgrundlage: Art. 6 Abs. 1 b DSGVO.",
    rights: "Sie haben Rechte auf Auskunft, Löschung etc. Kontakt: noblecutgems_official@gmx.de",
    cookies: "Wir nutzen Cookies für Funktionalität. Sie können diese ablehnen."
  },
  en: {
    title: "Privacy Policy",
    intro: "We take the protection of your personal data seriously. This statement explains how we process data.",
    data: "We collect name, email, address for orders. Legal basis: Art. 6 (1) b GDPR.",
    rights: "You have rights to information, deletion etc. Contact: noblecutgems_official@gmx.de",
    cookies: "We use cookies for functionality. You can reject them."
  },
  fr: {
    title: "Politique de confidentialité",
    intro: "Nous prenons au sérieux la protection de vos données personnelles. Cette déclaration explique comment nous traitons les données.",
    data: "Nous collectons nom, e-mail, adresse pour les commandes. Base légale: Art. 6 (1) b RGPD.",
    rights: "Vous avez des droits à l'information, à la suppression etc. Contact: noblecutgems_official@gmx.de",
    cookies: "Nous utilisons des cookies pour la fonctionnalité. Vous pouvez les refuser."
  }
};

export default function Datenschutz() {
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
      <p className="mt-4">{t.data}</p>
      <p className="mt-4">{t.rights}</p>
      <p className="mt-4">{t.cookies}</p>
      {/* Erweitere bei Bedarf mit mehr Details */}
    </div>
  );
}
