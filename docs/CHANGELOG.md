# Changelog - Dominium Sociale

Alle wichtigen Änderungen werden hier dokumentiert.

## [0.4.0] - 2025-12-23

### 🎨 Radar-System & Interaktives Design (Consilium Software)

**Visual Components**
- ✅ **Interaktive Wörter**: Draggable Wörter ("Auf", "die", "wichtigen", "Dinge", "fokussieren") fest in das Radar-Gitter integriert.
- ✅ **Energie-Kugeln (Orbs)**: 3 Orbs im Orange-Gold Radial-Gradient; **Basis-Orb auf Cyan umgestellt**, passend zum Radar-Gitter.
- ✅ **Synchronisierte Puls-Animation**: Basis-Orb "atmet" nun visuell durch eine Scale- und Glow-Animation, synchron zum Radar-Scan-Impuls.
- ✅ **Interaktive Info-Karten (Orbs)**:
  - Hochwertige Glassmorphism-Overlays bei Hover über die orangen Kugeln.
  - Zentrierter Score-Display mit prominentem Leuchteffekt.
  - Minimalistische Sektionen: Details, Sentiment und Inventar.
- ✅ **Custom High-Performance Cursor**:
  - **Direct Mode**: Mausverfolgung ohne rAF/GSAP für 0-Latenz (Input-to-Pixel).  - **Magnetic Lock-on**: Eigene Implementierung via CSS Variables (`--tl-x` etc.), die Ecken am Wort fixiert, während der Dot weiter der Maus folgt.
  - **Design**: Orange-Gold-Schema passend zu den Orbs.

**Animationen & Effekte**
- ✅ **Pop-up Animation**: Stufenweises Erscheinen der Energie-Kugeln mit Spring-Physik (Delay-Sequenz 1-2-3).
- ✅ **Signal-Welle**: Loopender Radar-Scan alle ~2 Sekunden.
- ✅ **Magnetic Snapping**: Präzises, performantes Einrasten der Cursor-Ecken an Wort-Containern (Hitbox optimiert auf -8px).
- ✅ **SVG-Optimierung**: `pointer-events: none` für die Radar-Outline.
- ✅ **Typography**: Vergrößerung der Schriftart auf 2.5rem mit Text-Shadow.

**Technische Details**
- `ConsiliumSoftware.jsx`: Umstellung auf `motion` Komponenten für alle animierten Elemente.
- `ConsiliumSoftware.css`: Anpassung des SVG-Stylings und der Layer-Hierarchie (z-index).
- Verwendete Bibliothek: `framer-motion` (alias `motion/react`).

**Dateien geändert**
- `frontend/src/pages/ConsiliumSoftware.jsx`
- `frontend/src/pages/ConsiliumSoftware.css`

## [0.3.0] - 2025-11-03

### 🎨 Kontaktseite - Premium Split-Screen Design

**Layout & Design**
- ✅ Premium Split-Screen Layout (40% Info-Card / 60% Formular)
- ✅ Glassmorphism-Effekt auf Info-Card mit Backdrop-Blur
- ✅ Gradient-Überschrift mit Animation (Purple → Blue)
- ✅ Smooth Hover-Animationen auf allen Elementen
- ✅ Icon-Wrapper mit Gradient-Background & Rotate-Animation
- ✅ Social Media Links (Instagram, LinkedIn, Twitter)
- ✅ Sticky Info-Card auf Desktop

**Features**
- ✅ Vollständiges Kontaktformular (Name, E-Mail, Telefon, Nachricht)
- ✅ Echtzeit-Formular-Validierung (E-Mail-Check, Pflichtfelder)
- ✅ Error-States mit rotem Border & Fehlermeldungen
- ✅ Submit-Animation mit "Wird gesendet..."-State
- ✅ Success-Message mit Slide-Down-Animation
- ✅ Response-Zeit-Hinweis (24h)

**Kontakt-Informationen**
- 📍 Standorte: Hildesheim / Hannover
- 🌐 Reichweite: Deutschlandweit
- ✉️ E-Mail: info@dominium-sociale.de
- 📞 Telefon: +49 151 1234 5678
- ⏱️ Antwortzeit: 24 Stunden

**Design-Details**
- Gradient: #667eea → #764ba2 (Purple/Blue)
- Glassmorphism mit rgba Backgrounds
- Box-Shadows mit Color-Tinting
- Micro-Interactions beim Hover & Focus
- Form-Inputs mit Focus-Lift-Effekt

**Responsive Design**
- Desktop: Split-Screen mit Sticky-Card
- Tablet (< 1024px): Stacked Layout
- Mobile (< 768px): Optimierte Padding & Font-Sizes
- Small Mobile (< 480px): Kompakte Card-Größen

**Technische Details**
- `Kontakt.jsx` - React Component mit useState für Form-Handling
- `Kontakt.css` - Premium CSS mit Animations & Transitions
- Lucide Icons: MapPin, Globe, Mail, Phone, Instagram, Linkedin, Twitter, Send, Clock
- Form-Validierung mit Regex für E-Mail
- Simulated API Call mit 1.5s Delay

