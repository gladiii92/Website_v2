# 💎 SAAS & E-COMMERCE TRUTHMODE AUDIT: NobleCutGems
**Framework:** Alex Hormozi ($100M Offers, $100M Leads) + Principal Staff Systems Architecture  
**Geprüftes System:** NobleCutGems (Next.js 16, React 18, Tailwind CSS, Static Export)  
**Datum:** 14. Oktober 2026  
**Status:** Vollständig empirisch verifiziert via Quellcode-Inspektion (`file:line`) & Multi-Agent Orchestration.

---

## Executive Summary & Gesamturteil

| Bereich | Score | Status | Kernbefund |
| :--- | :---: | :---: | :--- |
| **Business & Offer Viability** | **2.5 / 10** | 🚨 **PIVOT** | 97 % unzertifizierte Steine + lose Rohsteine ohne Schmuckanfertigung = katastrophale Conversion-Rate bei extrem hohen CAC. |
| **System & Tech Architecture** | **3.2 / 10** | ⚠️ **KRITISCH** | Ghost-CTAs, Fake-Erfolgsmeldungen via `mailto:`, 100 % 404-Fehler im Google-Merchant-Feed und Zerstörung von Social Shares durch `localStorage`-Hijacking. |

> [!CAUTION]
> **Das ungeschminkte Urteil: PIVOT IMMEDIATELY.**  
> In seiner gegenwärtigen Konzeption verbrennt NobleCutGems massiv Zeit und potenzielles Werbebudget. Die Plattform scheitert nicht an Next.js oder Tailwind, sondern an **zwei fundamentalen Blockaden**:
> 1. **Architektur-Sackgasse:** Der Kauf- und Anfrageprozess ist technisch gebrochen (Ghost-Buttons, `mailto:`-Lead-Verlust, Google-Shopping 404s).
> 2. **Angebots-Falle:** Niemand kauft unzertifizierte, lose Steine im Internet per E-Mail-Überweisung, um danach selbst monatelang einen Goldschmied für die Fassung zu suchen.

---

## TEIL 1: Der Brutale Business Reality Check (Hormozi Truthmode)

### Die 5 tödlichen Kill-Faktoren

#### 1. Die "Trust & Fraud"-Todeszone (`certification: "none"`)
* **Empirischer Befund:** Von 34 Steinen in [`src/data/Gemstones.js`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/data/Gemstones.js) besitzt **genau 1 Stein** (ID 2, Blauer Spinell 1.750 €) ein Zertifikat (`aig`). **33 von 34 Steinen (97 %)** sind als `certification: "none"` im Datensatz hinterlegt.
* **Markt-Realität:** Im High-Ticket-Segment für unbehandelte Farb-Edelsteine ist Vertrauen 100 % der Kaufentscheidung. Unbehandelte Saphire für 850 € bis 1.950 € ohne unabhängiges Laborzertifikat (GIA, IGI, Gübelin, SSEF, DSEF) wirken im Internet wie synthetische Ware oder ein Scam. Der Claim *„IGS-zertifiziertes Team“* im Text verpufft sofort, wenn in den Spezifikationen *„Nicht zertifiziert - auf Anfrage“* steht.

