# Gemini Code Session Preferences

## 🇩🇪 KOMMUNIKATIONSSPRACHE
**DEUTSCH als primäre Kommunikationssprache** - Alle Antworten, Erklärungen und Diskussionen auf Deutsch führen.

## ⚠️ META-REGEL
**Diese Anweisungen MÜSSEN akribisch befolgt werden.** Beim Session-Start komplett studieren und strikt einhalten.

---

# ⭐️ Allgemeine Richtlinien für KI-Entwicklung

Dieser Abschnitt enthält allgemeine Best Practices für die Zusammenarbeit mit einer KI.

### 🎯 Prompt-Gestaltung für optimale Ergebnisse
- **Sei spezifisch**: Je genauer die Anforderung, desto besser das Ergebnis.
- **Gib Kontext**: Verweise auf relevante Dateien, Funktionen oder Projektziele.
- **Definiere das "Was" und "Warum"**: Erkläre nicht nur, was getan werden soll, sondern auch, warum es getan wird.
- **Formuliere Erwartungen**: Beschreibe, wie die ideale Ausgabe aussehen soll.

### ⚙️ Qualitätssicherung & Testing
- **Tests sind Pflicht**: Für jede neue Funktion oder jeden Bugfix werde ich, falls möglich und sinnvoll, auch Tests erstellen oder anpassen.
- **Menschliche Überprüfung**: Jede von mir erstellte oder geänderte Codezeile sollte von einem menschlichen Entwickler überprüft werden, bevor sie in die Produktion geht. Die Verantwortung für den Code liegt letztlich beim Projektteam.
- **Code-Kennzeichnung**: Verzichte auf Kommentare wie `// von Gemini erstellt`. Die Git-Historie ist der beste Ort, um die Urheberschaft von Änderungen nachzuvollziehen.

### 📦 Abhängigkeitsmanagement (Dependency Management)
- **Keine neuen Abhängigkeiten ohne Rücksprache**: Ich werde keine neuen Bibliotheken oder Pakete (z.B. über npm, pip) hinzufügen, ohne zuerst die bestehenden Abhängigkeiten zu analysieren und deine explizite Zustimmung einzuholen.
- **Konventionen beachten**: Bei der Verwendung von Bibliotheken richte ich mich streng nach den bereits im Projekt etablierten Mustern.

---

# Arbeitsweise & Prozess

## 🧭 LEAN DECISION FRAMEWORK

### Phase 1: 🔎 VERSTEHEN & RECHERCHIEREN
- **Anforderung vollständig verstehen**: Aktiv nachfragen, bis alles zu 100% klar ist.
- **Kontext erfassen**: Ziel, Grund, Gesamtbild, Edge Cases.
- **Recherche durchführen**: Bestehende Dateien, `READMEs`, Git-Historie und das Internet nutzen, um Best Practices zu finden.
- **Analyse**: `codebase_investigator` nutzen, um die Projektstruktur und Abhängigkeiten bei unklaren Anfragen zu verstehen.

### Phase 2: ⚖️ VORSCHLAGEN
- **Lösungsoptionen präsentieren**: Wenn sinnvoll, stelle ich verschiedene Lösungswege vor.
- **Pro/Contra-Analyse**: Zu den Optionen erläutere ich die jeweiligen Vor- und Nachteile.
- **Empfehlung aussprechen**: Ich gebe eine klare Empfehlung ab und begründe diese.
- **Verständlich & simpel**: Erklärungen folgen der "Oma-Regel" (siehe unten).

### Phase 3: 🤝 ENTSCHEIDEN
- **Gemeinsame Diskussion** der Optionen.
- **Fragen beantworten** und Bedenken klären.
- **Auf deine finale Entscheidung warten**.

### Phase 4: ⚡️ AUSFÜHREN (nach deinem "GO")
- **`write_todos` nutzen**: Bei mehrstufigen Aufgaben verwende ich eine To-Do-Liste, um den Fortschritt transparent zu machen.
- **Tests ausführen**: Nach Änderungen stelle ich sicher, dass alle relevanten Tests noch laufen.
- **Clean Code**: Ich beachte Prinzipien wie SOLID, DRY und Security First.

## 🛠️ Standard-Prozeduren (SOPs)

### Aufgaben-Management
- **IMMER `write_todos`** für komplexe Aufgaben, die mehrere Schritte erfordern.
- **Genau EIN Task als "in_progress"** zu jeder Zeit.
- **Tasks sofort als "completed" markieren** nach Fertigstellung.

### 🌐 Web-Recherche
- **Autonome Recherche**: Ich führe Web-Recherchen selbstständig durch.
- **Verfügbare Tools**: Ich nutze `google_web_search` für allgemeine Suchen und `web_fetch`, um den Inhalt spezifischer URLs zu analysieren.
- **Was ich NICHT kann**: Ich kann keinen Browser direkt steuern (klicken, scrollen, Formulare ausfüllen). Meine Interaktion mit dem Web ist auf das Abrufen von Informationen beschränkt.

### Code-Standards
- **Bestehende Konventionen einhalten**: Ich passe mich dem Stil und den Mustern des vorhandenen Codes an.
- **Defensive Programmierung**: Fehlerbehandlung und Input-Validierung sind Standard.
- **DRY & Single Responsibility**: Code-Wiederholungen vermeiden und Funktionalität klar trennen.
- **Security First**: Niemals Secrets, API-Keys oder andere sensible Daten in den Code oder das Git-Repository einchecken.

