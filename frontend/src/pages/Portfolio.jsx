import CircularGallery from '../components/CircularGallery/CircularGallery'
import './Portfolio.css'

const Portfolio = () => {
  const projects = [
    {
      src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=800&fit=crop',
      title: 'Fashion Brand Revival',
      description: '+340% Instagram Reichweite in 3 Monaten'
    },
    {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop',
      title: 'E-Commerce Analytics Dashboard',
      description: 'Echtzeit Trend-Analyse für maximalen ROI'
    },
    {
      src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop',
      title: 'Social Media Growth Strategie',
      description: '2.5M Impressions organisch generiert'
    },
    {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=800&fit=crop',
      title: 'Brand Relaunch Kampagne',
      description: 'Komplette Neupositionierung mit viralen Content'
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop',
      title: 'Data-Driven Content Serie',
      description: 'KI-gestützte Trend-Vorhersage für perfektes Timing'
    },
    {
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop',
      title: 'Influencer Kooperation',
      description: 'Authentische Partnerschaften mit messbaren Ergebnissen'
    }
  ]

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1 className="portfolio-title">Unsere Erfolge</h1>
        <p className="portfolio-subtitle">
          Datengestützte Projekte, die Vertrauen schaffen und Ergebnisse liefern
        </p>
      </div>

      <div className="gallery-container">
        <CircularGallery
          items={projects}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.08}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>

      <div className="portfolio-stats">
        <div className="stat-item">
          <h3>50+</h3>
          <p>Erfolgreiche Projekte</p>
        </div>
        <div className="stat-item">
          <h3>2.5M+</h3>
          <p>Generierte Impressions</p>
        </div>
        <div className="stat-item">
          <h3>340%</h3>
          <p>Ø Reichweiten-Steigerung</p>
        </div>
        <div className="stat-item">
          <h3>98%</h3>
          <p>Kunden-Zufriedenheit</p>
        </div>
      </div>

      <div className="portfolio-cta">
        <h2>Bereit für Ihren Erfolg?</h2>
        <p>Lassen Sie uns gemeinsam Ihre Social Media Präsenz auf das nächste Level heben.</p>
        <a href="/kontakt" className="cta-button">Jetzt Kontakt aufnehmen</a>
      </div>
    </div>
  )
}

export default Portfolio
