import { Trash2 } from 'lucide-react'
import './CartItem.css'

const CartItem = ({ category, items, onRemove }) => {
  // Calculate category total price
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0)
  const hasInquiryOnly = items.some(item => !item.price || item.price === 0)

  // Helper to clean service names
  const getCleanName = (item) => {
    let name = item.title
    if (name && name.startsWith(`${category} - `)) {
      return name.replace(`${category} - `, "")
    }
    if (name && name.startsWith(category)) {
      let cleaned = name.replace(category, "").trim()
      if (cleaned.startsWith("-") || cleaned.startsWith(":")) {
        cleaned = cleaned.substring(1).trim()
      }
      return cleaned || item.tier || item.title
    }
    return name
  }

  return (
    <div className="cart-item-pill">
      <div className="pill-content">
        {/* Category Header */}
        <h3 className="pill-category">{category}</h3>
        
        {/* List of Services in this Category */}
        <div className="pill-services-list">
          {items.map((item) => (
            <div key={item.id} className="pill-service-row">
              <div className="pill-service-info">
                <span className="pill-service-name">- {getCleanName(item)}</span>
                <span className="pill-service-price-inline">
                  {item.price > 0 ? (
                    `${item.price.toLocaleString('de-DE')}€`
                  ) : (
                    <span className="vb-tooltip-wrapper" title="Verhandlungsbasis: Preis wird im individuellen Gespräch ermittelt">
                      VB
                    </span>
                  )}
                </span>
              </div>
              <button
                className="remove-item-inline"
                onClick={() => onRemove(item.id)}
                aria-label="Entfernen"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        
        {/* Divider Line */}
        <div className="cart-divider-line"></div>

        {/* Category Total / Price Tag */}
        <div className="pill-price-tag">
          {totalPrice > 0 
            ? `${totalPrice.toLocaleString('de-DE')}€${hasInquiryOnly ? ' + Auf Anfrage' : ''}`
            : "Preis auf Anfrage"
          }
        </div>
      </div>
    </div>
  )
}

export default CartItem
