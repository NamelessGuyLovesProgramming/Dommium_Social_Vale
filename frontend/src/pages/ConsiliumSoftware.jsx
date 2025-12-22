import "./ConsiliumSoftware.css";

function ConsiliumSoftware() {
  // Koordinaten der Punkte (entsprechen dem clip-path im CSS)
  const points = [
    { x: "0.00%", y: "19.40%" }, // P0 (Oben)
    { x: "2.62%", y: "18.06%" }, // P1 (Oben)
    { x: "5.24%", y: "16.71%" }, // P2 (Oben)
    { x: "7.86%", y: "15.49%" }, // P3 (Oben)
    { x: "10.48%", y: "14.40%" }, // P4 (Oben)
    { x: "12.99%", y: "13.18%" }, // P5 (Oben)
    { x: "15.50%", y: "11.96%" }, // P6 (Oben)
    { x: "17.90%", y: "10.98%" }, // P7 (Oben)
    { x: "20.31%", y: "10.00%" }, // P8 (Oben)
    { x: "22.82%", y: "8.91%" }, // P9 (Oben)
    { x: "25.33%", y: "8.05%" }, // P10 (Oben)
    { x: "27.95%", y: "7.32%" }, // P11 (Oben)
    { x: "30.57%", y: "6.59%" }, // P12 (Oben)
    { x: "33.19%", y: "5.86%" }, // P13 (Oben)
    { x: "35.81%", y: "5.37%" }, // P14 (Oben)
    { x: "38.43%", y: "4.88%" }, // P15 (Oben)
    { x: "41.16%", y: "4.51%" }, // P16 (Oben)
    { x: "43.78%", y: "4.27%" }, // P17 (Oben)
    { x: "46.40%", y: "4.15%" }, // P18 (Oben)
    { x: "49.13%", y: "4.15%" }, // P19 (Oben)
    { x: "51.75%", y: "4.27%" }, // P20 (Oben)
    { x: "54.48%", y: "4.39%" }, // P21 (Oben)
    { x: "57.10%", y: "4.76%" }, // P22 (Oben)
    { x: "59.83%", y: "5.12%" }, // P23 (Oben)
    { x: "62.45%", y: "5.73%" }, // P24 (Oben)
    { x: "65.17%", y: "6.34%" }, // P25 (Oben)
    { x: "67.79%", y: "7.08%" }, // P26 (Oben)
    { x: "70.41%", y: "7.93%" }, // P27 (Oben)
    { x: "73.03%", y: "8.78%" }, // P28 (Oben)
    { x: "75.44%", y: "9.76%" }, // P29 (Oben)
    { x: "77.73%", y: "10.61%" }, // P30 (Oben)
    { x: "80.02%", y: "11.47%" }, // P31 (Oben)
    { x: "82.21%", y: "12.32%" }, // P32 (Oben)
    { x: "84.50%", y: "13.30%" }, // P33 (Oben)
    { x: "86.68%", y: "14.27%" }, // P34 (Oben)
    { x: "88.97%", y: "15.13%" }, // P35 (Oben)
    { x: "91.16%", y: "15.98%" }, // P36 (Oben)
    { x: "93.34%", y: "16.96%" }, // P37 (Oben)
    { x: "95.63%", y: "17.81%" }, // P38 (Oben)
    { x: "97.93%", y: "18.79%" }, // P39 (Oben)
    { x: "100.00%", y: "19.89%" }, // P40 (Oben)
    { x: "85.00%", y: "94.89%" }, // P41 (Unten)
    { x: "83.55%", y: "93.79%" }, // P42 (Unten)
    { x: "81.94%", y: "92.81%" }, // P43 (Unten)
    { x: "80.34%", y: "91.96%" }, // P44 (Unten)
    { x: "78.81%", y: "90.98%" }, // P45 (Unten)
    { x: "77.28%", y: "90.13%" }, // P46 (Unten)
    { x: "75.68%", y: "89.27%" }, // P47 (Unten)
    { x: "74.15%", y: "88.30%" }, // P48 (Unten)
    { x: "72.54%", y: "87.32%" }, // P49 (Unten)
    { x: "71.02%", y: "86.47%" }, // P50 (Unten)
    { x: "69.41%", y: "85.61%" }, // P51 (Unten)
    { x: "67.81%", y: "84.76%" }, // P52 (Unten)
    { x: "66.12%", y: "83.78%" }, // P53 (Unten)
    { x: "64.29%", y: "82.93%" }, // P54 (Unten)
    { x: "62.46%", y: "82.08%" }, // P55 (Unten)
    { x: "60.62%", y: "81.34%" }, // P56 (Unten)
    { x: "58.71%", y: "80.73%" }, // P57 (Unten)
    { x: "56.88%", y: "80.12%" }, // P58 (Unten)
    { x: "54.97%", y: "79.76%" }, // P59 (Unten)
    { x: "53.13%", y: "79.39%" }, // P60 (Unten)
    { x: "51.22%", y: "79.27%" }, // P61 (Unten)
    { x: "49.39%", y: "79.15%" }, // P62 (Unten)
    { x: "47.48%", y: "79.15%" }, // P63 (Unten)
    { x: "45.64%", y: "79.27%" }, // P64 (Unten)
    { x: "43.81%", y: "79.51%" }, // P65 (Unten)
    { x: "41.90%", y: "79.88%" }, // P66 (Unten)
    { x: "40.07%", y: "80.37%" }, // P67 (Unten)
    { x: "38.23%", y: "80.86%" }, // P68 (Unten)
    { x: "36.40%", y: "81.59%" }, // P69 (Unten)
    { x: "34.56%", y: "82.32%" }, // P70 (Unten)
    { x: "32.73%", y: "83.05%" }, // P71 (Unten)
    { x: "30.97%", y: "83.91%" }, // P72 (Unten)
    { x: "29.21%", y: "85.00%" }, // P73 (Unten)
    { x: "27.53%", y: "85.98%" }, // P74 (Unten)
    { x: "25.85%", y: "86.96%" }, // P75 (Unten)
    { x: "24.09%", y: "88.18%" }, // P76 (Unten)
    { x: "22.34%", y: "89.40%" }, // P77 (Unten)
    { x: "20.50%", y: "90.49%" }, // P78 (Unten)
    { x: "18.67%", y: "91.71%" }, // P79 (Unten)
    { x: "16.83%", y: "93.06%" }, // P80 (Unten)
    { x: "15.00%", y: "94.40%" }, // P81 (Unten)
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

          {/* VISUELLE DEBUG-MARKER
          {points.map((p, i) => (
            <div 
              key={i} 
              className="debug-marker" 
              style={{ left: p.x, top: p.y }}
            >
              {i}
            </div>
          ))}
          */}
      </div>
    </div>
  );
}

export default ConsiliumSoftware;