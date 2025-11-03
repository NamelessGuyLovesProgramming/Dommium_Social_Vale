import { MapPin, Globe } from 'lucide-react'
import './Team.css'

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Müller",
      role: "Creative Director",
      description: "Spezialistin für Social Media Strategien mit 8+ Jahren Erfahrung. Verwandelt Daten in virale Kampagnen.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Michael Wagner",
      role: "Lead Data Analyst",
      description: "Experte für Trend-Analyse und KI-gestützte Insights. Macht aus Zahlen verständliche Handlungsempfehlungen.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Lisa Schmidt",
      role: "Content Strategist",
      description: "Meisterin des Storytellings. Erschafft authentische Markengeschichten, die Emotionen wecken.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "Tom Becker",
      role: "Growth Hacker",
      description: "Perfektionist in Performance Marketing. Optimiert Kampagnen für maximale Reichweite und Conversion.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ]

  return (
    <div className="team-page">
      {/* Location Header */}
      <div className="location-header">
        <div className="location-item">
          <MapPin className="location-icon" size={24} />
          <span>Hildesheim / Hannover</span>
        </div>
        <div className="location-item">
          <Globe className="location-icon" size={24} />
          <span>Agierend Deutschlandweit</span>
        </div>
      </div>

      {/* Team Members */}
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index}>
            <div className={`team-member ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="member-content">
                <h2 className="member-name">{member.name}</h2>
                <h3 className="member-role">{member.role}</h3>
                <p className="member-description">{member.description}</p>
              </div>
              <div className="member-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                />
              </div>
            </div>
            {index < teamMembers.length - 1 && <div className="divider" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Team
