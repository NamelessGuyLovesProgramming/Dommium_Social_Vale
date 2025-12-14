import { useEffect, useRef, useState } from "react"
import { useCart } from "../context/CartContext"
import {
  ShoppingCart,
  Sparkles,
  Instagram,
  Video,
  Calendar,
  MessageCircle,
  BarChart3,
  Camera,
  Mic,
  Info
} from "lucide-react"
import LogoLoop from "../components/LogoLoop/LogoLoop"
import "./ContentCreation.css"

const HighlightBand = () => (
  <div className="highlight-bar" aria-hidden="true">
    <LogoLoop
      logos={[
        { node: <span style={{ fontWeight: 700 }}>Content Creation</span>, title: "Content Creation" },
        { node: <span style={{ fontWeight: 700 }}>Content Creation</span>, title: "Content Creation" },
        { node: <span style={{ fontWeight: 700 }}>Content Creation</span>, title: "Content Creation" }
      ]}
      direction="right"
      speed={120}
      logoHeight={28}
      gap={48}
      hoverSpeed={0}
      fadeOut
    />
  </div>
)

const VideoReelBand = ({ videoSources }) => (
  <div className="video-reel-section" aria-label="Content Beispielvideos">
    <div className="video-reel-header">
      <div className="video-reel-title">Showreel</div>
      <div className="video-reel-sub">Aktuelle Bewegtbild-Referenzen</div>
    </div>
    <div className="video-reel-shell flip-x">
      <LogoLoop
        logos={videoSources.flatMap((src, index) => [
          { src, title: `Reel Video ${index + 1}` },
          { src, title: `Reel Video ${index + 1} (Alt)` }
        ])}
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
        hoverSpeed={60}
        forceJs
        logoHeight={240}
        gap={12}
        fadeOut={false}
        ariaLabel="Laufband mit Beispiel Reels"
        className="video-reel"
      />
      <div className="video-reel-gradient left" aria-hidden="true"></div>
      <div className="video-reel-gradient right" aria-hidden="true"></div>
    </div>
  </div>
)

