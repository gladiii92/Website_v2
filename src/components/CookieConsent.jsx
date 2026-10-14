'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent({ language = "de" }) {
  const [show, setShow] = useState(false);

  const translations = {
    de: {
      text: "Wir nutzen Cookies und Google Analytics, um die Zugriffe auf unsere Website zu analysieren und das Nutzungserlebnis zu verbessern.",
      privacy: "Datenschutzerklärung",
      accept: "Akzeptieren",
      decline: "Ablehnen"
    },
    en: {
      text: "We use cookies and Google Analytics to analyze website traffic and improve your experience.",
      privacy: "Privacy Policy",
      accept: "Accept",
      decline: "Decline"
    },
    fr: {
      text: "Nous utilisons des cookies et Google Analytics pour analyser le trafic et améliorer votre expérience.",
      privacy: "Politique de confidentialité",
      accept: "Accepter",
      decline: "Refuser"
    }
  };

  const t = translations[language] || translations.de;

  useEffect(() => {
    try {
      const consent = localStorage.getItem("ga-consent");
      if (consent === "accepted") {
        loadGA();
        setShow(false);
      } else if (consent === "declined") {
        setShow(false);
      } else {
        setShow(true);
      }
    } catch {
      setShow(false);
    }
  }, [language]);

  const accept = () => {
    try {
      localStorage.setItem("ga-consent", "accepted");
    } catch {}
    loadGA();
    setShow(false);
  };

  const decline = () => {
    try {
      localStorage.setItem("ga-consent", "declined");
    } catch {}
    setShow(false);
  };

  const loadGA = () => {
    if (typeof window === "undefined" || window.gtag) return;
    
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
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-stone-900/95 backdrop-blur-md text-stone-200 border border-stone-800 p-5 rounded-2xl shadow-2xl z-50 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
        <div className="space-y-3">
          <p className="text-stone-300 leading-relaxed">
            {t.text}{" "}
            <Link href={`/${language}/privacy`} className="underline hover:text-white transition-colors">
              {t.privacy}
            </Link>
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={accept}
              className="bg-white hover:bg-stone-100 text-stone-900 font-semibold px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition-all shadow-sm"
            >
              {t.accept}
            </button>
            <button
              onClick={decline}
              className="bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-medium px-4 py-2 rounded-lg text-xs transition-all border border-stone-700"
            >
              {t.decline}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
