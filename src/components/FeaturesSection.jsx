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
    title: 'Player Showcase',
    desc: 'Upload highlights, training videos, and match footage directly to your professional profile. Your story, told in full motion.',
  },
  {
    Icon: IconAI,
    title: 'AI Stats Visualization',
    desc: 'Computer vision tracks movement patterns, generates interactive dashboards and professional statistics scouts trust.',
  },
  {
    Icon: IconScout,
    title: 'Scout Access',
    desc: 'Connect directly with professional scouts and clubs worldwide. No agents, no gatekeepers — pure talent-to-opportunity pipeline.',
  },
  {
    Icon: IconPortfolio,
    title: 'Digital Portfolio',
    desc: 'Build a verified soccer resume with stats, videos, and coach endorsements. A living document that evolves with your game.',
  },
]

const FeatureCard = ({ Icon, title, desc, delay, visible }) => {
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
          <h3
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: 20,
              color: '#F4F4F2',
              letterSpacing: '-0.02em',
              margin: '0 0 14px',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13,
              lineHeight: 1.9,
              color: 'rgba(244,244,242,0.45)',
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            {desc}
          </p>
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
        background: '#0A0A0A',
        padding: isMobile ? '72px 20px' : '120px 80px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: isMobile ? 40 : 72, maxWidth: 640 }}>
        <div className="overline reveal delay-1" style={{ marginBottom: 20 }}>
          // PLATFORM CAPABILITIES
        </div>
        <h2
          className="reveal delay-2"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(30px, 4vw, 58px)',
            color: '#F4F4F2',
            letterSpacing: '-0.035em',
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Everything a scout needs.
        </h2>
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
