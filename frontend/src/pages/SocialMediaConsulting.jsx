import { useCart } from '../context/CartContext'
import { ShoppingCart, Sparkles } from 'lucide-react'
import './SocialMediaConsulting.css'

const SocialMediaConsulting = () => {
  const { addToCart } = useCart()

  const consultingPackage = {
    id: 'social-media-consulting',
    title: 'Social Media Consulting',
    price: 299,
    description: 'Professionelle Social Media Beratung für Ihr Unternehmen',
    category: 'Beratung'
  }

  const handleAddToCart = (e) => {
    // Item zum Warenkorb hinzufügen
    addToCart(consultingPackage)

    // Animation starten
    const button = e.currentTarget
    const buttonRect = button.getBoundingClientRect()
    const cartIcon = document.querySelector('.cart-link')

    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect()

      // Fliegendes Icon erstellen
      const flyingIcon = document.createElement('div')
      flyingIcon.className = 'flying-cart-icon'
      flyingIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      `

      // Startposition (Button-Position)
      flyingIcon.style.left = `${buttonRect.left + buttonRect.width / 2}px`
      flyingIcon.style.top = `${buttonRect.top + buttonRect.height / 2}px`

      document.body.appendChild(flyingIcon)

      // Nach kurzer Verzögerung zur Zielposition animieren
      setTimeout(() => {
        flyingIcon.style.left = `${cartRect.left + cartRect.width / 2}px`
        flyingIcon.style.top = `${cartRect.top + cartRect.height / 2}px`
        flyingIcon.style.transform = 'translate(-50%, -50%) scale(0.3)'
        flyingIcon.style.opacity = '0'
      }, 10)

      // Nach Animation entfernen
      setTimeout(() => {
        flyingIcon.remove()
      }, 800)
    }
  }

  return (
    <div className="social-media-consulting-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Social Media Consulting</h1>
            <p className="hero-description">
              Verwandeln Sie Ihre Social Media Präsenz in einen Wachstumsmotor.
              Mit datengetriebenen Strategien und bewährten Methoden entwickeln wir
              gemeinsam einen maßgeschneiderten Plan für Ihren digitalen Erfolg.
              Von der Zielgruppenanalyse bis zur Content-Strategie – wir begleiten
              Sie auf jedem Schritt zu mehr Reichweite, Engagement und messbaren Ergebnissen.
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
          <span className="divider-text">Inhalt des Pakets</span>
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
                <div className="feature-icon">🎯</div>
                <div className="feature-text">
                  <h3>Strategische Analyse</h3>
                  <p>Umfassende Bewertung Ihrer aktuellen Social Media Präsenz und Wettbewerbsanalyse</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <h3>Zielgruppenforschung</h3>
                  <p>Detaillierte Persona-Entwicklung und Identifikation Ihrer idealen Kunden</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-text">
                  <h3>Content-Strategie</h3>
                  <p>Maßgeschneiderter Content-Plan mit Posting-Zeitplan und Themen-Roadmap</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">💡</div>
                <div className="feature-text">
                  <h3>Performance-Optimierung</h3>
                  <p>KPI-Definition, Analytics-Setup und kontinuierliche Verbesserungsstrategien</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <div className="feature-text">
                  <h3>Plattform-Empfehlungen</h3>
                  <p>Gezielte Auswahl der optimalen Social Media Kanäle für Ihre Zielgruppe</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <div className="feature-text">
                  <h3>Trend-Integration</h3>
                  <p>Aktuelle Social Media Trends und deren strategische Nutzung für Ihr Business</p>
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
                <span className="price-amount">299</span>
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
              Nach dem Kauf erhalten Sie innerhalb von 24 Stunden eine persönliche
              Kontaktaufnahme zur Terminvereinbarung.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SocialMediaConsulting
