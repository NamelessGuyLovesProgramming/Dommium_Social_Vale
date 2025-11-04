import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { ShoppingCart, Sparkles, Instagram, Video, Calendar, MessageCircle, TrendingUp, BarChart3, Users, Palette, Camera, Mic } from 'lucide-react'
import './ContentCreation.css'

const ContentCreation = () => {
  const { addToCart } = useCart()
  const [hoveredCard, setHoveredCard] = useState(null)

  // Paket-Definitionen
  const packages = [
    {
      id: 'content-basic',
      title: 'Content Creation Basic',
      tier: 'Basic',
      price: 499,
      category: 'Content Creation',
      description: 'Perfekt für Einsteiger, die ihre Social Media Präsenz professionell aufbauen möchten - ohne selbst Zeit in Content-Erstellung zu investieren.',
      highlights: [
        { icon: Instagram, text: 'Social Media Posts' },
        { icon: MessageCircle, text: 'Captions & Hashtags' },
        { icon: Palette, text: 'Basis-Grafiken' }
      ],
      details: [
        '10 Posts pro Monat (Instagram/Facebook)',
        'Fertig formulierte Texte mit Hashtags',
        'Canva-Template Design'
      ],
      items: [
        '10 professionell gestaltete Social Media Posts pro Monat',
        'Fertige Texte mit strategisch ausgewählten Hashtags',
        'Design-Vorlagen im Canva-Stil für Ihre Brand',
        'Posting-Plan für optimale Reichweite'
      ]
    },
    {
      id: 'content-intermediate',
      title: 'Content Creation Intermediate',
      tier: 'Intermediate',
      price: 999,
      category: 'Content Creation',
      description: 'Für ambitionierte Marken, die mit Videos & strategischer Planung ihre Reichweite verdoppeln und mit ihrer Community aktiv interagieren wollen.',
      highlights: [
        { icon: Instagram, text: 'Social Media Posts' },
        { icon: MessageCircle, text: 'Captions & Hashtags' },
        { icon: Palette, text: 'Basis-Grafiken' },
        { icon: Video, text: 'Video-Content' },
        { icon: Calendar, text: 'Content-Kalender' },
        { icon: MessageCircle, text: 'Community Management' }
      ],
      details: [
        '✓ Alles aus Basic Paket',
        '+ 2 Reels/TikToks pro Monat',
        '+ Monatsplanung & Content-Strategie',
        '+ Kommentar-Antworten (5h/Monat)'
      ],
      items: [
        'Alle Leistungen aus dem Basic Paket',
        '2 professionell geschnittene Reels oder TikToks pro Monat',
        'Strategischer Content-Kalender mit Monatsplanung',
        'Community Management: Beantwortung von Kommentaren (5h/Monat)',
        'Wöchentlicher Performance-Check Ihrer Posts'
      ]
    },
    {
      id: 'content-grand',
      title: 'Content Creation Grand',
      tier: 'Grand',
      price: 1999,
      category: 'Content Creation',
      description: 'Die Premium-Lösung für Unternehmen, die viral gehen wollen: Mit Trend-Analyse, Performance-Tracking und Influencer-Partnerschaften zum maximalen Erfolg.',
      highlights: [
        { icon: Instagram, text: 'Social Media Posts' },
        { icon: MessageCircle, text: 'Captions & Hashtags' },
        { icon: Palette, text: 'Basis-Grafiken' },
        { icon: Video, text: 'Video-Content' },
        { icon: Calendar, text: 'Content-Kalender' },
        { icon: MessageCircle, text: 'Community Management' },
        { icon: TrendingUp, text: 'Trend-Integration' },
        { icon: BarChart3, text: 'Analytics & Reporting' },
        { icon: Users, text: 'Influencer-Kooperationen' },
        { icon: Palette, text: 'Premium-Design' }
      ],
      details: [
        '✓ Alles aus Intermediate Paket',
        '+ Wöchentliche Trend-Analyse & Umsetzung',
        '+ Monatliche Performance-Reports',
        '+ 1 Influencer-Kooperation/Monat Setup',
        '+ Professionelle Grafik- & Video-Bearbeitung'
      ],
      items: [
        'Alle Leistungen aus dem Intermediate Paket',
        'Wöchentliche Trend-Analyse mit sofortiger Content-Umsetzung',
        'Monatliche Performance-Reports mit Handlungsempfehlungen',
        '1 Influencer-Kooperation pro Monat (Recherche, Kontakt, Setup)',
        'Premium Grafik- & Video-Bearbeitung mit professionellen Tools',
        'Strategische Beratung: Monatliches Strategie-Meeting (60 Min.)',
        'Hashtag-Recherche & A/B-Testing für maximale Reichweite'
      ]
    }
  ]

  // Add-Ons Definition
  const addOns = [
    {
      id: 'addon-imagefilm',
      title: 'Imagefilm',
      description: 'Professioneller 60-90s Imagefilm inklusive Drehbuch, Dreh & Schnitt',
      price: 2499,
      icon: Video,
      category: 'Add-On',
      items: [
        'Konzept-Entwicklung & Drehbuch-Erstellung',
        'Professioneller Dreh mit 4K-Equipment (1 Tag)',
        'Professioneller Schnitt & Color Grading',
        'Lizenzfreie Musik & Sound Design',
        '2 Korrekturschleifen inklusive',
        'Finales Video in allen gängigen Formaten'
      ]
    },
    {
      id: 'addon-fotoshooting',
      title: 'Fotoshooting',
      description: '4h Shooting mit professionellem Fotografen, 30 bearbeitete Bilder',
      price: 799,
      icon: Camera,
      category: 'Add-On',
      items: [
        '4 Stunden Shooting mit professionellem Fotografen',
        'Location-Beratung & Konzept-Planung',
        '30 professionell bearbeitete Bilder in High-Res',
        'Nutzungsrechte für Social Media & Website',
        'Online-Galerie zum Download',
        'Express-Lieferung innerhalb von 5 Werktagen'
      ]
    },
    {
      id: 'addon-podcast',
      title: 'Podcast-Produktion',
      description: 'Komplette Podcast-Episode inkl. Schnitt, Intro/Outro, Transkript',
      price: 349,
      icon: Mic,
      category: 'Add-On',
      items: [
        'Aufnahme-Beratung & Equipment-Empfehlungen',
        'Professioneller Audio-Schnitt & Mastering',
        'Individuelles Intro & Outro mit Musik',
        'Vollständiges Transkript der Episode',
        'Show Notes & Timestamps',
        'Upload-fertige Dateien für alle Plattformen'
      ]
    }
  ]

  const handleAddToCart = (item, e) => {
    // Item zum Warenkorb hinzufügen
    addToCart(item)

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

      // Startposition
      flyingIcon.style.left = `${buttonRect.left + buttonRect.width / 2}px`
      flyingIcon.style.top = `${buttonRect.top + buttonRect.height / 2}px`

      document.body.appendChild(flyingIcon)

      // Animation zur Zielposition
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
    <div className="content-creation-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="page-title">Content Creation</h1>
        <p className="page-subtitle">
          Professioneller Content, der Ihre Marke zum Leben erweckt
        </p>
      </section>

      {/* Pricing Cards Section */}
      <section className="pricing-section">
        <div className="pricing-container">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`pricing-card ${hoveredCard === pkg.id ? 'expanded' : ''}`}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header">
                <h2 className="tier-name">{pkg.tier}</h2>
              </div>

              <div className="card-highlights">
                {pkg.highlights.map((highlight, index) => {
                  const Icon = highlight.icon
                  return (
                    <div key={index} className="highlight-item">
                      <Icon size={20} className="highlight-icon" />
                      <span className="highlight-text">{highlight.text}</span>
                    </div>
                  )
                })}
              </div>

              <div className="card-details">
                <ul className="details-list">
                  {pkg.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <div className="price-display">
                  <span className="price-currency">€</span>
                  <span className="price-amount">{pkg.price}</span>
                  <span className="price-period">/Monat</span>
                </div>
                <button
                  className="cart-button"
                  onClick={(e) => handleAddToCart({
                    id: pkg.id,
                    title: `Content Creation - ${pkg.tier}`,
                    price: pkg.price,
                    description: `${pkg.tier} Paket`,
                    category: pkg.category
                  }, e)}
                  aria-label="Zum Warenkorb hinzufügen"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-content">
          <Sparkles className="divider-icon" />
          <span className="divider-text">Individuelle Lösungen / AddOns</span>
          <Sparkles className="divider-icon" />
        </div>
        <div className="divider-line"></div>
      </div>

      {/* Add-Ons Section */}
      <section className="addons-section">
        <div className="addons-container">
          {addOns.map((addon) => {
            const Icon = addon.icon
            return (
              <div key={addon.id} className="addon-card">
                <div className="addon-content">
                  <div className="addon-icon-wrapper">
                    <Icon size={40} className="addon-icon" />
                  </div>
                  <div className="addon-info">
                    <h3 className="addon-title">{addon.title}</h3>
                    <p className="addon-description">{addon.description}</p>
                    <div className="addon-footer">
                      <div className="addon-price">
                        <span className="addon-currency">€</span>
                        <span className="addon-amount">{addon.price}</span>
                      </div>
                      <button
                        className="addon-cart-button"
                        onClick={(e) => handleAddToCart({
                          id: addon.id,
                          title: addon.title,
                          price: addon.price,
                          description: addon.description,
                          category: addon.category
                        }, e)}
                        aria-label="Zum Warenkorb hinzufügen"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default ContentCreation
