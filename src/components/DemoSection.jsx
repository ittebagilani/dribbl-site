import React from 'react'
import TechBracket from './TechBracket'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useModal } from '../context/ModalContext'

const IconWaitlist = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="12" cy="8" r="5" stroke="#FF0040" strokeWidth="1" />
    <path d="M4 28C4 22 7.5 18 12 18" stroke="#FF0040" strokeWidth="1" fill="none" />
    <circle cx="24" cy="24" r="6" stroke="#FF0040" strokeWidth="1" />
    <line x1="24" y1="20.5" x2="24" y2="27.5" stroke="#FF0040" strokeWidth="1.2" />
    <line x1="20.5" y1="24" x2="27.5" y2="24" stroke="#FF0040" strokeWidth="1.2" />
  </svg>
)

const IconConnect = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="5" cy="16" r="3.5" stroke="#FF0040" strokeWidth="1" />
    <circle cx="27" cy="7" r="3.5" stroke="#FF0040" strokeWidth="1" />
    <circle cx="27" cy="25" r="3.5" stroke="#FF0040" strokeWidth="1" />
    <line x1="8.5" y1="15" x2="23.5" y2="8.5" stroke="#FF0040" strokeWidth="1" />
    <line x1="8.5" y1="17" x2="23.5" y2="23.5" stroke="#FF0040" strokeWidth="1" />
    <circle cx="16" cy="16" r="1.5" fill="#FF0040" />
  </svg>
)

const IconDiscover = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="13" cy="13" r="8" stroke="#FF0040" strokeWidth="1" />
    <circle cx="13" cy="13" r="3.5" stroke="#FF0040" strokeWidth="0.8" />
    <line x1="19" y1="19" x2="28" y2="28" stroke="#FF0040" strokeWidth="1.5" />
    <line x1="13" y1="5" x2="13" y2="8" stroke="#FF0040" strokeWidth="1" />
    <line x1="13" y1="18" x2="13" y2="21" stroke="#FF0040" strokeWidth="1" />
    <line x1="5" y1="13" x2="8" y2="13" stroke="#FF0040" strokeWidth="1" />
    <line x1="18" y1="13" x2="21" y2="13" stroke="#FF0040" strokeWidth="1" />
  </svg>
)

const steps = [
  { num: '01', label: 'Join Waitlist', desc: 'Join the waitlist and be first to create your profile when we launch.', Icon: IconWaitlist },
  { num: '02', label: 'Connect', desc: "Find and follow teammates, coaches, and clubs you're part of or want to be part of.", Icon: IconConnect },
  { num: '03', label: 'Get Discovered', desc: 'Let coaches and scouts come to you while you focus on your game.', Icon: IconDiscover },
]

/* ── Demo Section ─────────────────────────────────────── */
const DemoSection = () => {
  const { isMobile } = useBreakpoint()
  const { openWaitlist } = useModal()

  return (
    <section
      style={{
        background: 'var(--dark)',
        padding: isMobile ? '72px 20px' : '120px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <div className="overline" style={{ marginBottom: 20 }}>
          // HOW IT WORKS
        </div>
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(34px, 4vw, 58px)',
            color: 'var(--text)',
            letterSpacing: '-0.035em',
            margin: '0 0 20px',
          }}
        >
          Up and Running in Minutes.
        </h2>
        <p
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 14,
            lineHeight: 1.9,
            color: 'var(--text-muted)',
            maxWidth: 480,
            margin: '0 auto',
            letterSpacing: '0.02em',
          }}
        >
          Sign up and build your profile for free. Connect with the soccer community. Get discovered.
        </p>
      </div>

      {/* Steps */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 12 : 2,
          width: '100%',
          maxWidth: 860,
          marginBottom: 64,
        }}
      >
        {steps.map(({ num, label, desc, Icon }) => (
          <div
            key={num}
            style={{
              border: '1px solid var(--border)',
              padding: isMobile ? '28px 24px' : '36px 28px',
              background: 'var(--bg-alt)',
              textAlign: 'left',
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <Icon />
            </div>
            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 9,
                color: 'var(--accent)',
                letterSpacing: '0.14em',
                marginBottom: 12,
              }}
            >
              STEP {num}
            </div>
            <h3
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 17,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                margin: '0 0 10px',
              }}
            >
              {label}
            </h3>
            <p
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 13,
                lineHeight: 1.85,
                color: 'var(--text-muted)',
                margin: 0,
                letterSpacing: '0.02em',
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div
        className="stock-frame"
        style={{
          width: '100%',
          maxWidth: 980,
          height: isMobile ? 200 : 300,
          borderRadius: 20,
        }}
      >
        <img
          className="stock-img"
          src="/images/stock/aerial-field.jpg"
          alt="Aerial view of a soccer field"
        />
      </div>

    </section>
  )
}

export default DemoSection
