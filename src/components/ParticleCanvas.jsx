import React, { useRef, useEffect, useState } from 'react'
import TechBracket from './TechBracket'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ─────────────────────────────────────────────────────────
   HUD label placed over the canvas with a connecting line
───────────────────────────────────────────────────────── */
const HudLabel = ({ label, value, position }) => {
  const { top, left, right, bottom } = position
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        zIndex: 10,
        animation: 'hud-flicker 7s infinite',
      }}
    >
      <TechBracket color="#FF0040" size={8}>
        <div
          className="glass-dark"
          style={{
            padding: '8px 14px',
            borderRadius: 1,
          }}
        >
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 9,
              color: '#FF0040',
              letterSpacing: '0.12em',
              marginBottom: 2,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 14,
              color: '#F4F4F2',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            {value}
          </div>
        </div>
      </TechBracket>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Main Particle Canvas
───────────────────────────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null)
  const stateRef = useRef({})
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf
    let streams = []
    const STREAM_COUNT = 680
    const PTS_PER_STREAM = 90

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initStreams()
    }

    const initStreams = () => {
      const W = canvas.width
      const H = canvas.height
      const maxR = Math.min(W, H) * 0.42
      streams = []

      for (let i = 0; i < STREAM_COUNT; i++) {
        // Uniform sphere distribution
        const phi = Math.acos(2 * Math.random() - 1)
        const theta = Math.random() * Math.PI * 2
        const rFrac = Math.pow(Math.random(), 0.55) // bias toward center
        const r = rFrac * maxR

        streams.push({
          phi,
          theta,
          radius: r,
          normR: rFrac,
          speed: (0.004 + Math.random() * 0.018) * (Math.random() < 0.5 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
          helixTurns: 0.5 + Math.random() * 2.5,
          lineWidth: 0.15 + Math.random() * 0.7,
          wobbleAmp: Math.random() * 0.25,
          wobbleFreq: 1 + Math.random() * 4,
        })
      }

      stateRef.current.maxR = maxR
    }

    let time = 0

    const getColor = (normR) => {
      if (normR < 0.12) return [255, 255, 255, 0.85]
      if (normR < 0.28) return [255, 0, 64, 0.65]
      if (normR < 0.48) return [0, 207, 255, 0.5]
      if (normR < 0.70) return [30, 80, 255, 0.38]
      return [255, 183, 0, 0.28]
    }

    const animate = () => {
      const W = canvas.width
      const H = canvas.height
      const cx = W * 0.5
      const cy = H * 0.5
      const { maxR = 300 } = stateRef.current
      const FOV = maxR * 3.2

      time += 0.008

      // ── Trail fade ──
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)'
      ctx.fillRect(0, 0, W, H)

      // ── Radial backlight glow ──
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 1.1)
      glow.addColorStop(0, 'rgba(255,0,64,0.07)')
      glow.addColorStop(0.35, 'rgba(0,80,255,0.04)')
      glow.addColorStop(0.7, 'rgba(255,183,0,0.02)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      // ── Draw HUD connector lines ──
      const hudConfigs = [
        { px: 0.08, py: 0.18 },
        { px: 0.70, py: 0.14 },
        { px: 0.04, py: 0.72 },
        { px: 0.70, py: 0.78 },
      ]

      hudConfigs.forEach(({ px, py }) => {
        const sx = W * px + 80
        const sy = H * py + 20
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        // Elbow line
        const midX = sx + (cx - sx) * 0.4
        ctx.lineTo(midX, sy)
        ctx.lineTo(cx, cy)
        ctx.strokeStyle = 'rgba(255,0,64,0.25)'
        ctx.lineWidth = 0.6
        ctx.setLineDash([3, 5])
        ctx.stroke()
        ctx.setLineDash([])

        // Crosshair dot at nexus
        ctx.beginPath()
        ctx.arc(cx, cy, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,0,64,0.6)'
        ctx.fill()

        // Target cross
        const cs = 8
        ctx.beginPath()
        ctx.moveTo(cx - cs, cy)
        ctx.lineTo(cx + cs, cy)
        ctx.moveTo(cx, cy - cs)
        ctx.lineTo(cx, cy + cs)
        ctx.strokeStyle = 'rgba(255,0,64,0.35)'
        ctx.lineWidth = 0.7
        ctx.stroke()
      })

      // ── Draw streams ──
      for (let s = 0; s < streams.length; s++) {
        const st = streams[s]
        st.phase += st.speed

        const [r, g, b, a] = getColor(st.normR)
        ctx.beginPath()

        let first = true
        for (let i = 0; i <= PTS_PER_STREAM; i++) {
          const t = i / PTS_PER_STREAM
          const angle = st.phase + t * Math.PI * 2 * st.helixTurns

          // Parametric helix on sphere surface with wobble
          const wobble = Math.sin(time * st.wobbleFreq + t * Math.PI * 3) * st.wobbleAmp
          const phiW = st.phi + wobble
          const thetaW = st.theta + angle

          // Fade along stream length
          const taper = Math.sin(t * Math.PI) // 0→1→0

          const rEff = st.radius * taper

          const x3 = rEff * Math.sin(phiW) * Math.cos(thetaW)
          const y3 = rEff * Math.cos(phiW)
          const z3 = rEff * Math.sin(phiW) * Math.sin(thetaW)

          // Perspective projection
          const persp = FOV / (FOV + z3)
          const sx = cx + x3 * persp
          const sy = cy + y3 * persp

          if (first) {
            ctx.moveTo(sx, sy)
            first = false
          } else {
            ctx.lineTo(sx, sy)
          }
        }

        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
        ctx.lineWidth = st.lineWidth
        ctx.stroke()
      }

      // ── Bright core ──
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.08)
      coreGlow.addColorStop(0, 'rgba(255,255,255,0.9)')
      coreGlow.addColorStop(0.4, 'rgba(255,0,64,0.5)')
      coreGlow.addColorStop(1, 'rgba(255,0,64,0)')
      ctx.fillStyle = coreGlow
      ctx.beginPath()
      ctx.arc(cx, cy, maxR * 0.08, 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas.parentElement || canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  const hudLabels = [
    { label: 'NEURAL INDEX', value: '94.7%',       position: { top: '14%',  left: '4%' } },
    { label: 'ACTIVE SCOUTS', value: '3,847',       position: { top: '10%',  right: '4%' } },
    { label: 'TALENT NODES', value: '51,204',       position: { bottom: '22%', left: '2%' } },
    { label: 'SYNC LATENCY', value: '0.01s',        position: { bottom: '18%', right: '4%' } },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
      {!isMobile && hudLabels.map((h) => (
        <HudLabel key={h.label} label={h.label} value={h.value} position={h.position} />
      ))}
    </div>
  )
}

export default ParticleCanvas
