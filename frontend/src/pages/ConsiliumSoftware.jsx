import "./ConsiliumSoftware.css";
import { motion } from "motion/react";

function ConsiliumSoftware() {
  // Koordinaten der Punkte
  // Reihenfolge: Oben -> Schweif -> Rechts -> Unten -> Links
  const points = [
    // --- OBERKANTE (0 - 40) ---
    { x: "0.00%", y: "19.40%" },
    { x: "2.62%", y: "18.06%" },
    { x: "5.24%", y: "16.71%" },
    { x: "7.86%", y: "15.49%" },
    { x: "10.48%", y: "14.40%" },
    { x: "12.99%", y: "13.18%" },
    { x: "15.50%", y: "11.96%" },
    { x: "17.90%", y: "10.98%" },
    { x: "20.31%", y: "10.00%" },
    { x: "22.82%", y: "8.91%" },
    { x: "25.33%", y: "8.05%" },
    { x: "27.95%", y: "7.32%" },
    { x: "30.57%", y: "6.59%" },
    { x: "33.19%", y: "5.86%" },
    { x: "35.81%", y: "5.37%" },
    { x: "38.43%", y: "4.88%" },
    { x: "41.16%", y: "4.51%" },
    { x: "43.78%", y: "4.27%" },
    { x: "46.40%", y: "4.15%" },
    { x: "49.13%", y: "4.15%" },
    { x: "51.75%", y: "4.27%" },
    { x: "54.48%", y: "4.39%" },
    { x: "57.10%", y: "4.76%" },
    { x: "59.83%", y: "5.12%" },
    { x: "62.45%", y: "5.73%" },
    { x: "65.17%", y: "6.34%" },
    { x: "67.79%", y: "7.08%" },
    { x: "70.41%", y: "7.93%" },
    { x: "73.03%", y: "8.78%" },
    { x: "75.44%", y: "9.76%" },
    { x: "77.73%", y: "10.61%" },
    { x: "80.02%", y: "11.47%" },
    { x: "82.21%", y: "12.32%" },
    { x: "84.50%", y: "13.30%" },
    { x: "86.68%", y: "14.27%" },
    { x: "88.97%", y: "15.13%" },
    { x: "91.16%", y: "15.98%" },
    { x: "93.34%", y: "16.96%" },
    { x: "95.63%", y: "17.81%" },
    { x: "97.93%", y: "18.79%" },
    { x: "100.00%", y: "19.89%" }, // P40 (Ecke oben rechts)

    // --- SCHWEIF 1 (OBEN RECHTS) ---
    { x: "103.00%", y: "22.00%" }, // P41 Spitze
    { x: "100.00%", y: "19.89%" }, // P42 Rücksprung

    // --- RECHTE SEITE TEIL 1 ---
    { x: "99.12%", y: "24.30%" },
    { x: "98.24%", y: "28.71%" },
    { x: "97.35%", y: "33.12%" },
    { x: "96.47%", y: "37.54%" },
    { x: "95.59%", y: "41.95%" }, // P47 (Ziel Linie 1)

    // --- SCHWEIF 2 (MITTE RECHTS) ---
    { x: "98.00%", y: "43.50%" }, // P48 Spitze
    { x: "95.59%", y: "41.95%" },  // P49 Rücksprung

    // --- RECHTE SEITE TEIL 2 ---
    { x: "94.71%", y: "46.36%" },
    { x: "93.82%", y: "50.77%" },
    { x: "92.94%", y: "55.18%" },
    { x: "92.06%", y: "59.59%" },
    { x: "91.18%", y: "64.01%" },
    { x: "90.29%", y: "68.42%" },
    { x: "89.41%", y: "72.83%" }, // P56 (Ziel Linie 2)

    // --- SCHWEIF 3 (UNTEN RECHTS) ---
    { x: "91.50%", y: "74.00%" }, // P57 Spitze
    { x: "89.41%", y: "72.83%" }, // P58 Rücksprung

    // --- RECHTE SEITE TEIL 3 ---
    { x: "88.53%", y: "77.24%" },
    { x: "87.65%", y: "81.65%" },
    { x: "86.76%", y: "86.06%" },
    { x: "85.88%", y: "90.48%" },

    // --- UNTERKANTE ---
    { x: "85.00%", y: "94.89%" },
    { x: "83.55%", y: "93.79%" },
    { x: "81.94%", y: "92.81%" },
    { x: "80.34%", y: "91.96%" },
    { x: "78.81%", y: "90.98%" },
    { x: "77.28%", y: "90.13%" },
    { x: "75.68%", y: "89.27%" },
    { x: "74.15%", y: "88.30%" },
    { x: "72.54%", y: "87.32%" },
    { x: "71.02%", y: "86.47%" },
    { x: "69.41%", y: "85.61%" },
    { x: "67.81%", y: "84.76%" },
    { x: "66.12%", y: "83.78%" },
    { x: "64.29%", y: "82.93%" },
    { x: "62.46%", y: "82.08%" },
    { x: "60.62%", y: "81.34%" },
    { x: "58.71%", y: "80.73%" },
    { x: "56.88%", y: "80.12%" },
    { x: "54.97%", y: "79.76%" },
    { x: "53.13%", y: "79.39%" },
    { x: "51.22%", y: "79.27%" },
    { x: "49.39%", y: "79.15%" },
    { x: "47.48%", y: "79.15%" },
    { x: "45.64%", y: "79.27%" },
    { x: "43.81%", y: "79.51%" },
    { x: "41.90%", y: "79.88%" },
    { x: "40.07%", y: "80.37%" },
    { x: "38.23%", y: "80.86%" },
    { x: "36.40%", y: "81.59%" },
    { x: "34.56%", y: "82.32%" },
    { x: "32.73%", y: "83.05%" },
    { x: "30.97%", y: "83.91%" },
    { x: "29.21%", y: "85.00%" }, // P95
    { x: "27.53%", y: "85.98%" },
    { x: "25.85%", y: "86.96%" },
    { x: "24.09%", y: "88.18%" },
    { x: "22.34%", y: "89.40%" },
    { x: "20.50%", y: "90.49%" },
    { x: "18.67%", y: "91.71%" },
    { x: "16.83%", y: "93.06%" },
    { x: "15.00%", y: "94.40%" }, // P103
    
    // --- LINKE SEITE ---
    { x: "14.12%", y: "89.99%" },
    { x: "13.24%", y: "85.58%" },
    { x: "12.35%", y: "81.16%" }, 
    { x: "11.47%", y: "76.75%" },
    { x: "10.59%", y: "72.34%" }, // P108

    // --- SCHWEIF 4 (MITTE LINKS) ---
    { x: "08.50%", y: "73.39%" }, // P109 Spitze
    { x: "10.59%", y: "72.34%" }, // P110 Rücksprung

    { x: "09.71%", y: "67.93%" },
    { x: "08.82%", y: "63.52%" },
    { x: "07.94%", y: "59.11%" },
    { x: "07.06%", y: "54.69%" },
    { x: "06.18%", y: "50.28%" },
    { x: "05.29%", y: "45.87%" },
    { x: "04.41%", y: "41.46%" }, // P117

    // --- SCHWEIF 5 (OBEN LINKS) ---
    { x: "03.00%", y: "42.35%" }, // P118 Spitze
    { x: "04.41%", y: "41.46%" }, // P119 Rücksprung

    { x: "03.53%", y: "37.05%" },
    { x: "02.65%", y: "32.64%" },
    { x: "01.76%", y: "28.22%" },
    { x: "00.88%", y: "23.81%" },
  ];

  // --- HILFSFUNKTIONEN ---
  const getPoint = (index) => {
    const p = points[index];
    if (!p) return { x: 0, y: 0 };
    return { x: parseFloat(p.x), y: parseFloat(p.y) };
  };

  const createCurve = (startIndex, endIndex) => {
    const startP = getPoint(startIndex);
    const endP = getPoint(endIndex);
    const refStart = getPoint(0);
    const refEnd = getPoint(40);
    const refWidth = refEnd.x - refStart.x;
    const targetWidth = endP.x - startP.x;
    const scaleX = targetWidth / refWidth;

    return points.slice(0, 41).map((p, i) => {
      const refP = getPoint(i);
      const relX = refP.x - refStart.x;
      const newX = startP.x + (relX * scaleX);
      const progress = i / 40; 
      const startYOffset = startP.y - refStart.y;
      const endYOffset = endP.y - refEnd.y;
      const currentYOffset = startYOffset + (endYOffset - startYOffset) * progress;
      const newY = refP.y + currentYOffset;
      return `${i === 0 ? 'M' : 'L'} ${newX} ${newY}`;
    }).join(' ');
  };

  const createStraightLine = (idx1, idx2) => {
    const p1 = getPoint(idx1);
    const p2 = getPoint(idx2);
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
  };

  const outlinePath = points.map((p, index) => {
    const x = parseFloat(p.x);
    const y = parseFloat(p.y);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ') + ' Z';

  // Definition der Pfade als Komponente oder Array, um Duplizierung im JSX zu vermeiden
  const RadarPaths = ({ strokeColor = "#85fdfc", strokeWidth = "8px", opacity = 1 }) => (
    <g style={{ opacity }}>
        <path className="radar-path" d={outlinePath} style={{ stroke: strokeColor, strokeWidth }} />
        <path className="radar-path inner-line" d={createCurve(117, 47)} style={{ stroke: strokeColor, strokeWidth }} />
        <path className="radar-path inner-line" d={createCurve(108, 56)} style={{ stroke: strokeColor, strokeWidth }} />
        
        <path className="radar-path vertical-line" d={createStraightLine(8, 93)} style={{ stroke: strokeColor, strokeWidth }} />
        <path className="radar-path vertical-line" d={createStraightLine(19, 85)} style={{ stroke: strokeColor, strokeWidth }} />
        <path className="radar-path vertical-line" d={createStraightLine(30, 76)} style={{ stroke: strokeColor, strokeWidth }} />
    </g>
  );

  return (
    <div className="page consilium-software-page">
      <div className="page-container">
        <header className="page-header">
          <h1>Consilium Software</h1>
          <div className="header-line"></div>
        </header>

        <div className="definition-wrapper">
          <div className="definition-card">
            <div className="definition-header">
              <span className="latin-term">cōnsilium</span>
              <span className="grammar-info">n (Gen: <i>cōnsiliī</i>)</span>
            </div>
            <div className="definition-body">
              <p><strong>1.</strong> Plan, Absicht, Entwurf</p>
              <p><strong>2.</strong> Rat, Beratung, Beschluss</p>
            </div>
          </div>
        </div>
      </div>

      <div className="radar-wrapper">
          <div className="radar-fan-container">
            <svg 
              className="radar-outline-svg" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <mask id="wave-mask">
                  {/* Der schwarze Hintergrund versteckt alles */}
                  <rect x="-50" y="-50" width="200" height="200" fill="black" />
                  
                  {/* Der weiße Kreis macht Bereiche sichtbar. Wir animieren ihn als "Welle". */}
                  {/* Wir nutzen einen radialen Gradienten für weichere Kanten */}
                  <motion.circle 
                    cx="42.82" 
                    cy="86.27" 
                    r="0"
                    fill="white"
                    animate={{ r: [0, 150] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatDelay: 2,
                      ease: "easeOut" 
                    }}
                  />
                  {/* Ein Ring-Effekt für eine wandernde Linie - JETZT SYNCHRON */}
                  <motion.circle 
                    cx="42.82" 
                    cy="86.27" 
                    r="0"
                    fill="none"
                    stroke="white"
                    strokeWidth="15" 
                    animate={{ r: [0, 150], strokeWidth: [15, 35], opacity: [1, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatDelay: 2,
                      ease: "easeOut" 
                    }}
                  />
                </mask>
              </defs>

              {/* 1. Basis-Layer (Dunkles Cyan) */}
              <RadarPaths strokeColor="#2a5a5a" strokeWidth="8px" />

              {/* 2. Aktives Layer (Helles Neon Cyan) */}
              <RadarPaths strokeColor="#85fdfc" strokeWidth="8px" />

              {/* 3. Wellen-Layer (Wunschfarbe #e1fefe, maskiert) */}
              <g mask="url(#wave-mask)">
                <RadarPaths strokeColor="#e1fefe" strokeWidth="11px" opacity={0.9} />
              </g>

            </svg>

            {[
              { text: "Auf", top: "10.93%", left: "31.69%" },
              { text: "die", top: "14.80%", left: "56.08%" },
              { text: "wichtigen", top: "39.69%", left: "16.72%" },
              { text: "Dinge", top: "42.24%", left: "50.87%" },
              { text: "fokussieren", top: "63.73%", left: "35.71%" }
            ].map((word, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: word.left,
                  top: word.top,
                  color: "#fff",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  zIndex: 20,
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  whiteSpace: "nowrap"
                }}
              >
                {word.text}
              </div>
            ))}

            {/* --- 4 WEISSE KUGELN (FINAL ANIMIERT) --- */}
            {[
              { size: 40, x: "13.68%", y: "54.27%", delay: 1.2 }, // Ball 2 (Links)
              { size: 40, x: "83.08%", y: "21.60%", delay: 0.5 }, // Ball 1 (Rechts Oben)
              { size: 85, x: "42.82%", y: "86.27%", delay: 0 },   // Basis (Unten Mitte) - Sofort da
              { size: 45, x: "62.78%", y: "71.18%", delay: 1.9 }  // Ball 3 (Rechts Unten)
            ].map((ball, i) => (
              <motion.div
                key={`ball-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: ball.delay 
                }}
                style={{
                  position: "absolute",
                  left: ball.x,
                  top: ball.y,
                  width: `${ball.size}px`,
                  height: `${ball.size}px`,
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  boxShadow: `0 0 ${ball.size/2}px rgba(255, 255, 255, 0.6), 0 0 ${ball.size}px rgba(133, 253, 252, 0.3)`,
                  zIndex: 25,
                  pointerEvents: "none"
                }}
              />
            ))}

            {/* Debug Marker
            {points.map((p, i) => (
              <div key={i} className="debug-marker" style={{ left: p.x, top: p.y }}>{i}</div>
            ))}
            */}
          </div>
      </div>
    </div>
  );
}

export default ConsiliumSoftware;