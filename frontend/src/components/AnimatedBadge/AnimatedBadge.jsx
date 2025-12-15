import { useEffect, useState } from "react"
import "./AnimatedBadge.css"

function AnimatedBadge({ webpSrc, width = 96, height = 96, alt = "Animated Icon", firstFrame }) {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setPrefersReduced(media.matches)
    handler()
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  if (prefersReduced && firstFrame) {
    return <img className="animated-badge" src={firstFrame} width={width} height={height} alt={alt} />
  }

  return <img className="animated-badge" src={webpSrc} width={width} height={height} alt={alt} />
}

export default AnimatedBadge
