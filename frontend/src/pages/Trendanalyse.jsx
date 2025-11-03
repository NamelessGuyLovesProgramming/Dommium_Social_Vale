import { useCart } from '../context/CartContext'
import { ShoppingCart, Sparkles, TrendingUp, BarChart3, LineChart, PieChart, Target, Zap } from 'lucide-react'
import './Trendanalyse.css'

const Trendanalyse = () => {
  const { addToCart } = useCart()

  const trendPackage = {
    id: 'trendanalyse-pro',
    title: 'Trendanalyse Pro',
    price: 599,
    description: 'Datengestützte Trend-Analyse für Content & Produktentwicklung',
    category: 'Analyse'
  }

  const handleAddToCart = (e) => {
    addToCart(trendPackage)

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
    <div className="trendanalyse-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Trendanalyse</h1>
            <p className="hero-description">
              Bleiben Sie der Konkurrenz einen Schritt voraus mit datengestützter Trend-Analyse.
              Wir durchleuchten Social Media, Märkte und Verbraucherverhalten, um Ihnen wertvolle
              Insights für Content-Strategien und Produktentwicklung zu liefern. Von viralen Themen
              bis zu aufkommenden Nischen – wir identifizieren Chancen, bevor sie Mainstream werden.
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
          <span className="divider-text">Leistungsumfang</span>
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
                <div className="feature-icon"><TrendingUp size={32} /></div>
                <div className="feature-text">
                  <h3>Multi-Source Datenanalyse</h3>
                  <p>Aggregation von Daten aus Instagram, TikTok, Twitter, Google Trends und mehr</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><BarChart3 size={32} /></div>
                <div className="feature-text">
                  <h3>Wöchentliche Trend-Reports</h3>
                  <p>Detaillierte Berichte über aufkommende Trends in Ihrer Branche</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><LineChart size={32} /></div>
                <div className="feature-text">
                  <h3>Competitor Intelligence</h3>
                  <p>Analyse von Wettbewerber-Strategien und Performance-Benchmarks</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><Target size={32} /></div>
                <div className="feature-text">
                  <h3>Zielgruppen-Insights</h3>
                  <p>Tiefgehende Analyse von Nutzerverhalten, Interessen und Demographics</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><PieChart size={32} /></div>
                <div className="feature-text">
                  <h3>Content-Empfehlungen</h3>
                  <p>Datenbasierte Vorschläge für virale Content-Formate und Themen</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon"><Zap size={32} /></div>
                <div className="feature-text">
                  <h3>Real-Time Alerts</h3>
                  <p>Sofortige Benachrichtigungen bei relevanten Trend-Entwicklungen</p>
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
                <span className="price-amount">599</span>
              </div>
              <span className="price-note">pro Monat</span>
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
              Nach dem Kauf erhalten Sie innerhalb von 24 Stunden Zugang zu Ihrem personalisierten Dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Trendanalyse
