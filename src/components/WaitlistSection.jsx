import React, { useRef, useEffect, useState } from 'react'
import TechBracket from './TechBracket'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useModal } from '../context/ModalContext'

const WaitlistSection = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)
  const { isMobile } = useBreakpoint()
  const { openWaitlist } = useModal()

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
        background: 'var(--dark)',
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
            'repeating-linear-gradient(90deg, #FF0040 0px, #FF0040 1px, transparent 1px, transparent 60px)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 640 }}>
        {/* Overline */}
        <div className="overline" style={{ marginBottom: 20, ...fade(0) }}>
          // JOIN DRIBBL FOR FREE
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(34px, 4vw, 60px)',
            color: '#F4F4F2',
            letterSpacing: '-0.04em',
            margin: '0 0 20px',
            lineHeight: 1.05,
            ...fade(100),
          }}
        >
          Your Network is Waiting.
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 14,
            lineHeight: 1.9,
            color: 'rgba(244,244,242,0.65)',
            margin: '0 0 48px',
            letterSpacing: '0.02em',
            ...fade(200),
          }}
        >
          Join Dribbl for free and start building the profile that gets you noticed.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
            ...fade(300),
          }}
        >
          <TechBracket color="#FF0040" size={10}>
            <button className="btn-glass" onClick={openWaitlist} style={{ padding: '14px 32px' }}>
              Join Waitlist
            </button>
          </TechBracket>
        </div>

        {/* Fine print */}
        <p
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.08em',
            margin: 0,
            ...fade(400),
          }}
        >
          Free to join. No credit card required.
        </p>
      </div>
    </section>
  )
}

export default WaitlistSection
