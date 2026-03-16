import React, { useRef, useEffect, useState } from 'react'
import TechBracket from '../components/TechBracket'
import Footer from '../components/Footer'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ── Scroll reveal hook ─────────────────────────────── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Value card ─────────────────────────────────────── */
const ValueCard = ({ title, desc, index }) => {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
        height: '100%',
      }}
    >
      <TechBracket color={hovered ? '#FF0040' : 'rgba(255,0,64,0.3)'} size={10} style={{ display: 'block', height: '100%', transition: 'all 0.25s' }}>
        <div style={{
          padding: '32px 28px',
          background: hovered ? 'rgba(255,0,64,0.03)' : 'transparent',
          borderTop: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          borderLeft: '1px solid var(--border)',
          transition: 'background 0.25s',
          height: '100%',
          boxSizing: 'border-box',
        }}>
          <div style={{ fontFamily: 'Manrope', fontSize: 10, color: '#FF0040', letterSpacing: '0.14em', marginBottom: 14 }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18, color: 'var(--text)', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            {title}
          </h3>
          <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.85, color: 'var(--text-muted)', margin: 0, letterSpacing: '0.02em' }}>
            {desc}
          </p>
        </div>
      </TechBracket>
    </div>
  )
}

const values = [
  {
    title: 'Community',
    desc: 'Soccer is more than a sport. It is a community where players and coaches connect, support one another, and grow together.',
  },
  {
    title: 'Opportunity',
    desc: 'Talent exists everywhere. Dribbl gives players the opportunity to showcase their abilities and build their soccer presence.',
  },
  {
    title: 'Passion for the Game',
    desc: 'Built for people who love soccer and want to keep improving, competing, and sharing their journey.',
  },
]

/* ── About Page ─────────────────────────────────────── */
const AboutPage = () => {
  const { isMobile } = useBreakpoint()
  const [heroRef, heroVisible] = useReveal(0.05)
  const [missionRef, missionVisible] = useReveal()

  const fade = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  })

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        style={{
          background: 'var(--dark)',
          padding: isMobile ? '120px 24px 80px' : '160px 80px 100px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
            gap: isMobile ? 32 : 80,
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: 800 }}>
            <div className="overline" style={{ marginBottom: 24, ...fade(heroVisible, 0) }}>
              // ABOUT DRIBBL
            </div>
            <h1 style={{
              fontFamily: 'Inter',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: 'var(--text)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              margin: '0 0 28px',
              ...fade(heroVisible, 100),
            }}>
              Building the Future of Soccer Networking
            </h1>
            <p style={{
              fontFamily: 'Manrope',
              fontSize: 15,
              lineHeight: 1.9,
              color: 'var(--text-muted)',
              maxWidth: 560,
              margin: 0,
              letterSpacing: '0.02em',
              ...fade(heroVisible, 200),
            }}>
              Dribbl is a soccer networking platform where players and coaches can connect,
              share their journey, and showcase their talent to the soccer community.
            </p>
          </div>
          <div
            className="stock-frame"
            style={{
              height: isMobile ? 220 : 360,
              borderRadius: 22,
              ...fade(heroVisible, 250),
            }}
          >
            <img
              className="stock-img"
              src="/images/stock/coach-talk.jpg"
              alt="Coach speaking with players on the field"
            />
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section
        ref={missionRef}
        style={{
          background: 'var(--dark)',
          padding: isMobile ? '72px 24px' : '100px 80px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={fade(missionVisible, 0)}>
          <div className="overline" style={{ marginBottom: 20 }}>// OUR MISSION</div>
          <h2 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--text)', letterSpacing: '-0.035em', margin: 0, lineHeight: 1.1 }}>
            No barrier should stand between talent and opportunity.
          </h2>
        </div>
        <p style={{ fontFamily: 'Manrope', fontSize: 14, lineHeight: 1.95, color: 'var(--text-muted)', margin: 0, letterSpacing: '0.02em', ...fade(missionVisible, 150) }}>
          Our mission is to give every soccer player a place to build their digital soccer identity.
          Dribbl allows players to showcase their skills, share their progress, and connect with
          other players and coaches across the country.
        </p>
      </section>

      {/* ── Digital Profiles ── */}
      <section style={{ background: 'var(--dark)', padding: isMobile ? '72px 24px' : '100px 80px', borderBottom: '1px solid var(--border-weak)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 32 : 70,
            alignItems: 'center',
          }}
        >
          <div>
            <div className="overline" style={{ marginBottom: 20 }}>// DIGITAL SOCCER PROFILES</div>
            <h3 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 40px)', color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              Your soccer journey, all in one place.
            </h3>
            <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.9, color: 'var(--text-muted)', margin: 0, maxWidth: 780, letterSpacing: '0.02em' }}>
              Create your personal soccer profile and showcase your highlights, achievements, and progress.
              Dribbl gives players the tools to build their digital soccer portfolio and share their talent
              with coaches and other players.
            </p>
          </div>
          <div className="stock-frame" style={{ height: isMobile ? 220 : 300, borderRadius: 20 }}>
            <img
              className="stock-img"
              src="/images/stock/balls-training.jpg"
              alt="Soccer balls lined up on the training field"
            />
          </div>
        </div>
      </section>

      {/* ── National Connection ── */}
      <section style={{ background: 'var(--dark)', padding: isMobile ? '72px 24px' : '100px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr',
            gap: isMobile ? 32 : 70,
            alignItems: 'center',
          }}
        >
          <div className="stock-frame" style={{ height: isMobile ? 220 : 300, borderRadius: 20 }}>
            <img
              className="stock-img"
              src="/images/stock/vancouver.jpg"
              alt="Soccer field in Vancouver"
            />
          </div>
          <div>
            <div className="overline" style={{ marginBottom: 20 }}>// GLOBAL CONNECTION</div>
            <h3 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 40px)', color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              From Vancouver to Halifax. Every talent, every scout.
            </h3>
            <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.9, color: 'var(--text-muted)', margin: 0, maxWidth: 820, letterSpacing: '0.02em' }}>
              Bridging the gap between talented players and scouts across the country.
              No gatekeepers. No geography. Just talent meeting opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background: 'var(--dark)', padding: isMobile ? '72px 24px' : '100px 80px' }}>
        <div className="overline" style={{ marginBottom: 20 }}>// OUR VALUES</div>
        <h2 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--text)', letterSpacing: '-0.035em', margin: '0 0 60px', maxWidth: 500 }}>
          These core principles guide everything we do.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 2 }}>
          {values.map((v, i) => <ValueCard key={v.title} {...v} index={i} />)}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AboutPage
