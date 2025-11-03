import emailjs from '@emailjs/browser'

// EmailJS Konfiguration
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // Später durch echten Service-ID ersetzen
  templateId: 'YOUR_TEMPLATE_ID', // Später durch echten Template-ID ersetzen
  publicKey: 'YOUR_PUBLIC_KEY' // Später durch echten Public Key ersetzen
}

/**
 * Sendet eine Warenkorb-Anfrage per Email via EmailJS
 * @param {Object} formData - Kundendaten (name, email, phone, message)
 * @param {Array} cartItems - Array von Warenkorb-Items
 * @returns {Promise} EmailJS Response
 */
export const sendCartInquiry = async (formData, cartItems) => {
  // Template-Parameter für EmailJS
  const templateParams = {
    // Kundendaten
    customer_name: formData.name,
    customer_email: formData.email,
    customer_phone: formData.phone,
    customer_message: formData.message || 'Keine zusätzliche Nachricht',

    // Warenkorb-Items formatiert
    cart_items: formatCartItems(cartItems),

    // Gesamtpreis
    total_price: calculateTotalPrice(cartItems),

    // Zeitstempel
    timestamp: new Date().toLocaleString('de-DE')
  }

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('✅ Email erfolgreich gesendet:', response)
    return response
  } catch (error) {
    console.error('❌ Fehler beim Email-Versand:', error)
    throw error
  }
}

/**
 * Formatiert Warenkorb-Items für die Email
 */
const formatCartItems = (items) => {
  return items
    .map((item, index) => {
      const subItems = item.items && item.items.length > 0
        ? item.items.map(sub => `  - ${sub}`).join('\n')
        : ''

      return `${index + 1}. ${item.title}
${subItems}
   Preis: ${item.price ? `${item.price.toLocaleString('de-DE')}€` : 'Auf Anfrage'}
`
    })
    .join('\n---\n')
}

/**
 * Berechnet Gesamtpreis
 */
const calculateTotalPrice = (items) => {
  const total = items.reduce((sum, item) => {
    return sum + (item.price || 0)
  }, 0)

  return total > 0 ? `${total.toLocaleString('de-DE')}€` : 'Auf Anfrage'
}
