## 2025-12-13

- **Bug**: Lauftext-Band auf `/services/content` rollte sich zurück bzw. Labels verschwanden/überlappten.
- **Root Cause**: Marquee-Loop nutzte zu wenige Kopien und ungünstige Offsets/Gaps; CSS/JS-Mix erzeugte Lücken und abruptes Entfernen der Sequenzen.
- **Fix**:
  - LogoLoop horizontal auf konsistente CSS-Marquee mit dynamischer Kopienanzahl umgestellt (mind. 3 Kopien, viewportbasiert).
  - Transform-Shift per Sequenzbreite + regulärer Gap auch beim letzten Item, damit Übergänge dicht bleiben.
  - Gaps angepasst, damit Labels nicht ineinanderlaufen.
- **Files**: `frontend/src/components/LogoLoop/LogoLoop.jsx`, `frontend/src/components/LogoLoop/LogoLoop.css`.
- **Prevention**: Bei Marquee-Änderungen Sequenzbreite vs. Container prüfen, min. 2–3 Kopien + konsistenten Gap setzen; visuell testen (Viewport-Reload) bevor Deploy.
