import { useEffect, useRef, useState } from 'react';
import './RadarAnimation.css';

const FILE_PREFIX = "RadarBaseGlowAnimation";
const START_INDEX = 8088;
const END_INDEX = 8362;
const TOTAL_FRAMES = END_INDEX - START_INDEX + 1; // 275 Frames
const LOOP_LENGTH = 72; 
const LOOP_START_INDEX = END_INDEX - LOOP_LENGTH + 1; // 8291

// Hilfsfunktion zum Generieren der Pfade
const getFramePath = (fileIndex) => {
  // Pad number to 8 digits (e.g. 8088 -> "00008088")
  const paddedNumber = fileIndex.toString().padStart(8, '0');
  return `/RadarBaseGlowAnimation/${FILE_PREFIX}${paddedNumber}.png`;
};

const RadarAnimation = ({ width = 600, height = 600 }) => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // 1. Bilder vorladen
  useEffect(() => {
    let mounted = true;
    const loadedImages = [];
    let loadedCount = 0;

    const loadImages = async () => {
      // Wir erstellen ein Array von Promises für alle Bilder
      const promises = [];

      for (let i = START_INDEX; i <= END_INDEX; i++) {
        promises.push(
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
              loadedCount++;
              if (mounted) setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              resolve(img);
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${i}`);
              // Wir lösen trotzdem auf, um die Kette nicht zu brechen (leeres Bild)
              resolve(null);
            };
            // Wir speichern das Bild im Array an der korrekten relativen Position (0 bis 274)
            loadedImages[i - START_INDEX] = img;
          })
        );
      }

      await Promise.all(promises);
      
      if (mounted) {
        setImages(loadedImages);
        setIsLoaded(true);
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, []);

  // 2. Animation Loop
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // State für den Loop
    let currentFrameIndex = 0; // Start bei 0 (Relativ zum Array)
    const loopStartIndexRel = LOOP_START_INDEX - START_INDEX; // Relativer Index für Loop-Start
    
    // Timing Variablen
    let lastTime = 0;
    const FPS_INTRO = 60; // Schnell
    const FPS_LOOP = 24;  // Langsamer, kinoreifer Look
    const INTERVAL_INTRO = 1000 / FPS_INTRO;
    const INTERVAL_LOOP = 1000 / FPS_LOOP;

    const render = (time) => {
      // Delta Zeit Berechnung
      const isLoopingPhase = currentFrameIndex >= loopStartIndexRel;
      const interval = isLoopingPhase ? INTERVAL_LOOP : INTERVAL_INTRO;
      
      const deltaTime = time - lastTime;

      if (deltaTime > interval) {
        // Zeit anpassen (Modulo, um Drift zu vermeiden)
        lastTime = time - (deltaTime % interval);

        const img = images[currentFrameIndex];
        
        if (img) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        // Logik: Einmal komplett durch, dann Loop am Ende
        currentFrameIndex++;

        if (currentFrameIndex >= images.length) {
          // Ende erreicht -> Springe zum Loop-Start
          currentFrameIndex = loopStartIndexRel;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images]);

  return (
    <div className="radar-animation-container">
      {!isLoaded && (
        <div className="radar-loading">
          <div className="loading-text">Loading System... {loadProgress}%</div>
          <div className="loading-bar">
            <div className="loading-fill" style={{ width: `${loadProgress}%` }}></div>
          </div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        className={`radar-canvas ${isLoaded ? 'visible' : ''}`}
      />
    </div>
  );
};

export default RadarAnimation;
