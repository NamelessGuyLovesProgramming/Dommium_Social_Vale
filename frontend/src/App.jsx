import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Team from './pages/Team'
import Kontakt from './pages/Kontakt'
import Warenkorb from './pages/Warenkorb'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/team" element={<Team />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/warenkorb" element={<Warenkorb />} />

            {/* Service Routes (später) */}
            <Route path="/services/social-media" element={<div className="page">Social Media Beratung</div>} />
            <Route path="/services/content" element={<div className="page">Content Creation</div>} />
            <Route path="/services/trends" element={<div className="page">Trendanalyse</div>} />
            <Route path="/services/cybersecurity" element={<div className="page">Cybersecurity</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
