import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem/CartItem'
import ContactForm from '../components/ContactForm/ContactForm'
import { sendCartInquiry } from '../services/emailService'
import { ShoppingCart } from 'lucide-react'
import './Warenkorb.css'

const Warenkorb = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData) => {
    setIsLoading(true)

    try {
      // Email via EmailJS senden
      await sendCartInquiry(formData, cartItems)

      // Nach Erfolg: Warenkorb leeren & zur Erfolgsseite
      clearCart()
      navigate('/erfolg')
    } catch (error) {
      console.error('Fehler beim Senden:', error)
      alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.')
    } finally {
      setIsLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="warenkorb-page">
        <div className="warenkorb-empty">
          <ShoppingCart size={64} strokeWidth={1.5} />
          <h1>Ihr Einkaufswagen ist leer</h1>
          <p>Fügen Sie Services hinzu, um eine Anfrage zu stellen.</p>
          <button
            className="back-button"
            onClick={() => navigate('/')}
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    )
  }

  // Gesamtpreis berechnen
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemTotal = item.price ? item.price * (item.quantity || 1) : 0
    return sum + itemTotal
  }, 0)

  const hasNonPriceItems = cartItems.some(item => !item.price)

  // Group items by category
  const groupedItems = cartItems.reduce((acc, item) => {
    const cat = item.category || "Service"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  return (
    <div className="warenkorb-page">
      {/* Highlight Header */}
      <div className="highlight-bar">
        <div className="highlight-bar-content">
          <h1 className="warenkorb-header-title">Warenkorb</h1>
        </div>
      </div>

      <div className="warenkorb-container">
        <div className="warenkorb-split-layout">
          {/* Left Column: Items & Summary */}
          <div className="warenkorb-left-col">
            <div className="warenkorb-items">
              {Object.entries(groupedItems).map(([category, items]) => (
                <CartItem
                  key={category}
                  category={category}
                  items={items}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Disclaimer Text */}
          <div className="warenkorb-right-col">
            <div className="disclaimer-box">
              <h3>Wichtiger Hinweis</h3>
              <p>
                Die Anfrage ist bis hierhin unverbindlich. Wir werden uns an Ihre angegebenen Daten wenden und dort in Kontakt treten.
              </p>
            </div>
          </div>
        </div>

        {/* Preissumme (Now Centered below split layout) */}
        <div className="warenkorb-summary-container">
          <div className="warenkorb-summary">
            {hasNonPriceItems && (
              <div className="summary-note">
                + Artikel mit individueller Preisgestaltung
              </div>
            )}
                      <div className="summary-row summary-total">
                        <span className="summary-label">Gesamtpreis:</span>
                        <span className="summary-value">
                          {totalPrice > 0 
                            ? `${totalPrice.toLocaleString('de-DE')}€${hasNonPriceItems ? ' + Auf Anfrage' : ''}`
                            : 'Auf Anfrage'}
                        </span>
                      </div>          </div>
        </div>

        {/* Contact Form Section (Bottom) */}
        <div className="warenkorb-contact-section">
          <ContactForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default Warenkorb
