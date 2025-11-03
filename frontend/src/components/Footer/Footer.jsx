import { Link } from 'react-router-dom'
import { Instagram, Youtube, Twitter, Mail, Phone } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Tagline */}
        <div className="footer-brand">
          <h2 className="footer-logo">Dominium Sociale</h2>
          <p className="footer-tagline">Social Mastery - Datengestützte Content Strategien</p>
        </div>

        {/* Navigation Links */}
        <nav className="footer-nav">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/portfolio" className="footer-link">Portfolio</Link>
          <Link to="/services/social-media" className="footer-link">Services</Link>
          <Link to="/team" className="footer-link">Team</Link>
          <Link to="/kontakt" className="footer-link">Kontakt</Link>
        </nav>

        {/* Social Media Icons */}
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

        {/* Contact Information */}
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

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">© 2025 Dominium Sociale. Alle Rechte vorbehalten.</p>
          <div className="legal-links">
            <Link to="/privacy" className="legal-link">Datenschutz</Link>
            <span className="separator">|</span>
            <Link to="/terms" className="legal-link">AGB</Link>
            <span className="separator">|</span>
            <Link to="/cookies" className="legal-link">Cookie-Einstellungen</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