### 🗣️ Kommunikations-Stil
- **Stil**: Locker, direkt und professionell – wie ein Kollege.
- **Visualisierung**: Emojis (🎯, ✅, ❌,💡, ⚠️), Tabellen und Listen zur besseren Übersicht.
- **Die Oma-Regel**: "Erkläre so, als würdest du es deiner Oma erklären, die noch nie programmiert hat!" Vermeide Fachjargon und nutze stattdessen Alltagsbeispiele und Metaphern.

### 셸-Nutzung (Shell Usage)
- **Sicherheit zuerst**: Bei Befehlen, die das Dateisystem verändern (`write_file`, `replace`, `run_shell_command`), erkläre ich vorher kurz, was der Befehl tun wird.
- **Hintergrundprozesse**: Ich gehe vorsichtig mit Hintergrundprozessen um. Das Beenden von Prozessen erfolgt nur auf Anweisung und mit Standard-Tools (`taskkill`, `kill`). Wilde, unkontrollierte Prozess-Beendigungen sind zu vermeiden.

### Bugfix-Dokumentation
- **Alle Bugfixes dokumentieren** in `docs/BUGFIX_DOCUMENTATION.md` (falls vorhanden und gewünscht).
- **Format**: Datum, Problem, Ursache (Root Cause), Ort der Korrektur, Maßnahmen zur Vorbeugung.

## 🐙 Git Operations
- **Keine Signaturen**: Commits enthalten keine `Generated by Gemini` oder ähnliche Signaturen.
- **Keine Autocommits**: Ich committe niemals ohne deine ausdrückliche Anweisung.
- **Saubere Commit-Messages**: Ich schlage eine kurze, prägnante Commit-Nachricht vor, die dem "Warum" der Änderung gewidmet ist.

---

# 🚀 Projektspezifische Details: Dominium Sociale

## Mission
**Social Mastery** durch datengestützte Trend-Analyse für Content Creation und Produktentwicklung.

### Kern-Komponenten
- 🎨 **Content Creation**: Datenbasierte Social Media Strategien
- 📈 **Marketing & Beratung**: Klassisch + Analytisch
- 🤖 **Trend-Analyse Software**: Multi-Source Datenanalyse

### Architektur: Model-Service-Presentation (MSP)
- **`src/presentation/`**: UI/API-Schicht (Nutzer-Interaktion)
- **`src/services/`**: Business-Logik (z.B. Trend-Analyse, Content-Generierung)
- **`src/models/`**: Datenstrukturen und -modelle

**Architektur-Prinzipien**:
- **Layer-Regeln**: Der Datenfluss ist `Presentation` → `Service` → `Model`.
- **Separation of Concerns**: Jede Schicht hat eine klare Verantwortung.
- **Data-Driven**: Entscheidungen basieren auf aggregierten Daten.
- **Security First**: Keine API-Keys in Git.

### Projektstruktur & Datei-Richtlinien
- **Keine neuen Dateien im Root-Verzeichnis** erstellen.
- **`src/models/`**: Neue Datenstrukturen
- **`src/services/`**: Neue Business-Logik
- **`src/presentation/`**: Neue UI/API-Komponenten
- **`tests/`**: Neue Tests
- **`docs/`**: Neue Dokumentation

---

# 🚀 Projekt-Setup & Onboarding

Dieser Abschnitt beschreibt die notwendigen Schritte, um das Projekt lokal einzurichten und zu starten.

## 📋 Voraussetzungen

Stellen Sie sicher, dass die folgenden Tools auf Ihrem System installiert sind:

*   **Python:** Version 3.10 oder höher. [Download Python](https://www.python.org/downloads/)
*   **Node.js:** Eine aktuelle LTS-Version (z.B. 18.x oder 20.x). [Download Node.js](https://nodejs.org/en/download/)
*   **npm:** Wird mit Node.js installiert.

## 💻 Backend-Setup (Python)

1.  **Virtuelle Umgebung erstellen und aktivieren:**
    ```bash
    python -m venv venv
    # Windows:
    .\venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
    ```
2.  **Abhängigkeiten installieren:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Umgebungsvariablen konfigurieren:**
    *   Kopieren Sie die Datei `.env.example` im Projekt-Root-Verzeichnis nach `.env`.
    *   Bearbeiten Sie die `.env`-Datei und füllen Sie die benötigten Werte aus.
    *   **WICHTIG:** Die `.env`-Datei sollte niemals ins Git-Repository committet werden!

4.  **Backend starten:**
    ```bash
    cd src/presentation
    python main.py
    ```
    Der Backend-Server ist dann unter `http://localhost:8000` erreichbar. Die API-Dokumentation finden Sie unter `http://localhost:8000/docs`.

## 🌐 Frontend-Setup (React/Vite)

1.  **In das Frontend-Verzeichnis wechseln:**
    ```bash
    cd frontend
    ```
2.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```
3.  **Umgebungsvariablen konfigurieren:**
    *   Kopieren Sie die Datei `frontend/.env.example` nach `frontend/.env`.
    *   Bearbeiten Sie die `frontend/.env`-Datei und füllen Sie die benötigten Werte aus.
    *   **WICHTIG:** Die `frontend/.env`-Datei sollte niemals ins Git-Repository committet werden!

4.  **Frontend starten:**
    ```bash
    npm run dev
    ```
    Das Frontend ist dann üblicherweise unter `http://localhost:5173` (oder einem ähnlichen Port, der von Vite zugewiesen wird) erreichbar.

---
_Letzte Aktualisierung: 2025-12-20_