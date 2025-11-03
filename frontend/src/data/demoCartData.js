// Demo-Daten für Warenkorb zum Testen

export const demoCartItems = [
  {
    id: 'content-creation-premium',
    title: 'Content Creation',
    logo: null,
    items: [
      'Starter Paket',
      'Addon - Imagefilm',
      'Social Media Integration',
      '3 Monate Betreuung'
    ],
    price: 899,
    quantity: 1
  },
  {
    id: 'marketing-beratung-pro',
    title: 'Marketing & Beratung',
    logo: null,
    items: [
      '6-Monats-Paket',
      'Social Media Audit',
      'Konkurrenzanalyse',
      'Monatliche Reports'
    ],
    price: 1299,
    quantity: 1
  },
  {
    id: 'trend-analyse-enterprise',
    title: 'Trend-Analyse Software',
    logo: null,
    items: [
      'Premium Lizenz (1 Jahr)',
      'API Zugang',
      'Custom Dashboards',
      'Priority Support'
    ],
    price: 499,
    quantity: 1
  }
]

export const loadDemoCart = () => {
  localStorage.setItem('dominium-cart', JSON.stringify(demoCartItems))
  console.log('✅ Demo-Warenkorb geladen!')
}

export const clearDemoCart = () => {
  localStorage.removeItem('dominium-cart')
  console.log('🗑️ Warenkorb geleert!')
}
