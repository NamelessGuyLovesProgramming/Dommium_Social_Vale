import { Link } from "react-router-dom"
import { Instagram, Youtube, Twitter, Mail, Phone } from "lucide-react"
import "./Footer.css"

// Experimentelle Footer-Variante v3 (Kopie von v2, Stand jetzt).
function FooterV3() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="/logo.png" alt="Dominium Sociale Logo" className="footer-logo-img" />
          <h2 className="footer-logo">Dominium Sociale ©</h2>
        </div>

        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
            <Instagram size={22} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
            <Youtube size={22} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
            <Twitter size={22} />
          </a>
          <a href="mailto:info@dominiumsociale.de" className="social-icon" aria-label="E-Mail schreiben">
            <Mail size={20} />
          </a>
          <a href="tel:+49123456789" className="social-icon" aria-label="Anrufen">
            <Phone size={20} />
          </a>
        </div>

        <div className="footer-bottom">
          <div className="legal-links">
            <Link to="/impressum" className="legal-link">Impressum</Link>
            <span className="separator" aria-hidden="true" />
            <Link to="/terms" className="legal-link">AGB</Link>
            <span className="separator" aria-hidden="true" />
            <Link to="/privacy" className="legal-link">Datenschutz</Link>
          </div>

          <div className="legal-divider" aria-hidden="true" />

          <div className="legal-links legal-links-secondary">
            <Link
              to="/ballpit"
              className="legal-ballpit-link"
              aria-label="Ballpit Hintergrund intern oeffnen"
            >
              <video
                className="legal-icon-ballpit"
                src="https://reactbits.dev/assets/video/ballpit.webm"
                autoPlay
                loop
                muted
                playsInline
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterV3
