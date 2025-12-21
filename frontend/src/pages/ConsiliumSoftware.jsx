import "./ConsiliumSoftware.css";

function ConsiliumSoftware() {
  // Koordinaten der Punkte (entsprechen dem clip-path im CSS)
  const points = [
    { x: "0%", y: "19%" },    // P1
    { x: "5%", y: "15.5%" },  // P2
    { x: "10%", y: "13.5%" }, // P3
    { x: "15%", y: "11.0%" }, // P4
    { x: "20%", y: "8.5%" },  // P5
    { x: "30%", y: "4.0%" },  // P6
    { x: "40%", y: "1.0%" },  // P7
    { x: "50%", y: "0%" },    // P8 (Spitze Oben)
    { x: "60%", y: "2.5%" },  // P9
    { x: "70%", y: "7.5%" },  // P10
    { x: "80%", y: "12%" },   // P11
    { x: "85%", y: "13.5%" }, // P12
    { x: "90%", y: "14.2%" }, // P13
    { x: "95%", y: "14.8%" }, // P14
    { x: "100%", y: "15%" },  // P15
    { x: "85%", y: "90%" },   // P16
    { x: "80%", y: "93%" },   // P17
    { x: "70%", y: "90%" },   // P18
    { x: "60%", y: "86%" },   // P19
    { x: "50%", y: "84%" },   // P20 (Spitze Unten)
    { x: "40%", y: "86%" },   // P21
    { x: "30%", y: "90%" },   // P22
    { x: "20%", y: "93%" },   // P23
    { x: "15%", y: "90%" }    // P24
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
          <div className="radar-fan-container">
              <div className="radar-fan-test-bg">
                  {/* Test-Hintergrund */}
              </div>
          </div>

          {/* VISUELLE DEBUG-MARKER */}
          {points.map((p, i) => (
            <div 
              key={i} 
              className="debug-marker" 
              style={{ left: p.x, top: p.y }}
            >
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ConsiliumSoftware;