import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';

const NAME_CHARS = 'FARHAN AFZAL'.split('');

export default function Preloader({ onComplete }) {
  const containerRef = useRef();
  const charsRef = useRef([]);
  const progressBarRef = useRef();
  const counterRef = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    tl.set(charsRef.current, { y: 40, opacity: 0 })
      .to(charsRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        ease: 'power3.out',
        duration: 0.45,
      })
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
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: '-webkit-fill-available',
        overflow: 'hidden',
      }}
    >
      {/* Name letters */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '2rem' }}>
        {NAME_CHARS.map((char, i) => (
          <span
            key={i}
            ref={(el) => (charsRef.current[i] = el)}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              color: char === ' ' ? 'transparent' : 'var(--text-primary)',
              letterSpacing: '0.05em',
              display: 'inline-block',
              minWidth: char === ' ' ? '1rem' : 'auto',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '240px',
          height: '2px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
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
