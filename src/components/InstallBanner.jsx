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

    // Fallback for iOS / browsers that don't support beforeinstallprompt
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
      const { outcome } = await deferredPrompt.current.userChoice;
      deferredPrompt.current = null;
    }
    dismiss();
  };

  if (!show || dismissed) return null;

  return (
    <div
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
          ? 'linear-gradient(135deg, rgba(8,8,20,0.97) 0%, rgba(15,10,30,0.97) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(245,247,255,0.98) 100%)',
        border: isDark
          ? '1px solid rgba(0,229,255,0.25)'
          : '1px solid rgba(2,132,199,0.2)',
        borderRadius: '20px',
        padding: 'clamp(1rem, 3vw, 1.4rem) clamp(1rem, 3vw, 1.5rem)',
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(2,132,199,0.08)',
        backdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Gradient top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
          borderRadius: '20px 20px 0 0',
        }} />

        {/* App icon */}
        <div style={{
          width: '52px', height: '52px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #030308, #0d0d1a)',
          border: '1px solid rgba(0,229,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 16px rgba(0,229,255,0.2)',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem', fontWeight: 800,
            lineHeight: 1,
          }}>
            <span style={{ color: '#00e5ff' }}>{'<'}</span>
            <span style={{ color: '#fff' }}>FA</span>
            <span style={{ color: '#00e5ff' }}>{'/>'}</span>
          </span>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.88rem, 2.5vw, 0.95rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            marginBottom: '0.2rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            Install Farhan's Portfolio
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.72rem, 2vw, 0.78rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.4,
          }}>
            Add to home screen for quick access
          </div>
        </div>

        {/* Install button */}
        <button
          onClick={install}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            border: 'none',
            color: isDark ? '#030308' : '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.78rem, 2vw, 0.85rem)',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 14px rgba(0,229,255,0.3)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,229,255,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,229,255,0.3)'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Install App
        </button>

        {/* Dismiss X */}
        <button
          onClick={dismiss}
          style={{
            position: 'absolute', top: '0.6rem', right: '0.6rem',
            width: '24px', height: '24px',
            borderRadius: '50%',
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)',
            transition: 'all 0.2s ease',
            padding: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.15)'; e.currentTarget.style.color = '#f43f5e'; }}
          onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Auto-dismiss progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
          borderRadius: '0 0 20px 20px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
            animation: 'pwaProgress 8s linear forwards',
            borderRadius: '0 0 20px 20px',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pwaProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}