**Dateien**
- `frontend/src/pages/Kontakt.jsx` - Komplett neu implementiert
- `frontend/src/pages/Kontakt.css` - Neu erstellt

## [0.2.0] - 2025-11-03

### 🎨 Team-Seite modernisiert

**Layout & Design**
- ✅ Standort-Header mit Icons (Hildesheim/Hannover, Deutschlandweit)
- ✅ 4 Team-Mitglieder mit alternierendem Layout (links/rechts)
- ✅ Moderne Karten mit Hover-Effekten
- ✅ Gold-Gradient Trennlinien zwischen Personen
- ✅ Responsive Design für Mobile & Tablet
- ✅ Smooth Animations beim Laden

**Team-Mitglieder**
- Sarah Müller - Creative Director
- Michael Wagner - Lead Data Analyst
- Lisa Schmidt - Content Strategist
- Tom Becker - Growth Hacker

**Technische Details**
- `Team.jsx` - React Component mit Lucide Icons (MapPin, Globe)
- `Team.css` - Modernes CSS mit Grid Layout & Animations
- Placeholder-Bilder von Unsplash
- Komplett responsive (Desktop → Tablet → Mobile)

### 🐛 Bugfixes

**Scroll & Layout Bugs behoben**
- ❌ Entfernt: scroll-snap aus App.css (verursachte Überlappungen)
- ❌ Entfernt: min-height: 100vh von main-content
- ❌ Entfernt: min-height: 100vh von Footer
- ✅ Resultat: Footer erscheint jetzt korrekt unten ohne ins Layout zu "buggen"

**Dateien geändert**
- `frontend/src/App.css` - Layout-Fix
- `frontend/src/components/Footer/Footer.css` - Height-Fix
- `frontend/src/pages/Team.jsx` - Komplett neu gestaltet
- `frontend/src/pages/Team.css` - Neu erstellt

## [0.1.0] - 2025-11-03

### ✨ Projekt Setup

**Architektur**
- Model-Service-Presentation (MSP) Struktur aufgebaut
- Frontend: React + Vite
- Backend: FastAPI (vorbereitet für später)

**Ordnerstruktur**
```
src/
├── models/           # Datenstrukturen
├── services/         # Business-Logik
└── presentation/     # FastAPI Backend
    ├── routers/
    ├── config/
    └── static/assets/
```

### 🎨 Frontend (React + Vite)

**Navigation & Header**
- Sticky Header mit Logo (links) und Navigation (rechts)
- Navigation: Home | Services | Portfolio | Team | Kontakt | Warenkorb
- Services Dropdown mit 4 Optionen:
  - Social Media Beratung (💬)
  - Content Creation (▶️)
  - Trendanalyse (🧠)
  - Cybersecurity & Digitalisierung (🛡️)
- Smooth Hover-Animationen
- React Router für Seitennavigation

**Design (Option B: Gold-Akzent)**
- Farbschema:
  - Background: Helles Beige (#F5F1E8)
  - Header: Dunkelbraun (#1A1A1A)
  - Akzente: Gold (#D4AF37)
  - Text: Schwarz (#1A1A1A)
- Icons: Lucide React
- Responsive Design
- Custom Scrollbar (Gold)

**Komponenten**
- `Header.jsx` - Navigation mit Dropdown
- Basis-Seiten: Home, Portfolio, Team, Kontakt, Warenkorb

**Dependencies**
- react-router-dom (Routing)
- lucide-react (Icons)
- vite (Build Tool)

### 🐍 Backend (FastAPI)

**Setup**
- FastAPI Basis-Setup
- CORS für React Frontend
- Environment Configuration (Settings)
- Static Files Mount für Assets

**Dependencies**
- fastapi
- uvicorn
- pydantic-settings
- python-dotenv
- Email & Payment Libraries (vorbereitet)

### 📁 Konfiguration

**Environment**
- `.env.example` für Backend (SMTP, Stripe, APIs)
- `frontend/.env` für Frontend (API URL)
- `.gitignore` für Secrets & Dependencies

**Dokumentation**
- `.context.md` - Projekt-Vision
- `.claude-preferences.md` - Development Regeln
- README.md - Setup & Quick Start

### 🎯 Features

**Aktuell**
- ✅ Responsive Navigation mit Dropdown
- ✅ Logo klickbar (Home)
- ✅ Routing zwischen Seiten
- ✅ Modern Design (Gold-Akzent)

**Geplant**
- 🛒 Warenkorb-Funktionalität
- 📧 Email-Integration (EmailJS)
- 📊 Content-Seiten ausbauen
- 🎨 reactbits.dev Komponenten integrieren

---

**Tech Stack**
- Frontend: React 18 + Vite 7
- Backend: FastAPI + Python 3.x
- Styling: Vanilla CSS (MSP-konform)
- Icons: Lucide React
\n## 2025-12-13\n- ContentCreation Seite: Pakete neu strukturiert (Content-Pieces/Community/Performance Blocks) und Karten mit vertikalem Stagger-RiseIn animiert (�hnlich reactbits animated content, direction vertical).\n
