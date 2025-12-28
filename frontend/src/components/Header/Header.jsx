import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  MessageSquare,
  Play,
  BrainCircuit,
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
      const scrollY = window.scrollY
      const isScrolled = scrollY > 10 // Ziemlich schnell: nur 10px scrollen!

      console.log('Header Scroll:', scrollY, 'isScrolled:', isScrolled)

      setScrolled(isScrolled)
    }

    console.log('Header: addEventListener fuer scroll')
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      console.log('Header: removeEventListener fuer scroll')
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const services = [
    {
      icon: Play,
      title: 'Content Creation',
      link: '/content_creation'
    },
    {
      icon: MessageSquare,
      title: 'Beratung',
      link: '/services/beratung'
    },
    {
      icon: BrainCircuit,
      title: 'KI Loesungen',
      link: '/services/ki_loesungen'
    }
  ]

  const headerClass = `header ${scrolled ? 'scrolled' : ''} ${
    servicesOpen ? 'dropdown-open' : ''
  }`

  return (
    <header className={headerClass}>
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
          {/* Services Dropdown */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="nav-link dropdown-trigger">
              Leistungen
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

          <Link to="/consilium-software" className="nav-link">Consilium Software</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/team" className="nav-link">Team</Link>

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
