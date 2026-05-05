import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projects';
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa';

// Tech stack logos (inline SVG)
const techLogos = {
  'Next.js 14': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#000"/><path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9c2.49 0 4.74-1.01 6.36-2.64L9.75 9.75V15H8.25V7.5h1.5l7.13 9.83A8.96 8.96 0 0021 12c0-4.97-4.03-9-9-9z" fill="#fff"/><rect x="14.25" y="7.5" width="1.5" height="6.75" fill="#fff"/></svg>`,
  
  'TypeScript': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#3178C6"/><path d="M13.875 13.125H16.5v-1.5h-5.25v1.5h1.875V18.75h1.5v-5.625zM16.5 14.625c0-1.45 1.01-2.625 2.625-2.625.54 0 1.02.135 1.425.375l-.6 1.2c-.225-.135-.5-.21-.825-.21-.623 0-1.125.502-1.125 1.26V18.75H16.5v-4.125z" fill="#fff"/></svg>`,
  
  'Firebase': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#1a1a1a"/><path d="M6 18l3.375-10.5 2.625 4.875L14.25 7.5l3.75 10.5H6z" fill="#FFA000"/><path d="M6 18l3.375-10.5 2.625 4.875L6 18z" fill="#F57F17"/><path d="M12 12.375L14.25 7.5l3.75 10.5-6-5.625z" fill="#FFCA28"/></svg>`,
  
  'React': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#20232A"/><circle cx="12" cy="12" r="1.875" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="8.25" ry="3.15" stroke="#61DAFB" strokeWidth="1.125" fill="none"/><ellipse cx="12" cy="12" rx="8.25" ry="3.15" stroke="#61DAFB" strokeWidth="1.125" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="8.25" ry="3.15" stroke="#61DAFB" strokeWidth="1.125" fill="none" transform="rotate(120 12 12)"/></svg>`,
  
  'PWA': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#5A0FC8"/><text x="3" y="16" fontFamily="Arial" fontWeight="bold" fontSize="7.5" fill="#fff">PWA</text></svg>`,
  
  'HTML5': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#E34F26"/><path d="M5.25 3l1.35 15.225L12 19.5l5.4-2.025L18.75 3h-13.5zm10.875 4.5H9l.225 2.25h6.675l-.675 7.125L12 18l-3.225-1.125-.225-2.475h2.175l.113 1.275L12 16.5l1.162-.375.113-1.875H8.55l-.675-7.5h8.25l-.225 2.25z" fill="#fff"/></svg>`,
  
  'CSS3': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#1572B6"/><path d="M5.25 3l1.35 15.225L12 19.5l5.4-2.025L18.75 3h-13.5zm9.75 10.875l-.225 2.625L12 17.25l-2.775-.75-.188-2.1h2.1l.098 1.05L12 16.125l.735-.3.075-.825H8.85l-.525-6h7.35l-.188 1.875h-5.25l.113 1.125h5.025l-.338 3.375z" fill="#fff"/></svg>`,
  
  'JavaScript': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path d="M7.125 18.375l1.575-.953c.3.54.578 1 1.238 1 .63 0 1.028-.248 1.028-1.208V11.25h1.935v5.985c0 1.988-1.163 2.895-2.865 2.895-1.538 0-2.43-.795-2.91-1.755zM14.325 18.15l1.575-.915c.413.675.953 1.17 1.905 1.17.803 0 1.313-.398 1.313-.953 0-.66-.525-.893-1.41-1.275l-.488-.21c-1.395-.593-2.325-1.343-2.325-2.918 0-1.455 1.11-2.558 2.835-2.558 1.23 0 2.115.428 2.753 1.545l-1.508.968c-.33-.593-.69-.825-1.245-.825-.563 0-.923.36-.923.825 0 .578.36.81 1.185 1.17l.488.21c1.643.705 2.573 1.425 2.573 3.038 0 1.74-1.365 2.7-3.203 2.7-1.793 0-2.955-.855-3.525-1.973z" fill="#000"/></svg>`,
  
  'GSAP': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#88CE02"/><text x="3.5" y="16" fontFamily="Arial" fontWeight="bold" fontSize="6" fill="#000">GSAP</text></svg>`,
  
  'WhatsApp API': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#25D366"/><path d="M12 3C7.03 3 3 7.03 3 12c0 1.59.42 3.08 1.14 4.38L3 21l4.74-1.11A8.96 8.96 0 0012 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm4.5 12.75c-.19.54-1.12 1.02-1.54 1.08-.42.06-.42.33-2.67-.56-2.25-.89-3.68-3.17-3.79-3.32-.11-.15-.9-1.2-.9-2.29s.57-1.63.77-1.85c.2-.22.44-.28.59-.28h.42c.14 0 .32-.05.5.38l.69 1.68c.08.19.13.4.03.65-.1.25-.15.4-.3.62-.15.22-.31.49-.44.66-.15.19-.3.4-.13.78.17.38.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.13.63-.08.17-.21.73-.85.93-1.14.2-.29.4-.24.67-.15.27.09 1.72.81 2.01.96.29.15.48.22.55.34.07.12.07.69-.12 1.23z" fill="#fff"/></svg>`,
  
  'Offline-first': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#6366F1"/><path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm.75-12h-1.5v6l5.25 3.15.75-1.23-4.5-2.67V7.5z" fill="#fff"/></svg>`,
  
  'Urdu/English': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#7C3AED"/><text x="3.75" y="10.5" fontFamily="Arial" fontSize="6" fill="#fff">EN</text><text x="12.75" y="10.5" fontFamily="Arial" fontSize="6" fill="#fff" opacity=".7">اردو</text><path d="M4.5 13.5h15" stroke="#fff" strokeWidth=".75" opacity=".4"/><text x="6" y="19.5" fontFamily="Arial" fontSize="5.25" fill="#fff" opacity=".8">Bilingual</text></svg>`,
  
  'Bilingual': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#7C3AED"/><text x="3.75" y="10.5" fontFamily="Arial" fontSize="6" fill="#fff">EN</text><text x="12.75" y="10.5" fontFamily="Arial" fontSize="6" fill="#fff" opacity=".7">اردو</text><path d="M4.5 13.5h15" stroke="#fff" strokeWidth=".75" opacity=".4"/><text x="6" y="19.5" fontFamily="Arial" fontSize="5.25" fill="#fff" opacity=".8">Bilingual</text></svg>`,
  
  'ERP': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#B45309"/><rect x="4.5" y="6" width="6" height="5.25" rx=".75" fill="#fff" fillOpacity=".9"/><rect x="13.5" y="6" width="6" height="5.25" rx=".75" fill="#fff" fillOpacity=".9"/><rect x="4.5" y="13.5" width="6" height="5.25" rx=".75" fill="#fff" fillOpacity=".9"/><rect x="13.5" y="13.5" width="6" height="5.25" rx=".75" fill="#fff" fillOpacity=".9"/></svg>`,
  
  'Animations': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#EC4899"/><path d="M12 4.5L6 9v6l6 3.5 6-3.5V9l-6-4.5zm0 1.73l4.35 2.5-4.35 2.5-4.35-2.5L12 6.23zM7.5 10.58l4 2.3v4.6l-4-2.3v-4.6zm5 6.9v-4.6l4-2.3v4.6l-4 2.3z" fill="#fff"/></svg>`,
  
  'Mobile-First': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#0EA5E9"/><rect x="7.5" y="4.5" width="9" height="15" rx="1.5" stroke="#fff" strokeWidth="1.125" fill="none"/><rect x="9.75" y="16.5" width="4.5" height="2.25" rx=".75" fill="#fff"/></svg>`,
  
  'Responsive Design': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#0EA5E9"/><rect x="3.75" y="6" width="16.5" height="10.5" rx="1.5" stroke="#fff" strokeWidth="1.125" fill="none"/><rect x="9.75" y="16.5" width="4.5" height="2.25" rx=".75" fill="#fff"/><rect x="7.5" y="18.75" width="9" height="1.125" rx=".563" fill="#fff"/></svg>`,
  
  '3D Tilt': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F59E0B"/><path d="M12 4.5l-7.5 4.5v6l7.5 4.5 7.5-4.5V9l-7.5-4.5zm0 1.73L17.63 9 12 11.77 6.37 9 12 6.23zM5.25 10.58l6 3.6v5.52l-6-3.6v-5.52zm7.5 9.12v-5.52l6-3.6v5.52l-6 3.6z" fill="#fff"/></svg>`,
  
  'AI Branding': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#6366F1"/><circle cx="12" cy="12" r="2.25" fill="#fff"/><path d="M12 6v2.25M12 15.75V18M18 12h-2.25M8.25 12H6M16.24 7.76l-1.59 1.59M9.35 14.65l-1.59 1.59M16.24 16.24l-1.59-1.59M9.35 9.35L7.76 7.76" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>`,
  
  'Glassmorphism': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#6366F1"/><rect x="6" y="6" width="12" height="12" rx="2" fill="#fff" fillOpacity=".15" stroke="#fff" strokeOpacity=".3" strokeWidth="1.5"/><rect x="8.25" y="8.25" width="7.5" height="7.5" rx="1.5" fill="#fff" fillOpacity=".1"/></svg>`,
  
  'UI Clone': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#FF0000"/><path d="M9.75 7.5v9l6.75-4.5-6.75-4.5z" fill="#fff"/></svg>`,
  
  'Edge Computing': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#10B981"/><circle cx="12" cy="12" r="2.25" fill="#fff"/><circle cx="6" cy="12" r="1.5" fill="#fff" fillOpacity=".7"/><circle cx="18" cy="12" r="1.5" fill="#fff" fillOpacity=".7"/><circle cx="12" cy="6" r="1.5" fill="#fff" fillOpacity=".7"/><circle cx="12" cy="18" r="1.5" fill="#fff" fillOpacity=".7"/></svg>`,
  
  'Video Editing': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F97316"/><rect x="4.5" y="7.5" width="15" height="9" rx="1.5" fill="#fff" fillOpacity=".2" stroke="#fff" strokeWidth="1.125"/><path d="M10.5 10.5v3l3-1.5-3-1.5z" fill="#fff"/></svg>`,
  
  'Motion Graphics': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F97316"/><path d="M12 4.5L6 9v6l6 3.5 6-3.5V9l-6-4.5z" fill="#fff" fillOpacity=".3" stroke="#fff" strokeWidth="1.125"/><circle cx="12" cy="12" r="2.25" fill="#fff"/></svg>`,
  
  'Marketing': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F97316"/><path d="M6 12l3-3v2.25h6V9l3 3-3 3v-2.25H9V15l-3-3z" fill="#fff"/><circle cx="12" cy="12" r="1.5" fill="#fff"/></svg>`,
  
  'Brand Content': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F97316"/><path d="M12 4.5l-7.5 4.5v6l7.5 4.5 7.5-4.5V9l-7.5-4.5z" stroke="#fff" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="3" fill="#fff"/></svg>`,
};

