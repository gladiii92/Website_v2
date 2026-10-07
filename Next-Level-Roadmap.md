# NobleCutGems: Next-Level Roadmap

Diese Roadmap beschreibt die detaillierten technischen und konzeptionellen Schritte zur Implementierung der Premium-Features für Präsentation, Funktionalität und SEO.

## Phase 1: Präsentation & Visuelles Erlebnis ("Wow"-Faktor)

### 1.1 Nahtlose Seitenübergänge (Framer Motion)
- **Ziel:** Ein App-ähnliches Gefühl ohne harte Ladeunterbrechungen (Flickern).
- **Implementierung:** 
  - Integration von `<AnimatePresence mode="wait">` in der zentralen Layout-Datei.
  - Anpassung der Navigation, sodass Next.js-Routenwechsel von weichen Animationen (z.B. Fade-In/Out) begleitet werden.
  - *Shared Element Transitions* für Klicks auf Edelstein-Karten: Das Vorschaubild vergrößert sich fließend zum Hauptbild der Detailseite, anstatt die Seite komplett neu zu laden.

### 1.2 Parallax-Scrolling & Luxus-Hover-Effekte
- **Ziel:** Erzeugung von optischer Tiefe und Lebendigkeit auf der Startseite.
- **Implementierung:** 
  - Einsatz der `framer-motion` Hooks (`useScroll` und `useTransform`) für die Startseite.
  - Hintergrundbilder (Hero-Image) bewegen sich beim Scrollen minimal langsamer als der Text (Parallax-Effekt).
  - Premium-Hover-Effekte auf Edelstein-Karten: Ein subtiles Glänzen ("Shimmer"-Effekt) zieht über das Bild, wenn man mit der Maus darüber fährt.

### 1.3 Interaktive 360°-Ansicht & AR-Vorbereitung
- **Ziel:** Maximale Produkttransparenz und moderne Darstellungstechnik.
- **Implementierung:**
  - Einbindung einer 360°-Bild-Komponente (z.B. per Canvas-Sprite-Viewer), sofern hochauflösende Bildreihen aus allen Winkeln vorliegen.
  - *Optional:* Vorbereitung für WebAR (Augmented Reality) via `<model-viewer>`, um Steine virtuell über die Smartphone-Kamera betrachten zu können.

### 1.4 Premium Dark Mode (Glas-Effekte & Gold)
- **Ziel:** Die Farben der Edelsteine maximal zum Leuchten bringen.
- **Implementierung:**
  - Erweiterung der Tailwind-Konfiguration um ein dediziertes dunkles Theme (Tiefschwarz, Anthrazit, Gold-Akzente).
  - Einbau eines Theme-Toggles im Header (Dark/Light) oder eine dauerhafte Neuausrichtung auf ein Dark-Premium-Theme mit "Glassmorphism" (milchig-transparente Overlays).

---

## Phase 2: Funktionalität & Conversion-Optimierung

### 2.1 Visuelle Profi-Filter (Kollektion)
- **Ziel:** Eine intuitivere und schnellere Produktsuche wie bei großen High-End-Brands.
- **Implementierung:**
  - **Farben:** Klickbare Farb-Swatches (Farbkreise) anstelle von einfachen Text-Dropdowns.
  - **Schliff:** Kleine SVG-Icons für die verschiedenen Schliffe (Oval, Cushion, Emerald, etc.).
  - **Preis & Karat:** Interaktive Dual-Slider (Min/Max Schieberegler).
  - *URL-Synchronisierung:* Filterparameter (z.B. `?color=blue&min_carat=2`) werden in die URL geschrieben, damit gefilterte Ansichten geteilt und gebookmarkt werden können.

### 2.2 Dynamische Wunschliste (Wishlist)
- **Ziel:** Höhere Nutzerbindung und leichtere Entscheidungsfindung für Kunden.
- **Implementierung:**
  - Ein interaktives Herz-Icon auf jeder Steinkarte und auf der Detailseite.
  - Speicherung der Favoriten direkt im lokalen Browser-Speicher (`localStorage`) des Nutzers (kein Login nötig).
  - Erstellung einer neuen Seite `/wishlist`, auf der Nutzer alle Favoriten gesammelt betrachten und mit nur einem Klick eine gemeinsame Anfrage für mehrere Steine stellen können.

### 2.3 Sticky Mobile "Anfrage"-Leiste
- **Ziel:** Deutlich höhere Conversion-Rate auf Smartphones (Conversion-Optimierung).
- **Implementierung:**
  - Auf der Edelstein-Detailseite (`StoneClient.jsx`): Ein am unteren Bildschirmrand fixierter Bereich (`fixed bottom-0 w-full`), der nur auf mobilen Geräten sichtbar ist.
  - Dieser Bereich enthält permanent den Preis und einen direkten "Anfrage senden"-Button, der beim Klick fließend zum Kontaktformular scrollt.

---

## Phase 3: Content SEO (Maximaler Organischer Traffic)

### 3.1 Edelstein-Blog / Wissensdatenbank (Markdown CMS)
- **Ziel:** Organisches Abfangen von Suchanfragen (Top-of-Funnel) wie "Wie erkenne ich unbehandelte Saphire?" oder "Wertentwicklung Rubin".
- **Implementierung:**
  - Erstellung eines simplen, performanten Markdown-Systems (`src/content/blog/`).
  - Nutzung von Tools wie `gray-matter` und `next-mdx-remote`, um reine Textdateien (.md) vollautomatisch in extrem schnelle, SEO-optimierte Next.js Seiten umzuwandeln.
  - Einbindung von Inhaltsverzeichnissen (TOC), Autorenboxen und direkten Produkt-Empfehlungen aus der eigenen Kollektion unter jedem Artikel.

### 3.2 Lexikon-Erweiterung & Automatische Interne Verlinkung
- **Ziel:** Erhöhung der Verweildauer und eine perfekte semantische SEO-Struktur.
- **Implementierung:**
  - Das bestehende, kleine Lexikon wird in den neuen Blog/Wissens-Bereich integriert.
  - *Automatisierung:* Fachbegriffe (z.B. "VVS", "Erhitzen", "Sri Lanka") in den Edelsteinbeschreibungen werden per Skript automatisch auf die entsprechenden Wiki/Blog-Einträge verlinkt.
  - Vollautomatische Generierung einer separaten XML-Sitemap für alle neuen Inhaltsseiten.

