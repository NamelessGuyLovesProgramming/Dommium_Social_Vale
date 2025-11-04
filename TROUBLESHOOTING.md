# Troubleshooting - Frontend startet nicht

## Problem: .bat Datei schließt sich sofort

### Lösung 1: Debug-Version verwenden
Verwende `start-frontend-debug.bat` statt `start-frontend.bat`:
```
Doppelklick auf: start-frontend-debug.bat
```
Diese Version zeigt detaillierte Fehlermeldungen und bleibt IMMER offen.

---

## Häufige Probleme

### 1. Node.js ist nicht installiert

**Symptom:**
```
[FEHLER] Node.js ist nicht installiert!
```

**Lösung:**
1. Gehe zu: https://nodejs.org/
2. Lade die **LTS Version** herunter (z.B. v20.x.x)
3. Installiere Node.js (Standard-Einstellungen sind OK)
4. **Starte deinen PC neu**
5. Öffne CMD und prüfe: `node --version`
6. Führe `start-frontend-debug.bat` nochmal aus

---

### 2. npm install schlägt fehl

**Symptom:**
```
[FEHLER] npm install ist fehlgeschlagen!
```

**Lösung A - Node.js Version prüfen:**
```cmd
node --version
```
Mindestens v18 erforderlich!

**Lösung B - Cache löschen:**
```cmd
cd frontend
npm cache clean --force
npm install
```

**Lösung C - node_modules komplett neu:**
```cmd
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

### 3. Port ist bereits belegt

**Symptom:**
```
Port 5173 is already in use
```

**Lösung A - Anderen Port verwenden:**
1. Öffne: `frontend/vite.config.js`
2. Füge hinzu:
```js
export default defineConfig({
  server: {
    port: 3000  // Ändere zu einem freien Port
  }
})
```

**Lösung B - Prozess beenden:**
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID_NUMMER> /F
```

---

### 4. "frontend Ordner nicht gefunden"

**Symptom:**
```
[FEHLER] frontend Ordner nicht gefunden!
```

**Lösung:**
Die .bat Datei MUSS aus dem Projekt-Root ausgeführt werden:
```
✅ Richtig:
Dommium_Social_Vale/
  ├── start-frontend.bat  ← Von hier ausführen!
  ├── frontend/
  └── .git/

❌ Falsch:
Dommium_Social_Vale/frontend/
  └── start-frontend.bat  ← NICHT von hier!
```

---

## Manueller Start (wenn .bat nicht funktioniert)

### Schritt 1: CMD öffnen
```cmd
Win + R
cmd
Enter
```

### Schritt 2: Ins Projekt wechseln
```cmd
cd C:\Pfad\zu\Dommium_Social_Vale
```

### Schritt 3: In frontend wechseln
```cmd
cd frontend
```

### Schritt 4: Dependencies installieren (nur beim ersten Mal)
```cmd
npm install
```

### Schritt 5: Server starten
```cmd
npm run dev
```

---

## Weitere Hilfe

Wenn nichts funktioniert, prüfe folgendes:

### System-Requirements:
- ✅ Windows 10/11
- ✅ Node.js v18 oder höher
- ✅ npm v9 oder höher
- ✅ Mindestens 500 MB freier Speicher

### Debugging-Befehle:
```cmd
REM Versionen prüfen
node --version
npm --version

REM Aktuelles Verzeichnis
cd

REM Ordner auflisten
dir

REM Node.js Pfad finden
where node

REM npm Pfad finden
where npm
```

### Log-Datei erstellen:
```cmd
start-frontend-debug.bat > debug-log.txt 2>&1
```
Dann `debug-log.txt` öffnen und Fehler ansehen.

---

## Kontakt
Bei weiteren Problemen öffne ein Issue auf GitHub oder kontaktiere das Team.
