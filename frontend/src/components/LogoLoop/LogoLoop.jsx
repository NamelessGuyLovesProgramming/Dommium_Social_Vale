import React, { useMemo, useRef, useEffect, memo } from 'react'
import './LogoLoop.css'

// Simplified LogoLoop based on reactbits.dev animation
// Props: logos [{src, title}], direction ('left'|'right'), speed (px/s), hoverSpeed (px/s), gap (px), logoHeight (px)
const LogoLoop = memo(
  ({
    logos = [],
    direction = 'left',
    speed = 120,
    hoverSpeed = 0,
    gap = 32,
    logoHeight = 28,
    scaleOnHover = false,
    className = '',
    ariaLabel = 'Logo loop',
    renderItem
  }) => {
    const trackRef = useRef(null)
    const containerRef = useRef(null)
    const hoverRef = useRef(false)

    const dirSign = direction === 'right' ? 1 : -1

    const duration = useMemo(() => {
      const totalWidth = logos.length * (logoHeight + gap)
      return totalWidth / speed
    }, [logos.length, logoHeight, gap, speed])

    useEffect(() => {
      const track = trackRef.current
      if (!track) return
      track.style.setProperty('--logo-gap', `${gap}px`)
      track.style.setProperty('--logo-height', `${logoHeight}px`)
      track.style.setProperty('--loop-duration', `${duration}s`)
      // Keyframes move from 0 -> -50%. To move content to the right, run animation in reverse.
      track.style.setProperty('--loop-direction', dirSign === 1 ? 'reverse' : 'normal')
    }, [gap, logoHeight, duration, dirSign])

    useEffect(() => {
      if (hoverSpeed <= 0) return
      const track = trackRef.current
      if (!track) return
      const handleEnter = () => {
        hoverRef.current = true
        const totalWidth = logos.length * (logoHeight + gap)
        const newDuration = totalWidth / hoverSpeed
        track.style.setProperty('--loop-duration', `${newDuration}s`)
      }
      const handleLeave = () => {
        hoverRef.current = false
        track.style.setProperty('--loop-duration', `${duration}s`)
      }
      track.addEventListener('mouseenter', handleEnter)
      track.addEventListener('mouseleave', handleLeave)
      return () => {
        track.removeEventListener('mouseenter', handleEnter)
        track.removeEventListener('mouseleave', handleLeave)
      }
    }, [logos.length, logoHeight, gap, duration, hoverSpeed])

    // repeat enough times to fill and overlap viewport
    const allLogos = useMemo(() => {
      if (!logos || logos.length === 0) return []
      const repeat = 6
      return Array.from({ length: repeat }, (_, i) =>
        logos.map((item) => ({ ...item, _key: `${item.title || item.src || ''}-${i}` }))
      ).flat()
    }, [logos])

    return (
      <div className={`logo-loop ${className}`} aria-label={ariaLabel} ref={containerRef}>
        <div className={`logo-loop__track ${scaleOnHover ? 'logo-loop__track--scale' : ''}`} ref={trackRef}>
          {allLogos.map((item, idx) => (
            <div className="logo-loop__item" key={item._key || idx} style={{ height: logoHeight, marginRight: gap }}>
              {renderItem ? renderItem(item, idx) : <img src={item.src} alt={item.title || ''} />}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

export default LogoLoop
