import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useTheme } from '../context/ThemeContext';

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'mfarhanafzal204@gmail.com',
    href: 'mailto:mfarhanafzal204@gmail.com',
    color: '#00e5ff',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Islamabad, Pakistan',
    href: null,
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.5z"/>
      </svg>
    ),
    label: 'Phone',
    value: '0304-0023946',
    href: 'tel:+923040023946',
    color: '#10b981',
  },
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/farhan-afzal',
    color: '#fff',
    bg: '#24292E',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/farhan-afzal-85518b282/',
    color: '#fff',
    bg: '#0A66C2',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    label: 'Fiverr',
    href: 'https://www.fiverr.com/farhan_afzal204?public_mode=true',
    color: '#fff',
    bg: '#1DBF73',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="18.5" cy="5.5" r="1.5"/><path d="M5.5 18V9.5H4V7.5h1.5V7c0-2.2 1.3-3.5 3.5-3.5.6 0 1.1.1 1.5.2v2c-.3-.1-.6-.2-1-.2-.9 0-1.5.5-1.5 1.5v.5H11v2H8v8.5H5.5zM12 18V9.5h2.5V18H12z"/></svg>`,
  },
];

function InputField({ label, type = 'text', name, placeholder, isTextarea = false, value, onChange, isDark }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value?.length > 0;
  const lifted = focused || hasValue;

  const base = {
    width: '100%',
    padding: isTextarea ? '1.5rem 1rem 0.75rem' : '1.4rem 1rem 0.5rem',
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    border: `1.5px solid ${focused
      ? 'var(--accent-cyan)'
      : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 'clamp(0.88rem, 1.3vw, 0.95rem)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    resize: isTextarea ? 'vertical' : 'none',
    minHeight: isTextarea ? '140px' : 'auto',
    boxShadow: focused ? '0 0 0 3px rgba(0,229,255,0.1)' : 'none',
    display: 'block',
  };

  return (
    <div style={{ position: 'relative', marginBottom: '1.1rem' }}>
      <label style={{
        position: 'absolute',
        left: '1rem',
        top: lifted ? '0.45rem' : (isTextarea ? '1.1rem' : '50%'),
        transform: (!lifted && !isTextarea) ? 'translateY(-50%)' : 'none',
        fontSize: lifted ? '0.68rem' : 'clamp(0.85rem, 1.2vw, 0.92rem)',
        color: lifted ? 'var(--accent-cyan)' : 'var(--text-muted)',
        transition: 'all 0.2s ease',
        pointerEvents: 'none',
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: lifted ? 600 : 400,
        letterSpacing: lifted ? '0.06em' : '0',
        textTransform: lifted ? 'uppercase' : 'none',
        zIndex: 1,
      }}>
        {label}
      </label>
      {isTextarea ? (
        <textarea name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''} rows={5} style={base}
        />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''} style={base}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const { isDark } = useTheme();
  const sectionRef = useRef();
  const leftRef    = useRef();
  const rightRef   = useRef();
  const formRef    = useRef();

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus]     = useState('idle');

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.set([leftRef.current, rightRef.current], { opacity: 1, x: 0 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
    });
    tl.fromTo(leftRef.current,  { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
      .fromTo(rightRef.current, { x:  50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6');
    return () => tl.scrollTrigger?.kill();
  }, []);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const formEl = formRef.current;
      const data = new FormData(formEl);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: 'var(--bg-secondary)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '20%',
        width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '15%',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ width: '28px', height: '2px', borderRadius: '2px', flexShrink: 0, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)', fontWeight: 600, color: 'var(--accent-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Get In Touch
            </span>
            <span style={{ width: '28px', height: '2px', borderRadius: '2px', flexShrink: 0, background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))' }} />
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--text-primary)',
            lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            Let's Build Something{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Great
            </span>
          </h2>
        </div>

        {/* Two columns */}
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'start',
        }}>

          {/* Left */}
          <div ref={leftRef}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}>
              Got a project that needs a sharp developer? Let's talk. I bring ideas to life
              with clean code, scalable architecture, and a focus on real business impact —
              from concept to deployment.
            </p>

            {/* Contact info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {contactInfo.map(({ icon, label, value, href, color }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '14px',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
                  border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color + '40';
                  e.currentTarget.style.background = color + '08';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)';
                }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: color + '15', border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: color,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(0.85rem, 1.3vw, 0.92rem)', color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s ease' }}
                        onMouseEnter={e => e.currentTarget.style.color = color}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(0.85rem, 1.3vw, 0.92rem)', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {socials.map(({ label, href, color, bg, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.55rem 1rem', borderRadius: '10px',
                    background: bg, color: color,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600, fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: `0 2px 12px ${bg}40`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${bg}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 2px 12px ${bg}40`; }}
                >
                  <span style={{ width: '16px', height: '16px', display: 'flex', color }} dangerouslySetInnerHTML={{ __html: icon }} />
                  {label}
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.55rem 1.1rem', borderRadius: '9999px',
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#10b981', boxShadow: '0 0 0 0 rgba(16,185,129,0.4)',
                display: 'inline-block', flexShrink: 0,
                animation: 'contactPing 1.8s ease-out infinite',
              }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(0.78rem, 1.2vw, 0.85rem)', color: '#10b981', fontWeight: 600 }}>
                Open to Work &amp; Collaboration
              </span>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef}>
            <div style={{
              background: isDark
                ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                : 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(255,255,255,0.8))',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
              borderRadius: '24px',
              padding: 'clamp(1.75rem, 3vw, 2.5rem)',
              boxShadow: isDark ? '0 8px 40px rgba(0,0,0,0.25)' : '0 8px 40px rgba(0,0,0,0.08)',
            }}>
              {/* Form header */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.25rem)',
                  color: 'var(--text-primary)', letterSpacing: '-0.01em',
                  marginBottom: '0.3rem',
                }}>
                  Send a Message
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(0.82rem, 1.2vw, 0.88rem)', color: 'var(--text-muted)' }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>

              <form
                ref={formRef}
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Required hidden fields for Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>
                {/* Name + Email row */}
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <InputField label="Full Name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} isDark={isDark} />
                  <InputField label="Email" type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} isDark={isDark} />
                </div>

                <InputField label="Subject" name="subject" placeholder="Project / Internship / Freelance" value={formData.subject} onChange={handleChange} isDark={isDark} />
                <InputField label="Message" name="message" placeholder="Tell me about your project..." isTextarea value={formData.message} onChange={handleChange} isDark={isDark} />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    width: '100%', padding: '1rem 1.5rem',
                    borderRadius: '12px', border: 'none',
                    background: status === 'success'
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                    color: isDark ? '#030308' : '#fff',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700, fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: status === 'sending' ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 20px rgba(0,229,255,0.25)',
                    marginTop: '0.5rem',
                  }}
                  onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,229,255,0.4)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,229,255,0.25)'; }}
                >
                  {status === 'sending' && (
                    <><span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Sending...</>
                  )}
                  {status === 'success' && (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!</>
                  )}
                  {status === 'error' && '❌ Failed — Try Again'}
                  {status === 'idle' && (
                    <>Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                  )}
                </button>

                {status === 'success' && (
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.85rem', color: '#10b981', textAlign: 'center', marginTop: '0.75rem', fontWeight: 500 }}>
                    ✓ Message sent! I'll reply within 24 hours.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.85rem', color: '#f43f5e', textAlign: 'center', marginTop: '0.75rem' }}>
                    Something went wrong. Email me directly at mfarhanafzal204@gmail.com
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes contactPing {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
