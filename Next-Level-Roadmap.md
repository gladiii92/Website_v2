# NobleCutGems: Next-Level Roadmap (Status Update)

Diese Roadmap beschreibt die detaillierten technischen und konzeptionellen Schritte zur Implementierung der Premium-Features für Präsentation, Funktionalität und SEO.

## Phase 1: Präsentation & Visuelles Erlebnis ("Wow"-Faktor)

### 1.1 Nahtlose Seitenübergänge (Framer Motion) - ✅ Erledigt (teilweise)
- **Ziel:** Ein App-ähnliches Gefühl ohne harte Ladeunterbrechungen (Flickern).
- **Status:** `<AnimatePresence mode="wait">` und weiche Fade-In/Out-Animationen bei Routenwechseln sind in `template.jsx` erfolgreich eingebaut. 
- **Offen:** *Shared Element Transitions* für Klicks auf Edelstein-Karten (fließende Vergrößerung des Vorschaubilds zum Hauptbild, ohne Layout-Bruch).

### 1.2 Parallax-Scrolling & Luxus-Hover-Effekte - ✅ Erledigt (teilweise)
- **Ziel:** Erzeugung von optischer Tiefe und Lebendigkeit auf der Startseite.
- **Status:** Premium-Hover-Effekte auf Edelstein-Karten sind aktiv (Shimmer-Effekt via CSS-Animation, Zoom auf Bilder, Hover-Shadows).
- **Offen:** Parallax-Effekt mit `framer-motion` (`useScroll`) für das Hintergrundbild (Hero-Image) auf der Startseite.

### 1.3 Interaktive 360°-Ansicht & AR-Vorbereitung - ✅ Erledigt
- **Ziel:** Maximale Produkttransparenz und moderne Darstellungstechnik.
- **Status:** Hochauflösende 360°- und Pinzetten-Videos (`.mp4`) können direkt im Player geladen und fließend abgespielt werden, um den Stein aus allen Winkeln zu betrachten.
- **Offen (optional):** WebAR (`<model-viewer>`) für Smartphone-Kamera-Ansicht.

### 1.4 Premium Dark Mode (Glas-Effekte & Gold) - ⏳ Offen
- **Ziel:** Die Farben der Edelsteine maximal zum Leuchten bringen.
- **Status:** Es existiert ein grundlegender ThemeProvider, aber ein vollwertiges Premium Dark-Theme (Tiefschwarz, Gold-Akzente, Glassmorphism) sowie ein Theme-Toggle-Button im Header müssen noch entworfen werden.

---

## Phase 2: Funktionalität & Conversion-Optimierung

### 2.1 Visuelle Profi-Filter (Kollektion) - ✅ Erledigt (mit offenen Feinheiten)
- **Ziel:** Eine intuitivere und schnellere Produktsuche wie bei großen High-End-Brands.
- **Status:** 
  - Klickbare Farb-Swatches (inkl. echter Bi-Color-Gradients) sind integriert.
  - Schliffe, Sortierung und Seltenheiten nutzen schicke, elegante Pill-Buttons.
  - Preis- und Karat-Slider (mit angepassten Schritten: 5000€ max / 10ct max) wurden erfolgreich implementiert.
- **Offen:** 
  - URL-Synchronisierung für Filter (`?color=blau&min_carat=2`), damit spezielle Suchen direkt per Link teilbar sind.
  - Optionale kleine SVG-Icons für die Schliffe (statt reinem Text in den Pill-Buttons).

### 2.2 Dynamische Wunschliste (Wishlist) - ✅ Erledigt
- **Ziel:** Höhere Nutzerbindung und leichtere Entscheidungsfindung für Kunden.
- **Status:** Das interaktive Herz-Icon, die Speicherung im `localStorage` (komplett ohne Login) und die separate `/wishlist` Seite für gesammelte Steine und Sammelanfragen sind komplett fertig.

### 2.3 Sticky Mobile "Anfrage"-Leiste - ⏳ Offen
- **Ziel:** Deutlich höhere Conversion-Rate auf Smartphones.
- **Status:** Noch nicht implementiert. Geplant ist ein fixierter Bereich am unteren Bildschirmrand (`fixed bottom-0`), der nur auf Handys bei der Edelstein-Detailansicht sichtbar ist und den Preis sowie einen flotten "Anfrage senden"-Button enthält.

---

## Phase 3: Content SEO (Maximaler Organischer Traffic)

### 3.1 Edelstein-Blog / Wissensdatenbank (Markdown CMS) - ✅ Erledigt
- **Ziel:** Organisches Abfangen von Suchanfragen (Top-of-Funnel).
- **Status:** Ein extrem performantes, SEO-optimiertes System auf Basis von Markdown-Dateien (`src/content/blog/`), `gray-matter` und `remark` ist live. Übersetzte Seiten für DE/EN/FR werden blitzschnell statisch generiert.

### 3.2 Lexikon-Erweiterung & Automatische Interne Verlinkung - ⏳ Offen
- **Ziel:** Erhöhung der Verweildauer und eine perfekte semantische SEO-Struktur.
- **Status:** 
  - **Offen:** Ein Skript, das Fachbegriffe in Edelsteinbeschreibungen (z.B. "VVS", "Sri Lanka") automatisch erkennt und auf die jeweiligen Lexikon/Blog-Seiten verlinkt.
  - **Offen:** Automatische Generierung einer `sitemap.xml` (oder Aktualisierung der bestehenden), um die dynamischen Blog-Artikel für Google erfassbar zu machen.
