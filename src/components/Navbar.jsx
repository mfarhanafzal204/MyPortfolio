import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'About',          href: '#about'          },
  { label: 'Skills',         href: '#skills'         },
  { label: 'Projects',       href: '#projects'       },
  { label: 'Services',       href: '#services'       },
  { label: 'Journey',        href: '#timeline'       },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Highlights',     href: '#highlights'     },
  { label: 'Contact',        href: '#contact'        },
];

export default function Navbar() {
  const { isDark } = useTheme();
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef      = useRef();
  const menuLinksRef = useRef([]);
  const navRef       = useRef();

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── active section tracker ── */
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── mobile menu animation ── */
  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(menuRef.current, { display: 'flex', x: '100%' });
      gsap.to(menuRef.current, {
        x: '0%', duration: 0.4, ease: 'power3.out',
      });
      gsap.fromTo(menuLinksRef.current.filter(Boolean),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power3.out', delay: 0.15 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        x: '100%', duration: 0.35, ease: 'power3.in',
        onComplete: () => { if (menuRef.current) menuRef.current.style.display = 'none'; },
      });
    }
  }, [menuOpen]);

  /* ── navbar entrance ── */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navBg     = scrolled ? 'var(--bg-nav)'          : 'transparent';
  const navBorder = scrolled ? 'var(--border-subtle)'   : 'transparent';
  const navBlur   = scrolled ? 'blur(24px) saturate(180%)' : 'none';

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 2.5rem',
          height: '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: navBlur, WebkitBackdropFilter: navBlur,
          background: navBg,
          borderBottom: `1px solid ${navBorder}`,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); handleNavClick('#hero'); }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1.15rem', fontWeight: 600,
            letterSpacing: '-0.02em',
          }}>
            <span style={{ color: 'var(--accent-cyan)' }}>{'<'}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>FA</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{'/>'}</span>
          </span>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '1.05rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            Farhan Afzal
          </span>
        </a>

        {/* ── Desktop nav links ── */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={label}
                href={href}
                onClick={e => { e.preventDefault(); handleNavClick(href); }}
                style={{
                  position: 'relative',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.95rem', fontWeight: 600,
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '7px',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = isDark
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {label}
                {/* Active indicator dot */}
                {isActive && (
                  <span style={{
                    position: 'absolute', bottom: '2px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: 'var(--accent-cyan)',
                    boxShadow: '0 0 6px var(--accent-cyan)',
                  }} />
                )}
              </a>
            );
          })}
        </div>

        {/* ── Desktop right controls ── */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <ThemeToggle />

          {/* Download CV button */}
          <a
            href="/FarhanAfzal_BSCS_2027.pdf"
            download="FarhanAfzal_BSCS_2027.pdf"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.9rem', fontWeight: 700,
              color: isDark ? '#030308' : '#ffffff',
              textDecoration: 'none',
              padding: '0.575rem 1.375rem',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              boxShadow: isDark
                ? '0 2px 16px rgba(0,229,255,0.28)'
                : '0 2px 16px rgba(2,132,199,0.32)',
              transition: 'transform 0.22s ease, box-shadow 0.22s ease',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 8px 28px rgba(0,229,255,0.5)'
                : '0 8px 28px rgba(2,132,199,0.55)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 2px 16px rgba(0,229,255,0.28)'
                : '0 2px 16px rgba(2,132,199,0.32)';
            }}
          >
            {/* Download icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
        </div>

        {/* ── Mobile right: theme + hamburger ── */}
        <div className="mobile-nav-right" style={{ display: 'none', alignItems: 'center', gap: '0.625rem' }}>
          <ThemeToggle />
          <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(o => !o)} isDark={isDark} />
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay menu ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          display: menuOpen ? 'block' : 'none',
          position: 'fixed', inset: 0, zIndex: 998,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        style={{
          display: 'none',
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(320px, 88vw)',
          zIndex: 999,
          background: isDark
            ? 'linear-gradient(160deg, rgba(8,8,20,0.98) 0%, rgba(3,3,12,0.99) 100%)'
            : 'linear-gradient(160deg, rgba(255,255,255,0.99) 0%, rgba(245,247,252,0.99) 100%)',
          backdropFilter: 'blur(32px)',
          borderLeft: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: '0',
          boxShadow: isDark
            ? '-20px 0 60px rgba(0,0,0,0.5)'
            : '-20px 0 60px rgba(0,0,0,0.12)',
        }}
      >
        {/* Drawer header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
        }}>
          {/* Logo */}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.05rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--accent-cyan)' }}>{'<'}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>FA</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{'/>'}</span>
          </span>

          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.1)'; e.currentTarget.style.color = 'var(--accent-cyan)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '1rem 0', flex: 1 }}>
          {navLinks.map(({ label, href }, i) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={label}
                ref={el => (menuLinksRef.current[i] = el)}
                href={href}
                onClick={e => { e.preventDefault(); handleNavClick(href); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.85rem 1.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  borderLeft: isActive ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                  background: isActive
                    ? isDark ? 'rgba(0,229,255,0.06)' : 'rgba(2,132,199,0.05)'
                    : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
                    e.currentTarget.style.borderLeftColor = isDark ? 'rgba(0,229,255,0.3)' : 'rgba(2,132,199,0.3)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                  }
                }}
              >
                {/* Number */}
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  minWidth: '24px',
                  transition: 'color 0.2s ease',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Label */}
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(1rem, 3.5vw, 1.1rem)',
                  fontWeight: 700,
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.2s ease',
                }}>
                  {label}
                </span>

                {/* Active dot */}
                {isActive && (
                  <span style={{
                    marginLeft: 'auto',
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: 'var(--accent-cyan)',
                    boxShadow: '0 0 8px var(--accent-cyan)',
                    flexShrink: 0,
                  }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* Divider */}
        <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', margin: '0 1.5rem' }} />

        {/* Bottom: CV + socials */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Download CV */}
          <a
            ref={el => (menuLinksRef.current[navLinks.length] = el)}
            href="/FarhanAfzal_BSCS_2027.pdf"
            download="FarhanAfzal_BSCS_2027.pdf"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.85rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              color: isDark ? '#030308' : '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: '0.92rem',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,229,255,0.25)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,229,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,229,255,0.25)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
            {[
              { label: 'GitHub',   href: 'https://github.com/farhan-afzal',                          bg: '#24292E', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>` },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/farhan-afzal-85518b282/',      bg: '#0A66C2', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
              { label: 'Fiverr',   href: 'https://www.fiverr.com/farhan_afzal204?public_mode=true', bg: '#1DBF73', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="18.5" cy="5.5" r="1.5"/><path d="M5.5 18V9.5H4V7.5h1.5V7c0-2.2 1.3-3.5 3.5-3.5.6 0 1.1.1 1.5.2v2c-.3-.1-.6-.2-1-.2-.9 0-1.5.5-1.5 1.5v.5H11v2H8v8.5H5.5zM12 18V9.5h2.5V18H12z"/></svg>` },
            ].map(({ label, href, bg, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem', padding: '0.6rem',
                  borderRadius: '10px', background: bg,
                  color: '#fff', textDecoration: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.78rem', fontWeight: 600,
                  transition: 'all 0.2s ease',
                  boxShadow: `0 2px 10px ${bg}50`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 18px ${bg}70`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 2px 10px ${bg}50`; }}
              >
                <span style={{ width: '14px', height: '14px', display: 'flex' }} dangerouslySetInnerHTML={{ __html: icon }} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-right { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ── Premium Hamburger Button ── */
function HamburgerButton({ open, onClick, isDark }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      style={{
        position: 'relative',
        width: '40px', height: '40px',
        borderRadius: '10px',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '5px',
        padding: '0',
        transition: 'background 0.2s ease, border-color 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.08)' : 'rgba(2,132,199,0.08)';
        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
      }}
    >
      {/* Top bar */}
      <span style={{
        display: 'block',
        width: open ? '18px' : '18px',
        height: '1.5px',
        background: 'var(--text-primary)',
        borderRadius: '2px',
        transformOrigin: 'center',
        transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.2s ease, width 0.2s ease',
        transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
      }} />
      {/* Middle bar */}
      <span style={{
        display: 'block',
        width: '12px',
        height: '1.5px',
        background: 'var(--accent-cyan)',
        borderRadius: '2px',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        opacity: open ? 0 : 1,
        transform: open ? 'scaleX(0)' : 'scaleX(1)',
      }} />
      {/* Bottom bar */}
      <span style={{
        display: 'block',
        width: '18px',
        height: '1.5px',
        background: 'var(--text-primary)',
        borderRadius: '2px',
        transformOrigin: 'center',
        transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.2s ease',
        transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
      }} />
    </button>
  );
}
