import React, { useRef, useEffect, useState } from 'react'
import TechBracket from './TechBracket'
import ParticleCanvas from './ParticleCanvas'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ─────────────────────────────────────────────────────────
   Isometric Soccer Pitch Canvas
───────────────────────────────────────────────────────── */
const PitchCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 0.08
      ctx.strokeStyle = '#0A0A0A'
      ctx.lineWidth = 1

      const PW = 105
      const PH = 68
      const scale = W / (PW * 1.15)
      const originX = W * 0.5
      const originY = H * 0.88

      const toIso = (px, py) => {
        const ix = (px - py) * Math.cos(Math.PI / 6) * scale
        const iy = (px + py) * Math.sin(Math.PI / 6) * scale
        return [originX + ix, originY - iy]
      }

      const line = (x1, y1, x2, y2) => {
        const [ax, ay] = toIso(x1, y1)
        const [bx, by] = toIso(x2, y2)
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.stroke()
      }

      const dot = (x, y, r = 1.5) => {
        const [cx, cy] = toIso(x, y)
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.fillStyle = '#0A0A0A'

      line(0, 0, PW, 0)
      line(PW, 0, PW, PH)
      line(PW, PH, 0, PH)
      line(0, PH, 0, 0)
      line(PW / 2, 0, PW / 2, PH)

      const cR = 9.15
      for (let i = 0; i < 24; i++) {
        const a1 = (i / 24) * Math.PI * 2
        const a2 = ((i + 1) / 24) * Math.PI * 2
        line(
          PW / 2 + Math.cos(a1) * cR, PH / 2 + Math.sin(a1) * cR,
          PW / 2 + Math.cos(a2) * cR, PH / 2 + Math.sin(a2) * cR,
        )
      }
      dot(PW / 2, PH / 2, 2)

      line(0, (PH - 40.32) / 2, 16.5, (PH - 40.32) / 2)
      line(16.5, (PH - 40.32) / 2, 16.5, (PH + 40.32) / 2)
      line(16.5, (PH + 40.32) / 2, 0, (PH + 40.32) / 2)

      line(0, (PH - 18.32) / 2, 5.5, (PH - 18.32) / 2)
      line(5.5, (PH - 18.32) / 2, 5.5, (PH + 18.32) / 2)
      line(5.5, (PH + 18.32) / 2, 0, (PH + 18.32) / 2)

      dot(11, PH / 2, 2)

      line(PW, (PH - 40.32) / 2, PW - 16.5, (PH - 40.32) / 2)
      line(PW - 16.5, (PH - 40.32) / 2, PW - 16.5, (PH + 40.32) / 2)
      line(PW - 16.5, (PH + 40.32) / 2, PW, (PH + 40.32) / 2)

      line(PW, (PH - 18.32) / 2, PW - 5.5, (PH - 18.32) / 2)
      line(PW - 5.5, (PH - 18.32) / 2, PW - 5.5, (PH + 18.32) / 2)
      line(PW - 5.5, (PH + 18.32) / 2, PW, (PH + 18.32) / 2)

      dot(PW - 11, PH / 2, 2)

      const positions = [
        [5, PH / 2], [22, PH * 0.12], [22, PH * 0.37], [22, PH * 0.63], [22, PH * 0.88],
        [48, PH * 0.22], [48, PH * 0.5], [48, PH * 0.78],
        [72, PH * 0.12], [72, PH * 0.5], [72, PH * 0.88],
      ]
      positions.forEach(([px, py]) => {
        dot(px, py, 3)
        if (px < 70) {
          positions
            .filter(([x]) => x > px && x < px + 35)
            .forEach(([nx, ny]) => line(px, py, nx, ny))
        }
      })
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '80%',
        pointerEvents: 'none',
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────
   Stats Row
───────────────────────────────────────────────────────── */
const stats = [
  { value: '140+', label: 'COUNTRIES' },
  { value: '50K+', label: 'PLAYERS' },
  { value: '0.01s', label: 'ANALYSIS TIME' },
  { value: '98%', label: 'SCOUT ACCURACY' },
]

const StatsRow = ({ mobile = false }) => (
  <div
    style={{
      // borderTop: '1px solid rgba(10,10,10,0.1)',
      ...(mobile
        ? {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 12,
            padding: '20px 20px 28px',
            background: 'var(--offwhite)',
            marginTop: "75px"
          }
        : {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }),
    }}
  >
    {stats.map((s, i) => (
      <TechBracket
        key={s.label}
        color="#FF0040"
        size={8}
        style={{
          display: mobile ? 'inline-block' : 'block',
          ...(mobile
            ? { width: 'calc(50% - 22px)', minWidth: 130 }
            : { borderRight: i < stats.length - 1 ? '1px solid rgba(10,10,10,0.08)' : 'none' }),
        }}
      >
        <div
          className="glass"
          style={{
            padding: mobile ? '14px 16px' : '20px 24px',
            textAlign: mobile ? 'center' : 'left',
          }}
        >
          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: mobile ? 22 : 26,
              color: '#0A0A0A',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 9,
              color: '#888884',
              letterSpacing: '0.14em',
            }}
          >
            {s.label}
          </div>
        </div>
      </TechBracket>
    ))}
  </div>
)

