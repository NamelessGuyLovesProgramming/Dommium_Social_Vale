import BallpitCanvas from "../lib/ballpit"
import "./Ballpit.css"

function Ballpit() {
  return (
    <div className="ballpit-fullscreen">
      <BallpitCanvas className="ballpit-canvas" />
      <div className="ballpit-overlay">
        <p className="eyebrow">Dominium Sociale - Ballpit</p>
      </div>
    </div>
  )
}

export default Ballpit
