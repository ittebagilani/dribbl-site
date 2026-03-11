import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TechBracket from './TechBracket'
import { useBreakpoint } from '../hooks/useBreakpoint'

const DiamondLogo = ({ size = 28 }) => (
  <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#FF0040',
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size * 0.36,
        height: size * 0.36,
        background: '#0A0A0A',
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      }}
    />
  </div>
)

const navRoutes = {
  'About':   '/about',
  'Team':    '/team',
  'Contact': '/contact',
}

const NavLink = ({ label, to, onClick }) => {
  const [hovered, setHovered] = useState(false)
  const { pathname } = useLocation()
  const active = pathname === to && to !== '/'
  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 14,
        textDecoration: 'none',
        letterSpacing: '0.04em',
        color: '#F4F4F2',
        whiteSpace: 'nowrap',
        display: 'block',
        position: 'relative',
        paddingBottom: 3,
      }}
    >
      <span style={{ color: '#FF0040', marginRight: 3 }}>//</span>
      {label}
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: '#FF0040',
        transform: active || hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
      }} />
    </Link>
  )
}

/* ── Hamburger icon ─────────────────────────────────── */
const Hamburger = ({ open, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      padding: '6px',
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 36,
      height: 36,
    }}
    aria-label="Toggle menu"
  >
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          display: 'block',
          width: 22,
          height: 1.5,
          background: '#F4F4F2',
          borderRadius: 1,
          transformOrigin: 'center',
          transition: 'transform 0.25s ease, opacity 0.25s ease, width 0.25s ease',
          transform: open
            ? i === 0
              ? 'rotate(45deg) translate(4px, 4.5px)'
              : i === 2
              ? 'rotate(-45deg) translate(4px, -4.5px)'
              : 'scaleX(0)'
            : 'none',
          opacity: open && i === 1 ? 0 : 1,
        }}
      />
    ))}
  </button>
)

/* ── Mobile full-screen menu overlay ─────────────────── */
const MobileMenu = ({ open, onClose }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 998,
      background: 'rgba(10,10,10,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'all' : 'none',
      transition: 'opacity 0.3s ease',
    }}
  >
    {[['About', '/about'], ['Team', '/team'], ['Contact', '/contact']].map(([label, to], i) => (
      <Link
        key={label}
        to={to}
        onClick={onClose}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: 32,
          color: '#F4F4F2',
          textDecoration: 'none',
          letterSpacing: '-0.03em',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity 0.4s ease ${i * 0.06 + 0.1}s, transform 0.4s ease ${i * 0.06 + 0.1}s`,
        }}
      >
        <span style={{ color: '#FF0040', fontSize: 20 }}>//</span> {label}
      </Link>
    ))}

    <div
      style={{
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.4s ease 0.28s, transform 0.4s ease 0.28s',
      }}
    >
      <TechBracket size={8} color="#FF0040">
        <button
          className="btn-dark"
          onClick={onClose}
          style={{ padding: '12px 32px', fontSize: 12 }}
        >
          Join Waitlist
        </button>
      </TechBracket>
    </div>
  </div>
)

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile } = useBreakpoint()
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (window.scrollY > 60) setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Capsule transform values ── */
  const navWidth = scrolled
    ? isMobile
      ? 'calc(100vw - 24px)'
      : 'min(760px, calc(100vw - 48px))'
    : '100vw'

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          zIndex: 999,
          /* Always centred via left+transform so width transition is smooth */
          left: '50%',
          transform: 'translateX(-50%)',
          width: navWidth,
          top: scrolled ? 12 : 0,
          height: scrolled ? 52 : 64,
          borderRadius: scrolled ? 100 : 0,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: scrolled
            ? 'rgba(10,10,10,0.95)'
            : 'rgba(10,10,10,0.90)',
          border: scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid transparent',
          borderBottom: !scrolled ? '1px solid rgba(255,255,255,0.06)' : undefined,
          boxShadow: scrolled
            ? '0 4px 28px rgba(0,0,0,0.08), 0 1px 6px rgba(0,0,0,0.04)'
            : 'none',
          transition:
            'width 0.45s cubic-bezier(0.16,1,0.3,1), ' +
            'top 0.45s cubic-bezier(0.16,1,0.3,1), ' +
            'height 0.45s cubic-bezier(0.16,1,0.3,1), ' +
            'border-radius 0.45s cubic-bezier(0.16,1,0.3,1), ' +
            'background-color 0.35s ease, ' +
            'box-shadow 0.35s ease, ' +
            'border-color 0.35s ease',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: scrolled
              ? isMobile ? '0 16px' : '0 24px'
              : isMobile ? '0 20px' : '0 40px',
            transition: 'padding 0.45s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* ── Logo ── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/images/Dribbl-banner.png"
              alt="Dribbl"
              style={{
                height: scrolled ? 28 : 36,
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.35s ease',
              }}
            />
          </Link>

          {/* ── Desktop Nav Links ── */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
              <NavLink label="About"   to="/about" />
              <NavLink label="Team"    to="/team" />
              <NavLink label="Contact" to="/contact" />
            </div>
          )}

          {/* ── Desktop Right ── */}
          {!isMobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {!scrolled && (
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    color: 'rgba(244,244,242,0.55)',
                    letterSpacing: '0.08em',
                  }}
                >
                  v 1.0
                </span>
              )}
              <TechBracket size={6} color="#FF0040">
                <button
                  className="btn-dark"
                  style={{ padding: scrolled ? '7px 18px' : '9px 22px', fontSize: 11 }}
                >
                  Join Waitlist
                </button>
              </TechBracket>
            </div>
          ) : (
            /* ── Mobile: Hamburger ── */
            <Hamburger open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
          )}
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {isMobile && (
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </>
  )
}

export default Navbar
