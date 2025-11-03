import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  MessageSquare,
  Play,
  BrainCircuit,
  Shield,
  ChevronDown
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import './Header.css'

const Header = () => {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    {
      icon: MessageSquare,
      title: 'Social Media Beratung',
      link: '/services/social-media'
    },
    {
      icon: Play,
      title: 'Content Creation',
      link: '/services/content'
    },
    {
      icon: BrainCircuit,
      title: 'Trendanalyse',
      link: '/services/trends'
    },
    {
      icon: Shield,
      title: 'Cybersecurity & Digitalisierung',
      link: '/services/cybersecurity'
    }
  ]

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img
            src="/logo.png"
            alt="Dominium Sociale Logo"
            className="logo-img"
          />
        </Link>

        {/* Navigation */}
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>

          {/* Services Dropdown */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="nav-link dropdown-trigger">
              Services
              <ChevronDown
                size={16}
                className={`chevron ${servicesOpen ? 'open' : ''}`}
              />
            </button>

            {servicesOpen && (
              <div className="dropdown-menu">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <Link
                      key={index}
                      to={service.link}
                      className="dropdown-item"
                    >
                      <Icon size={20} className="dropdown-icon" />
                      <span>{service.title}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/team" className="nav-link">Team</Link>
          <Link to="/kontakt" className="nav-link">Kontakt</Link>

          {/* Cart */}
          <Link to="/warenkorb" className="nav-link cart-link">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
