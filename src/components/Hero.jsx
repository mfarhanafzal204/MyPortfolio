import { useEffect, useRef, Suspense, lazy } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useTheme } from '../context/ThemeContext';

const HeroScene = lazy(() => import('../webgl/HeroScene'));

export default function Hero() {
  const { isDark } = useTheme();

  const labelRef           = useRef();
  const nameRef            = useRef();
  const taglineRef         = useRef();
  const subtitleRef        = useRef();
  const locationRef        = useRef();
  const statusRef          = useRef();
  const btnsRef            = useRef([]);
  const scrollIndicatorRef = useRef();
  const photoRef           = useRef();

  useEffect(() => {
    const textEls = [
      labelRef.current, nameRef.current, taglineRef.current,
      subtitleRef.current, locationRef.current, statusRef.current,
      scrollIndicatorRef.current, ...btnsRef.current.filter(Boolean),
    ].filter(Boolean);

    gsap.set(textEls, { opacity: 0 });
    gsap.set(photoRef.current, { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({ delay: 3.0 });

    tl.fromTo(photoRef.current,
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(labelRef.current,
      { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(nameRef.current,
      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
      '-=0.15'
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
      '-=0.35'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.25'
    )
    .fromTo([locationRef.current, statusRef.current],
      { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.08 },
      '-=0.2'
    )
    .fromTo(btnsRef.current.filter(Boolean),
      { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      '-=0.15'
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0 }, { opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    return () => tl.kill();
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 0,
      }}
    >
      {/* Particle canvas background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Theme-aware gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'var(--hero-overlay)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Content container */}
      <div className="hero-container" style={{
        position: 'relative', zIndex: 2,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(5.5rem, 12vw, 8rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(2.5rem, 5vw, 4rem)',
      }}>

        {/* Photo */}
        <div
          ref={photoRef}
          className="hero-photo"
          style={{
            position: 'relative',
            width: 'min(260px, 72vw)',
            height: 'min(260px, 72vw)',
            opacity: 0,
            flexShrink: 0,
          }}
        >
          {/* Outer glow ring — static, no spin */}
          <div style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            zIndex: 0,
          }} />

          {/* Ambient glow */}
          <div style={{
            position: 'absolute',
            inset: '-24px',
            background: isDark
              ? 'radial-gradient(ellipse, rgba(0,229,255,0.18) 0%, rgba(139,92,246,0.1) 55%, transparent 75%)'
              : 'radial-gradient(ellipse, rgba(2,132,199,0.14) 0%, rgba(124,58,237,0.08) 55%, transparent 75%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            zIndex: -1,
          }} />

          {/* Photo frame */}
          <div style={{
            position: 'relative',
            width: '100%', height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--bg-primary)',
            boxShadow: isDark
              ? '0 16px 48px rgba(0,0,0,0.5)'
              : '0 16px 48px rgba(0,0,0,0.15)',
            zIndex: 1,
          }}>
            <img
              src="https://farhan-personal-portfolio.netlify.app/farhan.png"
              alt="Farhan Afzal"
              loading="eager"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
              onError={e => {
                e.target.style.display = 'none';
                const fb = e.target.parentElement;
                fb.style.display = 'flex';
                fb.style.alignItems = 'center';
                fb.style.justifyContent = 'center';
                fb.style.background = isDark
                  ? 'linear-gradient(135deg,rgba(0,229,255,0.08),rgba(139,92,246,0.08))'
                  : 'linear-gradient(135deg,rgba(2,132,199,0.08),rgba(124,58,237,0.08))';
                const txt = document.createElement('span');
                txt.textContent = 'FA';
                txt.style.cssText = `font-family:'Syne',sans-serif;font-size:4rem;font-weight:800;
                  background:linear-gradient(135deg,var(--accent-cyan),var(--accent-purple));
                  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`;
                fb.appendChild(txt);
              }}
            />
          </div>
        </div>

        {/* Text content */}
        <div className="hero-text" style={{ 
          width: '100%',
          maxWidth: '700px',
          textAlign: 'center',
        }}>

          {/* Role label */}
          <div ref={labelRef} style={{
            display: 'inline-flex', alignItems: 'center',
            gap: '0.6rem', marginBottom: '1.75rem', opacity: 0,
            justifyContent: 'center',
          }}>
            <span style={{
              display: 'inline-block', width: '28px', height: '2px',
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
              borderRadius: '2px', flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)',
              fontWeight: 700, color: 'var(--accent-cyan)',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              Full-Stack Developer
            </span>
            <span style={{
              display: 'inline-block', width: '2px', height: '1.1em',
              background: 'var(--accent-cyan)', borderRadius: '1px',
              animation: 'blink 1.1s step-end infinite', opacity: 0.8,
            }} />
          </div>

          {/* Name */}
          <h1 ref={nameRef} style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.75rem, 10vw, 6rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            opacity: 0,
          }}>
            Farhan
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Afzal
            </span>
          </h1>

          {/* Tagline */}
          <p ref={taglineRef} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            marginBottom: '1.25rem',
            letterSpacing: '-0.01em',
            maxWidth: '600px',
            margin: '0 auto 1.25rem',
            opacity: 0,
          }}>
            Building digital products that{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>perform, scale,</span>
            {' '}and{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>leave an impression.</span>
          </p>

          {/* Tech stack */}
          <p ref={subtitleRef} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.65rem, 1.4vw, 0.8rem)',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0,
          }}>
            MERN &nbsp;·&nbsp; Next.js &nbsp;·&nbsp; AWS &nbsp;·&nbsp; Firebase &nbsp;·&nbsp; WebGL
          </p>

          {/* Location + status */}
          <div className="hero-pills" style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem', marginBottom: '2.5rem',
          }}>
            {/* Location pill */}
            <span ref={locationRef} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.78rem, 1.4vw, 0.85rem)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.01em',
              opacity: 0,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-cyan)', flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Islamabad, Pakistan
            </span>

            {/* Available pill */}
            <span ref={statusRef} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem', borderRadius: '9999px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.22)',
              opacity: 0,
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 0 0 rgba(16,185,129,0.4)',
                display: 'inline-block', flexShrink: 0,
                animation: 'ping 1.8s ease-out infinite',
              }} />
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(0.78rem, 1.4vw, 0.85rem)',
                color: '#10b981',
                fontWeight: 600, letterSpacing: '0.01em',
              }}>
                Open to opportunities
              </span>
            </span>
          </div>

          {/* CTA buttons */}
          <div className="hero-btns" style={{ 
            display: 'flex', 
            gap: '0.875rem', 
            flexWrap: 'wrap', 
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <a
              ref={el => (btnsRef.current[0] = el)}
              href="#projects"
              onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: 'clamp(0.75rem, 2vw, 0.875rem) clamp(1.5rem, 4vw, 2rem)', 
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                color: isDark ? '#030308' : '#ffffff',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700, 
                fontSize: 'clamp(0.85rem, 1.8vw, 0.9rem)',
                textDecoration: 'none', letterSpacing: '0.01em',
                boxShadow: isDark ? '0 4px 20px rgba(0,229,255,0.3)' : '0 4px 20px rgba(2,132,199,0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                opacity: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = isDark ? '0 10px 36px rgba(0,229,255,0.45)' : '0 10px 36px rgba(2,132,199,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(0,229,255,0.3)' : '0 4px 20px rgba(2,132,199,0.35)';
              }}
            >
              View My Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>

            {/* LinkedIn button */}
            <a
              ref={el => (btnsRef.current[1] = el)}
              href="https://www.linkedin.com/in/farhan-afzal-85518b282/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                padding: 'clamp(0.75rem, 2vw, 0.875rem) clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '10px',
                background: isDark ? 'rgba(10,102,194,0.15)' : 'rgba(10,102,194,0.1)',
                color: '#0a66c2',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(0.85rem, 1.8vw, 0.9rem)',
                textDecoration: 'none', letterSpacing: '0.01em',
                border: '1.5px solid rgba(10,102,194,0.35)',
                transition: 'all 0.2s ease', opacity: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(10,102,194,0.22)';
                e.currentTarget.style.borderColor = '#0a66c2';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,102,194,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isDark ? 'rgba(10,102,194,0.15)' : 'rgba(10,102,194,0.1)';
                e.currentTarget.style.borderColor = 'rgba(10,102,194,0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* LinkedIn official logo */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a66c2" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>

      </div>

      {/* Scroll indicator — absolute, hidden on small screens */}
      <div
        ref={scrollIndicatorRef}
        className="hero-scroll"
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.5rem', opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.62rem', color: 'var(--text-muted)',
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          scroll
        </span>
        <div style={{
          width: '1px', height: '44px',
          background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)',
          animation: 'scroll-line 1.6s ease-in-out infinite',
        }} />
      </div>

      {/* Scoped styles */}
      <style>{`
        @keyframes ping {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          70%  { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }

        @keyframes scroll-line {
          0%        { transform: scaleY(1); transform-origin: top; opacity: 1; }
          50%       { transform: scaleY(0.4); opacity: 0.5; }
          100%      { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }

        @keyframes blink {
          0%, 49% { opacity: 0.8; }
          50%, 100% { opacity: 0; }
        }

        /* Hide scroll indicator on mobile — buttons are near bottom */
        @media (max-width: 860px) {
          .hero-scroll { display: none !important; }
        }

        /* Desktop: side-by-side layout */
        @media (min-width: 861px) {
          .hero-container {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: clamp(2rem, 5vw, 5rem) !important;
          }
          
          .hero-photo {
            order: 2;
            width: 320px !important;
            height: 320px !important;
          }
          
          .hero-text {
            order: 1;
            text-align: left !important;
            max-width: 600px !important;
          }
          
          .hero-text > div:first-child {
            justify-content: flex-start !important;
          }
          
          .hero-pills {
            justify-content: flex-start !important;
          }

          .hero-btns {
            justify-content: flex-start !important;
          }
          
          .hero-text > div:nth-of-type(4) {
            justify-content: flex-start !important;
          }
          
          .hero-text > div:last-child {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