const ContentCreation = () => {
  const { addToCart } = useCart()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [cardsVisible, setCardsVisible] = useState(false)
  const pricingRef = useRef(null)

  const renderGoal = (goal) => {
    const parts = []
    const regex = /__(.*?)__/g
    let lastIndex = 0
    let match
    while ((match = regex.exec(goal)) !== null) {
      if (match.index > lastIndex) parts.push(goal.slice(lastIndex, match.index))
      parts.push(
        <span key={parts.length} className="goal-underline">
          {match[1]}
        </span>
      )
      lastIndex = regex.lastIndex
    }
    if (lastIndex < goal.length) parts.push(goal.slice(lastIndex))
    return parts
  }

  const packages = [
    {
      id: "content-basic",
      title: "Eintritt zu Social Media Paket",
      tier: "Eintritt zu Social Media Paket",
      price: 499,
      category: "Content Creation",
      highlights: [],
      details: [
        "Erstgespraech fuer Planung + Umsetzung",
        "Oberflaechliche Nischen-Analyse",
        "1x monatliche Trendanalyse (light)",
        "Bis zu 3 Kurzformat-Videos (bis 60s)",
        "Bis zu 4 Posts/Carousels",
        "Copywriting fuer den Content",
        "Optimierung von bis zu 2 Kanaelen",
        "1 Meeting pro Monat"
      ],
      goals: [
        "Erste professionelle Social Media Praesenz",
        "Grundaktivitaeten sichern und sichtbar bleiben"
      ]
    },
    {
      id: "content-intermediate",
      title: "Wachstums Social Media Paket",
      tier: "Wachstums Social Media Paket",
      price: 999,
      category: "Content Creation",
      highlights: [
        { icon: Instagram, text: "Posts & Carousels" },
        { icon: Video, text: "Kurzformat Videos (bis 60s, max 6)" },
        { icon: Camera, text: "Behind the scenes / Stories" },
        { icon: BarChart3, text: "Performance Report" },
        { icon: BarChart3, text: "KPI-Analyse" },
        { icon: MessageCircle, text: "Community Management Light" }
      ],
      details: [
        "12 Content-Pieces gesamt",
        "1x Performance Report Meeting",
        "Einfache Beantwortung von Standardfragen",
        "Keine Uebernahme fuer produktspezifischen Support",
        "1x Monats-Meeting fuer naechste Schritte"
      ],
      goals: ["Social Media als Wachstumsgenerator nutzen"]
    },
    {
      id: "content-grand",
      title: "All-Out Social Media Content Abteilung",
      tier: "All-Out Social Media Content Abteilung",
      price: 2499,
      category: "Content Creation",
      highlights: [],
      contentPieces: [
        { icon: Instagram, text: "Posts/Carousels ~3 pro Woche" },
        { icon: Video, text: "Kurzformat Videos ~3 pro Woche" },
        { icon: Video, text: "In-depth Video ~1 pro Woche" },
        { icon: Camera, text: "Behind the scenes / Stories" },
        { icon: BarChart3, text: "Social Ads Konzeption bis Refinement" },
        { icon: null, text: "Zielsetzung (Funnel/Leads/Branding etc.)" },
        { icon: null, text: "A/B Testing" },
        { icon: null, text: "Refinement von funktionierendem Content" }
      ],
      performance: [
        { icon: BarChart3, text: "1x Performance Report Meeting" },
        { icon: BarChart3, text: "Analyse individueller KPIs" },
        { icon: BarChart3, text: "Sentiment Analyse" }
      ],
      community: [
        { icon: BarChart3, text: "Taegliche Interaktion (1x/Tag)", isCheck: true },
        { icon: BarChart3, text: "Gängige Online-Kommunikation", isCheck: true },
        { icon: BarChart3, text: "Standardfragen beantworten", isCheck: true }
      ],
      goals: [
        "Wir uebernehmen Analyse, Planung, Kreation und Auswertung fuer Ihre Online-Praesenz."
      ]
    }
  ]

  const addOns = [
    {
      id: "addon-imagefilm",
      title: "Imagefilm",
      description: "Ihr Unternehmen, Ihre Person, Ihre Visionen - wir halten Sie im besten Licht fest.",
      price: 2499,
      icon: Video,
      category: "Add-On"
    },
    {
      id: "addon-werbevideo",
      title: "Werbevideo",
      description: "Wir setzen Ihre Werbekampagne um - kreativ und serioes.",
      price: 1999,
      icon: Video,
      category: "Add-On"
    },
    {
      id: "addon-produktvideo",
      title: "Produktvideo",
      description: "Wir kreieren atemberaubende Visuals fuer Ihr Produkt.",
      price: 1499,
      icon: Video,
      category: "Add-On"
    },
    {
      id: "addon-fotoshooting",
      title: "Fotoshooting",
      description: "Wir knipsen, was Sie moechten - und lassen Sie dabei gut aussehen.",
      price: 799,
      icon: Camera,
      category: "Add-On"
    },
    {
      id: "addon-musikvideo",
      title: "Musikvideo",
      description: "Full Scale Leitung fuer Ihr Musikvideo - Schnittstelle fuer Kunst und Technik.",
      price: 2999,
      icon: Video,
      category: "Add-On"
    },
    {
      id: "addon-interview",
      title: "Interview / Dokumentation",
      description: "Lassen Sie uns Ihre Message festhalten oder Ihr Vorhaben dokumentieren.",
      price: 1199,
      icon: Video,
      category: "Add-On"
    },
    {
      id: "addon-event",
      title: "Eventbegleitung",
      description: "Wir begleiten Ihr Event - Stand- oder Bewegtbild oder beides.",
      price: 1899,
      icon: Calendar,
      category: "Add-On"
    },
    {
      id: "addon-newsletter",
      title: "Newsletterkreation & Pflege",
      description: "Wir konzipieren und pflegen Ihren Newsletter, damit Sie wirklich ankommen.",
      price: 899,
      icon: MessageCircle,
      category: "Add-On"
    },
    {
      id: "addon-coming-soon",
      title: "Coming Soon",
      description: "Weitere Add-Ons sind in Planung. Bald verfuegbar.",
      price: 0,
      icon: Sparkles,
      category: "Add-On"
    }
  ]

  const videoSources = [
    "/videos/13889899_2160_3840_30fps.mp4",
    "/videos/14993748-uhd_1296_2304_30fps.mp4",
    "/videos/17687288-uhd_2160_3840_30fps.mp4"
  ]

  useEffect(() => {
    const container = pricingRef.current
    if (!container) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleAddToCart = (item) => {
    addToCart(item)
  }

  return (
    <div className="content-creation-page">
      <HighlightBand />

      <div className="service-intro-box">
        <p>
          Alle unsere Mitarbeiter in der Content Creation haben langjaehrige Erfahrungen in der Produktion von
          videographischen Inhalten. Unsere Staerken liegen im Storytelling, dokumentarischen Darstellen und kreativen Editing.
        </p>
      </div>

      <VideoReelBand videoSources={videoSources} />

      <section className="pricing-section">
        <div ref={pricingRef} className={"pricing-container " + (cardsVisible ? "cards-visible" : "")}>
          {packages.map((pkg, idx) => {
            const isEntry = pkg.id === "content-basic"
            const isGrowth = pkg.id === "content-intermediate"
            const isGrand = pkg.id === "content-grand"
            const cardDelay = idx * 0.5
            const displayPrice = isEntry ? "499 - 699" : isGrowth ? "999 - 1500" : isGrand ? "2499 - 4999+" : pkg.price

            return (
              <div
                key={pkg.id}
                className={`pricing-card ${isEntry ? "entry-card" : ""} ${isGrowth ? "growth-card" : ""} ${isGrand ? "premium-card" : ""} ${hoveredCard === pkg.id ? "expanded" : ""}`}
                onMouseEnter={() => setHoveredCard(pkg.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ "--card-delay": `${cardDelay}s` }}
              >
                <div className="card-header">
                  <h2 className="tier-name">{pkg.tier}</h2>
                </div>

                <div className="card-highlights">
                  {pkg.highlights?.map((highlight, index) => {
                    const Icon = highlight.icon
                    return (
                      <div
                        key={index}
                        className="highlight-item fade-content"
                        style={{ "--fade-delay": `${cardDelay + 0.8 + index * 0.08}s` }}
                      >
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
                      {pkg.contentPieces.map((item, idx2) => {
                        const Icon = item.icon
                        return (
                          <li
                            key={idx2}
                            className={`details-item-with-icon ${Icon ? "" : "details-item-arrow"} fade-content`}
                            style={{ "--fade-delay": `${cardDelay + 1 + idx2 * 0.07}s` }}
                          >
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
                      {pkg.community.map((item, idx3) => (
                        <li
                          key={idx3}
                          className="details-item-with-icon fade-content"
                          style={{ "--fade-delay": `${cardDelay + 1 + idx3 * 0.07}s` }}
                        >
                          <span className="details-check">✔</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!isGrand && (
                  <div className="card-details">
                    <ul className="details-list">
                      {pkg.details.map((detail, index) => (
                        <li key={index} className="fade-content" style={{ "--fade-delay": `${cardDelay + 0.9 + index * 0.06}s` }}>
                          {detail}
                        </li>
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
                          <li
                            key={index}
                            className="details-item-with-icon fade-content"
                            style={{ "--fade-delay": `${cardDelay + 1 + index * 0.07}s` }}
                          >
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
                        <li key={index} className="fade-content" style={{ "--fade-delay": `${cardDelay + 1.1 + index * 0.08}s` }}>
                          {renderGoal(goal)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="card-footer fade-content" style={{ "--fade-delay": `${cardDelay + 1.2}s` }}>
                  <div className="price-display">
                    <span className="price-currency">€</span>
                    <span className="price-amount">{displayPrice}</span>
                    <span className="price-period">/Monat</span>
                  </div>
                  <button
                    className="cart-button"
                    onClick={(e) =>
                      handleAddToCart({
                        id: pkg.id,
                        title: `Content Creation - ${pkg.tier}`,
                        price: pkg.price,
                        description: `${pkg.tier} Paket`,
                        category: pkg.category
                      })
                    }
                    aria-label="Zum Warenkorb hinzufuegen"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="policy-note fade-content fade-now" style={{ "--fade-delay": "0.4s" }}>
        <div className="policy-title">Creation Policy</div>
        <p className="policy-sub">Wir arbeiten Referenz-basiert und planen fair nach Aufwand.</p>
        <ul className="policy-points">
          <li>Besprochene Content-Tage = Referenzwert</li>
          <li>Kann situativ leicht ueberschritten werden</li>
          <li>
            Deckel: <span className="policy-formula">geplante Tage + Nach-Bedarfs-Tag (falls noetig) + 1 Notfall-Tag</span>
          </li>
        </ul>
      </div>

      <div className="policy-divider" aria-hidden="true"></div>

      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-content">
          <Sparkles className="divider-icon" />
          <span className="divider-text">Individuelle Loesungen / AddOns</span>
          <Sparkles className="divider-icon" />
        </div>
        <div className="divider-line"></div>
      </div>

      <section className="addons-section">
        <div className="addons-container">
          {addOns.map((addon) => {
            const Icon = addon.icon
            const inquiryNote =
              "Die oben genannten Leistungen können nicht pauschal im Vorhinein bespreist werden. Eine kurze Beschreibung Ihres Vorhabens erleichtert Kontaktaufnahme und Vorbereitung."
            return (
              <div key={addon.id} className="addon-card">
                <div className="addon-content">
                  <div className="addon-icon-wrapper">
                    <Icon size={40} className="addon-icon" />
                  </div>
                  <div className="addon-info">
                    <div className="addon-title-row">
                      <h3 className="addon-title">{addon.title}</h3>
                      <div className="addon-title-separator" aria-hidden="true"></div>
                    </div>
                    <div className="addon-description-row">
                      <p className="addon-description">{addon.description}</p>
                      <div className="addon-actions">
                        <button
                          className="addon-cart-button"
                          onClick={() =>
                            handleAddToCart({
                              id: addon.id,
                              title: addon.title,
                              price: addon.price,
                              description: inquiryNote,
                              category: addon.category
                            })
                          }
                          aria-label="Zum Warenkorb hinzufuegen"
                        >
                          <ShoppingCart size={18} strokeWidth={2.4} />
                        </button>
                        <div className="addon-price-pop">
                          <button className="addon-price-label" type="button">
                            Preis?
                          </button>
                          <div className="addon-note" role="note">{inquiryNote}</div>
                        </div>
                      </div>
                    </div>
                    <div className="addon-footer"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="addons-cta-empty">
          <h3>Nichts gefunden?</h3>
          <a className="addons-cta-button" href="/kontakt">Individual Lösung anfragen</a>
        </div>
      </section>
    </div>
  )
}

export default ContentCreation
