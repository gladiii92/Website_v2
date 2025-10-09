import { useState, useEffect } from "react";

export default function CookieConsent({ language = "de" }) {
  const [show, setShow] = useState(false);

  const translations = {
    de: {
      text: "Wir nutzen Google Analytics.",
      accept: "Akzeptieren",
      decline: "Ablehnen"
    },
    en: {
      text: "We use Google Analytics.",
      accept: "Accept",
      decline: "Decline"
    },
    fr: {
      text: "Nous utilisons Google Analytics.",
      accept: "Accepter",
      decline: "Refuser"
    }
  };

  const t = translations[language];

  // Prüfen, ob der Nutzer schon eine Entscheidung getroffen hat
  useEffect(() => {
    const consent = localStorage.getItem("ga-consent");

    if (consent === null) {
      setShow(true); // noch keine Entscheidung, Banner zeigen
    } else if (consent === "accepted") {
      loadGA(); // GA laden, wenn bereits akzeptiert
    } else if (consent === "declined") {
      setShow(true); // Banner wieder zeigen, um Entscheidung ggf. zu ändern
    }
  }, [language]);

  const accept = () => {
    localStorage.setItem("ga-consent", "accepted");
    loadGA();
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("ga-consent", "declined");
    setShow(true); // Banner bleibt sichtbar, Nutzer kann später akzeptieren
  };

  const loadGA = () => {
    if (!window.gtag) {
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = "https://www.googletagmanager.com/gtag/js?id=G-5QH0CNQ1BK";
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-5QH0CNQ1BK', { anonymize_ip: true });
      `;
      document.head.appendChild(script2);
    }
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", bottom: 20, left: 20, right: 20,
      background: "#222", color: "#fff", padding: 15, borderRadius: 8,
      textAlign: "center", zIndex: 9999, fontFamily: "sans-serif"
    }}>
      {t.text} 
      <button onClick={accept} style={{ marginLeft: 10, padding: "5px 10px" }}>{t.accept}</button>
      <button onClick={decline} style={{ marginLeft: 5, padding: "5px 10px" }}>{t.decline}</button>
    </div>
  );
}
