import { Link } from 'react-router-dom'
import { Instagram, Youtube, Twitter, Mail, Phone } from 'lucide-react'
import './Footer.css'

// Gespeicherte Version des aktuellen Footers (Stand jetzt).
function FooterV1() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">Dominium Sociale</h2>
          <p className="footer-tagline">Social Mastery - Datengestuetztes Content</p>
        </div>

        <nav className="footer-nav">
          <Link to="/content_creation" className="footer-link">Leistungen</Link>
          <Link to="/consilium-software" className="footer-link">Consilium Software</Link>
          <Link to="/portfolio" className="footer-link">Portfolio</Link>
          <Link to="/team" className="footer-link">Team</Link>
          <Link to="/kontakt" className="footer-link">Kontakt</Link>
        </nav>

        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
            <Instagram size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
            <Youtube size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
            <Twitter size={24} />
          </a>
        </div>

        <div className="footer-contact">
          <a href="mailto:info@dominiumsociale.de" className="contact-item">
            <Mail size={18} />
            <span>info@dominiumsociale.de</span>
          </a>
          <a href="tel:+49123456789" className="contact-item">
            <Phone size={18} />
            <span>+49 123 456 789</span>
          </a>
        </div>

        <div className="footer-bottom">
          <p className="copyright">(c) 2025 Dominium Sociale. Alle Rechte vorbehalten.</p>
          <div className="legal-links">
            <Link to="/impressum" className="legal-link">Impressum</Link>
            <Link to="/terms" className="legal-link">AGB</Link>
            <Link to="/privacy" className="legal-link">Datenschutz</Link>
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

export default FooterV1