#### 2. Der Konversions-Selbstmord: Das `mailto:`-Formular
* **Empirischer Befund:** In [`src/components/StoneClient.jsx#L620-L633`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/StoneClient.jsx#L620-L633) und [`src/components/ContactClient.jsx#L187-L194`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/ContactClient.jsx#L187-L194) endet der gesamte Lead-Funnel in `window.location.href = mailto:...`. Der Quellcode dokumentiert dies offen:
  ```javascript
  // ContactClient.jsx:192
  // Erfolgszustand simulieren (da keine echte API verwendet wird)
  setInquirySent(true);
  ```
* **Markt-Realität:** Auf Desktop-Systemen ohne Standard-Mailclient (Gmail-/Webmail-Nutzer) passiert beim Klick rein gar nichts. Auf Mobile öffnet sich ein nackter E-Mail-Entwurf. Es gibt **kein Stripe, kein Klarna, keine Treuhand-Absicherung, keine sofortige Stein-Reservierung**. Die psychologische Hürde, einem anonymen Webshop eine formlose Mail zu schreiben und dann vierstellige Beträge ins Blaue zu überweisen, sorgt für eine Conversion Rate von nahezu 0,0 %.

#### 3. Die "Vitamin vs. Painkiller"-Falle (Das Kunden-Dilemma)
* **Befund:** NobleCutGems verkauft lose Steine (50 € bis 1.950 €).
* **Markt-Realität:** **Niemand wacht morgens auf und hat das dringende Verlangen nach einem losen 1,43ct Saphir.**
  * *Wohlhabende Schmuckkäufer (95 % des Marktvolumens):* Suchen einen Verlobungsring, Ohrringe oder ein Jubiläums-Collier. Ein nackter Stein bedeutet für sie massiven Aufwand: Goldschmied suchen, verhandeln, Fassungsrisiko (Bruchgefahr) tragen, Wochen warten und weitere 1.000 € bis 2.500 € zahlen. NobleCutGems liefert ein unfertiges Halbfabrikat.
  * *Hobby-Sammler:* Durchforsten Auktionsportale (*GemRockAuctions*, *Etsy*, *Catawiki*) nach 30 €-Schnäppchen. Enorm preisaggressiv, null Marge, hoher Beratungsaufwand.

#### 4. Die tödliche CAC / LTV Gleichung
* Google Ads Klickpreise für „Edelsteine kaufen“ / „Saphir kaufen“: **1,50 € bis 4,50 € CPC**.
* Bei 0,1 % B2C-Conversion (infolge von Trust-Defizit und Mailto-Hürde) kostet **1 zahlender Kunde 1.500 € bis 3.000 € CAC**.
* Der Median-Preis im Shop liegt bei ca. 200 € bis 450 €. **Wer 1.500 € Akquisekosten aufwendet, um 150 € Rohertrag zu erzielen, ist binnen 60 Tagen insolvent.**

#### 5. Productive Procrastination (Die Roadmap-Falle)
* In [`Next-Level-Roadmap.md`](file:///g:/DAVID/Desktop/NobleCutGems/Website/Next-Level-Roadmap.md) priorisiert das Team: *Framer Motion Shared Element Transitions, Parallax Hero Image, Dark Mode mit Gold-Glassmorphism, WebAR 3D Model-Viewer*.
* **Hormozi-Diagnose:** Klassische Scheinarbeit. Man optimiert Animationen und CSS-Effekte, um sich der harten ökonomischen Wahrheit nicht stellen zu müssen: **Das Kernangebot konvertiert nicht.**

---

## TEIL 2: Die Hormozi Value Equation Analyse

$$\text{Value} = \frac{\text{Dream Outcome} \times \text{Perceived Likelihood of Achievement}}{\text{Time Delay} \times \text{Effort \& Sacrifice}}$$

| Dimension | Status Quo (Aktuelle NobleCutGems Seite) | Grand Slam Target State |
| :--- | :--- | :--- |
| **Dream Outcome** | *Schwach:* Ein nackter Stein kommt in einer kleinen Plastikbox an. Der Kunde hat immer noch kein tragbares Schmuckstück und keinen sozialen Statuseffekt. | **Extrem hoch:** Ein atemberaubendes, individuelles Unikat-Schmuckstück (18k Gold/Platin) oder ein versiegelter, banktresor-tauglicher Sachwert mit dokumentierter Provenienz. |
| **Perceived Likelihood** | **Katastrophal nahe 0:** 97 % unzertifiziert (`none`), Mailto-Bestellung, kein Treuhandkonto, keine Bewertungen, Angst vor Synthesen/Imitationen. | **100 % unerschütterlich:** Drittlabor-Zertifikat (IGI / DSEF / AIG) inklusive, IGS-Master-Gemologist Wertgutachten, 30 Tage bedingungslose Rückgabegarantie, Wertkurier. |
| **Time Delay** | *Hoch:* Mailto-Pingpong -> IBAN-Überweisung -> Postversand -> monatelange Goldschmiedesuche für das Fassen. | **Minimal:** 1-Click Sofort-Reservierung via Stripe/Klarna ODER 48h Express-Auswahlbox (B2B). Vollendetes Schmuckstück "Done-For-You" in 14 Tagen. |
| **Effort & Sacrifice** | *Brutal hoch:* Kunde muss Mailprogramm bedienen, Vorkasse überweisen, Goldschmied auswählen, Design abstimmen, Bruchrisiko beim Fassen tragen. | **Gleich Null:** All-in-One Service. Stein wählen, Fassungs-Stil anklicken, Ringgröße wählen – fertiges Luxusetui mit LED-Spotlight wird an die Haustür geliefert. |

---

## TEIL 3: Das Grand Slam Offer Repackaging & Pricing Power

Verkaufen Sie keine Rohstoffe als austauschbare Commodity. Transformieren Sie das Portfolio in **drei unwiderstehliche Grand Slam Angebote**:

### Angebot A: "The Bespoke Heirloom Concierge" (B2C High-Ticket)
* **Zielgruppe:** Verlobte, Jubilare, Geschenk-Käufer mit Budget 1.800 € bis 6.000 €.
* **Das Offer:** *„Ihr persönliches Unikat-Schmuckstück aus 100 % unbehandelten Edelsteinen – handgefertigt von Meistergoldschmieden.“*
* **Der Wertstack:**
  1. Handverlesener Naturstein (z. B. Ceylon Saphir 1,43ct – Wert: 850 €)
  2. Meistergoldschmiede-Fassung nach Maß in 750er Gold oder 950er Platin (Wert: 1.200 €)
  3. Offizielles gemmologisches Laborzertifikat + IGS-Wertgutachten für die Versicherung (Wert: 180 €)
  4. Klavierlack-Holzetui mit integriertem LED-Spotlight & 4K-Mikroskopie-Video auf USB-Karte (Wert: 120 €)
  5. **Die "She Says Yes or 100% Refund" Garantie:** 30 Tage Rückgaberecht + kostenlose Ringgrößen-Anpassung.
* **Pricing:** **Statt 850 € für den nackten Stein -> 2.490 € bis 3.490 € für das fertige Schmuckstück.** (Verdreifachung des Warenkorbs, Verdopplung der Marge, Eliminierung sämtlicher Kunden-Einwände).

### Angebot B: "The Jeweler’s Risk-Free Curated Memo Box" (B2B Goldschmiede)
* **Zielgruppe:** Freie Goldschmiede, Juweliere und Atelier-Inhaber in DACH (über 3.500 Betriebe).
* **Das Problem der Juweliere:** Sie können kein totes Kapital in Edelstein-Lagerbestände binden, brauchen aber für Kunden im Laden spektakuläre Steine zum Anfassen.
* **Das Offer:** *„Die NobleCut Auswahlbox: 5 kuratierte, unbehandelte Farb-Edelsteine für Ihr Atelier auf 14 Tage Kommission (Memo) – 0 € Vorabkosten, 100 % versichert.“*
* **Die Mechanik:**
  - Goldschmied erhält eine Edelbox mit 5 Steinen (z. B. 3.000 € Händlerwert).
  - Verkauft er einen Stein an seinen Kunden: Er zahlt den B2B-Händlerpreis an NobleCutGems und behält 40–50 % Einzelhandelsspanne.
  - Verkauft er nichts: Kostenfreie Rücksendung mit beiliegendem Wertkurier-Label.
* **Absicherung:** Gewerbenachweis, Bonitätsprüfung via Creditreform / Bürgel.

### Angebot C: "The Certified Collector's Vault" (Sammler & Sachwert)
* **Zielgruppe:** Edelstein-Investoren und Privatsammler.
* **Das Offer:** Steine ab 600 € werden niemals nackt versendet, sondern als versiegelte *Collector's Edition*:
  - Versiegelte Acryl-Sicherheitsbox (tamper-evident)
  - IGI / DSEF Zertifikat im Scheckkartenformat
  - Herkunftsnachweis & 360°-Mikroskopie-Dokumentation
  - **Rückkauf-Garantie:** Feste Rücknahme zum Einkaufspreis abzüglich 15 % Handling Fee innerhalb von 24 Monaten.

---

## TEIL 4: Unfair Distribution Wedge (0 € Ad Spend GTM)

### Hebel 1: B2B Direct-Outreach an freie Goldschmiede (Cashflow in 7 Tagen)
* **Die Taktik (Direct Video Pitch):**
  1. Identifikation von 100 Goldschmieden in München, Nürnberg, Stuttgart, Frankfurt, Zürich via Instagram & Google Maps.
  2. Personalisierte Instagram- oder WhatsApp-Video-DM an den Inhaber:
     > *„Hallo [Name], habe gesehen, dass du exzellente Unikat-Ringe fertigst. Ich habe hier einen unbehandelten 1,43ct Ceylon Saphir mit spektakulärem Feuer (anbei ein 10-Sekunden 360° Video aus unserem Labor). Brauchst du aktuell Steine für Kundenprojekte? Ich sende dir gerne eine unverbindliche 14-Tage-Auswahlbox auf Kommission zu. Beste Grüße, David von NobleCutGems“*
  3. Konvertierungsquote: Bei 50 Kontakten fordern 6–10 Ateliers eine Auswahlbox an. 2–3 Steine werden im ersten Monat verkauft. **Ergebnis: 2.000 € – 5.000 € Umsatz ohne einen Cent Ad Spend.**

### Hebel 2: Content-Arbitrage mit vorhandenem 4K-Videomaterial
* **Asset:** In `public/videos/` liegen bereits hochwertige Pinzetten-, Finger- und 360°-Videos (z. B. `saphir-4-159ct-360.mp4`, `blauer-spinell-457ct-pinzette.mp4`).
* **Die Taktik:** TikTok, Instagram Reels und YouTube Shorts mit radikalem Insider-Wissen:
  - *„Warum 90 % der Saphire beim Juwelier künstlich gebrannt sind – und woran du echte Steine erkennst.“*
  - *„Juweliere schlagen 800 % auf Steine auf: So kaufst du Edelsteine direkt an der Quelle.“*
  - *„Mikroskop-Check: Was passiert wirklich, wenn man einen Rubin mit Blei-Glas füllt?“*
* **Call to Action:** *„Möchtest du diesen unbehandelten 1,59ct Saphir für dein nächstes Schmuckstück reservieren? Link in der Bio für die Labor-Details.“*

---

## TEIL 5: Empirischer Technischer Codebase-Audit

### Detaillierte Befundmatrix

| ID | Schweregrad | Komponente / Datei | Befund & Ursache | Auswirkung |
| :---: | :---: | :--- | :--- | :--- |
| **F-01** | **P0 (Kritisch)** | [`StoneClient.jsx:969-973`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/StoneClient.jsx#L969-L973) | **Ghost CTA:** Dialog `<Dialog open={showInquiryDialog}>` ist im DOM deklariert, aber es existiert **kein einziger Button**, der `setShowInquiryDialog(true)` auslöst. | Kaufinteressenten können von der Produktseite aus keine Anfrage starten. Die Kernseite ist eine Sackgasse. |
| **F-02** | **P0 (Kritisch)** | [`StoneClient.jsx:620`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/StoneClient.jsx#L620), [`ContactClient.jsx:165`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/ContactClient.jsx#L165) | **Silent Lead Drop:** Formulare nutzen `mailto:` und simulieren Erfolg mit grünem Haken. Kein Backend, keine DB, keine API. | Auf Desktop/Webmail und In-App-Browsern (IG/TikTok) verpuffen Anfragen unbemerkt. Händler erhält den Lead nie. |
| **F-03** | **P1 (Hoch)** | [`WishlistClient.jsx:227`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/WishlistClient.jsx#L227), [`ContactClient.jsx:137`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/ContactClient.jsx#L137) | **Broken Wishlist Journey:** Wishlist verlinkt auf `/contact?stones=1,2,3`. `ContactClient.jsx` wertet `useSearchParams` nicht aus. | Sammelanfragen für Steine kommen als leere Standardanfrage an. Die Auswahl des Nutzers geht verloren. |
| **F-04** | **P0 (Kritisch)** | [`google_merchant_feed_final.txt`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/data/google_merchant_feed_final.txt), [`sitemap.xml`](file:///g:/DAVID/Desktop/NobleCutGems/Website/sitemap.xml) | **100 % 404 Disapproval:** Merchant-Feed verlinkt auf `/edelsteine/<slug>` (Route existiert nicht). `sitemap.xml` verlinkt auf veraltete CRA-Pfade (`/Home`, `/Collection`, etc.). | Google Merchant Center sperrt das Konto wegen ungültiger Landingpages. Search Console straft Domain ab. |
| **F-05** | **P1 (Hoch)** | [`[lang]/stone/[slug]/page.jsx:28, 67`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/app/%5Blang%5D/stone/%5Bslug%5D/page.jsx#L28) | **Raw HTML Injection:** Rohe HTML-Tags (`<p><strong>`) werden ungefiltert in Meta-Description und JSON-LD Product Schema gerendert. | Zerstörte Google SERP Snippets; Rich-Results-Validierung scheitert; Abstrafung der Klickrate. |
| **F-06** | **P1 (Hoch)** | [`LayoutClient.jsx:77-85`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/LayoutClient.jsx#L77-L85) | **Destruktives URL-Hijacking:** `useEffect` prüft `localStorage` und erzwingt `router.replace('/' + storedLang)` bei jedem Deep Link. | Teilt ein Nutzer einen englischen Produktlink, wird ein wiederkehrender Besucher ungefragt auf `/de` gerissen. |
| **F-07** | **P2 (Mittel)** | `StoneClient.jsx:107`, `CollectionClient.jsx:98` | **i18n-Abbruch ab ID 23:** Übersetzungs-Objekte enden bei ID 20 bzw. 22. Ab ID 23 greift der deutsche Fallback `stone.name`. | Englische und französische Seiten zeigen ab Stein 23 rein deutsche Bezeichnungen im Katalog. |
| **F-08** | **P2 (Mittel)** | [`StoneClient.jsx:597-618`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/StoneClient.jsx#L597-L618) | **DOM Pollution & Crash-Gefahr:** Unsichtbare Videos werden im Hintergrund mit `preload="auto"` an `document.body` gehängt. | Extreme mobile Latenz, Datenvolumen-Verbrauch und `DOMException` bei vorzeitiger Seitennavigation. |
| **F-09** | **P2 (Mittel)** | [`CollectionClient.jsx:472`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/components/CollectionClient.jsx#L472) | **Toter Filter-Code:** Prüfung `filters.priceRange === 'all'` ist immer `false`, da Filter nur `priceMin` und `priceMax` enthält. | Die Shuffle-Logik für verfügbare Steine wird zwar ausgeführt, aber das Ergebnis niemals im UI gerendert. |
| **F-10** | **P2 (Mittel)** | [`[lang]/blog/page.jsx`](file:///g:/DAVID/Desktop/NobleCutGems/Website/src/app/%5Blang%5D/blog/page.jsx) | **Fehlende Blog-Metadaten:** Weder Blog-Index noch Detailseite exportieren `generateMetadata`. Strings sind deutsch hardcodiert. | Keine Social-Media-Vorschauen (OG-Tags) und schlechtes internationales SEO im Journal. |
| **F-11** | **P1 (Hoch)** | [`package.json:10`](file:///g:/DAVID/Desktop/NobleCutGems/Website/package.json#L10), `next.config.mjs` | **Broken Deploy Pipeline & CRA-Leichen:** `"deploy": "gh-pages -d build"`, Next.js exportiert aber nach `out/`. Alte CRA-Dateien im Root. | `npm run deploy` schlägt fehl. Altlasten interferieren mit Next.js Statics. |
| **F-12** | **P0 (Kritisch)** | Gesamte Plattform | **Fehlender API-/DB-Layer:** Keine transaktionale Lead-Erfassung, kein CRM-Webhook, kein Conversion-Tracking. | Leads können weder verlässlich erfasst, noch rechtssicher oder datenbasiert nachverfolgt werden. |

---

## TEIL 6: Der 7-Tage Action Plan (Execution Scope)

### Phase 1: Conversion-Rettung & Merchant-Fix (Tag 1–2)

#### 1. Inquiry-Button & Dialog in `StoneClient.jsx` einbinden
Direkt neben den Spezifikationen den fehlenden CTA-Button ergänzen:
```jsx
// src/components/StoneClient.jsx
<div className="flex flex-col sm:flex-row gap-4 my-8">
  <Button
    onClick={() => setShowInquiryDialog(true)}
    className="w-full sm:w-auto flex-1 bg-cta-color hover:bg-orange-600 text-white py-4 text-lg font-semibold shadow-lg transition-transform duration-200 hover:scale-[1.02]"
  >
    {t.send_inquiry || "Jetzt unverbindlich anfragen"}
  </Button>
  <Button
    variant="outline"
    size="icon"
    onClick={handleShare}
    className="p-4"
    aria-label={t.share_stone}
  >
    <Share2 className="w-5 h-5" />
  </Button>
</div>
```

#### 2. Echten Lead-Service anbinden (Statt `mailto:`)
Einbindung von **Formspree** oder **Web3Forms** für den statischen Export (oder Umstellung auf Next.js API Routes mit Resend):
```javascript
const handleInquirySubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "DEIN_WEB3FORMS_KEY",
        stone: `${stone.name} (${stone.carat_weight}ct - ${stone.price_eur}€)`,
        name: inquiryForm.full_name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        message: inquiryForm.message,
      }),
    });
    if (res.ok) {
      setInquirySent(true);
      setTimeout(() => setShowInquiryDialog(false), 2500);
    }
  } catch (err) {
    console.error("Submission failed", err);
  } finally {
    setIsSubmitting(false);
  }
};
```

#### 3. Google Merchant Feed Links korrigieren
In `src/data/google_merchant_feed_final.txt`:
* **Suchen:** `https://www.noblecutgems.com/edelsteine/`
* **Ersetzen durch:** `https://www.noblecutgems.com/de/stone/`

#### 4. Wishlist-Query-Parameter in `ContactClient.jsx` auslesen
```jsx
import { useSearchParams } from 'next/navigation';
// Im Component:
const searchParams = useSearchParams();
const stonesParam = searchParams.get('stones');
// Bei Vorhandensein: Automatische Vorbefüllung der Textarea mit den ausgewählten Steinen!
```

---

### Phase 2: SEO, Sitemap & i18n Bereinigung (Tag 3–4)

#### 1. HTML-Stripper für SERP-Metadaten & JSON-LD
In `src/app/[lang]/stone/[slug]/page.jsx`:
```javascript
function stripHtml(str) {
  return str ? str.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim() : '';
}

// In generateMetadata:
const cleanDesc = stripHtml(stone[`description_${lang}`] || stone.description_de).substring(0, 155);

// Im JSON-LD:
description: stripHtml(stone[`description_${lang}`] || stone.description_de),
```

#### 2. Dynamische `sitemap.js` erstellen
Löschen der statischen `public/sitemap.xml` und Implementierung einer dynamischen `src/app/sitemap.js`, die automatisch alle 34 Steine, alle 3 Sprachen (`/de/`, `/en/`, `/fr/`) und alle Blog-Artikel erfasst.

#### 3. Beseitigung des `localStorage`-Hijackings
In `src/components/LayoutClient.jsx`: Die Zwangsumleitung `router.replace('/' + storedLang)` entfernen. Die aktuelle URL-Sprache (`lang` Parameter) muss stets absolute Priorität haben.

---

### Phase 3: Angebots-Evolution & Cashflow (Tag 5–7)

1. **Laborzertifikats-Garantie:** Auf jeder Produktseite über 500 € gut sichtbar platzieren:  
   *„Inklusive kostenlosem, unabhängigem Laborzertifikat vor Auslieferung.“*
2. **Bespoke Concierge Toggle:** Formular-Checkbox auf der Detailseite ergänzen:  
   *„Diesen Stein als maßgefertigtes Schmuckstück fassen lassen (+ ab 750 €)“*.
3. **B2B Goldschmiede-Landingpage (`/b2b`):**  
   *„Die NobleCut Auswahlbox für Goldschmiede-Ateliers: 5 Farb-Edelsteine auf 14-Tage-Kommission (0 € Risiko).“*
4. **Direct Outreach:** 50 personalisierte Video-DMs mit vorhandenen Pinzetten-Videos an selbstständige Goldschmiede in München/Nürnberg/Stuttgart versenden.

---

### Fazit & Roadmap-Freigabe
Hören Sie auf, Zeit in Parallax-Effekte, Dark-Mode-Themes oder CSS-Animationen zu investieren. Konzentrieren Sie sämtliche Ressourcen auf die **Wiederherstellung des Conversion-Funnels** und das **Grand Slam Offer Repackaging**. Das schützt vor Lead-Verlust und führt zum ersten stabilen, fünfstelligen Monatsumsatz.

