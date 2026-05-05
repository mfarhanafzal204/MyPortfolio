import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useTheme } from '../context/ThemeContext';
import { services } from '../data/services';

// Fiverr official logo SVG
const FiverrLogo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#1DBF73"/>
    <path d="M18.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="#fff"/>
    <path d="M5.5 18V9.5H4V7.5h1.5V7c0-2.2 1.3-3.5 3.5-3.5.6 0 1.1.1 1.5.2v2c-.3-.1-.6-.2-1-.2-.9 0-1.5.5-1.5 1.5v.5H11v2H8v8.5H5.5zM12 18V9.5h2.5V18H12z" fill="#fff"/>
  </svg>
);

function ServiceCard({ service, isDark, cardRef }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isDark
          ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
        border: isDark
          ? `1px solid ${hovered ? service.color + '35' : 'rgba(255,255,255,0.08)'}`
          : `1px solid ${hovered ? service.color + '35' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: '20px',
        padding: 'clamp(1.4rem, 2.5vw, 1.9rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? isDark
            ? `0 20px 50px ${service.color}18`
            : `0 20px 50px ${service.color}12`
          : isDark
          ? '0 4px 24px rgba(0,0,0,0.2)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${service.color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s ease',
        borderRadius: '20px 20px 0 0',
      }} />

      {/* Icon box */}
      <div style={{
        width: '52px', height: '52px',
        borderRadius: '14px',
        background: `${service.color}14`,
        border: `1px solid ${service.color}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem',
        marginBottom: '1.1rem',
        flexShrink: 0,
        boxShadow: hovered ? `0 0 20px ${service.color}25` : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        {service.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
        color: 'var(--text-primary)',
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
        marginBottom: '0.65rem',
      }}>
        {service.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(0.85rem, 1.2vw, 0.92rem)',
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
        flex: 1,
        marginBottom: '1.1rem',
      }}>
        {service.description}
      </p>

      {/* Tags with logos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
        {service.tags.map(tag => {
          const logo = service.tagLogos?.[tag];
          return (
            <span key={tag} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.28rem 0.65rem',
              borderRadius: '7px',
              background: `${service.color}10`,
              border: `1px solid ${service.color}28`,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.68rem, 1vw, 0.75rem)',
              fontWeight: 600,
              color: service.color,
              letterSpacing: '0.01em',
            }}>
              {logo && (
                <span
                  style={{ width: '13px', height: '13px', flexShrink: 0, display: 'flex' }}
                  dangerouslySetInnerHTML={{ __html: logo }}
                />
              )}
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Services() {
  const { isDark } = useTheme();
  const sectionRef = useRef();
  const cardsRef   = useRef([]);
  const [showAll, setShowAll] = useState(false);

  const MOBILE_LIMIT = 4;
  const displayedServices = showAll ? services : services.slice(0, MOBILE_LIMIT);
  const hasMore = services.length > MOBILE_LIMIT;

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const tweens = cards.map((card, i) => {
      gsap.set(card, { opacity: 0, y: 28 });
      return gsap.to(card, {
        opacity: 1, y: 0, duration: 0.6,
        delay: (i % 3) * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 92%', once: true },
      });
    });

    return () => tweens.forEach(t => t.scrollTrigger?.kill());
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: 'var(--bg-primary)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            marginBottom: '1rem',
          }}>
            <span style={{
              width: '28px', height: '2px', borderRadius: '2px', flexShrink: 0,
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
              fontWeight: 600,
              color: 'var(--accent-cyan)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              What I Do
            </span>
            <span style={{
              width: '28px', height: '2px', borderRadius: '2px', flexShrink: 0,
              background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
            }} />
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            Services I{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Offer
            </span>
          </h2>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            color: 'var(--text-muted)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            From concept to deployment — end-to-end digital solutions tailored to your goals.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(0.875rem, 1.5vw, 1.25rem)',
          marginBottom: hasMore ? '0' : 'clamp(3rem, 5vw, 4.5rem)',
        }}>
          {displayedServices.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              isDark={isDark}
              cardRef={el => (cardsRef.current[i] = el)}
            />
          ))}
        </div>

        {/* Show More / Less — mobile only */}
        {hasMore && (
          <div className="services-toggle" style={{ textAlign: 'center', margin: '1.5rem 0 clamp(3rem, 5vw, 4.5rem)', display: 'none' }}>
            <button
              onClick={() => setShowAll(v => !v)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.1)',
                color: 'var(--text-primary)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700, fontSize: '0.9rem',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.08)' : 'rgba(2,132,199,0.07)';
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.color = 'var(--accent-cyan)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              {showAll ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                  Show Less
                </>
              ) : (
                <>
                  Show All {services.length} Services
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </>
              )}
            </button>
          </div>
        )}

        <style>{`
          @media (max-width: 640px) {
            .services-toggle { display: block !important; }
          }
        `}</style>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
          borderRadius: '20px',
          background: isDark
            ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
            : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
          boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.72rem, 1.1vw, 0.8rem)',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            Ready to work together?
          </div>

          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
            lineHeight: 1.2,
          }}>
            Let's Build Something{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Great
            </span>
          </h3>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '420px',
            margin: '0 auto 2rem',
            lineHeight: 1.7,
          }}>
            Have a project in mind? I'm available for freelance work on Fiverr.
          </p>

          <a
            href="https://www.fiverr.com/farhan_afzal204?public_mode=true"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(1.75rem, 3vw, 2.5rem)',
              borderRadius: '12px',
              background: '#1DBF73',
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: '0 4px 20px rgba(29,191,115,0.35)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(29,191,115,0.5)';
              e.currentTarget.style.background = '#19a864';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(29,191,115,0.35)';
              e.currentTarget.style.background = '#1DBF73';
            }}
          >
            <FiverrLogo />
            Hire Me on Fiverr
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
