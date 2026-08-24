import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projects';
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa';

function ProjectCard({ project, isDark }) {
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const neutralBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
  const hoverBorder = isDark ? 'rgba(0,229,255,0.28)' : 'rgba(2,132,199,0.25)';
  const neutralBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
  const accentBg = isDark ? 'rgba(0,229,255,0.1)' : 'rgba(2,132,199,0.08)';
  const accentBorder = isDark ? 'rgba(0,229,255,0.28)' : 'rgba(2,132,199,0.25)';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isDark
          ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
        border: isDark
          ? `1px solid ${hovered ? hoverBorder : neutralBorder}`
          : `1px solid ${hovered ? hoverBorder : neutralBorder}`,
        borderRadius: '20px',
        padding: 'clamp(1.5rem, 2.5vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? isDark
            ? '0 20px 60px rgba(0,229,255,0.12)'
            : '0 20px 60px rgba(2,132,199,0.1)'
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
        background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
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
        background: neutralBg,
        border: isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.08)',
        marginBottom: '0.75rem',
        width: 'fit-content',
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(0.68rem, 1vw, 0.75rem)',
          color: 'var(--text-secondary)',
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
        background: accentBg,
        border: `1px solid ${accentBorder}`,
        marginBottom: '1rem',
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(0.7rem, 1vw, 0.75rem)',
          color: 'var(--accent-cyan)',
          fontWeight: 500,
        }}>
          ↗ {project.impact}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
        {project.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.68rem, 1vw, 0.75rem)',
              fontWeight: 500,
              background: neutralBg,
              border: isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.08)',
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
              transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = accentBg;
              e.currentTarget.style.borderColor = accentBorder;
              e.currentTarget.style.color = 'var(--accent-cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = neutralBg;
              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)';
              e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)';
            }}
          >
            {tag}
          </span>
        ))}
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
              background: accentBg,
              border: `1px solid ${accentBorder}`,
              color: 'var(--accent-cyan)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(0.78rem, 1.1vw, 0.85rem)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.18)' : 'rgba(2,132,199,0.14)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = accentBg;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FaExternalLinkAlt size={11} /> View Live
          </a>
        )}

        {project.adminUrl && (
          <a
            href={project.adminUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.1)',
              color: 'var(--text-secondary)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(0.78rem, 1.1vw, 0.85rem)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = accentBg;
              e.currentTarget.style.borderColor = accentBorder;
              e.currentTarget.style.color = 'var(--accent-cyan)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = neutralBg;
              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Admin Panel
          </a>
        )}


        {(project.videoPath || project.youtubeId) && (
          <button
            onClick={() => setShowVideo(!showVideo)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              background: accentBg,
              border: `1px solid ${accentBorder}`,
              color: 'var(--accent-cyan)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(0.78rem, 1.1vw, 0.85rem)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.18)' : 'rgba(2,132,199,0.14)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = accentBg;
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
  const [search, setSearch] = useState('');
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
  const byCategory = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  const filtered = search.trim()
    ? byCategory.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      )
    : byCategory;

  const MOBILE_LIMIT = 3;
  // On mobile show only first 3 unless showAll — on desktop always show all
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

          {/* Search + filter row */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>

            {/* Search input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowAll(false); }}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.75rem',
                  borderRadius: '9999px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  color: 'var(--text-primary)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-cyan)'}
                onBlur={e => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
              />
            </div>

            {/* Category filter pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); setShowAll(false); }}
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
            </div>  {/* end category pills */}
          </div>  {/* end search+filter wrapper */}
        </div>  {/* end header centered div */}

        {/* Projects grid — desktop: all visible, mobile: limited with toggle */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              className={idx >= 3 ? 'project-extra' : ''}
              style={{ display: 'contents' }}
            >
              <ProjectCard project={project} isDark={isDark} />
            </div>
          ))}
        </div>

        {/* Show More / Less — mobile only, hidden on desktop via CSS */}
        {filtered.length > 3 && (
          <div className="projects-toggle" style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <button
              onClick={() => setShowAll(v => !v)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 2rem', borderRadius: '9999px',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.1)',
                color: 'var(--text-primary)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700, fontSize: '0.9rem',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              {showAll
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg> Show Less</>
                : <>Show All {filtered.length} Projects <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></>
              }
            </button>
          </div>
        )}

        <style>{`
          /* Desktop: always show all, hide toggle button */
          @media (min-width: 641px) {
            .project-extra { display: contents !important; }
            .projects-toggle { display: none !important; }
          }
          /* Mobile: hide extra cards when collapsed */
          @media (max-width: 640px) {
            .project-extra { display: ${showAll ? 'contents' : 'none'} !important; }
          }
        `}</style>

      </div>
    </section>
  );
}
