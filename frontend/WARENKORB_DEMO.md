# 🛒 Warenkorb Demo & Test

## Test-Item zum Warenkorb hinzufügen

**So kannst du den Warenkorb testen:**

### Option 1: Browser Console (schnell)
1. Öffne http://localhost:5176
2. Drücke `F12` für Developer Tools
3. Gehe zu **Console**
4. Füge folgenden Code ein:

```javascript
// Test-Item erstellen
const testItem = {
  id: 'test-content-creation-1',
  title: 'Content Creation',
  logo: null, // oder URL zu einem Logo
  items: [
    'Starter Paket',
    'Addon - Imagefilm',
    'Social Media Integration'
  ],
  price: 899
}

// Zum LocalStorage hinzufügen
const cart = JSON.parse(localStorage.getItem('dominium-cart') || '[]')
cart.push(testItem)
localStorage.setItem('dominium-cart', JSON.stringify(cart))

// Seite neu laden
window.location.reload()
```

### Option 2: Mehrere Test-Items
```javascript
const testItems = [
  {
    id: 'content-creation-1',
    title: 'Content Creation',
    items: ['Starter Paket', 'Addon - Imagefilm'],
    price: 899
  },
  {
    id: 'marketing-1',
    title: 'Marketing Beratung',
    items: ['3-Monats-Paket', 'Social Media Audit'],
    price: 1299
  },
  {
    id: 'trend-analysis-1',
    title: 'Trend-Analyse Software',
    items: ['Premium Lizenz', 'API Zugang'],
    price: 499
  }
]

localStorage.setItem('dominium-cart', JSON.stringify(testItems))
window.location.reload()
```

### Warenkorb leeren
```javascript
localStorage.removeItem('dominium-cart')
window.location.reload()
```

---

## ✅ Was testen?

### Desktop (1920x1080)
- [ ] Items werden korrekt angezeigt
- [ ] Logo/Platzhalter funktioniert
- [ ] Preis steht rechts
- [ ] Löschen-Button funktioniert
- [ ] Formular ist lesbar
- [ ] Button sieht gut aus

### Tablet (768px)
- [ ] Layout passt sich an
- [ ] Items bleiben lesbar
- [ ] Formular-Grid wird zu 1 Spalte
- [ ] Buttons passen

### Mobile (375px)
- [ ] Alles gestackt
- [ ] Touch-Targets groß genug
- [ ] Scrolling funktioniert
- [ ] Text lesbar

---

## 🎨 Design-Check

### Farben
- Gradient: `#667eea → #764ba2` (Lila)
- Grau-Töne: `#111827, #6b7280, #f9fafb`
- Grün (Erfolg): `#10b981`
- Rot (Löschen): `#ef4444`

### Abstände
- Section-Abstand: 32-40px
- Card-Padding: 24px
- Button-Padding: 14px 28px

### Fonts
- Titel: 32-36px, Bold
- Untertitel: 18-20px, Semibold
- Text: 15-16px, Regular

---

## 📧 EmailJS Test (nach Setup)

1. EmailJS konfigurieren (siehe `EMAILJS_SETUP.md`)
2. Item zum Warenkorb hinzufügen
3. Formular ausfüllen
4. "Anfrage senden" klicken
5. Prüfen: Email bei vale.gueden@gmail.com

---

✨ **Viel Spaß beim Testen!**
