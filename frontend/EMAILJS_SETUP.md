# EmailJS Setup Anleitung

## 📧 Schritt-für-Schritt Einrichtung

### 1️⃣ Account erstellen
1. Gehe zu **https://www.emailjs.com/**
2. Klicke auf **"Sign Up"**
3. Registriere dich mit deiner Email (vale.gueden@gmail.com)
4. Bestätige deine Email-Adresse

### 2️⃣ Email Service hinzufügen
1. Gehe zu **"Email Services"** im Dashboard
2. Klicke auf **"Add New Service"**
3. Wähle **Gmail** (oder deinen bevorzugten Provider)
4. Folge den Anweisungen zur Verbindung deines Gmail-Accounts
5. **Kopiere die Service ID** (z.B. `service_abc123`)

### 3️⃣ Email Template erstellen
1. Gehe zu **"Email Templates"**
2. Klicke auf **"Create New Template"**
3. Verwende folgendes Template:

```
Subject: Neue Anfrage von {{customer_name}}

Von: {{customer_name}}
Email: {{customer_email}}
Telefon: {{customer_phone}}

Nachricht:
{{customer_message}}

---

WARENKORB:
{{cart_items}}

---

Gesamtpreis: {{total_price}}

Zeitstempel: {{timestamp}}
```

4. **Kopiere die Template ID** (z.B. `template_xyz789`)

### 4️⃣ Public Key holen
1. Gehe zu **"Account"** → **"General"**
2. Finde deine **Public Key** (z.B. `user_abc123def456`)
3. **Kopiere den Public Key**

### 5️⃣ Konfiguration einfügen

Öffne die Datei:
```
frontend/src/services/emailService.js
```

Ersetze die Platzhalter:
```javascript
const EMAILJS_CONFIG = {
  serviceId: 'DEINE_SERVICE_ID_HIER',    // aus Schritt 2
  templateId: 'DEINE_TEMPLATE_ID_HIER',  // aus Schritt 3
  publicKey: 'DEIN_PUBLIC_KEY_HIER'      // aus Schritt 4
}
```

### 6️⃣ Testen
1. Starte den Dev-Server: `cd frontend && npm run dev`
2. Öffne die Warenkorb-Seite
3. Füge ein Test-Item hinzu
4. Fülle das Formular aus
5. Klicke auf "Anfrage senden"
6. Prüfe dein Email-Postfach (vale.gueden@gmail.com)

---

## 🔒 Sicherheit

**WICHTIG:** Die Keys sind im Frontend sichtbar, aber:
- EmailJS erlaubt dies absichtlich (Frontend-only Service)
- Du kannst Domain-Whitelist in EmailJS aktivieren
- Es ist sicher für dein Use-Case (kein Backend nötig)

## 💰 Kostenlos bis 200 Emails/Monat
- Für mehr: Upgrade auf bezahlten Plan nötig
- Aktuell sollten 200/Monat ausreichen

## ❓ Probleme?

**Email kommt nicht an:**
- Prüfe Spam-Ordner
- Prüfe EmailJS Dashboard → Logs
- Prüfe Browser-Console auf Fehler

**Template-Variablen fehlen:**
- Sicherstellen, dass alle Variablen im Template verwendet werden
- Variablen müssen genau so heißen wie im Code (z.B. `{{customer_name}}`)

---

✅ **Fertig! Das System ist einsatzbereit.**
