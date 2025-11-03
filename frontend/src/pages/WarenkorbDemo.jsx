import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadDemoCart } from '../data/demoCartData'
import './WarenkorbDemo.css'

const WarenkorbDemo = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Demo-Items automatisch laden
    loadDemoCart()
  }, [])

  const handleGoToCart = () => {
    navigate('/warenkorb')
  }

  return (
    <div className="warenkorb-demo-page">
      <div className="demo-container">
        <div className="demo-icon">🛒</div>

        <h1 className="demo-title">Warenkorb Demo</h1>

        <p className="demo-message">
          Ich habe 3 Test-Items in deinen Warenkorb geladen:
        </p>

        <div className="demo-items-preview">
          <div className="preview-item">
            <span className="preview-icon">✓</span>
            <div>
              <strong>Content Creation</strong>
              <span className="preview-price">899€</span>
            </div>
          </div>

          <div className="preview-item">
            <span className="preview-icon">✓</span>
            <div>
              <strong>Marketing & Beratung</strong>
              <span className="preview-price">1.299€</span>
            </div>
          </div>

          <div className="preview-item">
            <span className="preview-icon">✓</span>
            <div>
              <strong>Trend-Analyse Software</strong>
              <span className="preview-price">499€</span>
            </div>
          </div>
        </div>

        <div className="demo-total">
          <strong>Gesamt:</strong>
          <span>2.697€</span>
        </div>

        <button className="demo-button" onClick={handleGoToCart}>
          Zum Warenkorb
        </button>

        <p className="demo-note">
          💡 Die Items bleiben im Warenkorb, bis du sie löschst oder eine Anfrage sendest.
        </p>
      </div>
    </div>
  )
}

export default WarenkorbDemo
