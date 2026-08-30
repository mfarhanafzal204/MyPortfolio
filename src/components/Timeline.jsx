import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useTheme } from '../context/ThemeContext';
import { timeline } from '../data/timeline';

const typeMeta = {
  work:      { label: 'Experience', color: '#00e5ff',  bg: 'rgba(0,229,255,0.1)',   border: 'rgba(0,229,255,0.25)'  },
  education: { label: 'Education',  color: '#6366f1',  bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.25)' },
  freelance: { label: 'Freelance',  color: '#f59e0b',  bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)' },
};

function OrgLogo({ item, isDark }) {
  const [imgError, setImgError] = useState(false);

  const containerStyle = {
    flexShrink: 0,
    width: '52px',
    height: '52px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
    background: isDark
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(255,255,255,0.9)',
    transition: 'transform 0.2s ease',
    textDecoration: 'none',
  };

  const content = !imgError && item.logoSrc ? (
    <img
      src={item.logoSrc}
      alt={item.logoAlt || item.organization}
      loading="lazy"
      onError={() => setImgError(true)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  ) : (
    <span style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: item.logoInitials && item.logoInitials.length > 2 ? '0.6rem' : '0.85rem',
      fontWeight: 800,
      color: item.color,
      letterSpacing: '-0.02em',
      textAlign: 'center',
      lineHeight: 1,
    }}>
      {item.logoInitials || item.organization.slice(0, 2).toUpperCase()}
    </span>
  );

  if (item.orgUrl) {
    return (
      <a
        href={item.orgUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={containerStyle}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        aria-label={`Visit ${item.organization} website`}
      >
        {content}
      </a>
    );
  }

  return <div style={containerStyle}>{content}</div>;
}

