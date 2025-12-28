# Changelog

## [Unreleased] - 28.12.2025

### Added
- **Animationen & Effekte:**
  - `TextType` Komponente: High-Speed Typewriter-Effekt (8ms) für Dominik & Ekin.
  - `DecryptedText` Komponente: Code-Entschlüsselungs-Animation für Aneeque & Valentino.
  - `Modal` Komponente: Modernes, animiertes Modal mit Glassmorphism-Look (basierend auf `motion`).
  - Neue Bibliotheken: `gsap` und `motion` integriert.
- **Team Seite:**
  - Scroll-Triggered Animations: Team-Karten schweben beim Scrollen aus verschiedenen Richtungen ein.
  - Kontakt-Modal: "Anfrage schicken"-Button direkt unter den Profilen integriert (für Valentino zentriert).
  - Profilkarten: Holo-Effekt (Hexagon-Pattern) verfeinert und vergrößert (55% Mask Size).

### Changed
- **Struktur:** Separate `Kontakt`-Seite komplett entfernt.
- **Navigation:**
  - `/kontakt` Route und Navigations-Link gelöscht.
  - Links in `Portfolio`, `ContentCreation` etc. leiten nun zur Team-Seite weiter.
- **Design:** Abstände auf der Team-Seite optimiert ("Luftigeres" Layout).

## [Unreleased] - 27.12.2025

### Added
- **Team Seite:**
  - Neues Design mit "ProfileCards" (Pill-Shape, Gold-Akzente, Bild-Hintergrund).
  - Animierter Location-Header ("Hildesheim / Hannover").
  - Content-Boxen im Zick-Zack-Layout neben den Profilbildern.
- **Warenkorb:**
  - Komplettes Redesign ("Split Layout").
  - Neue `CartItem`-Komponente im "Pill"-Design (Links ausgerichtet, gruppiert nach Kategorie).
  - "Wichtiger Hinweis"-Box und zentriertes Summenfeld.
  - Kontaktformular im neuen Dark/Gold-Look.
  - Integration von EmailJS für den echten Versand von Anfragen.
- **Content Creation:**
  - Preise für Add-Ons auf "VB" (0€) gesetzt.
  - Kategorie-Zuweisung korrigiert ("Add-On" -> "Content Creation").

### Changed
- **Styling:** Globales Theme auf Dark/Gold verfeinert.
- **Navigation:** Header-Bars auf Team- und Warenkorb-Seite vereinheitlicht.
- **Tech:** IDs der Produkte aktualisiert, um Caching-Probleme zu beheben.

### Fixed
- Überlappungsprobleme im Team-Header.
- Falsche Preisanzeige im Warenkorb durch Cache-Bypass gelöst.
- EmailJS Konfiguration (Empfängeradresse).
