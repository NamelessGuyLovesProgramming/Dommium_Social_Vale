import React, { useEffect, useRef } from 'react';
import './TargetCursor.css';

const TargetCursor = ({ visible = true }) => {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    let activeTargetRect = null;

    // Globaler Hover Check
    const globalHoverCheck = (e) => {
        const target = e.target.closest('.cursor-target');
        if (target) {
            cursor.classList.add('is-locked');
            activeTargetRect = target.getBoundingClientRect();
        } else {
            cursor.classList.remove('is-locked');
            activeTargetRect = null;
        }
    };

    // Kombinierter Listener: Bewegung + Lock-Berechnung
    const onMoveAndCheck = (e) => {
        if (!cursor) return;

        // 1. Cursor bewegen (Direct Mode)
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // 2. Wenn Locked: Ecken zum Ziel zwingen via CSS Variablen
        if (activeTargetRect) {
            const padding = 8; // Abstand vom Text
            const cornerSize = 10; // Größe der Ecke (muss vom Offset abgezogen werden bei right/bottom)
            
            const style = cursor.style;
            
            // Relativ zur Mausposition (0,0 im Wrapper)
            const tlX = activeTargetRect.left - e.clientX - padding;
            const tlY = activeTargetRect.top - e.clientY - padding;
            
            const trX = activeTargetRect.right - e.clientX + padding - cornerSize; 
            const trY = activeTargetRect.top - e.clientY - padding;
            
            const brX = activeTargetRect.right - e.clientX + padding - cornerSize;
            const brY = activeTargetRect.bottom - e.clientY + padding - cornerSize;
            
            const blX = activeTargetRect.left - e.clientX - padding;
            const blY = activeTargetRect.bottom - e.clientY + padding - cornerSize;

            style.setProperty('--tl-x', `${tlX}px`);
            style.setProperty('--tl-y', `${tlY}px`);
            
            style.setProperty('--tr-x', `${trX}px`);
            style.setProperty('--tr-y', `${trY}px`);
            
            style.setProperty('--br-x', `${brX}px`);
            style.setProperty('--br-y', `${brY}px`);
            
            style.setProperty('--bl-x', `${blX}px`);
            style.setProperty('--bl-y', `${blY}px`);
        }
    };

    window.addEventListener('mousemove', onMoveAndCheck, { passive: true });
    window.addEventListener('mouseover', globalHoverCheck, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMoveAndCheck);
      window.removeEventListener('mouseover', globalHoverCheck);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="target-cursor-wrapper"
      style={{ 
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.15s ease' // Sanftes Ein/Ausblenden
      }}
    >
      {/* 1. Punkt */}
      <div className="target-cursor-dot" />
      
      {/* 2. Rotierende Ecken */}
      <div className="target-cursor-rotator">
        <div className="target-cursor-corner corner-tl" />
        <div className="target-cursor-corner corner-tr" />
        <div className="target-cursor-corner corner-br" />
        <div className="target-cursor-corner corner-bl" />
      </div>
    </div>
  );
};

export default TargetCursor;
