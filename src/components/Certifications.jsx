import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { certifications } from '../data/certifications';

const INTERVAL = 5000;
const TRANSITION = 600;

export default function Certifications() {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [visible, setVisible]  = useState(true); // controls opacity
  const [lightbox, setLightbox] = useState(false);
  const timerRef  = useRef(null);
  const total     = certifications.length;

  const goTo = (index) => {
    // Fade out
    setVisible(false);
    setTimeout(() => {
      // Swap content
      setCurrent(((index % total) + total) % total);
      // Fade in
      setVisible(true);
    }, TRANSITION);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % total;
        setVisible(false);
        setTimeout(() => {
          setCurrent(next);
          setVisible(true);
        }, TRANSITION);
        return prev; // keep prev during fade-out
      });
    }, INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handlePrev = () => {
    clearInterval(timerRef.current);
    goTo(current - 1);
    startTimer();
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    goTo(current + 1);
    startTimer();
  };

  const handleDot = (i) => {
    clearInterval(timerRef.current);
    goTo(i);
    startTimer();
  };

  const cert = certifications[current];

  return (
    <section
      id="certifications"
      style={{
        background: 'var(--bg-primary)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            marginBottom: '1rem',
          }}>
            <span style={{ width: '28px', height: '2px', borderRadius: '2px', flexShrink: 0, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)', fontWeight: 600, color: 'var(--accent-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Certifications
            </span>
            <span style={{ width: '28px', height: '2px', borderRadius: '2px', flexShrink: 0, background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))' }} />
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--text-primary)',
            lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            Credentials &amp;{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Certifications
            </span>
          </h2>
        </div>

        {/* Slider wrapper */}
        <div
          onMouseEnter={() => clearInterval(timerRef.current)}
          onMouseLeave={startTimer}
          style={{ position: 'relative' }}
        >
          {/* Card */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            border: isDark ? `1px solid ${cert.color}35` : `1px solid ${cert.color}28`,
            boxShadow: isDark ? `0 24px 64px rgba(0,0,0,0.35)` : `0 24px 64px rgba(0,0,0,0.1)`,
            transition: `border-color ${TRANSITION}ms ease, box-shadow ${TRANSITION}ms ease`,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity ${TRANSITION}ms ease, transform ${TRANSITION}ms ease, border-color ${TRANSITION}ms ease`,
          }}>
            {/* Top accent */}
            <div style={{
              height: '4px',
              background: `linear-gradient(90deg, ${cert.color}, var(--accent-purple))`,
              transition: `background ${TRANSITION}ms ease`,
            }} />

            {/* Two-column layout */}
            <div className="cert-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: 'clamp(300px, 42vw, 420px)',
              background: isDark
                ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                : 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(255,255,255,0.8))',
            }}>

              {/* Left: info */}
              <div style={{
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div>
                  {/* Issuer row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
                    <div
                      style={{ width: '52px', height: '52px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0, border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.09)', display: 'flex' }}
                      dangerouslySetInnerHTML={{ __html: cert.issuerLogo }}
                    />
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 1.4vw, 1rem)', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                        {cert.issuer}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.68rem, 1vw, 0.75rem)', color: cert.color, fontWeight: 600, marginTop: '0.15rem' }}>
                        {cert.date}
                      </div>
                    </div>
                    {cert.score && (
                      <div style={{ marginLeft: 'auto', padding: '0.3rem 0.8rem', borderRadius: '9999px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.72rem, 1vw, 0.8rem)', color: '#10b981', fontWeight: 700 }}>
                        {cert.score}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--text-primary)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
                    {cert.title}
                  </h3>

                  {cert.hours && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.22rem 0.7rem', borderRadius: '9999px', background: `${cert.color}12`, border: `1px solid ${cert.color}28`, fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.65rem, 0.9vw, 0.72rem)', color: cert.color, marginBottom: '0.85rem' }}>
                      ⏱ {cert.hours}
                    </div>
                  )}

                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(0.82rem, 1.2vw, 0.92rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1rem' }}>
                    {cert.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {cert.tags.map(tag => (
                      <span key={tag} style={{ padding: '0.25rem 0.65rem', borderRadius: '7px', background: `${cert.color}10`, border: `1px solid ${cert.color}28`, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(0.68rem, 1vw, 0.75rem)', fontWeight: 600, color: cert.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link */}
                <div style={{ marginTop: '1.5rem' }}>
                  {cert.link ? (
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.6rem 1.3rem', borderRadius: '10px', background: `${cert.color}15`, border: `1px solid ${cert.color}35`, color: cert.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 1.2vw, 0.88rem)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${cert.color}28`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = `${cert.color}15`; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        View Certificate
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </a>
                      <button onClick={() => setLightbox(true)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.6rem 1.1rem', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.1)', color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 'clamp(0.8rem, 1.2vw, 0.88rem)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${cert.color}15`; e.currentTarget.style.borderColor = `${cert.color}35`; e.currentTarget.style.color = cert.color; }}
                        onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                        Preview
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setLightbox(true)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.6rem 1.3rem', borderRadius: '10px', background: `${cert.color}15`, border: `1px solid ${cert.color}35`, color: cert.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 1.2vw, 0.88rem)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${cert.color}28`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${cert.color}15`; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                      View Certificate
                    </button>
                  )}
                </div>
              </div>

              {/* Right: image */}
              <div className="cert-img-col" style={{ position: 'relative', overflow: 'hidden', borderRadius: '0 20px 20px 0', cursor: 'pointer' }}
                onClick={() => setLightbox(true)}
              >
                {cert.image && (
                  <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                )}
                {/* Click to expand hint */}
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 3 }}>
                  <div style={{ padding: '0.3rem 0.75rem', borderRadius: '9999px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#fff', fontWeight: 600 }}>
                    {current + 1} / {total}
                  </div>
                  <div style={{ padding: '0.3rem 0.6rem', borderRadius: '9999px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    Expand
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrows — desktop: sides, mobile: below card as row */}
          <div className="cert-arrows-desktop">
            {[{ fn: handlePrev, side: 'left', icon: '←' }, { fn: handleNext, side: 'right', icon: '→' }].map(({ fn, side, icon }) => (
              <button key={side} onClick={fn}
                style={{ position: 'absolute', top: '50%', [side]: '-1.25rem', transform: 'translateY(-50%)', width: '42px', height: '42px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)', border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)', color: 'var(--text-primary)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', zIndex: 10, backdropFilter: 'blur(8px)' }}
                onMouseEnter={e => { e.currentTarget.style.background = cert.color + '25'; e.currentTarget.style.borderColor = cert.color; e.currentTarget.style.color = cert.color; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'; e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Mobile arrows row */}
          <div className="cert-arrows-mobile" style={{ display: 'none', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            {[{ fn: handlePrev, icon: '←' }, { fn: handleNext, icon: '→' }].map(({ fn, icon }) => (
              <button key={icon} onClick={fn}
                style={{ width: '44px', height: '44px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)', border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)', color: 'var(--text-primary)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = cert.color + '25'; e.currentTarget.style.borderColor = cert.color; e.currentTarget.style.color = cert.color; }}
                onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'; e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            {certifications.map((c, i) => (
              <button key={i} onClick={() => handleDot(i)}
                style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '9999px', background: i === current ? cert.color : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.35s ease', padding: 0 }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '1rem', height: '2px', borderRadius: '99px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div key={`${current}-${visible}`} style={{ height: '100%', background: `linear-gradient(90deg, ${cert.color}, var(--accent-purple))`, borderRadius: '99px', animation: visible ? `certProgress ${INTERVAL}ms linear forwards` : 'none' }} />
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
            animation: 'lbFadeIn 0.3s ease forwards',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              animation: 'lbPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(false)}
              style={{
                position: 'absolute', top: '-48px', right: 0,
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1.1rem', borderRadius: '10px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.88rem', fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Close
            </button>

            {/* Certificate image */}
            <img
              src={cert.image}
              alt={cert.title}
              style={{
                width: '100%',
                borderRadius: '16px',
                boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${cert.color}40`,
                display: 'block',
              }}
            />

            {/* Caption */}
            <div style={{
              marginTop: '1rem',
              textAlign: 'center',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#fff',
              opacity: 0.85,
            }}>
              {cert.title} — {cert.issuer} · {cert.date}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes certProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbPopIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 640px) {
          .cert-grid { grid-template-columns: 1fr !important; }
          .cert-img-col { border-radius: 0 0 20px 20px !important; height: 240px !important; min-height: 240px !important; }
          .cert-arrows-desktop { display: none !important; }
          .cert-arrows-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
