import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const TargetCursor = ({ visible = true }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // NATIVE HARDWARE PERFORMANCE
    // Wir nutzen hier keinen React State und kein GSAP Tweening für die Bewegung.
    // Wir schreiben direkt in den DOM Style. Das ist der schnellste Weg im Browser.
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Nur für das Ein/Ausblenden nutzen wir eine Animation (damit es nicht hart 'ploppt')
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        autoAlpha: visible ? 1 : 0,
        duration: 0.15,
        overwrite: 'auto'
      });
    }
  }, [visible]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper" style={{ willChange: 'transform' }}>
      <div className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;
