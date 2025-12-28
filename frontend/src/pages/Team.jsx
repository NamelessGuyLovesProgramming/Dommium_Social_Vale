import { MapPin } from 'lucide-react'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import TextType from '../components/TextType/TextType'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import Modal from '../components/Modal/Modal'
import ContactForm from '../components/ContactForm/ContactForm'
import { useEffect, useRef, useState } from 'react'
import './Team.css'

const Team = () => {
  const cardsRef = useRef([])
  const btnRef = useRef(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock submission handler for now - connect to real logic later
  const handleContactSubmit = async (formData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted:', formData)
    setIsLoading(false)
    setIsContactModalOpen(false)
    // Optionally trigger a success toast here
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target) // Animate only once
          }
        })
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset trigger point
      }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })
    
    if (btnRef.current) observer.observe(btnRef.current)

    return () => {
      if (cardsRef.current) {
        cardsRef.current.forEach((card) => {
          if (card) observer.unobserve(card)
        })
      }
      if (btnRef.current) observer.unobserve(btnRef.current)
    }
  }, [])

  const teamMembers = [
    {
      name: "Dominik Mahnke",
      role: "Geschäftsführer",
      handle: "dominik.mahnke",
      status: "Leading",
      description: "Visionär und Stratege. Dominik leitet Dominium Sociale mit Fokus auf nachhaltiges Wachstum und exzellente Kundenbetreuung.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Aneeque Zebair",
      role: "Technischer Leiter",
      handle: "aneeque.zeb",
      status: "Coding",
      description: "Der Architekt unserer technischen Infrastruktur. Aneeque sorgt dafür, dass alle Systeme reibungslos laufen und Innovationen schnell umgesetzt werden.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      name: "Ekin Auditore",
      role: "Videograph & Creator",
      handle: "ekin.auditore",
      status: "Filming",
      description: "Meister des visuellen Storytellings. Ekin fängt Momente ein und verwandelt sie in High-End Content, der Marken lebendig macht.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "Valentino Güden",
      role: "Developer & KI",
      handle: "valentino.ai",
      status: "Prompting",
      description: "An der Schnittstelle zwischen Code und künstlicher Intelligenz. Valentino entwickelt zukunftsweisende Lösungen für digitale Herausforderungen.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    }
  ]

  return (
    <div className="team-page">
      {/* Highlight Header */}
      <div className="highlight-bar">
        <div className="highlight-bar-content">
          <h1 className="team-header-title">Unser Team</h1>
        </div>
      </div>
      
      {/* Location Header */}
      <div className="location-text-header">
        <div className="location-row">
          <div className="loc-item item-icon slide-from-top">
            <MapPin size={36} strokeWidth={2.5} />
          </div>
          <div className="loc-item item-text slide-from-left">
            Hildesheim
          </div>
          <div className="loc-item item-sep fade-in-simple">
            /
          </div>
          <div className="loc-item item-text slide-from-right">
            Hannover
          </div>
        </div>
        <p className="location-line blur-in">Agierend Deutschlandweit</p>
      </div>

      {/* Team Cards Grid */}
      <div className="team-cards-grid">
        {teamMembers.map((member, index) => {
          // Determine animation type based on index
          let animType = "";
          if (index === 0) animType = "anim-top";
          else if (index === 1) animType = "anim-left";
          else if (index === 2) animType = "anim-right";
          else if (index === 3) animType = "anim-left";
          else animType = "anim-fade";
          
          const useTypewriter = index === 0 || index === 2;
          const useDecrypt = index === 1 || index === 3;
          const isValentino = index === 3;

          return (
            <div 
              key={index} 
              ref={el => cardsRef.current[index] = el}
              className={`team-card-wrapper scroll-hidden ${animType} ${index % 2 !== 0 ? 'reverse' : ''}`}
            >
              
              {/* Text Box */}
              <div className="team-text-box">
                <h2 className="team-name">{member.name}</h2>
                <h3 className="team-role">{member.role}</h3>
                <div className="team-divider"></div>
                
                <div className="team-desc">
                  {useTypewriter && (
                    <TextType
                      text={[member.description]}
                      typingSpeed={8}
                      pauseDuration={1500}
                      deletingSpeed={50}
                      cursorCharacter="_"
                      cursorBlinkDuration={0.5}
                      showCursor={true}
                      loop={false}
                      startOnVisible={true}
                    />
                  )}
                  {useDecrypt && (
                    <DecryptedText
                      text={member.description}
                      animateOn="view"
                      revealDirection="start"
                      speed={10}
                      maxIterations={10}
                      sequential={true}
                    />
                  )}
                </div>
              </div>

              {/* Profile Card */}
              <div className="card-container">
                <ProfileCard
                  name={member.name}
                  title={member.role}
                  handle={member.handle}
                  status={member.status}
                  avatarUrl={member.image}
                  miniAvatarUrl={member.image}
                  contactText="Kontaktieren"
                  enableTilt={true}
                  enableMobileTilt={false}
                  showUserInfo={false}
                  iconUrl="/media/icon.14361827.webp"
                />
              </div>

            </div>
          );
        })}

        {/* Action Button */}
        <div ref={btnRef} className="valentino-action scroll-hidden anim-fade">
           <button 
             onClick={() => setIsContactModalOpen(true)} 
             className="team-action-btn"
           >
             Anfrage schicken
           </button>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        title="Projekt starten"
      >
        <ContactForm onSubmit={handleContactSubmit} isLoading={isLoading} />
      </Modal>

    </div>
  )
}

export default Team