function TimelineItem({ item, index, isDark }) {
  const cardRef = useRef();
  const isLeft  = index % 2 === 0;
  const meta    = typeMeta[item.type] || typeMeta.work;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, x: isLeft ? -40 : 40 });
    const t = gsap.to(el, {
      opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    return () => t.scrollTrigger?.kill();
  }, [isLeft]);

  const card = (
    <div
      ref={cardRef}
      style={{
        background: isDark
          ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(255,255,255,0.75))',
        border: isDark
          ? `1px solid ${item.color}28`
          : `1px solid ${item.color}22`,
        borderRadius: '20px',
        padding: 'clamp(1.4rem, 2.5vw, 1.9rem)',
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isDark
          ? '0 4px 24px rgba(0,0,0,0.25)'
          : '0 4px 24px rgba(0,0,0,0.07)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${item.color}50`;
        e.currentTarget.style.boxShadow = isDark
          ? `0 16px 48px ${item.color}18`
          : `0 16px 48px ${item.color}12`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isDark ? `${item.color}28` : `${item.color}22`;
        e.currentTarget.style.boxShadow = isDark
          ? '0 4px 24px rgba(0,0,0,0.25)'
          : '0 4px 24px rgba(0,0,0,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${item.color}, transparent)`,
        borderRadius: '20px 20px 0 0',
      }} />

      {/* Header row: logo + org info */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: '1rem',
        marginBottom: '1.1rem',
      }}>
        {/* Real logo image */}
        <OrgLogo item={item} isDark={isDark} />

        {/* Org + period */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Type badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            background: meta.bg,
            border: `1px solid ${meta.border}`,
            marginBottom: '0.4rem',
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(0.6rem, 0.9vw, 0.68rem)',
              color: meta.color,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {meta.label}
            </span>
          </div>

          {/* Period */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.7rem, 1vw, 0.78rem)',
            color: item.color,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}>
            {item.period}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
        color: 'var(--text-primary)',
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
        marginBottom: '0.3rem',
      }}>
        {item.title}
      </h3>

      {/* Organization + location */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        marginBottom: '0.9rem', flexWrap: 'wrap',
      }}>
        {item.orgUrl ? (
          <a
            href={item.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.82rem, 1.2vw, 0.9rem)',
              color: item.color,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            {item.organization}
          </a>
        ) : (
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.82rem, 1.2vw, 0.9rem)',
            color: item.color,
            fontWeight: 600,
          }}>
            {item.organization}
          </span>
        )}
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>·</span>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(0.78rem, 1.1vw, 0.85rem)',
          color: 'var(--text-muted)',
        }}>
          {item.location}
        </span>
      </div>

      {/* App URL (e.g. Play Store link) */}
      {item.appUrl && (
        <div style={{ marginBottom: '0.6rem' }}>
          <a
            href={item.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.22rem 0.65rem',
              borderRadius: '6px',
              background: `${item.color}12`,
              border: `1px solid ${item.color}30`,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(0.62rem, 0.9vw, 0.68rem)',
              fontWeight: 600,
              color: item.color,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${item.color}22`;
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${item.color}12`;
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18.5l8.5-8.5L3 1.5 4.5 0l10 10-10 10L3 18.5zm8 0L19.5 10 11 1.5 12.5 0l10 10-10 10L11 18.5z"/>
            </svg>
            Google Play
          </a>
        </div>
      )}

      {/* Action buttons */}
      {(item.offerLetterUrl || item.certificateUrl) && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {item.offerLetterUrl && (
            <a
              href={item.offerLetterUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '8px',
                background: `${item.color}12`,
                border: `1px solid ${item.color}35`,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(0.72rem, 1vw, 0.78rem)',
                fontWeight: 600,
                color: item.color,
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${item.color}22`;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${item.color}12`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="View Offer Letter"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              View Offer Letter
            </a>
          )}

          {item.certificateUrl && (
            <a
              href={item.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '8px',
                background: `${item.color}12`,
                border: `1px solid ${item.color}35`,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(0.72rem, 1vw, 0.78rem)',
                fontWeight: 600,
                color: item.color,
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${item.color}22`;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${item.color}12`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="View Completion Certificate"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              Completion Certificate
            </a>
          )}
        </div>
      )}

      {/* Description */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(0.85rem, 1.2vw, 0.92rem)',
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
        marginBottom: '1rem',
      }}>
        {item.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {item.tags.map(tag => (
          <span key={tag} style={{
            padding: '0.25rem 0.65rem',
            borderRadius: '7px',
            background: `${item.color}10`,
            border: `1px solid ${item.color}28`,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.68rem, 1vw, 0.75rem)',
            fontWeight: 600,
            color: item.color,
            letterSpacing: '0.01em',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="tl-row" style={{
      display: 'flex',
      justifyContent: isLeft ? 'flex-end' : 'flex-start',
      paddingRight: isLeft ? 'calc(50% + 2.5rem)' : '0',
      paddingLeft:  isLeft ? '0' : 'calc(50% + 2.5rem)',
      marginBottom: '2rem',
      position: 'relative',
    }}>
      {card}
    </div>
  );
}

export default function Timeline() {
  const { isDark } = useTheme();
  const sectionRef = useRef();
  const lineRef    = useRef();

  useEffect(() => {
    const line = lineRef.current;
    const sec  = sectionRef.current;
    if (!line || !sec) return;
    gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
    const t = gsap.to(line, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top 75%', end: 'bottom 25%', scrub: 1 },
    });
    return () => t.scrollTrigger?.kill();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        background: 'var(--bg-secondary)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
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
              Experience &amp; Education
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
          }}>
            My{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Journey
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Center line */}
          <div className="tl-line-track" style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: '2px',
            background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
            transform: 'translateX(-50%)',
          }}>
            <div ref={lineRef} style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple))',
            }} />
          </div>

          {/* Items */}
          {timeline.map((item, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* Dot */}
              <div className="tl-dot" style={{
                position: 'absolute',
                left: '50%',
                top: '1.6rem',
                transform: 'translate(-50%, 0)',
                width: '14px', height: '14px',
                borderRadius: '50%',
                background: item.color,
                boxShadow: `0 0 0 4px ${isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)'}, 0 0 12px ${item.color}80`,
                zIndex: 2,
              }} />
              <TimelineItem item={item} index={i} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Mobile: stack all cards left */
        @media (max-width: 767px) {
          .tl-row {
            padding-left: 2.5rem !important;
            padding-right: 0 !important;
            justify-content: flex-start !important;
          }
          .tl-line-track {
            left: 0.6rem !important;
            transform: none !important;
          }
          .tl-dot {
            left: 0.6rem !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </section>
  );
}
