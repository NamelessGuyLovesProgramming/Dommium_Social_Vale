import { useState } from 'react'
import { useCart } from '../context/CartContext'
import {
  ShoppingCart,
  Sparkles,
  Instagram,
  Video,
  Calendar,
  MessageCircle,
  TrendingUp,
  BarChart3,
  Users,
  Palette,
  Camera,
  Mic
} from 'lucide-react'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import './ContentCreation.css'

const ContentCreation = () => {
  const { addToCart } = useCart()
  const [hoveredCard, setHoveredCard] = useState(null)

  const renderGoal = (goal) => {
    const parts = []
    const regex = /__(.*?)__/g
    let lastIndex = 0
    let match
    while ((match = regex.exec(goal)) !== null) {
      if (match.index > lastIndex) {
        parts.push(goal.slice(lastIndex, match.index))
      }
      parts.push(
        <span key={parts.length} className="goal-underline">
          {match[1]}
        </span>
      )
      lastIndex = regex.lastIndex
    }
    if (lastIndex < goal.length) {
      parts.push(goal.slice(lastIndex))
    }
    return parts
  }

  const packages = [
    {
      id: 'content-basic',
      title: 'Eintritt zu Social Media Paket',
      tier: 'Eintritt zu Social Media Paket',
      price: 499,
      category: 'Content Creation',
      description: '',
      highlights: [],
      details: [
        'ErstgesprÃ¤ch fÃ¼r die Planung + Umsetzung',
        'OberflÃ¤chliche Nichen Analyse',
        '1x monatliche Trendanalyse(light) mit resultierenden identifizierten Contentformat VorschlÃ¤gen',
        'Bis zu 3 Kurzformat Videos (Bis 60 Sekunden)',
        'Bis zu 4 Posts/Carousells',
        'Copywriting fÃ¼r den Content',
        'Contentoptimierung von bis 2 Social Media KanÃ¤len',
        '1 x Meeting jeden Monat um weitere Schritte zu besprechen'
      ],
      items: [],
      goals: [
        'Erste professionelle Social Media Praesenz, um mehr Kommunikation nach auÃŸen zu betreiben und Engagement zu generieren',
        'Grundaktivitaeten sichern und sichtbar bleiben'
      ]
    },
    {
      id: 'content-intermediate',
      title: 'Wachstums Social Media Paket',
      tier: 'Wachstums Social Media Paket',
      price: 999,
      category: 'Content Creation',
      description: '12 Content-Pieces plus Reporting und leichtes Community Management fuer spuerbares Wachstum.',
      highlights: [
        { icon: Instagram, text: 'Posts & Carousels' },
        { icon: Video, text: 'Kurzformat Videos (bis 60s, max 6)' },
        { icon: Camera, text: 'Behind the scenes / Stories' },
        { icon: BarChart3, text: 'Performance Report' },
        { icon: BarChart3, text: 'KPI-Analyse' },
        { icon: BarChart3, text: 'Sentiment Analyse' },
        { icon: MessageCircle, text: 'Community Management Light' },
        { icon: MessageCircle, text: 'Interaktion 2x/Woche' }
      ],
      details: [
        '12 Content-Pieces Gesamt',
        '1x Performance Report Meeting: Analyse der individuellen Metrics - was hat unser Aufwand bewirkt?',
        'Umgang mit der gaengigen Online-Kommunikationsweise',
        'Einfaches Beantworten der Standardfragen',
        'Keine Uebernahme fuer dienstleistungs-/produktspezifischen Support',
        '1x Meeting im Monat um weitere Schritte zu besprechen'
      ],
      items: [],
      goals: ['Social Media als Wachstumsgenerator nutzen und die Online-Praesenz optimieren']
    },
    {
      id: 'content-grand',
      title: 'All-Out Social Media Content Abteilung',
      tier: 'All-Out Social Media Content Abteilung',
      price: 2499,
      category: 'Content Creation',
      description: 'All-in Content-Abteilung mit hohem Volumen, Ads-Begleitung und taeglichem Community-Touch.',
      highlights: [],
      contentPieces: [
        { icon: Instagram, text: 'Posts/Caroussels - ~3 pro Woche' },
        { icon: Video, text: 'Kurzformat Videos - Bis 60 Sekunden ; ~3 pro Woche' },
        { icon: Video, text: 'In depth Produkt/Dienstleistung Video - ~1 pro Woche' },
        { icon: Camera, text: 'Behind the scenes/Stories -' },
        {
          icon: BarChart3,
          text: 'Social Ads - von Konzeptionierung bis Refinement, ohne Ads Budget - ~1-2 pro Woche'
        },
        { icon: null, text: 'Zielsetzung (Funnel, Leads, Branding, Sales, Retargeting etc.)' },
        { icon: null, text: 'A/B Testing' },
        { icon: null, text: 'Refinement von Was funktioniert' }
      ],
      performance: [
        { icon: BarChart3, text: '1x Performance Report Meeting:' },
        { icon: BarChart3, text: 'Analyse der Individuellen Metrics - Was hat unser Aufwand bewirkt' },
        { icon: BarChart3, text: 'KPI-Analyse' },
        { icon: BarChart3, text: 'Sentiment Analyse' }
      ],
      details: [],
      community: [
        { icon: BarChart3, text: 'Interaktionen herstellen und gewÃ¤hrleisten (1x pro Tag)', isCheck: true },
        { icon: BarChart3, text: 'Umgang mit der gÃ¤ngigen Online-Kommunikationsweise', isCheck: true },
        { icon: BarChart3, text: 'Einfaches beantworten der Standardfragen', isCheck: true }
      ],
      items: [],
      goals: [
        'Wir uebernehmen Ihre Content Production - Alles von __Analyse__, __Planung__, __Kreation__ und __Auswertung__ um Ihre Online Praesenz zu optimieren, Wachstum zu generieren und den Umsatz zu steigern.'
      ]
    }
  ]

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
        'Finales Video in allen gÃ¤ngigen Formaten'
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
        'Nutzungsrechte fÃ¼r Social Media & Website',
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
        'VollstÃ¤ndiges Transkript der Episode',
        'Show Notes & Timestamps',
        'Upload-fertige Dateien fÃ¼r alle Plattformen'
      ]
    }
  ]

  const videoSources = [
    '/videos/13889899_2160_3840_30fps.mp4',
    '/videos/14993748-uhd_1296_2304_30fps.mp4',
    '/videos/13889899_2160_3840_30fps.mp4', // einmal doppelt, aber nicht direkt an Rand
    '/videos/17687288-uhd_2160_3840_30fps.mp4',
    '/videos/17687289-uhd_2160_3840_30fps.mp4'
  ]

  const handleAddToCart = (item, e) => {
    addToCart(item)
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
    <div className="content-creation-page">
      <div className="highlight-bar" aria-hidden="true">
        <LogoLoop
          logos={[
            { node: <span style={{ fontWeight: 700 }}>Content Creation</span>, title: 'Content Creation' },
            { node: <span style={{ fontWeight: 700 }}>Content Creation</span>, title: 'Content Creation' },
            { node: <span style={{ fontWeight: 700 }}>Content Creation</span>, title: 'Content Creation' }
          ]}
          direction="right"
          speed={120}
          logoHeight={28}
          gap={48}
          hoverSpeed={0}
          fadeOut
        />
      </div>

      <div className="service-intro-box">
        <p>
          Alle unsere Mitarbeiter in der Content Creation haben langjÃ¤hrige Erfahrungen in der Produktion von
          videographischen Inhalten. Unser Angebot deckt vor allem Real-Filme ab, jedoch sind wir in VFX, Lightweight 3D
          und KI-Videoproduktion ebenso versiert. Unsere StÃ¤rken liegen hier im Storytelling, dokumentarischen Darstellen
          und kreativen Editing.
          <br />
          <br />
          Wir spezialisieren uns auf geplante Drehs vor Ort, mit VorgesprÃ¤ch der Vorstellungen plus Umsetzung und,
          generell, Sichtung der Situation bevor wir in die eigentliche Produktion gehen.
          <br />
          <br />
          Equipment stellen wir; dennoch, je nach Auftrag, kann der Bedarf unser Inventar Ã¼berschreiten und mÃ¼sste so
          angemietet werden von externen Dienstleistern, was aber alles in den VorgesprÃ¤chen besprochen wird.
          <br />
          <br />
          Zugriff auf ein Studio haben wir, jedoch zur Miete pro Auftrag gerechnet.
        </p>
      </div>

      <div className="video-reel-section" aria-label="Content Beispielvideos">
        <LogoLoop
          logos={videoSources.map((src, index) => ({ src, title: `Reel Video ${index + 1}` }))}
          renderItem={(item, key) => (
            <video
              key={key}
              src={item.src}
              muted
              playsInline
              autoPlay
              loop
              preload="metadata"
              className="video-reel__item"
            />
          )}
          direction="right"
          speed={180}
          logoHeight={240}
          gap={0}
          fadeOut={false}
          ariaLabel="Laufband mit Beispiel Reels"
          className="video-reel"
        />
      </div>

      <section className="pricing-section">
        <div className="pricing-container">
          {packages.map((pkg, idx) => {
            const isEntry = pkg.id === 'content-basic'
            const isGrowth = pkg.id === 'content-intermediate'
            const isGrand = pkg.id === 'content-grand'
            const displayPrice = isEntry
              ? '499 - 699'
              : isGrowth
                ? '999 - 1500'
                : isGrand
                  ? '2499 - 4999+'
                  : pkg.price

            return (
              <div
                key={pkg.id}
                className={`pricing-card ${isEntry ? 'entry-card' : ''} ${isGrowth ? 'growth-card' : ''} ${isGrand ? 'premium-card' : ''} ${hoveredCard === pkg.id ? 'expanded' : ''}`}
                onMouseEnter={() => setHoveredCard(pkg.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ '--card-delay': `${idx * 0.08}s` }}
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

                {isGrand && pkg.contentPieces && (
                  <div className="card-details">
                    <div className="details-heading">Content-Pieces</div>
                    <ul className="details-list nested">
                      {pkg.contentPieces.map((item, idx) => {
                        const Icon = item.icon
                        return (
                          <li key={idx} className={`details-item-with-icon ${Icon ? '' : 'details-item-arrow'}`}>
                            {Icon ? <Icon size={18} className="details-icon" /> : <span className="details-arrow">→</span>}
                            <span>{item.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {isGrand && pkg.community && (
                  <div className="card-details">
                    <div className="details-heading">Community Management</div>
                    <ul className="details-list nested">
                      {pkg.community.map((item, idx) => {
                        return (
                          <li key={idx} className="details-item-with-icon">
                            <span className="details-check">&#10003;</span>
                            <span>{item.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {!isGrand && (
                  <div className="card-details">
                    <ul className="details-list">
                      {pkg.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {isGrand && pkg.performance && (
                  <div className="card-details">
                    <div className="details-heading">Performance & Reporting</div>
                    <ul className="details-list nested">
                      {pkg.performance.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <li key={index} className="details-item-with-icon">
                            <Icon size={18} className="details-icon" />
                            <span>{item.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {pkg.goals && pkg.goals.length > 0 && (
                  <div className="card-goals">
                    <div className="goals-title">Ziele</div>
                    <ul className="goals-list">
                      {pkg.goals.map((goal, index) => (
                        <li key={index}>{renderGoal(goal)}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="card-footer">
                  <div className="price-display">
                    <span className="price-currency">€</span>
                    <span className="price-amount">{displayPrice}</span>
                    <span className="price-period">/Monat</span>
                  </div>
                  <button
                    className="cart-button"
                    onClick={(e) =>
                      handleAddToCart(
                        {
                          id: pkg.id,
                          title: `Content Creation - ${pkg.tier}`,
                          price: pkg.price,
                          description: `${pkg.tier} Paket`,
                          category: pkg.category
                        },
                        e
                      )
                    }
                    aria-label="Zum Warenkorb hinzufÃ¼gen"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-content">
          <Sparkles className="divider-icon" />
          <span className="divider-text">Individuelle LÃ¶sungen / AddOns</span>
          <Sparkles className="divider-icon" />
        </div>
        <div className="divider-line"></div>
      </div>

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
                        <span className="addon-currency">â‚¬</span>
                        <span className="addon-amount">{addon.price}</span>
                      </div>
                      <button
                        className="addon-cart-button"
                        onClick={(e) =>
                          handleAddToCart(
                            {
                              id: addon.id,
                              title: addon.title,
                              price: addon.price,
                              description: addon.description,
                              category: addon.category
                            },
                            e
                          )
                        }
                        aria-label="Zum Warenkorb hinzufÃ¼gen"
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