function ProjectCard({ project, isDark }) {
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isDark
          ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
        border: isDark
          ? `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.08)'}`
          : `1px solid ${hovered ? project.color + '40' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: '20px',
        padding: 'clamp(1.5rem, 2.5vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? isDark
            ? `0 20px 60px ${project.color}20`
            : `0 20px 60px ${project.color}15`
          : isDark
          ? '0 4px 24px rgba(0,0,0,0.2)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '420px',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${project.color}, transparent)`,
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Project number watermark */}
      <div style={{
        position: 'absolute',
        top: '1rem', right: '1rem',
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(3rem, 5vw, 4rem)',
        fontWeight: 900,
        color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {project.id}
      </div>

      {/* Category badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.3rem 0.85rem',
        borderRadius: '9999px',
        background: `${project.color}12`,
        border: `1px solid ${project.color}35`,
        marginBottom: '0.75rem',
        width: 'fit-content',
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(0.68rem, 1vw, 0.75rem)',
          color: project.color,
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}>
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
      }}>
        {project.title}
      </h3>

      {/* Type */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(0.68rem, 1vw, 0.75rem)',
        color: 'var(--text-muted)',
        marginBottom: '1rem',
        letterSpacing: '0.02em',
      }}>
        {project.type}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(0.85rem, 1.2vw, 0.92rem)',
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
        marginBottom: '1rem',
        flex: 1,
      }}>
        {project.description}
      </p>

      {/* Impact badge */}
      <div style={{
        padding: '0.45rem 0.8rem',
        borderRadius: '10px',
        background: `${project.color}08`,
        border: `1px solid ${project.color}22`,
        marginBottom: '1rem',
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(0.7rem, 1vw, 0.75rem)',
          color: project.color,
          fontWeight: 500,
        }}>
          ↗ {project.impact}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
        {project.tags.slice(0, 5).map((tag) => {
          const logo = techLogos[tag];
          return (
            <span key={tag} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.68rem, 1vw, 0.75rem)',
              fontWeight: 500,
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.08)',
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
            }}>
              {logo && (
                <span
                  style={{ width: '14px', height: '14px', flexShrink: 0, display: 'flex' }}
                  dangerouslySetInnerHTML={{ __html: logo }}
                />
              )}
              {tag}
            </span>
          );
        })}
      </div>

      {/* Period */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(0.68rem, 1vw, 0.72rem)',
        color: 'var(--text-muted)',
        marginBottom: '1.25rem',
      }}>
        {project.period}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}40`,
              color: project.color,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(0.78rem, 1.1vw, 0.85rem)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${project.color}28`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${project.color}15`;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FaExternalLinkAlt size={11} /> View Live
          </a>
        )}

        {(project.videoPath || project.youtubeId) && (
          <button
            onClick={() => setShowVideo(!showVideo)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}40`,
              color: project.color,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(0.78rem, 1.1vw, 0.85rem)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${project.color}28`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${project.color}15`;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FaPlay size={10} /> {showVideo ? 'Hide Video' : 'Watch Video'}
          </button>
        )}
      </div>

      {/* Video player modal */}
      {showVideo && (project.videoPath || project.youtubeId) && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backdropFilter: 'blur(8px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowVideo(false);
          }}
        >
          <div
            style={{
              maxWidth: '900px',
              width: '100%',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}
            >
              Close ✕
            </button>
            {project.youtubeId ? (
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              }}>
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%',
                    border: 'none', borderRadius: '16px',
                  }}
                />
              </div>
            ) : (
              <video
                controls
                autoPlay
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                  outline: 'none',
                }}
              >
                <source src={project.videoPath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('video').forEach(v => v.pause());
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const categories = ['all', 'Full-Stack Development', 'Static Website', 'Responsive Web Design', 'Video Editing'];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  // On mobile show only featured (first 3) unless showAll
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const MOBILE_LIMIT = 3;
  const displayedProjects = (!showAll && filtered.length > MOBILE_LIMIT)
    ? filtered.slice(0, MOBILE_LIMIT)
    : filtered;
  const hasMore = filtered.length > MOBILE_LIMIT;

  return (
    <section
      id="projects"
      style={{
        background: 'var(--bg-secondary)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
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
              Featured Work
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
            marginBottom: '1.5rem',
          }}>
            Selected{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Projects
            </span>
          </h2>

          {/* Filter tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '9999px',
                  background: filter === cat
                    ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))'
                    : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  border: filter === cat
                    ? 'none'
                    : isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.08)',
                  color: filter === cat
                    ? isDark ? '#030308' : '#ffffff'
                    : 'var(--text-secondary)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  if (filter !== cat) {
                    e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.08)' : 'rgba(2,132,199,0.07)';
                    e.currentTarget.style.borderColor = isDark ? 'rgba(0,229,255,0.25)' : 'rgba(2,132,199,0.25)';
                  }
                }}
                onMouseLeave={e => {
                  if (filter !== cat) {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)';
                  }
                }}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {displayedProjects.map(project => (
            <ProjectCard key={project.id} project={project} isDark={isDark} />
          ))}
        </div>

        {/* Show More / Show Less — mobile only */}
        {hasMore && (
          <div className="projects-toggle" style={{ textAlign: 'center', marginTop: '1.75rem', display: 'none' }}>
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
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
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
                  Show All {filtered.length} Projects
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </>
              )}
            </button>
          </div>
        )}

        <style>{`
          @media (max-width: 640px) {
            .projects-toggle { display: block !important; }
          }
        `}</style>

      </div>
    </section>
  );
}
