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
      <div style={{ fontFamily: 'Manrope', fontSize: 10, color: focused ? 'var(--accent)' : 'var(--muted)', letterSpacing: '0.12em', marginBottom: 8, transition: 'color 0.2s' }}>
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
            fontFamily: 'Manrope',
            fontSize: 14,
            color: 'var(--text)',
          background: 'transparent',
          border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
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
  <div style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
    <div style={{ fontFamily: 'Manrope', fontSize: 10, color: '#FF0040', letterSpacing: '0.12em', marginBottom: 6 }}>{label}</div>
  <div style={{ fontFamily: 'Manrope', fontSize: 14, color: 'var(--text)', letterSpacing: '0.04em' }}>{value}</div>
  </div>
)

const ContactPage = () => {
  const { isMobile } = useBreakpoint()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef(null)

  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || ''

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!contactEndpoint) {
      setError('Contact endpoint is not configured.')
      return
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please complete the required fields.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const params = new URLSearchParams({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        source: 'contact-page',
        timestamp: new Date().toISOString(),
        cb: String(Date.now()),
      })

      const url = `${contactEndpoint}?${params.toString()}`

      // Use a no-cors request to avoid Apps Script CORS restrictions.
      await fetch(url, { method: 'GET', mode: 'no-cors', cache: 'no-store' })

      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const fade = (delay = 0) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  })

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} style={{ background: 'var(--dark)', padding: isMobile ? '120px 24px 80px' : '160px 80px 100px', borderBottom: '1px solid var(--border-weak)' }}>
        <div className="overline" style={{ marginBottom: 24, ...fade(0) }}>// CONTACT</div>
        <h1 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 72px)', color: 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 24px', ...fade(100) }}>
          Let's talk.
        </h1>
        <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 500, margin: 0, letterSpacing: '0.02em', ...fade(200) }}>
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
          <div className="stock-frame" style={{ height: isMobile ? 200 : 260, borderRadius: 18, marginBottom: 32 }}>
            <img
              className="stock-img"
              src="/images/stock/field-night.jpg"
              alt="Nighttime soccer field under lights"
            />
          </div>
          <h2 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(22px, 2.5vw, 32px)', color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            Get in touch.
          </h2>
          <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.85, color: 'var(--text-muted)', margin: '0 0 40px', letterSpacing: '0.02em' }}>
            We typically respond within 24 hours. For urgent matters, reach us directly by email.
          </p>
          <InfoTile label="// EMAIL" value="teamdribbl@gmail.com" />
          <InfoTile label="// LOCATION" value="Toronto, Canada" />
          <div style={{ marginTop: 40 }}>
            <div style={{ fontFamily: 'Manrope', fontSize: 10, color: '#FF0040', letterSpacing: '0.12em', marginBottom: 16 }}>// FOLLOW US</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/teamdribbl/' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/dribbl1/' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'Manrope', fontSize: 10, color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {s.label}
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
                  <button type="submit" className="btn-dark" style={{ padding: '13px 28px', fontSize: 12 }} disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </TechBracket>
                <span style={{ fontFamily: 'Manrope', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                  We respond within 24h
                </span>
              </div>
              {error && (
                <p style={{ fontFamily: 'Manrope', fontSize: 12, color: '#FF0040', letterSpacing: '0.04em', margin: '12px 0 0' }}>
                  {error}
                </p>
              )}
            </form>
          ) : (
            <div style={{ padding: '40px 32px', border: '1px solid rgba(255,0,64,0.2)', background: 'rgba(255,0,64,0.03)' }}>
              <div className="overline" style={{ marginBottom: 16 }}>// MESSAGE RECEIVED</div>
              <h3 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 26, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
                We'll be in touch.
              </h3>
              <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.85, color: 'var(--text-muted)', margin: 0, letterSpacing: '0.02em' }}>
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
