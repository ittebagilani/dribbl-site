import React, { useRef, useEffect } from 'react'
import { Twitter, Instagram, Linkedin } from 'lucide-react'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ── Isometric Grid Canvas ────────────────────────────── */
const FooterGrid = () => {
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
      ctx.globalAlpha = 0.04
      ctx.strokeStyle = '#F4F4F2'
      ctx.lineWidth = 0.8

      // Isometric grid
      const spacing = 40
      const angle = Math.PI / 6

      for (let i = -W; i < W * 2; i += spacing) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + H / Math.tan(Math.PI / 2 - angle), H)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i - H / Math.tan(Math.PI / 2 - angle), H)
        ctx.stroke()
      }
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

const socialLinks = [
  { icon: Twitter,   label: 'X / Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram',   href: '#' },
  { icon: Linkedin,  label: 'LinkedIn',    href: '#' },
]

/* ── Social Icon ─────────────────────────────────────── */
const SocialIcon = ({ icon: Icon, label, href }) => (
  <a
    href={href}
    title={label}
    style={{
      width: 36,
      height: 36,
      border: '1px solid rgba(244,244,242,0.15)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(244,244,242,0.5)',
      textDecoration: 'none',
      transition: 'border-color 0.2s, background 0.2s, color 0.2s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#FF0040'
      e.currentTarget.style.background = 'rgba(255,0,64,0.06)'
      e.currentTarget.style.color = '#FF0040'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(244,244,242,0.15)'
      e.currentTarget.style.background = 'transparent'
      e.currentTarget.style.color = 'rgba(244,244,242,0.5)'
    }}
  >
    <Icon size={14} strokeWidth={1.5} />
  </a>
)

/* ── Footer ───────────────────────────────────────────── */
const columns = [
  {
    title: 'Company',
    links: [['About Us', '/about'], ['Our Team', '/team'], ['Careers', '#'], ['Press', '#']],
  },
  {
    title: 'Support',
    links: [['Help Center', '#'], ['Contact Us', '/contact'], ['Privacy Policy', '#'], ['Terms of Service', '#']],
  },
  {
    title: 'Legal',
    links: [['Privacy', '#'], ['Terms', '#'], ['Cookies', '#'], ['Licenses', '#']],
  },
  {
    title: 'Connect',
    links: [['Twitter / X', '#'], ['Instagram', '#'], ['LinkedIn', '#'], ['TikTok', '#']],
  },
]

const Footer = () => {
  const { isMobile } = useBreakpoint()
  return (
  <footer
    style={{
      background: '#0A0A0A',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <FooterGrid />

    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* ── Top Row ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 20 : 0,
          padding: isMobile ? '48px 24px 32px' : '56px 80px 40px',
          borderBottom: '1px solid rgba(244,244,242,0.06)',
        }}
      >
        {/* Wordmark */}
        <img
          src="/images/Dribbl-banner.png"
          alt="Dribbl"
          style={{ height: 36, width: 'auto', objectFit: 'contain' }}
        />

        {/* Tagline */}
        {!isMobile && (
          <span
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 11,
              color: 'rgba(244,244,242,0.3)',
              letterSpacing: '0.08em',
            }}
          >
            Dribbl — Your Journey. Your Game. Your Network.
          </span>
        )}

        {/* Social Icons */}
        <div style={{ display: 'flex', gap: 10 }}>
          {socialLinks.map((s) => (
            <SocialIcon key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
          gap: isMobile ? '40px 0' : '0 80px',
          alignItems: 'start',
          padding: isMobile ? '40px 24px 48px' : '48px 80px 56px',
        }}
      >
        {/* Copyright */}
        <div>
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 11,
              color: 'rgba(244,244,242,0.25)',
              letterSpacing: '0.06em',
              marginBottom: 8,
            }}
          >
            &copy; Dribbl 2025
          </div>
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 10,
              color: 'rgba(244,244,242,0.12)',
              letterSpacing: '0.06em',
            }}
          >
            All rights reserved.
          </div>
        </div>

        {/* Link Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '32px 16px' : '0 32px',
          }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 10,
                  color: '#FF0040',
                  letterSpacing: '0.14em',
                  marginBottom: 16,
                }}
              >
                {col.title.toUpperCase()}
              </div>
              {col.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: 'block',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 11,
                    color: 'rgba(244,244,242,0.3)',
                    textDecoration: 'none',
                    marginBottom: 10,
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(244,244,242,0.8)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,244,242,0.3)')}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
