# Changelog - Dominium Sociale

Alle wichtigen Änderungen werden hier dokumentiert.

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
