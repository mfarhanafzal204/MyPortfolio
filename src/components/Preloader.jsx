import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';

export default function Preloader({ onComplete }) {
  const containerRef   = useRef();
  const nameRef        = useRef();
  const progressBarRef = useRef();
  const counterRef     = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    tl.fromTo(nameRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )
    .to(progressBarRef.current, {
      width: '100%',
      duration: 1.4,
      ease: 'power2.inOut',
    }, '-=0.2');

    // Counter
    const counterTween = { val: 0 };
    gsap.to(counterTween, {
      val: 100,
      duration: 2.0,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counterTween.val)),
    });

    // Exit — slide up
    tl.to(containerRef.current, {
      y: '-100%',
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.2,
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      },
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader-container">

      {/* Name — responsive */}
      <div ref={nameRef} style={{ textAlign: 'center', marginBottom: '2rem', opacity: 0 }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 10vw, 5rem)',
          color: 'var(--text-primary)',
          letterSpacing: '0.08em',
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
        }}>
          FARHAN
        </div>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 10vw, 5rem)',
          color: 'var(--text-primary)',
          letterSpacing: '0.08em',
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
          background: 'linear-gradient(135deg, #00e5ff, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          AFZAL
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 'clamp(160px, 50vw, 240px)',
        height: '2px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div
          ref={progressBarRef}
          style={{
            height: '100%',
            width: '0%',
            background: 'linear-gradient(90deg, #00e5ff, #8b5cf6)',
            boxShadow: '0 0 12px rgba(0,229,255,0.6)',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
        }}
      >
        {String(count).padStart(3, '0')}
      </div>
    </div>
  );
}
