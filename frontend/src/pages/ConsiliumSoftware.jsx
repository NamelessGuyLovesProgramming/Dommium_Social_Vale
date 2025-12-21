import "./ConsiliumSoftware.css";
import RippleGrid from "../components/RippleGrid/RippleGrid";
import TargetCursor from "../components/TargetCursor/TargetCursor";
import { useState } from "react";

function ConsiliumSoftware() {
  const [isRadarActive, setIsRadarActive] = useState(false);

  return (
    <div className="page consilium-software-page">
      <TargetCursor visible={isRadarActive} />

      <div className="page-container">
        <header className="page-header">
          <h1>Consilium Software</h1>
          <div className="header-line"></div>
        </header>

        <div className="definition-wrapper">
          <div className="definition-card">
            <div className="definition-header">
              <span className="latin-term">cōnsilium</span>
              <span className="grammar-info">
                n (Gen: <i>cōnsiliī</i>)
              </span>
            </div>

            <div className="definition-body">
              <div className="meanings">
                <p>
                  <strong>1.</strong> Plan, Absicht, Entwurf
                </p>
                <p>
                  <strong>2.</strong> Rat, Beratung, Beschluss
                </p>
              </div>

              <div className="usage-example">
                <span className="latin-phrase">capere consilium</span>
                <span className="phrase-translation">
                  einen Entschluss fassen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Die Radar-Flagge (Außerhalb des page-container für Full-Width) */}
      <div
        className="radar-flag-section"
        onMouseEnter={() => setIsRadarActive(true)}
        onMouseLeave={() => setIsRadarActive(false)}
        style={{ cursor: isRadarActive ? "none" : "default" }}
      >
        <div className="radar-flag-shape">
          <RippleGrid
            gridColor="#e4a358"
            rippleIntensity={0.06}
            gridSize={7}
            gridThickness={10}
            fadeDistance={2.5}
            glowIntensity={0.6}
            opacity={1}
            gridRotation={0}
            mouseInteractionRadius={1.2}
            mouseInteraction={true}
            enableRainbow={false}
          />

          <div className="radar-content">
            <span className="radar-word word-auf cursor-target">Auf</span>
            <span className="radar-word word-die cursor-target">die</span>
            <span className="radar-word word-wichtigen cursor-target">
              wichtigen
            </span>
            <span className="radar-word word-dinge cursor-target">Dinge</span>
            <span className="radar-word word-fokussieren cursor-target">
              fokussieren
            </span>

            {/* Weiße Radar-Punkte */}
            <div className="radar-dot dot-1"></div>
            <div className="radar-dot dot-2"></div>
            <div className="radar-dot dot-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsiliumSoftware;
