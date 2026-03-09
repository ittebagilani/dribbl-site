import React, { useRef, useEffect, useState } from 'react'
import TechBracket from './TechBracket'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ── Waveform / Particle Burst Canvas ────────────────── */
const DemoCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const animate = () => {
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2
      time += 0.018

      ctx.fillStyle = 'rgba(10, 10, 10, 0.18)'
      ctx.fillRect(0, 0, W, H)

      // ── Waveform bars ──
      const bars = 80
      const barW = W / bars
      for (let i = 0; i < bars; i++) {
        const t = i / bars
        const wave1 = Math.sin(t * Math.PI * 6 + time * 2.2) * 0.5
        const wave2 = Math.sin(t * Math.PI * 10 - time * 1.8) * 0.3
        const wave3 = Math.sin(t * Math.PI * 3 + time * 0.9) * 0.2
        const amplitude = (wave1 + wave2 + wave3) * H * 0.22
        const barH = Math.abs(amplitude) + 2

        const normI = i / bars
        let r, g, b
        if (normI < 0.3) { r = 255; g = 0; b = 64 }
        else if (normI < 0.6) { r = 0; g = 207; b = 255 }
        else { r = 0; g = 80; b = 255 }

        const alpha = 0.5 + Math.abs(wave1) * 0.5
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fillRect(i * barW, cy - barH / 2, barW - 1, barH)
      }

      // ── Concentric pulse rings ──
      const rings = 5
      for (let r = 0; r < rings; r++) {
        const phase = (time * 0.7 + r / rings) % 1
        const radius = phase * Math.min(cx, cy) * 0.85
        const alpha = (1 - phase) * 0.3
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,0,64,${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // ── Scanning line ──
      const scanX = ((time * 120) % W)
      const scanGrad = ctx.createLinearGradient(scanX - 40, 0, scanX + 2, 0)
      scanGrad.addColorStop(0, 'rgba(255,0,64,0)')
      scanGrad.addColorStop(1, 'rgba(255,0,64,0.35)')
      ctx.fillStyle = scanGrad
      ctx.fillRect(scanX - 40, 0, 42, H)

      raf = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

/* ── Demo Section ─────────────────────────────────────── */
const DemoSection = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0A0A0A',
        padding: isMobile ? '72px 20px' : '120px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 64, ...fade(0) }}>
        <div className="overline" style={{ marginBottom: 20 }}>
          // SNEAK PEEK
        </div>
        <h2
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(34px, 4vw, 58px)',
            color: '#F4F4F2',
            letterSpacing: '-0.035em',
            margin: '0 0 20px',
          }}
        >
          See Dribbl in action.
        </h2>
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            lineHeight: 1.9,
            color: 'rgba(244,244,242,0.45)',
            maxWidth: 560,
            margin: '0 auto',
            letterSpacing: '0.02em',
          }}
        >
          Our AI performance analysis engine processes footage in real-time,
          extracting 200+ data points per session — from sprint velocity to
          off-ball movement patterns that scouts have never been able to quantify before.
        </p>
      </div>

      {/* Demo Box */}
      <div style={{ width: '100%', maxWidth: 900, marginBottom: 48, ...fade(150) }}>
        <TechBracket color="#FF0040" size={isMobile ? 8 : 16} style={{ display: 'block' }}>
          <div
            style={{
              position: 'relative',
              height: isMobile ? 240 : 420,
              background: '#000',
              overflow: 'hidden',
            }}
          >
            <DemoCanvas />

            {/* Overlay label */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: 'rgba(255,0,64,0.4)',
                }}
              />
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  color: 'rgba(244,244,242,0.6)',
                  letterSpacing: '0.18em',
                  textAlign: 'center',
                }}
              >
                DEMO VIDEO COMING SOON
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  color: 'rgba(255,0,64,0.5)',
                  letterSpacing: '0.14em',
                }}
              >
                // AI ANALYSIS PREVIEW ACTIVE
              </div>
            </div>

            {/* Corner UI ticks */}
            {[
              { top: 16, left: 16 },
              { top: 16, right: 16 },
              { bottom: 16, left: 16 },
              { bottom: 16, right: 16 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...pos,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  color: 'rgba(255,0,64,0.4)',
                  letterSpacing: '0.08em',
                  zIndex: 3,
                }}
              >
                {i === 0 && 'REC'}
                {i === 1 && '4K'}
                {i === 2 && '00:00:00'}
                {i === 3 && 'AI-PROC'}
              </div>
            ))}
          </div>
        </TechBracket>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 16, ...fade(300) }}>
        <TechBracket color="#FF0040" size={10}>
          <button
            className="btn-glass"
            style={{ color: '#F4F4F2', borderColor: 'rgba(244,244,242,0.12)' }}
          >
            Watch Demo
          </button>
        </TechBracket>
        <button className="btn-dark">Learn More</button>
      </div>
    </section>
  )
}

export default DemoSection
