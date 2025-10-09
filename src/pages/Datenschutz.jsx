import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const translations = {
  de: {
    title: "Datenschutzerklärung",
    intro: "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Erhebung und Verwendung personenbezogener Daten auf unserer Website. Die Website wird statisch über GitHub gehostet.",
    responsibleTitle: "Verantwortlicher",
    responsible: "NobleCutGems, E-Mail: noblecutgems_official@gmx.de",
    accessTitle: "Zugriffsdaten & Server-Logfiles",
    accessData: "Beim Aufruf der Website werden durch den Hosting-Anbieter (GitHub) automatische Logfiles erstellt, die Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp und Referrer-URL enthalten können. Diese Daten dienen der technischen Bereitstellung der Website und werden nicht für Marketingzwecke genutzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
    personalTitle: "Personenbezogene Daten",
    personalData: "Wir erheben personenbezogene Daten (z.B. Name, E-Mail-Adresse) nur, wenn Sie uns diese freiwillig per E-Mail mitteilen, z.B. bei einer Anfrage oder Bestellung. Diese Daten werden ausschließlich zur Beantwortung Ihrer Anfrage oder zur Vertragserfüllung verwendet und nicht an Dritte weitergegeben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.",
    rightsTitle: "Ihre Rechte",
    rightsList: [
      "Auskunft über Ihre bei uns gespeicherten Daten",
      "Berichtigung unrichtiger Daten",
      "Löschung Ihrer Daten, sofern keine Aufbewahrungspflichten bestehen",
      "Einschränkung der Verarbeitung",
      "Datenübertragbarkeit",
      "Widerspruch gegen die Verarbeitung"
    ],
    rightsContact: "Bei Fragen wenden Sie sich jederzeit an noblecutgems_official@gmx.de. Sie haben zudem ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.",
    securityTitle: "Sicherheitsmaßnahmen",
    security: "Ihre Daten werden durch technische und organisatorische Maßnahmen gegen Verlust, Zerstörung, Zugriff, Veränderung oder Verbreitung durch unbefugte Personen geschützt. E-Mails werden auf einem sicheren Server gespeichert.",
    cookiesTitle: "Cookies & Google Analytics",
    cookies: "Wir nutzen Cookies für Funktionalität.",
    ga: "Wir verwenden Google Analytics. IP-Adressen werden anonymisiert und das Tracking erfolgt nur nach Ihrer Zustimmung.",
    optout: "Sie können Ihre Entscheidung hier jederzeit ändern:",
    updateTitle: "Aktualisierung",
    update: "Stand: September 2025. Wir behalten uns vor, die Datenschutzerklärung jederzeit anzupassen."
  },
  en: {
    title: "Privacy Policy",
    intro: "We take the protection of your personal data very seriously. This privacy policy informs you about the type, scope, and purpose of the collection and use of personal data on our website. The website is statically hosted via GitHub.",
    responsibleTitle: "Responsible",
    responsible: "NobleCutGems, Email: noblecutgems_official@gmx.de",
    accessTitle: "Access Data & Server Logfiles",
    accessData: "When accessing the website, automatic logfiles are created by the hosting provider (GitHub), which may contain data such as IP address, date and time of access, browser type, and referrer URL. These data serve the technical provision of the website and are not used for marketing purposes. Legal basis is Art. 6 (1) f GDPR.",
    personalTitle: "Personal Data",
    personalData: "We collect personal data (e.g., name, email address) only if you voluntarily provide it via email, e.g., in case of an inquiry or order. These data are used solely to respond to your request or fulfill a contract and are not shared with third parties. Legal basis is Art. 6 (1) b GDPR.",
    rightsTitle: "Your Rights",
    rightsList: [
      "Access to your data stored with us",
      "Correction of incorrect data",
      "Deletion of your data if no retention obligations exist",
      "Restriction of processing",
      "Data portability",
      "Objection to processing"
    ],
    rightsContact: "For questions, you can contact noblecutgems_official@gmx.de at any time. You also have the right to lodge a complaint with the competent supervisory authority.",
    securityTitle: "Security Measures",
    security: "Your data is protected by technical and organizational measures against loss, destruction, access, alteration, or dissemination by unauthorized persons. Emails are stored on a secure server.",
    cookiesTitle: "Cookies & Google Analytics",
    cookies: "We use cookies for functionality.",
    ga: "We use Google Analytics. IP addresses are anonymized and tracking only occurs after your consent.",
    optout: "You can change your decision here at any time:",
    updateTitle: "Update",
    update: "Status: September 2025. We reserve the right to update the privacy policy at any time."
  },
  fr: {
    title: "Politique de confidentialité",
    intro: "Nous prenons très au sérieux la protection de vos données personnelles. Cette politique de confidentialité vous informe sur le type, l'étendue et l'objectif de la collecte et de l'utilisation des données personnelles sur notre site Web. Le site est hébergé de manière statique via GitHub.",
    responsibleTitle: "Responsable",
    responsible: "NobleCutGems, Email : noblecutgems_official@gmx.de",
    accessTitle: "Données d'accès & fichiers journaux",
    accessData: "Lors de l'accès au site Web, des fichiers journaux automatiques sont créés par le fournisseur d'hébergement (GitHub), pouvant contenir des données telles que l'adresse IP, la date et l'heure d'accès, le type de navigateur et l'URL de référence. Ces données servent à la mise à disposition technique du site et ne sont pas utilisées à des fins de marketing. Base légale : Art. 6 (1) f RGPD.",
    personalTitle: "Données personnelles",
    personalData: "Nous collectons des données personnelles (ex. nom, adresse e-mail) uniquement si vous nous les fournissez volontairement par e-mail, par exemple dans le cadre d'une demande ou d'une commande. Ces données sont utilisées uniquement pour répondre à votre demande ou pour l'exécution d'un contrat et ne sont pas partagées avec des tiers. Base légale : Art. 6 (1) b RGPD.",
    rightsTitle: "Vos droits",
    rightsList: [
      "Accès aux données vous concernant stockées chez nous",
      "Correction des données incorrectes",
      "Suppression de vos données si aucune obligation de conservation n'existe",
      "Limitation du traitement",
      "Portabilité des données",
      "Opposition au traitement"
    ],
    rightsContact: "Pour toute question, vous pouvez contacter noblecutgems_official@gmx.de à tout moment. Vous avez également le droit de déposer une plainte auprès de l'autorité de contrôle compétente.",
    securityTitle: "Mesures de sécurité",
    security: "Vos données sont protégées par des mesures techniques et organisationnelles contre la perte, la destruction, l'accès, la modification ou la diffusion par des personnes non autorisées. Les e-mails sont stockés sur un serveur sécurisé.",
    cookiesTitle: "Cookies & Google Analytics",
    cookies: "Nous utilisons des cookies pour la fonctionnalité.",
    ga: "Nous utilisons Google Analytics. Les adresses IP sont anonymisées et le suivi n'a lieu qu'après votre consentement.",
    optout: "Vous pouvez modifier votre décision ici à tout moment :",
    updateTitle: "Mise à jour",
    update: "Mise à jour : septembre 2025. Nous nous réservons le droit de mettre à jour la politique de confidentialité à tout moment."
  }
};

