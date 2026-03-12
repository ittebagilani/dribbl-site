import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import TechBracket from './TechBracket'
import { useModal } from '../context/ModalContext'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ── Shared overlay + panel shell ───────────────────── */
const ModalShell = ({ onClose, children }) => {
  const { isMobile } = useBreakpoint()

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '16px' : '24px',
        animation: 'modalFadeIn 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#0D0D0D',
          border: '1px solid rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: 540,
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(244,244,242,0.6)',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: 1,
            zIndex: 10,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF0040'; e.currentTarget.style.color = '#FF0040' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(244,244,242,0.6)' }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Corner brackets */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 14, borderTop: '2px solid #FF0040', borderLeft: '2px solid #FF0040', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, borderTop: '2px solid #FF0040', borderRight: '2px solid #FF0040', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 14, height: 14, borderBottom: '2px solid #FF0040', borderLeft: '2px solid #FF0040', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderBottom: '2px solid #FF0040', borderRight: '2px solid #FF0040', pointerEvents: 'none' }} />

        {children}
      </div>
    </div>
  )
}

/* ── Waitlist Modal ──────────────────────────────────── */
const WaitlistModal = ({ onClose }) => {
  const { isMobile } = useBreakpoint()
  const [role, setRole] = useState(null) // 'player' | 'coach'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#F4F4F2',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 13,
    padding: '12px 14px',
    outline: 'none',
    boxSizing: 'border-box',
    letterSpacing: '0.02em',
    transition: 'border-color 0.2s',
  }

  return (
    <ModalShell onClose={onClose}>
      <div style={{ padding: isMobile ? '40px 24px 32px' : '48px 40px 40px' }}>
        {submitted ? (
          /* ── Success state ── */
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#FF0040', letterSpacing: '0.16em', marginBottom: 20 }}>
              // YOU'RE IN
            </div>
            <h2 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 36px)', color: '#F4F4F2', letterSpacing: '-0.035em', margin: '0 0 16px', lineHeight: 1.1 }}>
              Welcome to Dribbl.
            </h2>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.85, color: 'rgba(244,244,242,0.6)', margin: '0 0 32px', letterSpacing: '0.02em' }}>
              We'll reach out at <span style={{ color: '#FF0040' }}>{email}</span> when we launch.<br />
              Get ready.
            </p>
            <button
              onClick={onClose}
              className="btn-dark"
              style={{ padding: '10px 28px', fontSize: 11 }}
            >
              Close
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#FF0040', letterSpacing: '0.16em', marginBottom: 20 }}>
              // JOIN THE WAITLIST
            </div>
            <h2 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 34px)', color: '#F4F4F2', letterSpacing: '-0.035em', margin: '0 0 10px', lineHeight: 1.1 }}>
              Get Early Access.
            </h2>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.85, color: 'rgba(244,244,242,0.55)', margin: '0 0 32px', letterSpacing: '0.02em' }}>
              Be first to know when Dribbl launches. No spam, ever.
            </p>

            {/* Role toggle */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginBottom: 10 }}>
                I AM A
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['player', 'Player'], ['coach', 'Coach or Club']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setRole(val)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      background: role === val ? 'rgba(255,0,64,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${role === val ? '#FF0040' : 'rgba(255,255,255,0.1)'}`,
                      color: role === val ? '#FF0040' : 'rgba(244,244,242,0.6)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginBottom: 8 }}>
                  FIRST NAME
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,0,64,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginBottom: 8 }}>
                  EMAIL ADDRESS
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,0,64,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ marginTop: 8 }}>
                <TechBracket color="#FF0040" size={8} style={{ display: 'block' }}>
                  <button
                    type="submit"
                    className="btn-glass"
                    style={{ width: '100%', padding: '13px', fontSize: 12, letterSpacing: '0.08em' }}
                  >
                    Join Waitlist
                  </button>
                </TechBracket>
              </div>

              <p style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', margin: '4px 0 0', textAlign: 'center' }}>
                FREE TO JOIN · NO CREDIT CARD REQUIRED
              </p>
            </form>
          </>
        )}
      </div>
    </ModalShell>
  )
}

/* ── Open Positions Modal ────────────────────────────── */
const OpenPositionsModal = ({ onClose }) => {
  const { isMobile } = useBreakpoint()

  return (
    <ModalShell onClose={onClose}>
      <div style={{ padding: isMobile ? '40px 24px 32px' : '48px 40px 40px' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#FF0040', letterSpacing: '0.16em', marginBottom: 20 }}>
          // OPEN POSITIONS
        </div>
        <h2 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 34px)', color: '#F4F4F2', letterSpacing: '-0.035em', margin: '0 0 12px', lineHeight: 1.1 }}>
          Join the Team.
        </h2>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.85, color: 'rgba(244,244,242,0.55)', margin: '0 0 40px', letterSpacing: '0.02em' }}>
          We're a small team moving fast. When we open roles, they'll appear here.
        </p>

        {/* No openings card */}
        <div style={{
          border: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.02)',
          padding: '32px 28px',
          marginBottom: 32,
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 22, color: 'rgba(255,255,255,0.1)', marginBottom: 12 }}>
            ——
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'rgba(244,244,242,0.5)', letterSpacing: '0.1em' }}>
            NO CURRENT OPENINGS
          </div>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'rgba(244,244,242,0.35)', margin: '12px 0 0', letterSpacing: '0.02em', lineHeight: 1.7 }}>
            Check back soon — we're growing.
          </p>
        </div>

        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'rgba(244,244,242,0.5)', margin: '0 0 20px', letterSpacing: '0.02em', lineHeight: 1.7 }}>
          Passionate about soccer and tech? Reach out anyway —<br />
          we love meeting people who care about the game.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <TechBracket color="#FF0040" size={7}>
            <a href="/contact" onClick={onClose} style={{ textDecoration: 'none' }}>
              <button className="btn-dark" style={{ padding: '10px 22px', fontSize: 11 }}>
                Get in Touch
              </button>
            </a>
          </TechBracket>
          <button
            onClick={onClose}
            className="btn-glass"
            style={{ padding: '10px 22px', fontSize: 11 }}
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  )
}

/* ── Modal keyframe styles (injected once) ───────────── */
const modalStyles = `
  @keyframes modalFadeIn {
    from { opacity: 0 }
    to   { opacity: 1 }
  }
  @keyframes modalSlideUp {
    from { opacity: 0; transform: translateY(20px) }
    to   { opacity: 1; transform: translateY(0) }
  }
`

/* ── Root modal renderer ─────────────────────────────── */
const Modals = () => {
  const { modal, closeModal } = useModal()

  return createPortal(
    <>
      <style>{modalStyles}</style>
      {modal === 'waitlist'  && <WaitlistModal   onClose={closeModal} />}
      {modal === 'positions' && <OpenPositionsModal onClose={closeModal} />}
    </>,
    document.body,
  )
}

export default Modals
