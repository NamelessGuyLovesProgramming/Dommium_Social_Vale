import { useCart } from '../context/CartContext'
import { ShoppingCart, Sparkles, Shield, Lock, Eye, Database, AlertTriangle, CheckCircle } from 'lucide-react'
import './Cybersecurity.css'

const Cybersecurity = () => {
  const { addToCart } = useCart()

  const cyberPackage = {
    id: 'cybersecurity-audit',
    title: 'Cybersecurity Audit & Digitalisierung',
    price: 1499,
    description: 'Umfassende Sicherheitsanalyse und Digitalisierungs-Beratung',
    category: 'Cybersecurity'
  }

  const handleAddToCart = (e) => {
    addToCart(cyberPackage)

    const button = e.currentTarget
    const buttonRect = button.getBoundingClientRect()
    const cartIcon = document.querySelector('.cart-link')

    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect()

      const flyingIcon = document.createElement('div')
      flyingIcon.className = 'flying-cart-icon'
      flyingIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      `

      flyingIcon.style.left = `${buttonRect.left + buttonRect.width / 2}px`
      flyingIcon.style.top = `${buttonRect.top + buttonRect.height / 2}px`

      document.body.appendChild(flyingIcon)

      setTimeout(() => {
        flyingIcon.style.left = `${cartRect.left + cartRect.width / 2}px`
        flyingIcon.style.top = `${cartRect.top + cartRect.height / 2}px`
        flyingIcon.style.transform = 'translate(-50%, -50%) scale(0.3)'
        flyingIcon.style.opacity = '0'
      }, 10)

      setTimeout(() => {
        flyingIcon.remove()
      }, 800)
    }
  }

  return (
    <div className="cybersecurity-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Cybersecurity & Digitalisierung</h1>
            <p className="hero-description">
              Schützen Sie Ihr Unternehmen vor digitalen Bedrohungen und nutzen Sie die Chancen
              der Digitalisierung. Wir analysieren Ihre IT-Infrastruktur, identifizieren Schwachstellen
              und entwickeln maßgeschneiderte Sicherheitsstrategien. Von Penetration Testing bis zur
              sicheren Cloud-Migration – wir begleiten Sie auf dem Weg in eine sichere digitale Zukunft.
            </p>
          </div>
          <div className="hero-media">
            <div className="video-wrapper">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-video"
              >
                <source src="/videos/file_example_MP4_1280_10MG.mp4" type="video/mp4" />
                Ihr Browser unterstützt keine Videos.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-content">
          <Sparkles className="divider-icon" />
          <span className="divider-text">Leistungspaket</span>
          <Sparkles className="divider-icon" />
        </div>
        <div className="divider-line"></div>
      </div>

      {/* Package Section */}
      <section className="package-section">
        <div className="package-container">
          <div className="package-content">
            <h2 className="package-title">Was Sie erhalten</h2>

            <div className="package-features">
              <div className="feature-item">
                <div className="feature-icon"><Shield size={32} /></div>
                <div className="feature-text">
                  <h3>Sicherheits-Audit</h3>
                  <p>Umfassende Analyse Ihrer IT-Infrastruktur mit detailliertem Schwachstellen-Report</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><Eye size={32} /></div>
                <div className="feature-text">
                  <h3>Penetration Testing</h3>
                  <p>Ethisches Hacking zur Identifikation von Sicherheitslücken vor Angreifern</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><Lock size={32} /></div>
                <div className="feature-text">
                  <h3>Datenschutz-Compliance</h3>
                  <p>DSGVO-Konformität prüfen und sicherstellen, rechtliche Risiken minimieren</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><Database size={32} /></div>
                <div className="feature-text">
                  <h3>Digitalisierungs-Roadmap</h3>
                  <p>Strategischer Plan für sichere Cloud-Migration und digitale Transformation</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><AlertTriangle size={32} /></div>
                <div className="feature-text">
                  <h3>Incident Response Plan</h3>
                  <p>Notfallplan für Cyberangriffe mit klaren Handlungsanweisungen</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><CheckCircle size={32} /></div>
                <div className="feature-text">
                  <h3>Mitarbeiter-Schulung</h3>
                  <p>Security Awareness Training zur Sensibilisierung Ihres Teams</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="package-cta">
            <div className="price-container">
              <span className="price-label">Investition</span>
              <div className="price-wrapper">
                <span className="price-currency">€</span>
                <span className="price-amount">1499</span>
              </div>
              <span className="price-note">einmalig</span>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              aria-label="Zum Warenkorb hinzufügen"
            >
              <ShoppingCart size={24} />
              <span>Zum Warenkorb hinzufügen</span>
            </button>

            <p className="cta-note">
              Nach dem Kauf vereinbaren wir einen Termin für die initiale Sicherheitsanalyse.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cybersecurity
