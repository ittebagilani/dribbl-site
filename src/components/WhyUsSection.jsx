import React, { useRef, useEffect, useState } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'

const statements = [
  {
    num: '01',
    headline: 'A social and recruitment platform built exclusively for soccer.',
    detail:
      'Players create profiles, share their journey, and connect with coaches, teammates, and clubs. Coaches and scouts use our dashboard to discover and recruit talent directly.',
  },
  {
    num: '02',
    headline: 'Simple. Focused. Built for the game.',
    detail:
      'Clubs and academies showcase their players to the wider soccer community. Every feature on Dribbl exists to serve the people who live the sport.',
  },
  {
    num: '03',
    headline: 'Because no other platform was built with soccer players at the centre.',
    detail:
      "Dribbl isn't an afterthought, it's built from the ground up for the sport and the people who live it.",
  },
]

const NAVBAR_H = 200
const STACK_OVERLAP = 20

const StatementRow = ({ num, headline, detail, index }) => {
  const [hovered, setHovered] = useState(false)
  const { isMobile } = useBreakpoint()

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'sticky',
        top: NAVBAR_H,
        marginTop: isMobile ? 16 : index === 0 ? 0 : -STACK_OVERLAP,
        display: 'grid',
        gridTemplateColumns: isMobile ? '36px 1fr' : '64px 1fr 1fr',
        alignItems: isMobile ? 'start' : 'center',
        gap: isMobile ? '0 16px' : '0 48px',
        padding: isMobile ? '32px 24px' : '48px 80px',
        border: '1px solid var(--border)',
        borderRadius: 18,
        background: hovered ? 'var(--bg-alt)' : 'var(--bg)',
        boxShadow: hovered
          ? '0 26px 60px rgba(0,0,0,0.25)'
          : '0 18px 44px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        zIndex: index + 1,
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 11,
          color: hovered ? '#FF0040' : 'var(--text-faint)',
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
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: isMobile ? 'clamp(18px, 5vw, 26px)' : 'clamp(22px, 2.4vw, 34px)',
            color: 'var(--text)',
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
              fontFamily: 'Manrope, sans-serif',
              fontSize: 14,
              lineHeight: 1.85,
              color: 'var(--text-muted)',
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            {detail}
          </p>
        )}
      </div>

      {/* Detail - desktop only (third column) */}
      {!isMobile && (
        <p
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 14,
            lineHeight: 1.85,
            color: 'var(--text-muted)',
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
    <section style={{ background: 'var(--dark)', position: 'relative' }}>
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) 60px',
          borderBottom: '1px solid var(--border-weak)',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="overline" style={{ marginBottom: 16 }}>
          // WHO WE ARE
        </div>
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 3.5vw, 52px)',
            color: 'var(--text)',
            letterSpacing: '-0.035em',
            margin: 0,
          }}
        >
          We Built the Network Soccer Was Missing.
        </h2>
      </div>

      <div
        className="stock-frame"
        style={{
          height: 'clamp(200px, 28vw, 360px)',
          margin: '40px clamp(24px, 6vw, 80px) 60px',
          borderRadius: 22,
        }}
      >
        <img
          className="stock-img"
          src="/images/stock/huddle-night.jpg"
          alt="Soccer team huddled under stadium lights"
        />
      </div>

      {/* Statement rows */}
      {statements.map((s, i) => (
        <StatementRow key={s.num} {...s} index={i} />
      ))}
    </section>
  )
}

export default WhyUsSection
