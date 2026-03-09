import React, { useRef, useEffect, useState } from 'react'
import TechBracket from './TechBracket'
import { useBreakpoint } from '../hooks/useBreakpoint'

const WaitlistSection = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--offwhite)',
        padding: isMobile ? '80px 24px' : '130px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.03,
          backgroundImage:
            'repeating-linear-gradient(90deg, #0A0A0A 0px, #0A0A0A 1px, transparent 1px, transparent 60px)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 640 }}>
        {/* Overline */}
        <div className="overline" style={{ marginBottom: 20, ...fade(0) }}>
          // EARLY ACCESS
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(34px, 4vw, 60px)',
            color: '#0A0A0A',
            letterSpacing: '-0.04em',
            margin: '0 0 20px',
            lineHeight: 1.05,
            ...fade(100),
          }}
        >
          Be first to experience Dribbl.
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            lineHeight: 1.9,
            color: '#888884',
            margin: '0 0 48px',
            letterSpacing: '0.02em',
            ...fade(200),
          }}
        >
          Join our early access list to be among the first players, coaches, and
          scouts to experience how we are changing the game.
        </p>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 10 : 0,
              marginBottom: 20,
              ...fade(300),
            }}
          >
            <TechBracket
              color={focused ? '#FF0040' : 'rgba(10,10,10,0.2)'}
              size={10}
              style={{
                flex: 1,
                display: 'block',
                transition: 'all 0.25s',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  letterSpacing: '0.04em',
                  color: '#0A0A0A',
                  background: 'transparent',
                  border: '1px solid rgba(10,10,10,0.12)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  borderColor: focused ? 'rgba(255,0,64,0.5)' : 'rgba(10,10,10,0.12)',
                }}
              />
            </TechBracket>

            <button
              type="submit"
              className="btn-dark"
              style={{
                flexShrink: 0,
                padding: '14px 32px',
              }}
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div
            style={{
              marginBottom: 20,
              padding: '20px 32px',
              border: '1px solid rgba(255,0,64,0.3)',
              background: 'rgba(255,0,64,0.04)',
              ...fade(0),
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12,
                color: '#FF0040',
                letterSpacing: '0.06em',
              }}
            >
              // ACCESS GRANTED — you&apos;re on the list.
            </span>
          </div>
        )}

        {/* Fine print */}
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: '#BBBBB8',
            letterSpacing: '0.08em',
            margin: 0,
            ...fade(400),
          }}
        >
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}

export default WaitlistSection
