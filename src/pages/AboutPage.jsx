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

/* ── Analysis canvas placeholder ────────────────────── */
const AnalysisCanvas = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, time = 0

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }

    const animate = () => {
      const W = canvas.width, H = canvas.height
      const cx = W / 2, cy = H / 2
      time += 0.012
      ctx.fillStyle = 'rgba(10,10,10,0.15)'
      ctx.fillRect(0, 0, W, H)

      // Radar rings
      for (let r = 1; r <= 4; r++) {
        const radius = (r / 4) * Math.min(cx, cy) * 0.85
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,0,64,${0.06 + r * 0.03})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
      // Radar axes
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(angle) * Math.min(cx, cy) * 0.85, cy + Math.sin(angle) * Math.min(cx, cy) * 0.85)
        ctx.strokeStyle = 'rgba(255,0,64,0.08)'
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Stat polygon (animated)
      const stats = [0.82, 0.91, 0.74, 0.88, 0.95, 0.79]
      const animated = stats.map((v, i) => v * (0.85 + Math.sin(time + i * 0.7) * 0.08))
      const maxR = Math.min(cx, cy) * 0.85
      ctx.beginPath()
      animated.forEach((v, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(angle) * v * maxR
        const y = cy + Math.sin(angle) * v * maxR
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fillStyle = 'rgba(255,0,64,0.07)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,0,64,0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Nodes
      animated.forEach((v, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
        ctx.beginPath()
        ctx.arc(cx + Math.cos(angle) * v * maxR, cy + Math.sin(angle) * v * maxR, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#FF0040'
        ctx.fill()
      })

      // Scan line
      const scanAngle = time * 0.8
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(scanAngle) * maxR, cy + Math.sin(scanAngle) * maxR)
      ctx.strokeStyle = 'rgba(255,0,64,0.3)'
      ctx.lineWidth = 1
      ctx.stroke()

      raf = requestAnimationFrame(animate)
    }

    resize()
    animate()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
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
      }}
    >
      <TechBracket color={hovered ? '#FF0040' : 'rgba(255,0,64,0.3)'} size={10} style={{ display: 'block', transition: 'all 0.25s' }}>
        <div style={{
          padding: '32px 28px',
          background: hovered ? 'rgba(255,0,64,0.03)' : 'transparent',
          borderTop: '1px solid rgba(10,10,10,0.08)',
          borderRight: '1px solid rgba(10,10,10,0.08)',
          borderBottom: '1px solid rgba(10,10,10,0.08)',
          borderLeft: '1px solid rgba(10,10,10,0.08)',
          transition: 'background 0.25s',
        }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#FF0040', letterSpacing: '0.14em', marginBottom: 14 }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18, color: '#0A0A0A', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            {title}
          </h3>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.85, color: '#888884', margin: 0, letterSpacing: '0.02em' }}>
            {desc}
          </p>
        </div>
      </TechBracket>
    </div>
  )
}

