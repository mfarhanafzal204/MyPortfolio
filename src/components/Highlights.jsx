import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useTheme } from '../context/ThemeContext';

const media = [
  {
    type: 'video',
    src: '/images/video.mp4',
    label: 'Project Presentation',
    desc: 'Presenting a live project to an audience — walking through architecture, features, and real-world impact.',
    tag: 'Live Demo',
    tagColor: '#00e5ff',
  },
  {
    type: 'image',
    src: '/images/dice.jpeg',
    label: 'Public Speaking',
    desc: 'On stage at a tech event, sharing ideas and engaging with the developer community.',
    tag: 'Tech Event',
    tagColor: '#8b5cf6',
  },
  {
    type: 'image',
    src: '/images/coding.jpg',
    label: 'Deep in the Code',
    desc: 'Where the real work happens — building scalable systems, one commit at a time.',
    tag: 'In the Zone',
    tagColor: '#10b981',
  },
];

function MediaCard({ item, isDark, index }) {
  const cardRef  = useRef();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 40 });
    const t = gsap.to(el, {
      opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
      delay: index * 0.15,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    return () => t.scrollTrigger?.kill();
  }, [index]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      ref={cardRef}
      style={{
        background: isDark
          ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(255,255,255,0.8))',
        border: isDark
          ? `1px solid rgba(255,255,255,0.08)`
          : `1px solid rgba(0,0,0,0.07)`,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = isDark
          ? `0 24px 56px rgba(0,0,0,0.4), 0 0 0 1px ${item.tagColor}30`
          : `0 24px 56px rgba(0,0,0,0.12), 0 0 0 1px ${item.tagColor}25`;
        e.currentTarget.style.borderColor = `${item.tagColor}35`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
      }}
    >
      {/* Media area */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        background: '#000',
        overflow: 'hidden',
      }}>
        {item.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={item.src}
              muted
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', display: 'block' }}
              controls={playing}
              playsInline
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
            {!playing && (
              <div
                onClick={handlePlay}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.45)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
              >
                {/* Play button */}
                <div style={{
                  width: '64px', height: '64px',
                  borderRadius: '50%',
                  background: item.tagColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 0 12px ${item.tagColor}30`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            )}
          </>
        ) : (
          <img
            src={item.src}
            alt={item.label}
            style={{
              width: '100%', height: '100%',
              objectFit: item.src.includes('dice') ? 'contain' : 'cover',
              objectPosition: 'center',
              background: item.src.includes('dice')
                ? (isDark ? '#0a0a0a' : '#f5f5f5')
                : 'transparent',
              display: 'block',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        )}

        {/* Tag badge */}
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          padding: '0.28rem 0.75rem',
          borderRadius: '9999px',
          background: `${item.tagColor}22`,
          border: `1px solid ${item.tagColor}50`,
          backdropFilter: 'blur(8px)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          fontWeight: 700,
          color: item.tagColor,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          {item.tag}
        </div>
      </div>

      {/* Text content */}
      <div style={{ padding: 'clamp(1.25rem, 2vw, 1.6rem)' }}>
        {/* Accent line + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <div style={{
            width: '3px', height: '1.2em',
            borderRadius: '2px',
            background: `linear-gradient(180deg, ${item.tagColor}, transparent)`,
            flexShrink: 0,
          }} />
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            margin: 0,
          }}>
            {item.label}
          </h3>
        </div>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(0.85rem, 1.2vw, 0.92rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          margin: 0,
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function Highlights() {
  const { isDark } = useTheme();
  const headingRef = useRef();

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 24 });
    const t = gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    return () => t.scrollTrigger?.kill();
  }, []);

  return (
    <section
      id="highlights"
      style={{
        background: 'var(--bg-secondary)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            marginBottom: '1rem',
          }}>
            <span style={{ width: '28px', height: '2px', borderRadius: '2px', flexShrink: 0, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)', fontWeight: 600, color: 'var(--accent-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Behind the Scenes
            </span>
            <span style={{ width: '28px', height: '2px', borderRadius: '2px', flexShrink: 0, background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))' }} />
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
            Beyond the{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Code
            </span>
          </h2>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            color: 'var(--text-muted)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            A glimpse into the work, the stage, and the craft — the moments that define the journey.
          </p>
        </div>

        {/* Media grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {media.map((item, i) => (
            <MediaCard key={item.label} item={item} isDark={isDark} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
