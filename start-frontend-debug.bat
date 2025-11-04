@echo off
REM DEBUG VERSION - Zeigt alle Befehle und Fehler an
echo =====================================
echo  DEBUG MODE - Detaillierte Ausgabe
echo =====================================
echo.

echo [1/6] Pruefe ob Node.js installiert ist...
where node
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [FEHLER] Node.js NICHT gefunden!
    echo.
    echo LOESUNG:
    echo 1. Gehe zu: https://nodejs.org/
    echo 2. Lade die LTS Version herunter
    echo 3. Installiere Node.js
    echo 4. Starte diesen PC neu
    echo 5. Fuehre diese .bat nochmal aus
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js gefunden!
node --version
echo.

echo [2/6] Pruefe ob npm installiert ist...
where npm
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [FEHLER] npm NICHT gefunden!
    echo npm sollte mit Node.js kommen.
    echo Bitte Node.js neu installieren.
    echo.
    pause
    exit /b 1
)
echo [OK] npm gefunden!
npm --version
echo.

echo [3/6] Zeige aktuelles Verzeichnis...
cd
echo.

echo [4/6] Wechsle in frontend Ordner...
if not exist "frontend\" (
    echo.
    echo [FEHLER] frontend Ordner nicht gefunden!
    echo.
    echo Aktueller Pfad:
    cd
    echo.
    echo Verfuegbare Ordner:
    dir /b /ad
    echo.
    echo LOESUNG:
    echo Fuehre diese .bat aus dem Projekt-Root aus!
    echo (Der Ordner wo auch .git liegt)
    echo.
    pause
    exit /b 1
)
cd frontend
echo [OK] Bin jetzt in:
cd
echo.

echo [5/6] Pruefe node_modules...
if not exist "node_modules\" (
    echo [WARNUNG] node_modules nicht gefunden!
    echo Installiere Dependencies...
    echo Das kann einige Minuten dauern...
    echo.
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [FEHLER] npm install ist fehlgeschlagen!
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies installiert!
) else (
    echo [OK] node_modules vorhanden!
)
echo.

echo [6/6] Starte Dev-Server...
echo Druecke STRG+C um den Server zu stoppen
echo.
npm run dev

echo.
echo =====================================
echo Server wurde beendet
echo =====================================
pause
