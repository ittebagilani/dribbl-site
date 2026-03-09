import React, { useRef, useEffect, useState } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'

const statements = [
  {
    num: '01',
    headline: 'Revolutionizing scouting analysis and player statistics.',
    detail:
      'Our AI processes match footage in 0.01 seconds — generating professional-grade stats that rival what top clubs pay millions for.',
  },
  {
    num: '02',
    headline: 'Finding the next generational talent who might otherwise be overlooked.',
    detail:
      'From regional leagues in Lagos to amateur pitches in Bogota — no exceptional talent goes undiscovered on Dribbl.',
  },
  {
    num: '03',
    headline: 'Connecting talented players with clubs and opportunities worldwide.',
    detail:
      '140+ countries. 50,000+ registered players. A direct line between raw ability and the clubs that need it most.',
  },
]

const StatementRow = ({ num, headline, detail, index }) => {
  const rowRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )
    if (rowRef.current) observer.observe(rowRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '36px 1fr' : '64px 1fr 1fr',
        alignItems: isMobile ? 'start' : 'center',
        gap: isMobile ? '0 16px' : '0 48px',
        padding: isMobile ? '32px 24px' : '48px 80px',
        borderBottom: '1px solid rgba(10,10,10,0.1)',
        background: hovered ? 'rgba(255,0,64,0.03)' : 'transparent',
        transition: 'background 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${index * 0.12}s`,
        transitionProperty: 'opacity, transform, background',
        transitionDuration: '0.75s, 0.75s, 0.4s',
        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1), cubic-bezier(0.16,1,0.3,1), ease',
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: hovered ? '#FF0040' : '#BBBBB8',
          letterSpacing: '0.08em',
          transition: 'color 0.3s',
        }}
      >
        {num}
      </div>

      {/* Headline + Detail stacked on mobile, side-by-side on desktop */}
      <div style={{ gridColumn: isMobile ? '2' : undefined }}>
        <h3
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            fontSize: isMobile ? 'clamp(18px, 5vw, 26px)' : 'clamp(22px, 2.4vw, 34px)',
            color: '#0A0A0A',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            margin: isMobile ? '0 0 12px' : 0,
          }}
        >
          {headline}
        </h3>
        {isMobile && (
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              lineHeight: 1.85,
              color: '#888884',
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            {detail}
          </p>
        )}
      </div>

      {/* Detail — desktop only (third column) */}
      {!isMobile && (
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            lineHeight: 1.85,
            color: '#888884',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {detail}
        </p>
      )}
    </div>
  )
}

const WhyUsSection = () => {
  const headerRef = useRef(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 },
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: 'var(--offwhite)' }}>
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) 60px',
          borderBottom: '1px solid rgba(10,10,10,0.1)',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="overline" style={{ marginBottom: 16 }}>
          // WHY DRIBBL
        </div>
        <h2
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 3.5vw, 52px)',
            color: '#0A0A0A',
            letterSpacing: '-0.035em',
            margin: 0,
          }}
        >
          The platform the sport was missing.
        </h2>
      </div>

      {/* Statement rows */}
      {statements.map((s, i) => (
        <StatementRow key={s.num} {...s} index={i} />
      ))}
    </section>
  )
}

export default WhyUsSection
