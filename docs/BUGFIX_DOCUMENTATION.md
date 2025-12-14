## 2025-12-13

- **Bug**: Lauftext-Band auf `/services/content` rollte sich zurück bzw. Labels verschwanden/überlappten.
- **Root Cause**: Marquee-Loop nutzte zu wenige Kopien und ungünstige Offsets/Gaps; CSS/JS-Mix erzeugte Lücken und abruptes Entfernen der Sequenzen.
- **Fix**:
  - LogoLoop horizontal auf konsistente CSS-Marquee mit dynamischer Kopienanzahl umgestellt (mind. 3 Kopien, viewportbasiert).
  - Transform-Shift per Sequenzbreite + regulärer Gap auch beim letzten Item, damit Übergänge dicht bleiben.
  - Gaps angepasst, damit Labels nicht ineinanderlaufen.
- **Files**: `frontend/src/components/LogoLoop/LogoLoop.jsx`, `frontend/src/components/LogoLoop/LogoLoop.css`.
- **Prevention**: Bei Marquee-Änderungen Sequenzbreite vs. Container prüfen, min. 2–3 Kopien + konsistenten Gap setzen; visuell testen (Viewport-Reload) bevor Deploy.

## 2025-12-14

- **Bug**: Hover-Verhalten des Video-Reels auf `/services/content` führte zu Sprüngen bzw. stagnierendem Loop.
- **Root Cause**: JS-Hover-Speed mischte sich mit CSS-Marquee, wodurch die Animation neu startete.
- **Fix**: Marquee wieder rein CSS-basiert mit Pause-on-Hover; kein forceJs/hoverSpeed im Reel, Track-Styles für Pause ergänzt.
- **Files**: `frontend/src/pages/ContentCreation.jsx`, `frontend/src/pages/ContentCreation.css`, `frontend/src/components/LogoLoop/LogoLoop.jsx`.
- **Prevention**: Bei Marquee-Hover nur eine Animationsquelle nutzen (CSS ODER JS), nicht mischen; nach Änderungen Reload + Hover testen.
