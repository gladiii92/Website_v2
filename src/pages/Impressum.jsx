import React, { useState, useEffect } from "react";

const translations = {
  de: {
    title: "Impressum",
    company: "NobleCutGems",
    address: "Erlenstegenstraße 80, 90491 Nürnberg, Deutschland",
    representative: "Eigentümer: David Heinke",
    contact: "Telefon: +49 (0) 151 68 48 2909 | E-Mail: noblecutgems_official@gmx.de",
    register: "Amtsgericht Nürnberg, HRB noch nicht vorhanden",
    vat: "USt-IdNr.: noch nicht vorhanden",
    note: "Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links."
  },
  en: {
    title: "Imprint",
    company: "NobleCutGems",
    address: "Erlenstegenstraße 80, 90491 Nürnberg, Deutschland",
    representative: "Board: David Heinke",
    contact: "Phone: +49 (0) 151 68 48 2909 | Email: noblecutgems_official@gmx.de",
    register: "District Court Nuremberg, HRB -",
    vat: "VAT ID: -",
    note: "Disclaimer: Despite careful content control, we assume no liability for the content of external links."
  },
  fr: {
    title: "Mentions légales",
    company: "NobleCutGems",
    address: "Erlenstegenstraße 80, 90491 Nürnberg, Allemagne",
    representative: "Conseil: David Heinke",
    contact: "Téléphone: +49 (0) 151 68 48 2909 | E-Mail: noblecutgems_official@gmx.de",
    register: "Tribunal de district de Munich, HRB -",
    vat: "Numéro de TVA: -",
    note: "Avertissement: Malgré un contrôle minutieux du contenu, nous n'assumons aucune responsabilité pour le contenu des liens externes."
  }
};

export default function Impressum() {
  const [language, setLanguage] = useState("de");
  const t = translations[language];

  useEffect(() => {
    const storedLang = localStorage.getItem('language') || 'de';
    setLanguage(storedLang);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 pt-24"> 
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <p><strong>Firmenname:</strong> {t.company}</p>
      <p><strong>Adresse:</strong> {t.address}</p>
      <p><strong>Vertretungsberechtigter:</strong> {t.representative}</p>
      <p><strong>Kontakt:</strong> {t.contact}</p>
      <p><strong>Registereintrag:</strong> {t.register}</p>
      <p><strong>Umsatzsteuer-ID:</strong> {t.vat}</p>
      <p className="mt-4">{t.note}</p>
    </div>
  );
}
