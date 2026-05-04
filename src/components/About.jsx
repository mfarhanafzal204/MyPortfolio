import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from '../utils/gsapConfig';
import { useTheme } from '../context/ThemeContext';

const stats = [
  { value: 3,   suffix: '+', label: 'Projects'        },
  { value: 3,   suffix: '+', label: 'Years Experience' },
  { value: 2,   suffix: '+', label: 'Live Sites'       },
  { value: 300, suffix: '+', label: 'Cert Hours'       },
  { value: 6,   suffix: '+', label: 'Technologies'     },
];

function StatItem({ value, suffix, label, isDark }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const steps = 60;
    const increment = value / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(current));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} style={{
      flex: '1 1 calc(33% - 1rem)',
      minWidth: '120px',
      padding: 'clamp(1rem, 2vw, 1.4rem) clamp(0.75rem, 1.5vw, 1.25rem)',
      borderRadius: '14px',
      background: isDark
        ? 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)'
        : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
      border: isDark
        ? '1px solid rgba(255,255,255,0.08)'
        : '1px solid rgba(0,0,0,0.07)',
      boxShadow: isDark
        ? '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
        : '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = isDark
        ? '0 12px 32px rgba(0,229,255,0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
        : '0 12px 32px rgba(2,132,199,0.12), inset 0 1px 0 rgba(255,255,255,0.8)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = isDark
        ? '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
        : '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)';
    }}
    >
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
        background: 'linear-gradient(135deg, var(--accent-cyan) 20%, var(--accent-purple) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {display}{suffix}
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(0.72rem, 1.1vw, 0.82rem)',
        color: 'var(--text-muted)',
        fontWeight: 500,
        letterSpacing: '0.02em',
        lineHeight: 1.3,
        marginTop: '0.1rem',
      }}>
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const { isDark } = useTheme();
  const sectionRef = useRef();
  const leftRef    = useRef();
  const rightRef   = useRef();

  useEffect(() => {
    const left  = leftRef.current;
    const right = rightRef.current;
    const sec   = sectionRef.current;
    if (!left || !right || !sec) return;

    gsap.set([left, right], { opacity: 1, x: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 80%', once: true },
    });
    tl.fromTo(left,  { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
      .fromTo(right, { x:  50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6');

    return () => tl.scrollTrigger?.kill();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: 'var(--bg-secondary)', padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,6rem)' }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem', alignItems: 'center',
      }}>

        {/* ── Left ── */}
        <div ref={leftRef}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            marginBottom: '1.5rem',
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
              About Me
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text-primary)',
            lineHeight: 1.25, marginBottom: '1.5rem',
            overflow: 'visible',
          }}>
            Turning Code Into<br />
            <span style={{
              background: 'linear-gradient(135deg,#00e5ff,#8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Real Solutions</span>
          </h2>

          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Farhan Afzal</strong> — a Full-Stack Developer
            based in Islamabad, specializing in building end-to-end web applications that
            solve real business problems. From high-performance storefronts to real-time
            ERP systems, I craft digital products that scale.
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem' }}>
            Proficient in the <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>MERN stack, Next.js 14, TypeScript, Firebase,</strong> and{' '}
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>AWS</strong>, I've helped
            real businesses move from manual workflows to digital, cloud-based ecosystems —
            with a focus on scalable architecture, mobile-first design, and measurable impact.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            {stats.map(s => <StatItem key={s.label} {...s} isDark={isDark} />)}
          </div>
        </div>

        {/* ── Right ── */}
        <div ref={rightRef} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 'min(400px, 90vw)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: isDark
              ? '0 32px 80px rgba(0,0,0,0.55)'
              : '0 32px 80px rgba(0,0,0,0.14)',
            flexShrink: 0,
          }}>
            <img
              src="/images/uni.jpg"
              alt="Farhan Afzal"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
              onError={e => {
                e.target.src = 'https://farhan-personal-portfolio.netlify.app/farhan.png';
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
