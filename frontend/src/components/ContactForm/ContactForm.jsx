import { useState } from 'react'
import { Send } from 'lucide-react'
import './ContactForm.css'

const ContactForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Bitte geben Sie Ihren Namen ein'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Bitte geben Sie Ihre E-Mail ein'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail ein'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Bitte geben Sie Ihre Telefonnummer ein'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Fehler für dieses Feld entfernen
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3 className="contact-form-title">Ihre Kontaktdaten</h3>

      <div className="contact-form-grid">
        <div className="form-field">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Max Mustermann"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">E-Mail *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="max@beispiel.de"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Telefon *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="+49 123 456789"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-field form-field-full">
          <label htmlFor="message">Nachricht (optional)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Haben Sie noch weitere Wünsche oder Anmerkungen?"
          />
        </div>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Wird gesendet...
          </>
        ) : (
          <>
            <Send size={20} />
            Anfrage senden
          </>
        )}
      </button>
    </form>
  )
}

export default ContactForm
