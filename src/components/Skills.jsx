import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from '../utils/gsapConfig';
import { useTheme } from '../context/ThemeContext';
import { skillCategories, topSkills, logos } from '../data/skills';

function SkillPill({ skill, isDark }) {
  const logo = logos[skill];
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '0.45rem',
      padding: '0.38rem 0.75rem',
      borderRadius: '8px',
      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
      border: isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.08)',
      transition: 'all 0.2s ease',
      cursor: 'default',
      minWidth: 0,
      maxWidth: '100%',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.08)' : 'rgba(2,132,199,0.07)';
      e.currentTarget.style.borderColor = isDark ? 'rgba(0,229,255,0.25)' : 'rgba(2,132,199,0.25)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {logo && (
        <span
          style={{ width: '18px', height: '18px', flexShrink: 0, display: 'flex', marginTop: '1px' }}
          dangerouslySetInnerHTML={{ __html: logo }}
        />
      )}
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
        fontWeight: 500,
        color: isDark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.72)',
        letterSpacing: '0.01em',
        lineHeight: 1.4,
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
      }}>
        {skill}
      </span>
    </div>
  );
}

function ProgressBar({ name, level, isDark, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const barRef  = useRef();
  const numRef  = useRef();
  const logo    = logos[name] || logos[name + '.js'];

  // Circle params
  const size   = 88;
  const stroke = 6;
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;

  useEffect(() => {
    if (!inView) return;

    // Animate bar width
    if (barRef.current) {
      gsap.fromTo(barRef.current,
        { width: '0%' },
        { width: `${level}%`, duration: 1.4, ease: 'power2.out', delay: index * 0.12 }
      );
    }

    // Animate number count-up
    if (numRef.current) {
      gsap.fromTo({ val: 0 }, { val: level }, {
        duration: 1.4,
        ease: 'power2.out',
        delay: index * 0.12,
        onUpdate() { if (numRef.current) numRef.current.textContent = Math.round(this.targets()[0].val) + '%'; },
      });
    }
  }, [inView, level, index]);

  const dashOffset = circ - (circ * level) / 100;

  return (
    <div ref={ref} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      padding: 'clamp(0.9rem, 1.5vw, 1.1rem) clamp(1rem, 2vw, 1.4rem)',
      borderRadius: '14px',
      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
      border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = isDark
        ? '0 10px 28px rgba(0,229,255,0.1)'
        : '0 10px 28px rgba(2,132,199,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Circular progress ring */}
      <div style={{ position: 'relative', flexShrink: 0, width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}
            strokeWidth={stroke}
          />
          {/* Progress */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke="url(#skillGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={inView ? dashOffset : circ}
            style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s` }}
          />
          <defs>
            <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-cyan)" />
              <stop offset="100%" stopColor="var(--accent-purple)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center: logo or percentage */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '2px',
        }}>
          {logo
            ? <span style={{ width: '26px', height: '26px', display: 'flex' }} dangerouslySetInnerHTML={{ __html: logo }} />
            : null
          }
          <span ref={numRef} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: logo ? '0.62rem' : '0.9rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}>
            0%
          </span>
        </div>
      </div>

      {/* Right: name + bar */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          marginBottom: '0.55rem',
        }}>
          {name}
        </div>
        {/* Thin bar */}
        <div style={{
          height: '5px',
          borderRadius: '99px',
          background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
          overflow: 'hidden',
        }}>
          <div ref={barRef} style={{
            height: '100%', width: '0%',
            borderRadius: '99px',
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
            boxShadow: '0 0 8px rgba(0,229,255,0.4)',
          }} />
        </div>
        {/* Level label */}
        <div style={{
          marginTop: '0.35rem',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(0.7rem, 1vw, 0.78rem)',
          color: 'var(--text-muted)',
          fontWeight: 500,
        }}>
          {level >= 88 ? 'Expert' : level >= 80 ? 'Advanced' : 'Proficient'}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { isDark } = useTheme();
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;
    gsap.set(cards, { opacity: 0, y: 28 });
    const tweens = cards.map((card, i) =>
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.6,
        delay: (i % 5) * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      })
    );
    return () => tweens.forEach(t => t.scrollTrigger?.kill());
  }, []);

  return (
    <section
      id="skills"
      style={{
        background: 'var(--bg-primary)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
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
              Skills &amp; Tech
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
            Skills &amp;{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Technologies
            </span>
          </h2>
        </div>

        {/* Category cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}>
          {skillCategories.map((cat, i) => (
            <div
              key={cat.id}
              ref={el => (cardsRef.current[i] = el)}
              style={{
                background: isDark
                  ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
                  : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
                border: isDark
                  ? '1px solid rgba(255,255,255,0.08)'
                  : '1px solid rgba(0,0,0,0.07)',
                borderRadius: '18px',
                padding: 'clamp(1.25rem, 2vw, 1.75rem)',
                boxShadow: isDark
                  ? '0 4px 24px rgba(0,0,0,0.2)'
                  : '0 4px 24px rgba(0,0,0,0.06)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(0,229,255,0.22)' : 'rgba(2,132,199,0.22)';
                e.currentTarget.style.boxShadow = isDark ? '0 16px 40px rgba(0,229,255,0.09)' : '0 16px 40px rgba(2,132,199,0.09)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
                e.currentTarget.style.boxShadow = isDark ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.06)';
              }}
            >
              {/* Card header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.55rem',
                marginBottom: '1rem',
                paddingBottom: '0.85rem',
                borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
              }}>
                <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{cat.icon}</span>
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}>
                  {cat.title}
                </span>
              </div>

              {/* Skill pills with logos */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', overflow: 'hidden' }}>
                {cat.skills.map(skill => (
                  <SkillPill key={skill} skill={skill} isDark={isDark} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Core Proficiency */}
        <div style={{
          background: isDark
            ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
            : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
          borderRadius: '20px',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          }}>
            <span style={{
              width: '20px', height: '2px', borderRadius: '2px', flexShrink: 0,
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
            }} />
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              Core Proficiency
            </h3>
          </div>

          {/* 2-column grid of skill cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '0.75rem',
          }}>
            {topSkills.map((s, i) => (
              <ProgressBar key={s.name} name={s.name} level={s.level} isDark={isDark} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
