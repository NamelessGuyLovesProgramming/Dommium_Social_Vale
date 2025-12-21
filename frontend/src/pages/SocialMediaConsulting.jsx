import React, { useState, useMemo } from 'react'

import { useCart } from '../context/CartContext'
import {
  ShoppingCart,
  Sparkles,
  Instagram,
  BarChart3,
  MessageCircle,
  ClipboardList,
  Check,
  Clock,
  FileText
} from 'lucide-react'

import LogoLoop from '../components/LogoLoop/LogoLoop'
import AnimatedBadge from '../components/AnimatedBadge/AnimatedBadge'

import './SocialMediaConsulting.css'

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
          { src: '', title: 'Beratung', node: <span style={{ fontWeight: 700 }}>Beratung</span> },
          { src: '', title: 'Beratung', node: <span style={{ fontWeight: 700 }}>Beratung</span> },
          { src: '', title: 'Beratung', node: <span style={{ fontWeight: 700 }}>Beratung</span> }
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

const SocialMediaConsulting = () => {
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
    id: 'beratung-wachstum-14tage',
    title: 'Wachstums Social Media Paket',
    price: 1399,
    description:
      'In 14 Tagen zur klaren Social Media Strategie mit Contentplan und messbarer Einschätzung, was es Ihnen bringt.',
    category: 'Beratung'
  }

  const growthEyebrow = 'INTENSIV-SPRINT · 14 TAGE'

  const growthTagline =
    'In 14 Tagen zur klaren Social Media Strategie – inklusive Contentplan und messbarer Einschätzung, was es Ihnen bringt.'

  const growthForWhom =
    'Für Selbstständige und Unternehmen, die Social Media professionell starten oder verbessern wollen, ohne Zeit in falsche Kanäle und planlosen Content zu verlieren.'

  const growthHighlights = [
    { icon: ClipboardList, text: 'Klare Strategie & Prioritäten' },
    { icon: Instagram, text: 'Kanalstrategie (welche Plattform lohnt sich?)' },
    { icon: MessageCircle, text: 'Kommunikations-Leitfaden (Dos & Donts)' },
    { icon: BarChart3, text: 'ROI-Einschätzung mit Beispielrechnung' }
  ]

  const growthIncludes = [
    'Status quo Analyse Ihrer aktuellen Online Präsenz inklusive UX Blick',
    'Zielgruppen und Positionierung: wer soll angesprochen werden und warum',
    'Kanalstrategie: welche Plattformen sich für Ihr Geschäft lohnen',
    'Kommunikations Leitfaden: Tonalität, Themen, Formate, Dos und Donts',
    'Contentplan: konkrete Ideen und Posting Rhythmus für 30 Tage',
    'Benchmark: Vergleich mit ähnlichen Marktteilnehmern',
    'ROI Einschätzung: Beispielrechnung zu Aufwand, Budget und realistischen Effekten',
    'Abschluss Call mit Prioritätenliste und nächstem Schritt Plan'
  ]

  const growthProcess = [
    'Kickoff Call 30 bis 45 Minuten Ziel, Angebot, Kunden, Ressourcen',
    'Analyse und Strategie Auswertung und Erstellung der Unterlagen',
    'Strategie Session 60 bis 90 Minuten Präsentation und Umsetzungsschritte'
  ]

  const growthOutcome =
    'Sie wissen exakt, was Sie posten, wo Sie starten, wie Sie kommunizieren und wie Sie konsistent bleiben. Plus ein Plan, der zu Ihren Kapazitäten passt.'

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
        { id: 'option3', label: 'Layout 3' }
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
              <span className="price-amount">1.399</span>
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
                  <span>Sie wissen, welche Plattformen sich für Ihr Geschäft lohnen.</span>
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>Sie haben einen konkreten Contentplan für 30 Tage – passend zu Ihren Kapazitäten.</span>
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>Sie bekommen eine realistische ROI‑Einschätzung (mit Beispielrechnung) statt Bauchgefühl.</span>
                </li>
              </ul>
            </div>

            <div className="offer-note">
              Klarheit statt Content‑Chaos: Sie erhalten Unterlagen, Leitfaden und nächste Schritte – auch wenn Sie danach
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
                  <span className="price-amount">1.399</span>
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
                  <span>Sie wissen, welche Plattformen sich für Ihr Geschäft lohnen.</span>
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>Sie haben einen konkreten Contentplan für 30 Tage – passend zu Ihren Kapazitäten.</span>
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  <span>Sie bekommen eine realistische ROI‑Einschätzung (mit Beispielrechnung) statt Bauchgefühl.</span>
                </li>
              </ul>
            </div>

            <div className="offer-note">
              Klarheit statt Content‑Chaos: Sie erhalten Unterlagen, Leitfaden und nächste Schritte – auch wenn Sie danach
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
                  <span className="price-amount">1.399</span>
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

  return (
    <div className="social-media-consulting-page">
      <HighlightBand />

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-description">
              <h1 className="hero-title">
                Ihr Auftritt Online ist die Kommunikation von dem wer Sie sind und was Sie machen..
                <br />
                <br />
                ohne diese..
              </h1>

              <p>
                Ist diese nicht reflektierend der Qualität die Sie liefern, egal in welchem Ausmaß, werden Sie ebenfalls
                nur zu diesem Ausmaß wahrgenommen.
              </p>
              <p>
                Gibt es keine Online Präsenz, sind Sie nicht in der Hauptkommunikationssphäre des 21. Jahrhunderts sichtbar.
              </p>
              <p>Das sollte geändert werden!</p>
              <p>
                Auch wenn Ihre Kunden eventuell nicht auf etwa Social Media scrollen - Ihre Mitarbeiter tun das jedoch sehr
                wohl! Von dem Kommunizieren ein attraktiver Arbeitgeber zu sein bis hin tatsächliche Neukunden zu generieren
                - Alles spielt sich heutzutage auf diesen Kanälen ab.
              </p>
              <p>
                Lassen Sie uns gemeinsam das grundlegende Verständnis der modernen Online Welten durchgehen, Sie drauf
                vorbereiten was wirklich auf Sie zukommt und wie Sie ein Nutzen für Ihr Unternehmen daraus ziehen können.
              </p>
            </div>
          </div>

          <div className="hero-media">
            <div className="video-wrapper">
              <video autoPlay loop muted playsInline className="hero-video">
                <source src="/videos/file_example_MP4_1280_10MG.mp4" type="video/mp4" />
                Ihr Browser unterstützt keine Videos.
              </video>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-content">
          <Sparkles className="divider-icon" />
          <span className="divider-text">Social Media Beratung</span>
          <Sparkles className="divider-icon" />
        </div>
        <div className="divider-line"></div>
      </div>

      <LayoutToggle />

      {layout === 'option1' && <Option1 />}
      {layout === 'option2' && <Option2 />}
      {layout === 'option3' && <Option3 />}

      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-content">
          <Sparkles className="divider-icon" />
          <span className="divider-text">Cyber Security Beratung</span>
          <Sparkles className="divider-icon" />
        </div>
        <div className="divider-line"></div>
      </div>

      <section className="coming-soon">
        <div className="coming-card">
          <div className="coming-eyebrow">Cybersecurity Beratung</div>
          <h3 className="coming-title">Auch bald für Sie erreichbar</h3>
          <p className="coming-text">
            Wir arbeiten an einem dedizierten Angebot, das Ihre digitalen Assets schützt und Compliance vereinfacht. Bald
            mehr.
          </p>
        </div>
      </section>

      <div className="section-divider fancy no-text">
        <div className="divider-line swoosh-left"></div>
        <div className="divider-line swoosh-right"></div>
      </div>
    </div>
  )
}

export default SocialMediaConsulting