const values = [
  { title: 'Innovation & Technology', desc: 'We leverage cutting-edge AI and computer vision to revolutionize how talent is discovered in soccer.' },
  { title: 'Opportunity for All', desc: 'We believe talent exists everywhere. Our platform breaks down traditional barriers to scouting and recruitment.' },
  { title: 'Global Reach', desc: 'Connecting players worldwide with scouts and clubs across all continents, levels, and leagues.' },
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
          background: '#0A0A0A',
          padding: isMobile ? '120px 24px 80px' : '160px 80px 100px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: 800 }}>
          <div className="overline" style={{ marginBottom: 24, ...fade(heroVisible, 0) }}>
            // ABOUT DRIBBL
          </div>
          <h1 style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 72px)',
            color: '#F4F4F2',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            margin: '0 0 28px',
            ...fade(heroVisible, 100),
          }}>
            Building the Future<br />of Soccer Scouting.
          </h1>
          <p style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 13,
            lineHeight: 1.9,
            color: 'rgba(244,244,242,0.45)',
            maxWidth: 560,
            margin: 0,
            letterSpacing: '0.02em',
            ...fade(heroVisible, 200),
          }}>
            Dribbl is revolutionizing talent discovery in soccer with AI-powered analysis,
            connecting promising players with scouts and clubs worldwide.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section
        ref={missionRef}
        style={{
          background: 'var(--offwhite)',
          padding: isMobile ? '72px 24px' : '100px 80px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center',
          borderBottom: '1px solid rgba(10,10,10,0.08)',
        }}
      >
        <div style={fade(missionVisible, 0)}>
          <div className="overline" style={{ marginBottom: 20 }}>// OUR MISSION</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#0A0A0A', letterSpacing: '-0.035em', margin: 0, lineHeight: 1.1 }}>
            No barrier should stand between talent and opportunity.
          </h2>
        </div>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.95, color: '#888884', margin: 0, letterSpacing: '0.02em', ...fade(missionVisible, 150) }}>
          To democratize soccer scouting by creating the world's most advanced AI-powered
          platform that connects talented players with clubs and scouts, ensuring no exceptional
          talent goes undiscovered regardless of geographical or financial barriers.
        </p>
      </section>

      {/* ── AI + Global split ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
      }}>
        {/* AI Card */}
        <div style={{
          background: '#0A0A0A',
          padding: isMobile ? '60px 24px' : '80px 60px',
          borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
          borderBottom: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
          <div className="overline" style={{ marginBottom: 20 }}>// AI-POWERED SCOUTING</div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#F4F4F2', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Computer vision that sees what scouts miss.
          </h3>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.9, color: 'rgba(244,244,242,0.4)', margin: 0, letterSpacing: '0.02em' }}>
            Using cutting-edge computer vision to analyze player technique, movement patterns,
            and untapped potential — generating 200+ data points per session in real time.
          </p>
        </div>

        {/* Global Card */}
        <div style={{ background: 'var(--offwhite)', padding: isMobile ? '60px 24px' : '80px 60px' }}>
          <div className="overline" style={{ marginBottom: 20 }}>// GLOBAL CONNECTION</div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#0A0A0A', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            From Lagos to Tokyo. Every talent, every scout.
          </h3>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.9, color: '#888884', margin: 0, letterSpacing: '0.02em' }}>
            Bridging the gap between talented players and scouts across 140+ countries.
            No gatekeepers. No geography. Just talent meeting opportunity.
          </p>
        </div>
      </section>

      {/* ── Analysis canvas ── */}
      <section style={{ background: '#0A0A0A', padding: isMobile ? '60px 24px' : '80px 80px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="overline" style={{ marginBottom: 20 }}>// ANALYSIS VISUALIZATION</div>
        <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 40px)', color: '#F4F4F2', letterSpacing: '-0.03em', margin: '0 0 48px' }}>
          Coming Soon.
        </h2>
        <TechBracket color="#FF0040" size={12} style={{ display: 'block' }}>
          <div style={{ height: isMobile ? 260 : 360, position: 'relative', background: '#000', overflow: 'hidden' }}>
            <AnalysisCanvas />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 2 }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: isMobile ? 10 : 11, color: 'rgba(244,244,242,0.5)', letterSpacing: '0.18em' }}>
                ANALYSIS VISUALIZATION COMING SOON
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'rgba(255,0,64,0.5)', letterSpacing: '0.12em' }}>
                // RADAR PREVIEW ACTIVE
              </div>
            </div>
          </div>
        </TechBracket>
      </section>

      {/* ── Values ── */}
      <section style={{ background: 'var(--offwhite)', padding: isMobile ? '72px 24px' : '100px 80px' }}>
        <div className="overline" style={{ marginBottom: 20 }}>// OUR VALUES</div>
        <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#0A0A0A', letterSpacing: '-0.035em', margin: '0 0 60px', maxWidth: 500 }}>
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
