import emailjs from '@emailjs/browser'

// EmailJS Konfiguration
const EMAILJS_CONFIG = {
  serviceId: 'service_ams28jc',
  templateId: 'template_b60rjbn',
  publicKey: 'bp7i9fr_CoJYWKx4x'
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

  console.log('📧 Sende Email mit Params:', templateParams) // DEBUG LOG

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
      // Clean up service name
      const category = item.category || 'Service'
      let name = item.title
      if (name && name.startsWith(`${category} - `)) {
        name = name.replace(`${category} - `, "")
      } else if (name && name.startsWith(category)) {
        name = name.replace(category, "").trim()
        if (name.startsWith("-") || name.startsWith(":")) name = name.substring(1).trim()
      }
      if (!name) name = item.title // Fallback

      const priceDisplay = item.price > 0 
        ? `${item.price.toLocaleString('de-DE')}€` 
        : 'VB (Auf Anfrage)'

      return `[${category.toUpperCase()}]
• ${name}
  Preis: ${priceDisplay}`
    })
    .join('\n\n')
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
