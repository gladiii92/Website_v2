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

    const handleOpenSettings = () => setShow(true);
    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-auto sm:max-w-md bg-[#141416]/95 backdrop-blur-md text-stone-200 border border-[#c5a059]/35 p-5 rounded-2xl shadow-2xl shadow-black/60 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="space-y-3 flex-1">
          <div>
            <h4 className="serif-heading text-sm font-semibold text-white tracking-wide">
              {language === "en" ? "Privacy & Cookies" : language === "fr" ? "Confidentialité & Cookies" : "Privatsphäre & Cookies"}
            </h4>
            <p className="text-stone-300 text-xs leading-relaxed mt-1">
              {t.text}{" "}
              <Link href={`/${language}/privacy`} className="text-[#d4af37] hover:text-amber-300 underline underline-offset-2 transition-colors">
                {t.privacy}
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={accept}
              className="bg-gradient-to-r from-[#d4af37] to-[#b8972e] hover:from-[#e0bc47] hover:to-[#c5a059] text-stone-950 font-semibold px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              {t.accept}
            </button>
            <button
              onClick={decline}
              className="bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white font-medium px-4 py-2 rounded-lg text-xs transition-all border border-stone-700/80 active:scale-95"
            >
              {t.decline}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
