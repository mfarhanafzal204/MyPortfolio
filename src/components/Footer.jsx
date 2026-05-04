import { FaGithub, FaLinkedin, FaStar } from 'react-icons/fa';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/farhan-afzal', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/farhan-afzal-85518b282/', label: 'LinkedIn' },
  { icon: FaStar, href: 'https://www.fiverr.com/farhan_afzal204?public_mode=true', label: 'Fiverr' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top gradient line */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #00e5ff, #8b5cf6, transparent)',
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '3rem clamp(1.5rem, 5vw, 6rem)',
      }}>
        {/* Main footer content */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.1rem',
                fontWeight: 500,
              }}>
                <span style={{ color: '#00e5ff' }}>{'<'}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>FA</span>
                <span style={{ color: '#00e5ff' }}>{'/>'}</span>
              </span>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--text-primary)',
              }}>
                Farhan Afzal
              </span>
            </div>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
            }}>
              Full-Stack Developer · Islamabad, Pakistan
            </p>
          </div>

          {/* Nav Links */}
          <nav style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.target.style.color = '#00e5ff'; }}
                onMouseLeave={(e) => { e.target.style.color = 'var(--text-muted)'; }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                className="social-icon-btn"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00e5ff';
                  e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(0,229,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'var(--border-subtle)',
          marginBottom: '1.5rem',
        }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.25rem',
            }}>
              © 2026 Farhan Afzal. All rights reserved.
            </p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}>
              Designed &amp; Developed by Farhan Afzal
            </p>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="social-icon-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00e5ff';
              e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,229,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
