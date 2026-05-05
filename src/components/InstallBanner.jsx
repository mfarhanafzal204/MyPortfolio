import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function InstallBanner() {
  const { isDark } = useTheme();
  const [show, setShow]           = useState(false);
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const deferredPrompt            = useRef(null);
  const timerRef                  = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('pwa-banner-dismissed')) return;

    const handler = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setTimeout(() => {
        setShow(true);
        setTimeout(() => setVisible(true), 50);
        timerRef.current = setTimeout(() => dismiss(), 8000);
      }, 4000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const fallbackTimer = setTimeout(() => {
      if (!deferredPrompt.current && !sessionStorage.getItem('pwa-banner-dismissed')) {
        const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (!isStandalone && (isIOS || /android/i.test(navigator.userAgent))) {
          setShow(true);
          setTimeout(() => setVisible(true), 50);
          timerRef.current = setTimeout(() => dismiss(), 8000);
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('pwa-banner-dismissed', '1');
    setTimeout(() => setShow(false), 500);
    clearTimeout(timerRef.current);
  };

  const install = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      await deferredPrompt.current.userChoice;
      deferredPrompt.current = null;
    }
    dismiss();
  };

  if (!show || dismissed) return null;

  const AppIcon = () => (
    <div style={{
      borderRadius: '10px', flexShrink: 0,
      background: 'linear-gradient(135deg, #030308, #0d0d1a)',
      border: '1px solid rgba(0,229,255,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, lineHeight: 1 }}>
        <span style={{ color: '#00e5ff' }}>{'<'}</span>
        <span style={{ color: '#fff' }}>FA</span>
        <span style={{ color: '#00e5ff' }}>{'/>'}</span>
      </span>
    </div>
  );

  return (
    <>
      {/* ── Desktop: floating card ── */}
      <div
        className="pwa-banner-desktop"
        style={{
          position: 'fixed',
          bottom: 'clamp(1rem, 3vw, 1.5rem)',
          left: '50%',
          transform: `translateX(-50%) translateY(${visible ? '0' : '120px'})`,
          zIndex: 9998,
          width: 'min(480px, calc(100vw - 2rem))',
          transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
          opacity: visible ? 1 : 0,
        }}
      >
        <div style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(8,8,20,0.97), rgba(15,10,30,0.97))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(245,247,255,0.98))',
          border: isDark ? '1px solid rgba(0,229,255,0.25)' : '1px solid rgba(2,132,199,0.2)',
          borderRadius: '20px',
          padding: '1.1rem 1.4rem',
          boxShadow: isDark
            ? '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 20px 60px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(24px)',
          display: 'flex', alignItems: 'center', gap: '1rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', borderRadius: '20px 20px 0 0' }} />

          <div style={{ width: '48px', height: '48px', fontSize: '0.72rem' }}><AppIcon /></div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: '0.15rem' }}>
              Install Farhan's Portfolio
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Add to home screen for quick access
            </div>
          </div>

          <button onClick={install} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.55rem 1.1rem', borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            border: 'none', color: isDark ? '#030308' : '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem',
            cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(0,229,255,0.3)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Install App
          </button>

          <button onClick={dismiss} style={{
            position: 'absolute', top: '0.6rem', right: '0.6rem',
            width: '24px', height: '24px', borderRadius: '50%',
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', padding: 0,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', borderRadius: '0 0 20px 20px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', animation: 'pwaProgress 8s linear forwards' }} />
          </div>
        </div>
      </div>

      {/* ── Mobile: sticky bottom bar ── */}
      <div
        className="pwa-banner-mobile"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 9998,
          transform: `translateY(${visible ? '0' : '100%'})`,
          transition: 'transform 0.45s cubic-bezier(0.34,1.2,0.64,1), opacity 0.35s ease',
          opacity: visible ? 1 : 0,
        }}
      >
        <div style={{
          background: isDark ? 'rgba(8,8,20,0.97)' : 'rgba(255,255,255,0.98)',
          borderTop: isDark ? '1px solid rgba(0,229,255,0.2)' : '1px solid rgba(2,132,199,0.15)',
          backdropFilter: 'blur(20px)',
          padding: '0.85rem 1.25rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.2)',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))' }} />

          <div style={{ width: '40px', height: '40px', fontSize: '0.6rem' }}><AppIcon /></div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Install Portfolio App
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Add to home screen
            </div>
          </div>

          <button onClick={install} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.55rem 1rem', borderRadius: '9px',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            border: 'none', color: isDark ? '#030308' : '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.82rem',
            cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(0,229,255,0.3)',
          }}>
            Install
          </button>

          <button onClick={dismiss} style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', padding: 0,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pwaProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .pwa-banner-mobile  { display: none !important; }
        .pwa-banner-desktop { display: block; }
        @media (max-width: 600px) {
          .pwa-banner-desktop { display: none !important; }
          .pwa-banner-mobile  { display: block !important; }
        }
      `}</style>
    </>
  );
}
