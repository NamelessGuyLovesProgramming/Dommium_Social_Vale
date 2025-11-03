import { Trash2 } from 'lucide-react'
import './CartItem.css'

const CartItem = ({ item, onRemove }) => {
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
          <div className="cart-item-price">
            {item.price ? `${item.price.toLocaleString('de-DE')}€` : 'Preis auf Anfrage'}
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
