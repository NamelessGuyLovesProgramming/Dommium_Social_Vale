import React, { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import {
  ShoppingCart,
  Sparkles,
  TrendingUp,
  BarChart3,
  LineChart,
  PieChart,
  Target,
  Zap,
  ClipboardList,
  Instagram,
  MessageCircle,
  Clock,
  FileText,
  Check
} from 'lucide-react'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import AnimatedBadge from '../components/AnimatedBadge/AnimatedBadge'
import './SocialMediaConsulting.css'
import './Trendanalyse.css'

const HighlightBand = () => (
  <div className="highlight-bar" aria-hidden="true">
    <div className="highlight-bar-content">
      <AnimatedBadge
        webpSrc="/media/icon.14361827.webp"
        firstFrame="/media/icon.14361827.webp"
        width={96}
        height={96}
        alt="Content Creation Animated Icon"
      />
      <LogoLoop
        logos={[
          { src: '', title: 'KI Terminplanung', node: <span style={{ fontWeight: 700 }}>KI Terminplanung</span> },
          { src: '', title: 'KI Terminplanung', node: <span style={{ fontWeight: 700 }}>KI Terminplanung</span> },
          { src: '', title: 'KI Terminplanung', node: <span style={{ fontWeight: 700 }}>KI Terminplanung</span> }
        ]}
        renderItem={(item, key) => (
          <div className="highlight-item-node" key={key}>
            {item.node}
          </div>
        )}
        direction="right"
        speed={20}
        hoverSpeed={0}
        gap={16}
        logoHeight={28}
        scaleOnHover={false}
        style={{ '--logo-offset': '80px' }}
        ariaLabel="Highlight Marquee"
      />
    </div>
  </div>
)

const Trendanalyse = () => {
  const { addToCart } = useCart()
  const [layout, setLayout] = useState('option3')
  const [activePackageTab, setActivePackageTab] = useState('includes')

  const addToCartWithAnimation = (item) => (e) => {
    addToCart(item)

    const button = e?.currentTarget
    if (!button) return

    const buttonRect = button.getBoundingClientRect()
    const cartIcon = document.querySelector('.cart-link')
    if (!cartIcon) return

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

  const growthPackage = {
    id: 'ki-terminplanung-install',
    title: 'Terminplanung Automatisierung',
    price: 1699,
    description: 'Einmalige Einrichtung + smarter Support. Automatisierte Terminannahme, Umbuchung und Erinnerungen.',
    category: 'KI Automatisierung'
  }

  const growthEyebrow = 'KI TERMINPLANUNG · READY IN 14 TAGEN'

  const growthTagline =
    'Ihre Termine organisieren sich selbst: Chatbot-Anfragen, Umbuchungen, Erinnerungen & Notizen – automatisch.'

  const growthForWhom =
    'Für Teams, die Termine ohne Telefon-Ping-Pong füllen wollen: Beratung, Health, Beauty, Werkstätten, Coaches.'

  const growthHighlights = [
    { icon: ClipboardList, text: 'Aufnahme & Qualifizierung direkt im Chat' },
    { icon: Instagram, text: 'Läuft auf WhatsApp, Webchat & E-Mail' },
    { icon: MessageCircle, text: 'Umbuchen, Absagen, Nachrücker automatisch anfragen' },
    { icon: BarChart3, text: 'Klare Slots, keine Doppelbuchung, weniger No-Shows' }
  ]

  const growthIncludes = [
    'Status-Quo-Analyse Ihres aktuellen Termin-Workflows inkl. UX-Blick',
    'Routing-Logik: wer darf wann? Öffnungszeiten, Pausen, Puffer, Blackouts',
    'Channel-Setup: WhatsApp / Webchat / E-Mail Anbindung mit Marken-Tonality',
    'Smarte Fragen im Chat: Anlass, Dauer, Priorität, benötigte Ressourcen',
    'Auto-Notizen: Kontext landet vor dem Termin in Ihrem Kalender/CRM',
    'Nachrücker-Logik: frei werdende Slots werden automatisch angeboten',
    'No-Show-Reduktion: Reminder + einfache Bestätigung oder Umbuchung',
    'Live-Dashboard + monatlicher Support (49 €/Monat) nach Go-Live'
  ]

  const growthProcess = [
    'Kickoff (30–45 Min): Ziele, Kanäle, Regeln, Tools, Verantwortliche',
    'Build & Test: Logik, Texte, Übergaben; wir testen mit realen Fällen',
    'Launch + Support: Live-Schaltung, Feintuning im ersten Monat'
  ]

  const growthOutcome =
    'Termine füllen sich stressfrei, Kunden fühlen sich geführt, Ihr Team gewinnt Fokuszeit – und Ausfälle sinken.'

  const packageTabs = useMemo(
    () => [
      { id: 'includes', label: 'Enthalten' },
      { id: 'process', label: 'Ablauf' },
      { id: 'outcome', label: 'Ergebnis' }
    ],
    []
  )

  const LayoutToggle = () => (
    <div className="layout-toggle" aria-label="Layout wählen">
      {[
        { id: 'option1', label: 'Layout 1' },
        { id: 'option2', label: 'Layout 2' },
        { id: 'option3', label: 'Layout 3' },
        { id: 'option4', label: 'Layout 4 (Edel)' }
      ].map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`layout-toggle-btn ${layout === opt.id ? 'active' : ''}`}
          onClick={() => setLayout(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )

  const Option1 = () => (
    <section className="pricing-section consulting-pricing option-1">
      <div className="pricing-container cards-visible single">
        <div className="pricing-card growth-card expanded">
          <div className="card-header">
            <div className="tier-eyebrow">{growthEyebrow}</div>
            <p className="tier-sub">{growthTagline}</p>
            <div className="tier-meta">
              <div className="meta-pill">
                <Clock size={16} />
                <span>2 Sessions + Analyse</span>
              </div>
              <div className="meta-pill">
                <FileText size={16} />
                <span>Unterlagen & Contentplan</span>
              </div>
            </div>
          </div>

          <div className="card-highlights" aria-label="Kernpunkte">
            {growthHighlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <div key={index} className="highlight-item fade-content">
                  <Icon size={20} className="highlight-icon" />
                  <span className="highlight-text">{highlight.text}</span>
                </div>
              )
            })}
          </div>

          <div className="card-details">
            <div className="details-heading">Für wen</div>
            <p className="audience-text">{growthForWhom}</p>
            <div className="details-heading">Enthalten</div>
            <ul className="details-grid" aria-label="Enthaltene Leistungen">
              {growthIncludes.map((detail, index) => (
                <li key={index} className="fade-content">
                  <Check size={18} className="detail-check" aria-hidden="true" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="details-heading">Ablauf</div>
            <ol className="process-steps" aria-label="Ablauf in drei Schritten">
              {growthProcess.map((step, index) => (
                <li key={index} className="fade-content process-step">
                  <div className="step-index" aria-hidden="true">
                    {index + 1}
                  </div>
                  <div className="step-text">{step}</div>
                </li>
              ))}
            </ol>

            <div className="details-heading">Ergebnis</div>
            <p className="audience-text">{growthOutcome}</p>
          </div>

          <div className="card-footer fade-content">
              <div className="price-display">
                <span className="price-currency">€</span>
                <span className="price-amount">1.699</span>
                <span className="price-period">einmalig</span>
            </div>
            <button
              className="cart-button cta-button"
              onClick={addToCartWithAnimation(growthPackage)}
              aria-label="Zum Warenkorb hinzufügen"
            >
              <span>Zum Warenkorb</span>
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )

  const Option2 = () => (
    <section className="pricing-section consulting-pricing option-2">
      <div className="pricing-container cards-visible single">
        <div className="consulting-offer">
          <div className="offer-left">
            <div className="tier-eyebrow">{growthEyebrow}</div>
            <p className="offer-lead">{growthTagline}</p>

            <div className="offer-block">
              <div className="offer-heading">Für wen</div>
              <p className="offer-text">{growthForWhom}</p>
            </div>

            <div className="offer-block">
              <div className="offer-heading">Was Sie danach haben</div>
              <ul className="offer-points" aria-label="Ergebnis auf einen Blick">
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>Ihre Slots füllen sich automatisch über Chat, ohne Telefon-Schleifen.</span>
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>Team sieht alle Notizen vorab – jede:r geht vorbereitet in den Termin.</span>
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>No-Shows sinken dank Reminder, Umbuchung & Nachrücker-Logik.</span>
                </li>
              </ul>
            </div>

            <div className="offer-note">
              Klarheit statt Content-Chaos: Sie erhalten Unterlagen, Leitfaden und nächste Schritte – auch wenn Sie danach
              nichts weiter umsetzen lassen.
            </div>
          </div>

          <div className="offer-right">
            <div className="pricing-card growth-card offer-card">
              <div className="card-header">
                <div className="tier-meta">
                  <div className="meta-pill">
                    <Clock size={16} />
                    <span>2 Sessions + Analyse</span>
                  </div>
                  <div className="meta-pill">
                    <FileText size={16} />
                    <span>Unterlagen & Contentplan</span>
                  </div>
                </div>
              </div>

              <div className="card-highlights" aria-label="Kernpunkte">
                {growthHighlights.map((highlight, index) => {
                  const Icon = highlight.icon
                  return (
                    <div key={index} className="highlight-item fade-content">
                      <Icon size={20} className="highlight-icon" />
                      <span className="highlight-text">{highlight.text}</span>
                    </div>
                  )
                })}
              </div>

              <div className="card-footer fade-content">
              <div className="price-display">
                <span className="price-currency">€</span>
                <span className="price-amount">1.699</span>
                <span className="price-period">einmalig</span>
                </div>
                <button
                  className="cart-button cta-button"
                  onClick={addToCartWithAnimation(growthPackage)}
                  aria-label="Zum Warenkorb hinzufügen"
                >
                  <span>Zum Warenkorb</span>
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="offer-details">
          <div className="detail-card detail-includes">
            <div className="details-heading">Enthalten</div>
            <ul className="details-grid" aria-label="Enthaltene Leistungen">
              {growthIncludes.map((detail, index) => (
                <li key={index} className="fade-content">
                  <Check size={18} className="detail-check" aria-hidden="true" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-side">
            <div className="detail-card">
              <div className="details-heading">Ablauf</div>
              <ol className="process-steps" aria-label="Ablauf in drei Schritten">
                {growthProcess.map((step, index) => (
                  <li key={index} className="fade-content process-step">
                    <div className="step-index" aria-hidden="true">
                      {index + 1}
                    </div>
                    <div className="step-text">{step}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="detail-card">
              <div className="details-heading">Ergebnis</div>
              <p className="audience-text">{growthOutcome}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const Option3 = () => (
    <section className="pricing-section consulting-pricing option-3">
      <div className="pricing-container cards-visible single">
        <div className="consulting-offer">
          <div className="offer-left">
            <div className="tier-eyebrow">{growthEyebrow}</div>
            <p className="offer-lead">{growthTagline}</p>

            <div className="offer-block">
              <div className="offer-heading">Für wen</div>
              <p className="offer-text">{growthForWhom}</p>
            </div>

            <div className="offer-block">
              <div className="offer-heading">Was Sie danach haben</div>
              <ul className="offer-points" aria-label="Ergebnis auf einen Blick">
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>Ihre Slots füllen sich automatisch über Chat, ohne Telefon-Schleifen.</span>
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>Team sieht alle Notizen vorab – jede:r geht vorbereitet in den Termin.</span>
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>No-Shows sinken dank Reminder, Umbuchung & Nachrücker-Logik.</span>
                </li>
              </ul>
            </div>

            <div className="offer-note">
              Klarheit statt Content-Chaos: Sie erhalten Unterlagen, Leitfaden und nächste Schritte – auch wenn Sie danach
              nichts weiter umsetzen lassen.
            </div>
          </div>

          <div className="offer-right">
            <div className="pricing-card growth-card offer-card">
              <div className="card-header">
                <div className="tier-meta">
                  <div className="meta-pill">
                    <Clock size={16} />
                    <span>2 Sessions + Analyse</span>
                  </div>
                  <div className="meta-pill">
                    <FileText size={16} />
                    <span>Unterlagen & Contentplan</span>
                  </div>
                </div>
              </div>

              <div className="card-highlights" aria-label="Kernpunkte">
                {growthHighlights.map((highlight, index) => {
                  const Icon = highlight.icon
                  return (
                    <div key={index} className="highlight-item fade-content">
                      <Icon size={20} className="highlight-icon" />
                      <span className="highlight-text">{highlight.text}</span>
                    </div>
                  )
                })}
              </div>

              <div className="card-footer fade-content">
              <div className="price-display">
                <span className="price-currency">€</span>
                <span className="price-amount">1.699</span>
                <span className="price-period">einmalig</span>
                </div>
                <button
                  className="cart-button cta-button"
                  onClick={addToCartWithAnimation(growthPackage)}
                  aria-label="Zum Warenkorb hinzufügen"
                >
                  <span>Zum Warenkorb</span>
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="offer-details">
          <div className="detail-card detail-tabs-card">
            <div className="tabs" role="tablist" aria-label="Paket Details">
              {packageTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activePackageTab === tab.id}
                  aria-controls={`tab-panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  className={`tab-button ${activePackageTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActivePackageTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="tab-panels">
              <div
                role="tabpanel"
                id="tab-panel-includes"
                aria-labelledby="tab-includes"
                hidden={activePackageTab !== 'includes'}
                className="tab-panel"
              >
                <div className="details-heading">Enthalten</div>
                <ul className="details-grid" aria-label="Enthaltene Leistungen">
                  {growthIncludes.map((detail, index) => (
                    <li key={index} className="fade-content">
                      <Check size={18} className="detail-check" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                role="tabpanel"
                id="tab-panel-process"
                aria-labelledby="tab-process"
                hidden={activePackageTab !== 'process'}
                className="tab-panel"
              >
                <div className="details-heading">Ablauf</div>
                <ol className="process-steps" aria-label="Ablauf in drei Schritten">
                  {growthProcess.map((step, index) => (
                    <li key={index} className="fade-content process-step">
                      <div className="step-index" aria-hidden="true">
                        {index + 1}
                      </div>
                      <div className="step-text">{step}</div>
                    </li>
                  ))}
                </ol>
              </div>

              <div
                role="tabpanel"
                id="tab-panel-outcome"
                aria-labelledby="tab-outcome"
                hidden={activePackageTab !== 'outcome'}
                className="tab-panel"
              >
                <div className="details-heading">Ergebnis</div>
                <p className="audience-text">{growthOutcome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const Option4 = () => (
    <section className="pricing-section consulting-pricing option-4">
      <div className="option4-grid">
        <div className="option4-hero-card">
          <div className="option4-badge">Signature Flow</div>
          <h2>Terminplanung, die sich anfühlt wie Concierge-Service</h2>
          <p>
            Ein KI-gestützter Ablauf, der freundlich begrüßt, qualifiziert, bucht, umplant und dein Team mit allen
            Notizen versorgt – ohne dass jemand nachfassen muss.
          </p>
          <div className="option4-meta">
            <div className="pill">
              <Clock size={16} />
              <span>Go-Live in 14 Tagen</span>
            </div>
            <div className="pill">
              <FileText size={16} />
              <span>Playbooks & Handover Docs</span>
            </div>
          </div>
          <div className="option4-price">
            <div className="price-main">
              <span className="price-currency">€</span>
              <span className="price-amount">1.699</span>
              <span className="price-period">einmalig</span>
            </div>
            <div className="price-sub">
              <span className="price-amount">49</span>
              <span className="price-period">€/Monat Support</span>
            </div>
          </div>
          <button className="cta-button option4-cta" onClick={addToCartWithAnimation(growthPackage)}>
            <span>Projekt starten</span>
            <ShoppingCart size={18} />
          </button>
        </div>

        <div className="option4-stack">
          <div className="stack-card">
            <div className="stack-heading">
              <Sparkles size={18} />
              <span>Erlebnis für Kund:innen</span>
            </div>
            <ul>
              <li>Chat & WhatsApp: sympathische Begrüßung, klare Schritte, feste Slots.</li>
              <li>Umbuchen & Absagen in Sekunden – Nachrücker werden automatisch gefragt.</li>
              <li>Automatische Erinnerungen mit Ein-Klick-Bestätigung.</li>
            </ul>
          </div>

          <div className="stack-card">
            <div className="stack-heading">
              <Target size={18} />
              <span>Erlebnis für Team</span>
            </div>
            <ul>
              <li>Alle Notizen im Kalender/CRM, inklusive Anlass, Dauer, besondere Wünsche.</li>
              <li>Konfliktfreie Planung: Puffer, Pausen, Blackouts werden respektiert.</li>
              <li>Alerts bei VIPs, Engpässen oder vollen Tagen in Slack/Teams.</li>
            </ul>
          </div>

          <div className="stack-card">
            <div className="stack-heading">
              <LineChart size={18} />
              <span>Ergebnis & KPIs</span>
            </div>
            <ul>
              <li>Weniger No-Shows, mehr Auslastung durch Nachrücker-Logik.</li>
              <li>Messbare Zeitersparnis im Frontoffice.</li>
              <li>Saubere Datenbasis für Forecast & Staffing.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )

  const trendPackage = {
    id: 'ki-terminplanung-support',
    title: 'Monatlicher Support',
    price: 49,
    description:
      'Support & Monitoring nach Go-Live: wir optimieren Slots, Texte und Automatisierungen laufend.',
    category: 'KI Automatisierung'
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
    <div className="social-media-consulting-page trendanalyse-page">
      <HighlightBand />

      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-content">
          <Sparkles className="divider-icon" />
          <span className="divider-text">KI Terminplanung</span>
          <Sparkles className="divider-icon" />
        </div>
        <div className="divider-line"></div>
      </div>

      <LayoutToggle />
      {layout === 'option1' && <Option1 />}
      {layout === 'option2' && <Option2 />}
      {layout === 'option3' && <Option3 />}
      {layout === 'option4' && <Option4 />}

      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-content">
          <Sparkles className="divider-icon" />
          <span className="divider-text">Leistungsumfang</span>
          <Sparkles className="divider-icon" />
        </div>
        <div className="divider-line"></div>
      </div>

      <section className="package-section">
        <div className="package-container">
          <div className="package-content">
            <h2 className="package-title">Was Sie erhalten</h2>

            <div className="package-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <TrendingUp size={32} />
                </div>
                <div className="feature-text">
                  <h3>Automatisierte Terminannahme</h3>
                  <p>Chatbot nimmt Anfragen entgegen, prüft Regeln und bestätigt passende Slots.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <BarChart3 size={32} />
                </div>
                <div className="feature-text">
                  <h3>No-Show Reduktion</h3>
                  <p>Erinnerungen, einfache Umbuchung, Nachrücker-Logik wenn Slots frei werden.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <LineChart size={32} />
                </div>
                <div className="feature-text">
                  <h3>Kalender- & Tool-Integrationen</h3>
                  <p>Einbindung in Google/Microsoft Kalender, CRM oder Ticketing nach Bedarf.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <Target size={32} />
                </div>
                <div className="feature-text">
                  <h3>Qualifizierte Termine</h3>
                  <p>Kontextfragen landen als Notiz beim Termin – damit das Team vorbereitet startet.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <PieChart size={32} />
                </div>
                <div className="feature-text">
                  <h3>Live-Dashboard</h3>
                  <p>Einsicht in Auslastung, beantwortete Anfragen, gewonnene Slots und Abbrüche.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <Zap size={32} />
                </div>
                <div className="feature-text">
                  <h3>Alerts in Echtzeit</h3>
                  <p>Slack/Teams/WhatsApp Alerts bei VIP-Anfragen, Konflikten oder vollen Tagen.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="package-cta">
              <div className="price-container">
              <span className="price-label">Investition</span>
              <div className="price-wrapper">
                <span className="price-currency">€</span>
                <span className="price-amount">49</span>
              </div>
              <span className="price-note">Support pro Monat nach Go-Live</span>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart} aria-label="Zum Warenkorb hinzufügen">
              <ShoppingCart size={24} />
              <span>Monatlichen Support buchen</span>
            </button>

            <p className="cta-note">
              Nach dem Go-Live überwachen wir Ihr System, passen Texte/Regeln an und halten Slots stabil gefüllt.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider fancy no-text">
        <div className="divider-line swoosh-left"></div>
        <div className="divider-line swoosh-right"></div>
      </div>
    </div>
  )
}

export default Trendanalyse
