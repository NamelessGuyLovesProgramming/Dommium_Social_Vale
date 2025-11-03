import { Trash2, Plus, Minus } from 'lucide-react'
import './CartItem.css'

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const quantity = item.quantity || 1
  const totalPrice = item.price ? item.price * quantity : null

  const handleIncrease = () => {
    onUpdateQuantity(item.id, quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(item.id, quantity - 1)
    }
  }

  return (
    <div className="cart-item">
      <div className="cart-item-content">
        <div className="cart-item-left">
          <div className="cart-item-logo">
            {item.logo ? (
              <img src={item.logo} alt={item.title} />
            ) : (
              <div className="cart-item-logo-placeholder">
                {item.title?.charAt(0) || '?'}
              </div>
            )}
          </div>
          <div className="cart-item-details">
            <h3 className="cart-item-title">{item.title}</h3>
            {item.items && item.items.length > 0 && (
              <ul className="cart-item-list">
                {item.items.map((subItem, index) => (
                  <li key={index}>{subItem}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="cart-item-right">
          <div className="cart-item-quantity-controls">
            <button
              className="quantity-btn"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Menge verringern"
            >
              <Minus size={16} />
            </button>
            <span className="quantity-display">{quantity}</span>
            <button
              className="quantity-btn"
              onClick={handleIncrease}
              aria-label="Menge erhöhen"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="cart-item-price">
            {totalPrice ? `${totalPrice.toLocaleString('de-DE')}€` : 'Preis auf Anfrage'}
            {quantity > 1 && item.price && (
              <span className="price-per-unit">
                ({item.price.toLocaleString('de-DE')}€ / Stück)
              </span>
            )}
          </div>

          <button
            className="cart-item-remove"
            onClick={() => onRemove(item.id)}
            aria-label="Artikel entfernen"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="cart-item-disclaimer">
        Die Anfrage ist bis hierhin unverbindlich. Wir werden uns an Ihre angegebenen Daten wenden und dort in Kontakt treten.
      </div>
    </div>
  )
}

export default CartItem
