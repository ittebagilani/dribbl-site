import React from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useModal } from '../context/ModalContext'
import TechBracket from '../components/TechBracket'
import Footer from '../components/Footer'

const NotFoundPage = () => {
  const { isMobile, isTablet } = useBreakpoint()
  const { openWaitlist } = useModal()

  return (
    <>
      <section style={{ background: 'var(--dark)', padding: isMobile ? '120px 24px 80px' : '160px 80px 120px', borderBottom: '1px solid var(--border-weak)' }}>
        <div className="overline" style={{ marginBottom: 24 }}>// 404</div>
        <h1 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(40px, 7vw, 96px)', color: 'var(--text)', letterSpacing: '-0.05em', lineHeight: 0.95, margin: '0 0 18px' }}>
          Page not found.
        </h1>
        <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 560, margin: '0 0 32px', letterSpacing: '0.02em' }}>
          The page you’re looking for doesn’t exist or has moved. Head back home or join the waitlist to stay in the loop.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <button className="btn-dark" style={{ padding: '12px 22px', fontSize: 11 }}>Back to Home</button>
          </a>
          <TechBracket color="#FF0040" size={8}>
            <button className="btn-glass" onClick={openWaitlist} style={{ padding: '12px 22px', fontSize: 11 }}>
              Join Waitlist
            </button>
          </TechBracket>
        </div>
      </section>

      <section style={{ background: 'var(--dark)', padding: isTablet ? '56px 24px' : '80px 80px' }}>
        <div style={{
          border: '1px solid rgba(255,255,255,0.08)',
          padding: isMobile ? '28px 24px' : '36px 40px',
          background: 'rgba(10,10,10,0.6)',
        }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#FF0040', letterSpacing: '0.16em', marginBottom: 14 }}>
            // QUICK LINKS
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              ['About', '/about'],
              ['Team', '/team'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default NotFoundPage
