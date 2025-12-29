import { useState } from "react";
import "./ConsiliumSoftware.css";
import { motion, AnimatePresence } from "motion/react";
import TargetCursor from "../components/TargetCursor/TargetCursor";
import RadarAnimation from "../components/RadarAnimation/RadarAnimation";

function ConsiliumSoftware() {
  const [isRadarHovered, setIsRadarHovered] = useState(false);
  const [activeBall, setActiveBall] = useState(null);

  // --- DEBUG TOOL ---
  const handleRadarClick = (e) => {
    // Container Rechteck holen
    const rect = e.currentTarget.getBoundingClientRect();
    // Klick Position relativ zum Container berechnen
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // In Prozent umrechnen
    const xPercent = ((x / rect.width) * 100).toFixed(2);
    const yPercent = ((y / rect.height) * 100).toFixed(2);
    
    const coordString = `x: "${xPercent}%", y: "${yPercent}%"`;
    
    console.log(`📍 KLICK KOORDINATEN: ${coordString}`);
    alert(`🎯 Position:\n${coordString}\n\n(Auch in der Konsole F12 verfügbar!)`);
  };

  // Kugel-Daten
  const balls = [
    { 
      id: 1, size: 40, x: "13.68%", y: "54.27%", delay: 1.2, 
      data: { score: "8.9", sentiment: "Positiv", desc: "Automobil: Hohe Nachfrage nach E-Mobilität im Q4." }
    },
    { 
      id: 2, size: 40, x: "75%", y: "40.2%", delay: 0.5,
      data: { score: "6.4", sentiment: "Neutral", desc: "Finanzsektor: Abwartende Haltung bei Kleinanlegern." }
    },
    { 
      id: 3, size: 85, x: "42.82%", y: "86.27%", delay: 0, isBase: true,
      data: null 
    },
    { 
      id: 4, size: 45, x: "62.78%", y: "71.18%", delay: 1.9,
      data: { score: "9.2", sentiment: "Bullish", desc: "Tech: KI-Startups verzeichnen Rekord-Investitionen." }
    }
  ];

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
        <div 
          className="radar-fan-container"
          onMouseEnter={() => setIsRadarHovered(true)}
          onMouseLeave={() => setIsRadarHovered(false)}
          onClick={handleRadarClick} // <-- DEBUG KLICK HANDLER
          style={{ cursor: isRadarHovered ? 'crosshair' : 'default' }} // Cursor ändern für besseres Zielen
        >
          {/* HINTERGRUND: Die neue Canvas Animation */}
          <div className="radar-canvas-layer">
            <RadarAnimation width={1280} height={720} />
          </div>

          {/* VORDERGRUND: Interaktive Elemente (Overlay) */}
          <div className="radar-overlay-layer">
            {[
              { text: "Auf", top: "30%", left: "29%" },
              { text: "die", top: "30%", left: "65%" },
              { text: "wichtigen", top: "50%", left: "33%" },
              { text: "Dinge", top: "50%", left: "52%" },
              { text: "fokussieren", top: "69%", left: "40%" }
            ].map((word, i) => (
              <motion.div
                key={i}
                className="cursor-target"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: 2.0 + (i * 0.15), // 2s Basis-Verzögerung + Stagger
                  type: "spring",
                  bounce: 0.4
                }}
                style={{
                  position: "absolute",
                  left: word.left,
                  top: word.top,
                  color: "#fff",
                  fontSize: "2.1rem",
                  fontWeight: "bold",
                  zIndex: 20,
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  pointerEvents: "auto"
                }}
              >
                {word.text}
                <div 
                  className="cursor-target"
                  style={{
                    position: 'absolute',
                    inset: '-8px',
                    cursor: 'pointer',
                    zIndex: 21
                }} />
              </motion.div>
            ))}

            {balls.map((ball, i) => (
              <div key={`ball-wrapper-${i}`}>
                <motion.div
                  key={`ball-${i}`}
                  className={!ball.isBase ? "cursor-target" : ""}
                  onMouseEnter={() => !ball.isBase && setActiveBall(ball)}
                  onMouseLeave={() => !ball.isBase && setActiveBall(null)}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={ball.isBase 
                    ? { 
                        scale: [1, 1.05, 1], 
                        opacity: 0.8,
                      }
                    : { scale: 1, opacity: 1 }
                  }
                  viewport={{ once: true }}
                  transition={ball.isBase 
                    ? { 
                        delay: 2.0, // Basis wartet auch 2s
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { 
                        delay: 2.0 + (ball.delay || 0), // 2s + individuelle Verzögerung
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                      }
                  }
                  style={{
                    position: "absolute",
                    left: ball.x,
                    top: ball.y,
                    width: `${ball.size}px`,
                    height: `${ball.size}px`,
                    borderRadius: "50%",
                    background: ball.isBase 
                      ? "radial-gradient(circle at 30% 30%, rgba(224, 255, 255, 0), rgba(0, 210, 255, 0))"
                      : "radial-gradient(circle at 30% 30%, #ffd700, #ff8c00)",
                    boxShadow: ball.isBase
                      ? "none" 
                      : `0 0 ${ball.size/2}px rgba(255, 140, 0, 0.6), 0 0 ${ball.size}px rgba(255, 69, 0, 0.4)`,
                    zIndex: 25,
                    pointerEvents: "auto",
                    cursor: "pointer"
                  }}
                >
                   {!ball.isBase && (
                      <div style={{ position: 'absolute', inset: '-10px', borderRadius: '50%' }} />
                   )}
                </motion.div>

                <AnimatePresence>
                  {activeBall && activeBall.id === ball.id && ball.data && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="orb-info-card"
                      style={{
                        position: "absolute",
                        left: `calc(${ball.x} + 35px)`, 
                        top: `calc(${ball.y} - 40px)`, 
                        zIndex: 100
                      }}
                    >
                      <div className="orb-info-score-centered">
                        {ball.data.score}
                      </div>
                      
                      <div className="orb-info-content">
                        <div className="orb-info-label-only">Details</div>
                        <div className="orb-info-label-only">Sentiment</div>
                        <div className="orb-info-label-only">Inventar</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TargetCursor visible={isRadarHovered} />
    </div>
  );
}

export default ConsiliumSoftware;