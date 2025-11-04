@echo off
REM Fenster IMMER offen halten - auch bei unerwarteten Fehlern
if "%1"=="" (
    cmd /k "%~f0" run
    exit /b
)

title Dominium Sociale - Frontend Dev Server
echo =====================================
echo  Dominium Sociale - Frontend Starter
echo =====================================
echo.
echo REQUIREMENTS:
echo   - Node.js (v18 oder hoeher)
echo   - npm (kommt mit Node.js)
echo.
echo Pruefe Voraussetzungen...
echo.

REM Prüfe ob Node.js installiert ist
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] Node.js ist nicht installiert!
    echo Bitte installiere Node.js von: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Prüfe ob npm installiert ist
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] npm ist nicht installiert!
    echo npm sollte mit Node.js kommen. Bitte Node.js neu installieren.
    echo.
    pause
    exit /b 1
)

REM Zeige Node.js Version
echo [OK] Node.js gefunden:
node --version
echo.

REM Zeige npm Version
echo [OK] npm gefunden:
npm --version
echo.

REM Wechsle in frontend Ordner
echo Wechsle in frontend Ordner...
cd frontend
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] frontend Ordner nicht gefunden!
    echo Bitte fuehre die .bat Datei aus dem Projekt-Root aus.
    echo.
    pause
    exit /b 1
)

REM Prüfe ob node_modules existiert
if not exist "node_modules\" (
    echo [WARNUNG] node_modules nicht gefunden!
    echo Fuehre npm install aus...
    echo.
    call npm install
    echo.
)

echo =====================================
echo  Starte Dev-Server...
echo =====================================
echo.
echo Server startet auf: http://localhost:5173
echo Browser oeffnet sich in 5 Sekunden automatisch...
echo.
echo TIPP: Druecke STRG+C um den Server zu stoppen
echo.

REM Öffne Browser nach 5 Sekunden im Hintergrund
start /min cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:5173"

REM Starte Dev-Server (blockiert hier - zeigt Logs)
npm run dev

REM Wenn npm run dev beendet wird
echo.
echo Dev-Server wurde beendet.
pause
