import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Team from './pages/Team'
import Kontakt from './pages/Kontakt'
import Warenkorb from './pages/Warenkorb'
import WarenkorbDemo from './pages/WarenkorbDemo'
import Erfolg from './pages/Erfolg'
import SocialMediaConsulting from './pages/SocialMediaConsulting'
import ContentCreation from './pages/ContentCreation'
import Trendanalyse from './pages/Trendanalyse'
import Cybersecurity from './pages/Cybersecurity'
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/team" element={<Team />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/warenkorb" element={<Warenkorb />} />
            <Route path="/warenkorb-demo" element={<WarenkorbDemo />} />
            <Route path="/erfolg" element={<Erfolg />} />

            {/* Service Routes */}
            <Route path="/services/social-media" element={<SocialMediaConsulting />} />
            <Route path="/services/content" element={<ContentCreation />} />
            <Route path="/services/trends" element={<Trendanalyse />} />
            <Route path="/services/cybersecurity" element={<Cybersecurity />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
