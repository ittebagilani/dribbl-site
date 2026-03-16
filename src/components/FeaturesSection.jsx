import React, { useRef, useEffect } from 'react'
import TechBracket from './TechBracket'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ── Geometric Icons ──────────────────────────────────── */
const IconPlayer = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="9" r="5" stroke="#FF0040" strokeWidth="1" />
    <path d="M8 34 L12 20 L18 22 L24 20 L28 34" stroke="#FF0040" strokeWidth="1" fill="none" />
    <line x1="12" y1="27" x2="24" y2="27" stroke="#FF0040" strokeWidth="1" />
    <circle cx="18" cy="9" r="2" fill="#FF0040" />
  </svg>
)

const IconAI = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="4" y="24" width="5" height="8" stroke="#FF0040" strokeWidth="1" />
    <rect x="12" y="16" width="5" height="16" stroke="#FF0040" strokeWidth="1" />
    <rect x="20" y="10" width="5" height="22" stroke="#FF0040" strokeWidth="1" />
    <rect x="28" y="4" width="5" height="28" stroke="#FF0040" strokeWidth="1" />
    <polyline points="6,24 14,16 22,10 30,4" stroke="#FF0040" strokeWidth="0.8" strokeDasharray="2,2" />
  </svg>
)

const IconScout = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="15" cy="15" r="10" stroke="#FF0040" strokeWidth="1" />
    <circle cx="15" cy="15" r="4" stroke="#FF0040" strokeWidth="1" />
    <line x1="22" y1="22" x2="32" y2="32" stroke="#FF0040" strokeWidth="1.5" />
    <line x1="15" y1="5" x2="15" y2="8" stroke="#FF0040" strokeWidth="1" />
    <line x1="15" y1="22" x2="15" y2="25" stroke="#FF0040" strokeWidth="1" />
    <line x1="5" y1="15" x2="8" y2="15" stroke="#FF0040" strokeWidth="1" />
    <line x1="22" y1="15" x2="25" y2="15" stroke="#FF0040" strokeWidth="1" />
  </svg>
)

const IconPortfolio = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="6" y="4" width="24" height="30" rx="1" stroke="#FF0040" strokeWidth="1" />
    <line x1="11" y1="11" x2="25" y2="11" stroke="#FF0040" strokeWidth="1" />
    <line x1="11" y1="16" x2="25" y2="16" stroke="#FF0040" strokeWidth="1" />
    <line x1="11" y1="21" x2="19" y2="21" stroke="#FF0040" strokeWidth="1" />
    <polyline points="11,27 14,24 17,26 21,22 25,27" stroke="#FF0040" strokeWidth="1" fill="none" />
  </svg>
)

const features = [
  {
    Icon: IconPlayer,
    title: 'For Players',
    subtitle: 'Show the World What You\'ve Got.',
    desc: 'Your Dribbl profile is your soccer identity — built by you, seen by everyone that matters. Document your journey, share highlights, and get seen by coaches and scouts around the clock.',
    bullets: [
      'Build a complete profile with club history and positions',
      'Upload match highlights and career footage',
      'Connect with teammates and players in your area',
    ],
  },
  {
    Icon: IconScout,
    title: 'For Coaches & Scouts',
    subtitle: 'Find Your Next Player. Right Here.',
    desc: 'A recruitment dashboard built around how coaches actually work. Browse real profiles, watch footage, and reach out directly — no middlemen, no wasted time.',
    bullets: [
      'Search and filter players by age, position, and location',
      'Review profiles and highlight reels',
      'Message and recruit players directly',
    ],
  },
  {
    Icon: IconPortfolio,
    title: 'For Clubs & Academies',
    subtitle: 'Give Your Players the Platform They Deserve.',
    desc: 'Create a club profile on Dribbl and put your academy on the map. Showcase your players, attract attention from coaches and scouts, and build your reputation.',
    bullets: [
      'Create a verified club or academy profile',
      'Showcase your roster and player profiles',
      'Attract coaches and scouts to your talent',
    ],
  },
  {
    Icon: IconAI,
    title: 'Built for Everyone in the Game',
    subtitle: 'One Platform. Every Role.',
    desc: 'Whether you\'re a player chasing your next opportunity, a coach looking for talent, or a club building your presence — Dribbl has a place for you.',
    bullets: [
      'Players aged 14–U23 growing their soccer identity',
      'Coaches accessing a growing network of talent',
      'Clubs building community reputation',
    ],
  },
]

const FeatureCard = ({ Icon, title, subtitle, desc, bullets, delay, visible }) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      className={`reveal delay-${delay}`}
      style={{ animationDelay: `${delay * 100}ms`, height: '100%' }}
      data-visible={visible}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TechBracket
        color={hovered ? '#FF0040' : 'rgba(255,0,64,0.35)'}
        size={12}
        style={{ display: 'block', height: '100%', transition: 'all 0.3s' }}
      >
        <div
          style={{
            background: hovered
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '36px 32px',
            transition: 'background 0.3s',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <Icon />
          </div>
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 9,
              color: '#FF0040',
              letterSpacing: '0.14em',
              marginBottom: 8,
            }}
          >
            {title.toUpperCase()}
          </div>
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 18,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              margin: '0 0 14px',
              lineHeight: 1.2,
            }}
          >
            {subtitle}
          </h3>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 14,
              lineHeight: 1.9,
              color: 'var(--text-muted)',
              margin: '0 0 18px',
              letterSpacing: '0.02em',
            }}
          >
            {desc}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {bullets.map((b) => (
              <li
                key={b}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.7,
                  paddingLeft: 14,
                  position: 'relative',
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: '#FF0040',
                    fontWeight: 800,
                  }}
                >
                  —
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </TechBracket>
    </div>
  )
}

const FeaturesSection = () => {
  const sectionRef = useRef(null)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--dark)',
        padding: isMobile ? '72px 20px' : '120px 80px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: isMobile ? 40 : 72, maxWidth: 640 }}>
        <div className="overline reveal delay-1" style={{ marginBottom: 20 }}>
          // THE PLATFORM
        </div>
        <h2
          className="reveal delay-2"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(30px, 4vw, 58px)',
            color: 'var(--text)',
            letterSpacing: '-0.035em',
            margin: '0 0 16px',
            lineHeight: 1.05,
          }}
        >
          Where Players, Coaches, and Clubs Connect.
        </h2>
        <p
          className="reveal delay-2"
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 14,
            lineHeight: 1.85,
            color: 'var(--text-muted)',
            margin: 0,
            maxWidth: 560,
            letterSpacing: '0.02em',
          }}
        >
          Dribbl brings together the people that make soccer happen — all on one platform.
        </p>
      </div>

      <div
        className="stock-frame reveal delay-2"
        style={{
          height: isMobile ? 400 : 580,
          marginBottom: isMobile ? 36 : 56,
          borderRadius: 18,
        }}
      >
        <img
          className="stock-img"
          src="/images/stock/kick.jpg"
          alt="Soccer player kicking the ball"
        />
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} delay={i + 3} />
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
