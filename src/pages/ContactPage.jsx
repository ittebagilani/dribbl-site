import React, { useState, useRef, useEffect } from 'react'
import TechBracket from '../components/TechBracket'
import Footer from '../components/Footer'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ── Labelled input / textarea ──────────────────────── */
const Field = ({ label, type = 'text', placeholder, value, onChange, multiline = false, required = false }) => {
  const [focused, setFocused] = useState(false)
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: focused ? '#FF0040' : '#888884', letterSpacing: '0.12em', marginBottom: 8, transition: 'color 0.2s' }}>
        {label}{required && <span style={{ color: '#FF0040' }}> *</span>}
      </div>
      <TechBracket color={focused ? '#FF0040' : 'rgba(255,255,255,0.15)'} size={8} style={{ display: 'block', transition: 'all 0.2s' }}>
        <Tag
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={multiline ? 5 : undefined}
          style={{
            display: 'block',
            width: '100%',
            padding: '13px 16px',
            fontFamily: 'JetBrains Mono',
            fontSize: 12,
            color: '#F4F4F2',
            background: 'transparent',
            border: `1px solid ${focused ? 'rgba(255,0,64,0.35)' : 'rgba(255,255,255,0.1)'}`,
            outline: 'none',
            resize: multiline ? 'vertical' : undefined,
            letterSpacing: '0.02em',
            transition: 'border-color 0.2s',
            minHeight: multiline ? 130 : undefined,
          }}
        />
      </TechBracket>
    </div>
  )
}

/* ── Info tile ──────────────────────────────────────── */
const InfoTile = ({ label, value }) => (
  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 0' }}>
    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#FF0040', letterSpacing: '0.12em', marginBottom: 6 }}>{label}</div>
    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#F4F4F2', letterSpacing: '0.04em' }}>{value}</div>
  </div>
)

const ContactPage = () => {
  const { isMobile } = useBreakpoint()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.message) setSubmitted(true)
  }

  const fade = (delay = 0) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  })

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} style={{ background: '#0A0A0A', padding: isMobile ? '120px 24px 80px' : '160px 80px 100px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="overline" style={{ marginBottom: 24, ...fade(0) }}>// CONTACT</div>
        <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', color: '#F4F4F2', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 24px', ...fade(100) }}>
          Let's talk.
        </h1>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 15, lineHeight: 1.9, color: 'rgba(244,244,242,0.4)', maxWidth: 500, margin: 0, letterSpacing: '0.02em', ...fade(200) }}>
          Whether you're a player, scout, club, or just curious — we want to hear from you.
        </p>
      </section>

      {/* ── Main content ── */}
      <section style={{
        background: 'var(--dark)',
        padding: isMobile ? '64px 24px' : '100px 80px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr',
        gap: isMobile ? 56 : 80,
        alignItems: 'start',
      }}>
        {/* Info column */}
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#F4F4F2', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            Get in touch.
          </h2>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.85, color: '#888884', margin: '0 0 40px', letterSpacing: '0.02em' }}>
            We typically respond within 24 hours. For urgent matters, reach us directly by email.
          </p>
          <InfoTile label="// EMAIL" value="hello@dribbl.io" />
          <InfoTile label="// PARTNERSHIPS" value="partners@dribbl.io" />
          <InfoTile label="// PRESS" value="press@dribbl.io" />
          <InfoTile label="// LOCATION" value="Toronto, Canada" />
          <div style={{ marginTop: 40 }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#FF0040', letterSpacing: '0.12em', marginBottom: 16 }}>// FOLLOW US</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Twitter / X', 'Instagram', 'LinkedIn'].map((s) => (
                <a key={s} href="#" style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#888884', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F4F4F2')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#888884')}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form column */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0 20px' }}>
                <Field label="// YOUR NAME" placeholder="First Last" value={form.name} onChange={set('name')} required />
                <Field label="// EMAIL ADDRESS" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} required />
              </div>
              <Field label="// SUBJECT" placeholder="What's this about?" value={form.subject} onChange={set('subject')} />
              <Field label="// MESSAGE" placeholder="Tell us what's on your mind..." value={form.message} onChange={set('message')} multiline required />

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                <TechBracket color="#FF0040" size={8}>
                  <button type="submit" className="btn-dark" style={{ padding: '13px 28px', fontSize: 12 }}>
                    Send Message
                  </button>
                </TechBracket>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                  We respond within 24h
                </span>
              </div>
            </form>
          ) : (
            <div style={{ padding: '40px 32px', border: '1px solid rgba(255,0,64,0.2)', background: 'rgba(255,0,64,0.03)' }}>
              <div className="overline" style={{ marginBottom: 16 }}>// MESSAGE RECEIVED</div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 26, color: '#F4F4F2', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
                We'll be in touch.
              </h3>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.85, color: '#888884', margin: 0, letterSpacing: '0.02em' }}>
                Thank you for reaching out, {form.name.split(' ')[0]}. Expect a response within 24 hours.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ContactPage
