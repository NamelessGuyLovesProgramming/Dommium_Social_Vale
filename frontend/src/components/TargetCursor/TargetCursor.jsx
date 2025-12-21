import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const TargetCursor = ({ visible = true }) => {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Einfache Maus-Verfolgung ohne GSAP Ticker für den Anfang (nur Event Listener)
  useEffect(() => {
    const onMouseMove = (e) => {
      // Wir nutzen GSAP direkt für Performance, statt State
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Sichtbarkeit steuern
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        autoAlpha: visible ? 1 : 0,
        duration: 0.3
      });
    }
  }, [visible]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div className="target-cursor-dot" />
      {/* Ecken erst mal statisch, um Komplexität zu reduzieren */}
      <div className="target-cursor-corner corner-tl" style={{ transform: 'translate(-150%, -150%)' }} />
      <div className="target-cursor-corner corner-tr" style={{ transform: 'translate(50%, -150%)' }} />
      <div className="target-cursor-corner corner-br" style={{ transform: 'translate(50%, 50%)' }} />
      <div className="target-cursor-corner corner-bl" style={{ transform: 'translate(-150%, 50%)' }} />
    </div>
  );
};

export default TargetCursor;
