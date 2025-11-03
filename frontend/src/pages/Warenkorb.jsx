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

  return (
    <div className="warenkorb-page">
      <div className="warenkorb-container">
        <h1 className="warenkorb-title">Ihr Einkaufswagen</h1>

        <div className="warenkorb-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        <ContactForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Warenkorb
