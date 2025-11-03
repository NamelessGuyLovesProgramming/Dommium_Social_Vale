# Dominium Sociale

**Social Mastery** - Datengestützte Trend-Analyse für Content Creation & Produktentwicklung

## 🚀 Quick Start

### Backend (FastAPI)
```bash
# Python Environment erstellen
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Dependencies installieren
pip install -r requirements.txt

# Backend starten
cd src/presentation
python main.py
```

Backend läuft auf: http://localhost:8000

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

Frontend läuft auf: http://localhost:5173

## 🏗️ Architektur

**Model-Service-Presentation (MSP)**

```
src/
├── models/           # 📦 Datenstrukturen
├── services/         # ⚙️ Business-Logik
└── presentation/     # 📱 API & UI
```

## 🎨 Tech Stack

- **Frontend**: React + Vite
- **Backend**: FastAPI (Python)
- **Architektur**: Model-Service-Presentation
- **Design**: reactbits.dev

## 📁 Projekt-Struktur

```
Dommium_Social_Vale/
├── src/                      # Backend
│   ├── models/               # Datenmodelle
│   ├── services/             # Business-Logik
│   └── presentation/         # FastAPI
│       ├── routers/          # API Routes
│       ├── config/           # Settings
│       └── static/assets/    # Bilder/Videos
├── frontend/                 # React Frontend
├── tests/                    # Test Suite
├── docs/                     # Dokumentation
└── scripts/                  # Utility Scripts
```

## 🔐 Environment Setup

1. Backend: Kopiere `.env.example` zu `.env` und fülle Werte aus
2. Frontend: Kopiere `frontend/.env.example` zu `frontend/.env`

## 📝 Development

- **Preferences**: `.claude-preferences.md` (siehe LEAN Framework)
- **Context**: `.context.md` (Projekt-Vision)
- **Commits**: Keine "Claude Code" Signatur

## 🎯 Features (geplant)

- 🔍 Trend-Analyse aus Multi-Sources
- 📊 Content-Empfehlungen
- 🛒 E-Commerce / Warenkorb
- 📧 Email-Benachrichtigungen
- 📱 React Native App (später)