export default function Datenschutz() {
  const [language, setLanguage] = useState("de");
  const [showBanner, setShowBanner] = useState(true);
  const [gaConsent, setGaConsent] = useState(localStorage.getItem("ga-consent") || "pending");
  const t = translations[language];

  useEffect(() => {
    const handleLanguageChange = (event) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange);
    return () => window.removeEventListener("languageChange", handleLanguageChange);
  }, []);

  const setConsent = (consent) => {
    localStorage.setItem("ga-consent", consent);
    setGaConsent(consent);
    setShowBanner(true);
  };

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

        <h2 className="mt-6 font-semibold">{t.responsibleTitle}</h2>
        <p>{t.responsible}</p>

        <h2 className="mt-6 font-semibold">{t.accessTitle}</h2>
        <p>{t.accessData}</p>

        <h2 className="mt-6 font-semibold">{t.personalTitle}</h2>
        <p>{t.personalData}</p>

        <h2 className="mt-6 font-semibold">{t.rightsTitle}</h2>
        <ul className="list-disc list-inside mt-2">
          {t.rightsList.map((item, index) => <li key={index} className="mt-1">{item}</li>)}
        </ul>
        <p className="mt-2">{t.rightsContact}</p>

        <h2 className="mt-6 font-semibold">{t.securityTitle}</h2>
        <p>{t.security}</p>

        <h2 className="mt-6 font-semibold">{t.cookiesTitle}</h2>
        <p>{t.cookies}</p>
        <p>{t.ga}</p>

        {showBanner && (
          <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
            <p>{t.optout}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                onClick={() => setConsent("accepted")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                GA aktivieren
              </button>
              <button
                onClick={() => setConsent("declined")}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                GA ablehnen
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">Aktueller Status: {gaConsent}</p>
          </div>
        )}

        <h2 className="mt-6 font-semibold">{t.updateTitle}</h2>
        <p>{t.update}</p>
      </div>
    </>
  );
}
