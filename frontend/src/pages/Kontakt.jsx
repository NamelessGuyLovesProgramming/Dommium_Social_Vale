import { useState } from 'react'
import { MapPin, Globe, Mail, Phone, Instagram, Linkedin, Twitter, Send, Clock } from 'lucide-react'
import './Kontakt.css'

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte gültige E-Mail eingeben'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="kontakt-page">
      <div className="kontakt-header">
        <h1 className="kontakt-title">Lass uns gemeinsam starten</h1>
        <p className="kontakt-subtitle">
          Bereit für datengestützte Social Media Strategien? Wir sind für dich da.
        </p>
      </div>

      <div className="kontakt-container">
        {/* Left Side - Contact Info */}
        <div className="kontakt-info-card">
          <div className="info-section">
            <div className="info-icon-wrapper">
              <MapPin className="info-icon" />
            </div>
            <h3>Standorte</h3>
            <p>Hildesheim / Hannover</p>
          </div>

          <div className="info-section">
            <div className="info-icon-wrapper">
              <Globe className="info-icon" />
            </div>
            <h3>Reichweite</h3>
            <p>Deutschlandweit aktiv</p>
          </div>

          <div className="info-section">
            <div className="info-icon-wrapper">
              <Mail className="info-icon" />
            </div>
            <h3>E-Mail</h3>
            <a href="mailto:info@dominium-sociale.de" className="info-link">
              info@dominium-sociale.de
            </a>
          </div>

          <div className="info-section">
            <div className="info-icon-wrapper">
              <Phone className="info-icon" />
            </div>
            <h3>Telefon</h3>
            <a href="tel:+4915112345678" className="info-link">
              +49 151 1234 5678
            </a>
          </div>

          <div className="info-section">
            <div className="info-icon-wrapper">
              <Clock className="info-icon" />
            </div>
            <h3>Antwortzeit</h3>
            <p>Wir melden uns innerhalb von 24 Stunden</p>
          </div>

          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Instagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="kontakt-form-wrapper">
          {submitSuccess && (
            <div className="success-message">
              ✓ Nachricht erfolgreich gesendet! Wir melden uns bald.
            </div>
          )}

          <form onSubmit={handleSubmit} className="kontakt-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Dein Name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-Mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="deine@email.de"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefon (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+49 ..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Nachricht *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Erzähl uns von deinem Projekt..."
                rows="6"
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Wird gesendet...'
              ) : (
                <>
                  Nachricht senden
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Kontakt
