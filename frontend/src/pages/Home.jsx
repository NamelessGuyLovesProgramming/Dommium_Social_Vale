import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, Sparkles, TrendingUp, MessageCircle, Shield } from 'lucide-react'
import './Home.css'

// Cinematic Scroll Journey Component
const Home = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState(0)
  const [showContent, setShowContent] = useState({})
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef(null)
  const observerRefs = useRef([])

  // Scroll Progress tracking - Pfeil bewegt sich mit Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight

      // Wir haben 5 Sektionen à 100vh
      // Video: 0vh - 100vh (Sektion 0)
      // Service 1: 100vh - 200vh (Sektion 1) - Mitte bei 150vh
      // Service 2: 200vh - 300vh (Sektion 2) - Mitte bei 250vh
      // Service 3: 300vh - 400vh (Sektion 3) - Mitte bei 350vh
      // Service 4: 400vh - 500vh (Sektion 4) - Mitte bei 450vh

      // Wegweiser läuft vom Start (0vh) bis zum Ende (500vh)
      const startScroll = 0 // Start vom Anfang (0vh)
      const endScroll = windowHeight * 5.0 // Ende bei 500vh

      const scrollInRange = Math.max(0, Math.min(scrollTop - startScroll, endScroll - startScroll))
      const progress = scrollInRange / (endScroll - startScroll)

      console.log('SCROLL EVENT! scrollTop:', scrollTop, 'scrollInRange:', scrollInRange, 'progress:', progress)
      setScrollProgress(progress)
    }

    console.log('Window Scroll Listener aktiviert')
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ref für den SVG-Pfad
  const pathRef = useRef(null)
  const videoSectionRef = useRef(null)
  const [arrowPos, setArrowPos] = useState({ x: 50, y: 0, angle: 90 })
  const [videoEndOffset, setVideoEndOffset] = useState(0)

  // Messe die Video-Sektion Höhe (responsiv)
  useEffect(() => {
    const measureVideoSection = () => {
      if (!videoSectionRef.current) return

      const videoHeight = videoSectionRef.current.offsetHeight
      const totalHeight = document.documentElement.scrollHeight

      // Berechne Prozentsatz wo Video endet (in Bezug auf 500vh)
      const videoEndPercent = (videoHeight / totalHeight) * 500

      console.log('Video Height:', videoHeight, 'Total Height:', totalHeight, 'Video End %:', videoEndPercent)
      setVideoEndOffset(videoEndPercent)
    }

    measureVideoSection()
    window.addEventListener('resize', measureVideoSection)

    // Kurze Verzögerung für DOM-Rendering
    setTimeout(measureVideoSection, 100)

    return () => window.removeEventListener('resize', measureVideoSection)
  }, [])

  // Berechne Pfeil-Position PRÄZISE entlang des SVG-Pfads
  useEffect(() => {
    if (!pathRef.current) return

    const path = pathRef.current
    const pathLength = path.getTotalLength()

    // Position auf dem Pfad basierend auf Scroll-Progress
    const point = path.getPointAtLength(scrollProgress * pathLength)

    // Berechne Winkel für Pfeil-Rotation
    const nextPoint = path.getPointAtLength(Math.min(scrollProgress * pathLength + 1, pathLength))
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)

    console.log('ScrollProgress:', scrollProgress)
    console.log('Point:', point)
    console.log('Arrow Position:', { x: point.x, y: point.y, angle: angle + 90 })

    setArrowPos({
      x: point.x,
      y: point.y,
      angle: angle + 90 // +90 weil Pfeil nach unten zeigt
    })
  }, [scrollProgress])

  // Service-Karten Konfiguration
  const services = [
    {
      id: 'content-creation',
      title: 'Content Creation',
      subtitle: null,
      icon: Sparkles,
      route: '/services/content',
      position: 'right', // Wegweiser links → Karte rechts

      features: [
        'Social Media Posts & Reels',
        'Video-Produktion & Editing',
        'Content-Strategie & Planung',
        'Community Management'
      ]
    },
    {
      id: 'social-media',
      title: 'Social Media Beratung',
      subtitle: 'Strategien, die Ihre Reichweite maximieren',
      icon: MessageCircle,
      route: '/services/social-media',
      position: 'left', // Wegweiser rechts → Karte links

      features: [
        'Strategische Analyse',
        'Zielgruppenforschung',
        'Performance-Optimierung',
        'Trend-Integration'
      ]
    },
    {
      id: 'trends',
      title: 'Trendanalyse',
      subtitle: 'Datengestützte Insights für Ihren Erfolg',
      icon: TrendingUp,
      route: '/services/trends',
      position: 'right', // Wegweiser links → Karte rechts

      features: [
        'Multi-Source Datenanalyse',
        'Wöchentliche Trend-Reports',
        'Competitor Intelligence',
        'Real-Time Alerts'
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Digitalisierung',
      subtitle: 'Schutz und Innovation für Ihr Unternehmen',
      icon: Shield,
      route: '/services/cybersecurity',
      position: 'left', // Wegweiser rechts → Karte links

      features: [
        'Sicherheits-Audit',
        'Penetration Testing',
        'Datenschutz-Compliance',
        'Digitalisierungs-Roadmap'
      ]
    }
  ]

  // Intersection Observer für Wegpunkte
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionIndex = parseInt(entry.target.dataset.section)

        if (entry.isIntersecting) {
          setActiveSection(sectionIndex)

          // Content nur laden wenn Sektion aktiv wird (Pfeil erreicht Wegpunkt)
          if (sectionIndex > 0) {
            setTimeout(() => {
              setShowContent(prev => ({ ...prev, [sectionIndex]: true }))
            }, 600) // Verzögerung für Pfeil-Animation
          }
        }
      })
    }, options)

    observerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="home-container" ref={containerRef}>
      {/* SVG PFAD - Gemalt auf den Seiten - Startet im Video! */}
      <svg className="journey-path" viewBox="0 0 100 500" preserveAspectRatio="none">
        {/* Hintergrund Pfad (unsichtbar, nur für getPointAtLength) */}
        <path
          ref={pathRef}
          d="M 50 0
             L 50 95
             L 2 95
             C 2 102, 10 104, 50 105
             C 90 106, 98 108, 98 115
             L 98 195
             C 98 202, 90 204, 50 205
             C 10 206, 2 208, 2 215
             L 2 295
             C 2 302, 10 304, 50 305
             C 90 306, 98 308, 98 315
             L 98 395
             C 98 402, 90 404, 50 405
             C 10 406, 2 408, 2 415
             L 2 500"
          fill="none"
          stroke="transparent"
          strokeWidth="6"
        />

        {/* Aktiver Pfad (wächst mit Scroll - vom Pfeil "gezeichnet") */}
        <motion.path
          d="M 50 0
             L 50 95
             L 2 95
             C 2 102, 10 104, 50 105
             C 90 106, 98 108, 98 115
             L 98 195
             C 98 202, 90 204, 50 205
             C 10 206, 2 208, 2 215
             L 2 295
             C 2 302, 10 304, 50 305
             C 90 306, 98 308, 98 315
             L 98 395
             C 98 402, 90 404, 50 405
             C 10 406, 2 408, 2 415
             L 2 500"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="12 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: scrollProgress }}
          transition={{ duration: 0, ease: "linear" }}
        />

        {/* Gradient für den Pfad */}
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="50%" stopColor="#764ba2" />
            <stop offset="100%" stopColor="#f093fb" />
          </linearGradient>
        </defs>
      </svg>

      {/* PFEIL - Fährt PRÄZISE auf dem SVG-Pfad entlang */}
      <div
        className="journey-arrow"
        style={{
          left: `${arrowPos.x}%`,
          top: `${arrowPos.y}vh`,
          transform: `translate(-50%, -50%) rotate(${arrowPos.angle}deg)`
        }}
      >
        <ChevronDown size={48} style={{ color: 'white' }} />
      </div>

      {/* Sektion 1: Video Hero */}
      <section
        className="home-section video-section"
        data-section="0"
        ref={el => {
          observerRefs.current[0] = el
          videoSectionRef.current = el
        }}
      >
        <motion.div
          className="video-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
            src="/videos/file_example_MP4_1280_10MG.mp4"
          >
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        </motion.div>

        <motion.div
          className="scroll-hint"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p>Scroll für mehr</p>
        </motion.div>
      </section>

      {/* Service Sektionen */}
      {services.map((service, index) => {
        const Icon = service.icon
        const sectionIndex = index + 1

        return (
          <section
            key={service.id}
            className={`home-section service-section ${service.position}`}
            data-section={sectionIndex}
            ref={el => observerRefs.current[sectionIndex] = el}

          >
            <AnimatePresence>
              {showContent[sectionIndex] && (
                <motion.div
                  className="service-card"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                >
                  <motion.div
                    className="service-icon"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                  >
                    <Icon size={64} />
                  </motion.div>

                  <motion.h2
                    className="service-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    onClick={() => navigate(service.route)}
                    style={{ cursor: 'pointer' }}
                  >
                    {service.title}
                  </motion.h2>

                  {service.subtitle && (
                    <motion.p
                      className="service-subtitle"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {service.subtitle}
                    </motion.p>
                  )}

                  <motion.div
                    className="service-features"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="feature-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.1, duration: 0.4 }}
                      >
                        <span className="feature-bullet">✓</span>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.button
                    className="service-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    onClick={() => navigate(service.route)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Mehr erfahren
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )
      })}
    </div>
  )
}

export default Home