/* ─────────────────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────────────────── */
const HeroSection = () => {
  const [mounted, setMounted] = useState(false)
  const { isMobile, isTablet } = useBreakpoint()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  const hPad = isMobile ? '28px 24px 24px' : isTablet ? '0 36px 120px' : '0 60px 120px'

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100vw',
        minHeight: '100vh',
        paddingTop: 64,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Left / Top Pane ── */}
      <div
        style={{
          flex: isMobile ? 'none' : '0 0 50%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'center',
          padding: hPad,
          borderRight: isMobile ? 'none' : '1px solid rgba(10,10,10,0.12)',
          overflow: 'hidden',
          background: 'var(--offwhite)',
          paddingBottom: isMobile ? '0' : undefined,
        }}
      >
        {!isMobile && <PitchCanvas />}

        {/* Text content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: isMobile ? '100%' : 560,
          }}
        >
          <div
            className="overline"
            style={{ marginBottom: isMobile ? 16 : 24, ...fade(0) }}
          >
            // REVOLUTIONIZING SOCCER SCOUTING
          </div>

          <h1
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              margin: 0,
              lineHeight: 1.05,
              marginBottom: isMobile ? 18 : 28,
              ...fade(100),
            }}
          >
            <span
              style={{
                display: 'block',
                fontWeight: 600,
                fontSize: isMobile ? 'clamp(38px, 11vw, 56px)' : 'clamp(40px, 5vw, 80px)',
                color: '#0A0A0A',
                letterSpacing: '-0.04em',
              }}
            >
              No exceptional
            </span>
            <span
              style={{
                display: 'block',
                fontWeight: 300,
                fontSize: isMobile ? 'clamp(38px, 11vw, 56px)' : 'clamp(40px, 5vw, 80px)',
                color: '#0A0A0A',
                letterSpacing: '-0.04em',
              }}
            >
              talent goes
            </span>
            <span
              style={{
                display: 'block',
                fontWeight: 600,
                fontSize: isMobile ? 'clamp(38px, 11vw, 56px)' : 'clamp(40px, 5vw, 80px)',
                color: '#0A0A0A',
                letterSpacing: '-0.04em',
              }}
            >
              undiscovered.
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              lineHeight: 1.85,
              color: '#888884',
              marginBottom: isMobile ? 28 : 40,
              maxWidth: isMobile ? '100%' : 440,
              letterSpacing: '0.02em',
              ...fade(200),
            }}
          >
            Dribbl connects talented players with clubs and scouts worldwide.
            Upload your highlights, receive AI-analyzed performance stats, and
            build a digital scouting profile that gets you noticed.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
              ...fade(300),
            }}
          >
            <TechBracket color="#FF0040" size={10}>
              <button className="btn-glass">Explore App</button>
            </TechBracket>
            <button className="btn-dark">Learn More</button>
          </div>
        </div>

        {/* Stats — desktop: absolute at bottom; mobile: inline below */}
        {!isMobile && <StatsRow mobile={false} />}
      </div>

      {/* ── Right Pane — Particle Canvas (desktop only) ── */}
      {!isMobile && (
        <div
          style={{
            flex: '0 0 50%',
            position: 'relative',
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <ParticleCanvas />
        </div>
      )}

      {/* ── Stats — mobile only, below text content ── */}
      {isMobile && <StatsRow mobile={true} />}
    </section>
  )
}

export default HeroSection
