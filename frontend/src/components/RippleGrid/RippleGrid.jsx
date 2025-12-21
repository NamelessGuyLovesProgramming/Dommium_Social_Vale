import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './RippleGrid.css';

const RippleGrid = ({
  gridColor = '#ffffff',
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  mouseInteraction = true,
}) => {
  const containerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const containerRectRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const hexToRgb = hex => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
        : [1, 1, 1];
    };

    const renderer = new Renderer({
      dpr: 1, // Performance: Standard-Auflösung erzwingen (kein Retina-Lag)
      alpha: true // Transparenter Hintergrund
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0); // Explizit Transparent
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    containerRef.current.appendChild(gl.canvas);

    const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

    const frag = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform vec2 mousePosition;
uniform float mouseInfluence;
varying vec2 vUv;

float pi = 3.141592;

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float dist = length(uv);
    
    // Maus Interaktion
    vec2 mouseUv = (mousePosition * 2.0 - 1.0);
    mouseUv.x *= iResolution.x / iResolution.y;
    float mouseDist = length(uv - mouseUv);
    float influence = mouseInfluence * exp(-mouseDist * mouseDist / 1.0);
    
    // Wellenberechnung
    float func = sin(pi * (iTime - dist * 2.0));
    vec2 rippleUv = uv + uv * func * rippleIntensity * influence;

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);
    float aaWidth = 0.5;
    vec2 smoothB = vec2(smoothstep(0.0, aaWidth, b.x), smoothstep(0.0, aaWidth, b.y));

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x);
    color += exp(-gridThickness * smoothB.y);

    // Grid Farbe anwenden
    vec3 finalColor = gridColor * color;
    
    // Alpha (Transparenz) basierend auf Helligkeit
    float alpha = length(color) * 0.8; 

    gl_FragColor = vec4(finalColor, alpha);
}`;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      gridColor: { value: hexToRgb(gridColor) },
      rippleIntensity: { value: rippleIntensity },
      gridSize: { value: gridSize },
      gridThickness: { value: gridThickness },
      mousePosition: { value: [0.5, 0.5] },
      mouseInfluence: { value: 0 }
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    // Helper für Layout
    const updateRect = () => {
        if(containerRef.current) containerRectRef.current = containerRef.current.getBoundingClientRect();
    }

    const resize = () => {
      if (!containerRef.current) return;
      updateRect();
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      renderer.setSize(w, h);
      uniforms.iResolution.value = [w, h];
    };

    const handleMouseMove = e => {
      if (!mouseInteraction || !containerRectRef.current) return;
      const rect = containerRectRef.current;
      // Direkte Berechnung
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      
      // SOFORT-UPDATE ohne Lerp
      mousePositionRef.current = { x, y };
      uniforms.mousePosition.value = [x, y];
    };

    const handleMouseEnter = () => {
        uniforms.mouseInfluence.value = 1;
    };
    const handleMouseLeave = () => {
        uniforms.mouseInfluence.value = 0;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateRect);
    
    if (mouseInteraction) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Init
    updateRect();
    resize();

    const render = t => {
      uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      requestAnimationFrame(render);
    };

    const af = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(af);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateRect);
      if (mouseInteraction && containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      // Clean Context
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  }, [gridColor]);

  return <div ref={containerRef} className="ripple-grid-container" />;
};

export default RippleGrid;
