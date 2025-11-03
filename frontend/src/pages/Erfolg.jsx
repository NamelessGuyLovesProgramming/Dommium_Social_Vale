import { useNavigate } from 'react-router-dom'
import { CheckCircle, Home, ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'
import './Erfolg.css'

const Erfolg = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Konfetti-Animation (optional)
    // Hier könnte ein Confetti-Effekt hinzugefügt werden
  }, [])

  return (
    <div className="erfolg-page">
      <div className="erfolg-container">
        <div className="erfolg-icon">
          <CheckCircle size={80} strokeWidth={1.5} />
        </div>

        <h1 className="erfolg-title">Vielen Dank für Ihre Anfrage!</h1>

        <p className="erfolg-message">
          Wir haben Ihre Anfrage erfolgreich erhalten und werden uns schnellstmöglich bei Ihnen melden.
        </p>

        <div className="erfolg-info">
          <div className="info-item">
            <h3>Was passiert jetzt?</h3>
            <ul>
              <li>Wir prüfen Ihre Anfrage im Detail</li>
              <li>Sie erhalten innerhalb von 24 Stunden eine Rückmeldung</li>
              <li>Gemeinsam besprechen wir die nächsten Schritte</li>
            </ul>
          </div>

          <div className="info-item">
            <h3>Kontakt</h3>
            <p>
              Bei dringenden Fragen erreichen Sie uns auch direkt per E-Mail unter:{' '}
              <a href="mailto:vale.gueden@gmail.com">vale.gueden@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="erfolg-actions">
          <button
            className="primary-button"
            onClick={() => navigate('/')}
          >
            <Home size={20} />
            Zurück zur Startseite
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate('/portfolio')}
          >
            Portfolio ansehen
          </button>
        </div>
      </div>
    </div>
  )
}

export default Erfolg
