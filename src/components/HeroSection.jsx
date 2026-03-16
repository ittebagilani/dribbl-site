import React, { useRef, useEffect, useState } from 'react'
import TechBracket from './TechBracket'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useModal } from '../context/ModalContext'

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
      ctx.globalAlpha = 0.32
      ctx.strokeStyle = 'rgba(255,0,64,0.7)'
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

      ctx.fillStyle = 'rgba(255,0,64,0.7)'

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
   Hero Section
───────────────────────────────────────────────────────── */
const HeroSection = () => {
  const [mounted, setMounted] = useState(false)
  const { isMobile, isTablet } = useBreakpoint()
  const { openWaitlist } = useModal()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  const hPad = isTablet ? '28px 24px 24px' : '0 60px 120px'

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: isTablet ? 'column' : 'row',
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
          flex: isTablet ? 'none' : '0 0 50%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isTablet ? 'flex-start' : 'center',
          padding: hPad,
          borderRight: isTablet ? 'none' : '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          background: 'var(--dark)',
          paddingBottom: isTablet ? '0' : undefined,
        }}
      >
        {!isTablet && <PitchCanvas />}

        {/* Text content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: isTablet ? '100%' : 560,
          }}
        >
          <div
            className="overline"
            style={{ marginBottom: isTablet ? 16 : 24, ...fade(0) }}
          >
            // WELCOME TO DRIBBL
          </div>

          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              lineHeight: 1.05,
              marginBottom: isTablet ? 18 : 28,
              ...fade(100),
            }}
          >
            <span
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: isTablet ? 'clamp(38px, 11vw, 56px)' : 'clamp(40px, 5vw, 80px)',
                color: 'var(--text)',
                letterSpacing: '-0.04em',
              }}
            >
              Your Journey.
            </span>
            <span
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: isTablet ? 'clamp(38px, 11vw, 56px)' : 'clamp(40px, 5vw, 80px)',
                color: 'var(--text)',
                letterSpacing: '-0.04em',
              }}
            >
              Your Game.
            </span>
            <span
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: isTablet ? 'clamp(38px, 11vw, 56px)' : 'clamp(40px, 5vw, 80px)',
                color: '#FF0040',
                letterSpacing: '-0.04em',
              }}
            >
              Your Network.
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 14,
              lineHeight: 1.85,
              color: 'var(--text-muted)',
              marginBottom: isTablet ? 28 : 40,
              maxWidth: isTablet ? '100%' : 440,
              letterSpacing: '0.02em',
              ...fade(200),
            }}
          >
            Dribbl is where soccer players showcase their journey, connect with
            teammates, and get discovered by coaches and clubs, all in one place.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start',
              ...fade(300),
            }}
          >
            <TechBracket color="#FF0040" size={10}>
              <button className="btn-glass" onClick={openWaitlist}>Join Waitlist</button>
            </TechBracket>
          </div>
        </div>

      </div>

      {/* ── Video Pane - full height on desktop, fixed height block on tablet/mobile ── */}
      <div
        style={{
          flex: isTablet ? 'none' : '0 0 50%',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-alt)',
          height: isMobile ? '80vw' : isTablet ? '56vw' : undefined,
          marginTop: isTablet ? 40 : undefined,
        }}
      >
        <video
          src="/videos/hero-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

    </section>
  )
}

export default HeroSection
