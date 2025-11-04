@echo off
REM Fenster IMMER offen halten - auch bei unerwarteten Fehlern
if "%1"=="" (
    cmd /k "%~f0" run
    exit /b
)

title Dominium Sociale - Backend API Server
echo =====================================
echo  Dominium Sociale - Backend Starter
echo =====================================
echo.
echo REQUIREMENTS:
echo   - Python 3.10 oder hoeher
echo   - pip (kommt mit Python)
echo.
echo Pruefe Voraussetzungen...
echo.

REM Prüfe ob Python installiert ist
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] Python ist nicht installiert!
    echo Bitte installiere Python von: https://www.python.org/downloads/
    echo WICHTIG: Aktiviere "Add Python to PATH" beim Installieren!
    echo.
    pause
    exit /b 1
)

REM Zeige Python Version
echo [OK] Python gefunden:
python --version
echo.

REM Prüfe ob pip installiert ist
where pip >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] pip ist nicht installiert!
    echo pip sollte mit Python kommen. Bitte Python neu installieren.
    echo.
    pause
    exit /b 1
)

REM Zeige pip Version
echo [OK] pip gefunden:
pip --version
echo.

REM Prüfe ob venv existiert
echo Pruefe virtuelle Umgebung...
if not exist "venv\" (
    echo [WARNUNG] Virtuelle Umgebung nicht gefunden!
    echo Erstelle virtuelle Umgebung...
    echo.
    python -m venv venv
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [FEHLER] Konnte venv nicht erstellen!
        echo.
        pause
        exit /b 1
    )
    echo [OK] Virtuelle Umgebung erstellt!
    echo.
)

REM Aktiviere venv
echo Aktiviere virtuelle Umgebung...
call venv\Scripts\activate.bat
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [FEHLER] Konnte venv nicht aktivieren!
    echo.
    pause
    exit /b 1
)
echo [OK] Virtuelle Umgebung aktiv!
echo.

REM Installiere Dependencies
echo Pruefe Dependencies...
pip show fastapi >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNUNG] Dependencies nicht vollstaendig!
    echo Installiere Requirements...
    echo Das kann einige Minuten dauern...
    echo.
    pip install -r requirements.txt
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [FEHLER] pip install ist fehlgeschlagen!
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies installiert!
) else (
    echo [OK] Dependencies vorhanden!
)
echo.

REM Prüfe ob .env existiert
if not exist ".env" (
    echo [WARNUNG] .env Datei nicht gefunden!
    if exist ".env.example" (
        echo Kopiere .env.example zu .env...
        copy .env.example .env >nul
        echo [INFO] Bitte .env Datei mit deinen Werten ausfuellen!
        echo.
    ) else (
        echo [INFO] Bitte .env Datei erstellen (siehe .env.example)
        echo.
    )
)

REM Wechsle in presentation Ordner
echo Wechsle in src/presentation...
cd src\presentation
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] src/presentation Ordner nicht gefunden!
    echo.
    pause
    exit /b 1
)
echo.

echo =====================================
echo  Starte Backend API Server...
echo =====================================
echo.
echo Server startet auf: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo Browser oeffnet sich in 5 Sekunden automatisch...
echo.
echo TIPP: Druecke STRG+C um den Server zu stoppen
echo.

REM Öffne Browser nach 5 Sekunden im Hintergrund
start /min cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:8000/docs"

REM Starte Backend Server
python main.py

REM Wenn Server beendet wird
echo.
echo Backend Server wurde beendet.
pause
