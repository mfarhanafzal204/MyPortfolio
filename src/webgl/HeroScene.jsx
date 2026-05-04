import { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const PARTICLE_COUNT = window.innerWidth < 768 ? 50 : 100;

export default function HeroScene() {
  const canvasRef = useRef();
  const { mousePosition } = useMousePosition();
  const mouseRef    = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const rafRef      = useRef();

  useEffect(() => {
    mouseRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        baseX:  Math.random() * canvas.width,
        baseY:  Math.random() * canvas.height,
        x: 0, y: 0,
        size:   Math.random() * 1.8 + 0.4,
        offset: Math.random() * Math.PI * 2,
        speed:  Math.random() * 0.35 + 0.15,
        hue:    Math.random() > 0.5 ? 190 : 270,
        alpha:  Math.random() * 0.45 + 0.15,
      }));
    };

    const draw = (ts) => {
      const t  = ts * 0.001;
      const { x: mx, y: my } = mouseRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        p.x = p.baseX + Math.sin(t * p.speed + p.offset) * 28;
        p.y = p.baseY + Math.cos(t * p.speed * 0.7 + p.offset) * 18;

        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const f = (90 - dist) / 90;
          p.x += dx * f * 0.07;
          p.y += dy * f * 0.07;
        }

        const a = p.alpha * (0.65 + Math.sin(t * p.speed + p.offset) * 0.35);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        g.addColorStop(0, `hsla(${p.hue},100%,70%,${a})`);
        g.addColorStop(1, `hsla(${p.hue},100%,70%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Connecting lines
      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${(1 - d / 90) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
