import React, { useRef, useEffect, useState } from 'react'
import TechBracket from '../components/TechBracket'
import Footer from '../components/Footer'
import { useBreakpoint } from '../hooks/useBreakpoint'

/* ── Geometric avatar — unique per member ────────────── */
const Avatar = ({ initials, index, image }) => {
  const [imgError, setImgError] = useState(false)

  if (image && !imgError) {
    return (
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: '1px solid rgba(255,0,64,0.4)',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={image}
          alt={initials}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    )
  }

  const palettes = [
    { bg: '#0A0A0A', accent: '#FF0040', shape: 'diamond' },
    { bg: '#1A0008', accent: '#FF0040', shape: 'hexagon' },
    { bg: '#0A0A0A', accent: '#FF0040', shape: 'triangle' },
    { bg: '#1A0008', accent: '#FF0040', shape: 'cross' },
    { bg: '#0A0A0A', accent: '#FF0040', shape: 'circle' },
  ]
  const { bg, accent, shape } = palettes[index % palettes.length]

  const clipPaths = {
    diamond:  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    hexagon:  'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    triangle: 'polygon(50% 5%, 95% 90%, 5% 90%)',
    cross:    'polygon(33% 0%,67% 0%,67% 33%,100% 33%,100% 67%,67% 67%,67% 100%,33% 100%,33% 67%,0% 67%,0% 33%,33% 33%)',
    circle:   'none',
  }

  return (
    <div style={{
      width: 80,
      height: 80,
      borderRadius: shape === 'circle' ? '50%' : 0,
      background: bg,
      border: `1px solid ${accent}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        width: 48,
        height: 48,
        background: accent,
        opacity: 0.15,
        clipPath: clipPaths[shape] !== 'none' ? clipPaths[shape] : undefined,
        borderRadius: shape === 'circle' ? '50%' : undefined,
      }} />
      <span style={{
        fontFamily: 'Space Grotesk',
        fontWeight: 700,
        fontSize: 20,
        color: '#F4F4F2',
        letterSpacing: '-0.02em',
        position: 'relative',
        zIndex: 1,
      }}>
        {initials}
      </span>
    </div>
  )
}

/* ── Team member card ───────────────────────────────── */
const MemberCard = ({ name, role, university, bio, initials, index, image }) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
        height: '100%',
      }}
    >
      <TechBracket color={hovered ? '#FF0040' : 'rgba(255,0,64,0.25)'} size={10} style={{ display: 'block', height: '100%', transition: 'all 0.25s' }}>
        <div style={{
          padding: '32px 28px',
          background: hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
          border: '1px solid rgba(255,255,255,0.08)',
          transition: 'background 0.25s',
          height: '100%',
          boxSizing: 'border-box',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
            <Avatar initials={initials} index={index} image={image} />
            <div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18, color: '#F4F4F2', letterSpacing: '-0.025em', margin: '0 0 4px' }}>
                {name}
              </h3>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#FF0040', letterSpacing: '0.1em', marginBottom: 6 }}>
                {role}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
                {university}
              </div>
            </div>
          </div>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.85, color: '#888884', margin: 0, letterSpacing: '0.02em' }}>
            {bio}
          </p>
        </div>
      </TechBracket>
    </div>
  )
}

const team = [
  {
    name: 'Azish Qureshi',
    initials: 'AQ',
    role: 'Co-founder — CEO',
    university: 'University of Guelph · Computer Science',
    bio: 'Pursuing a Bachelor\'s in Computer Science at the University of Guelph. Interested in reinventing soccer through technology.',
    image: '/images/AzishQureshi.jpeg',
  },
  {
    name: 'Akram Klai',
    initials: 'AK',
    role: 'Co-founder — CTO',
    university: 'University of Toronto · Computer Science',
    bio: 'Pursuing a Bachelor\'s in Computer Science at the University of Toronto. Passionate about disrupting the soccer industry.',
  },
  {
    name: 'Aruyan Puvanachandran',
    initials: 'AP',
    role: 'Co-founder — Business Development',
    university: 'Toronto Metropolitan University · Computer Science',
    bio: 'Pursuing a Bachelor\'s in Computer Science at Toronto Metropolitan University. Passionate about building communities through technology.',
    image: '/images/Aruyan.HEIC',
  },
  {
    name: 'Areesh Khan',
    initials: 'AK',
    role: 'Co-founder — Partnership Development',
    university: 'York Schulich School of Business · BBA',
    bio: 'Pursuing a Bachelor of Business Administration at the York Schulich School of Business. Interested in turning ideas into action through business.',
  },
  {
    name: 'Edris Adel',
    initials: 'EA',
    role: 'Co-founder — AI Development',
    university: 'Wilfrid Laurier University · Computer Science',
    bio: 'Pursuing a Bachelor\'s in Computer Science at Wilfrid Laurier University. Learning AI and its applications in the world of sports.',
    image: '/images/EdrisAdel.jpeg',
  },
]

const TeamPage = () => {
  const { isMobile } = useBreakpoint()

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: '#0A0A0A', padding: isMobile ? '120px 24px 80px' : '160px 80px 100px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="overline" style={{ marginBottom: 24 }}>// THE TEAM</div>
        <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', color: '#F4F4F2', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 24px' }}>
          The People Behind Dribbl.
        </h1>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.9, color: 'rgba(244,244,242,0.4)', maxWidth: 560, margin: 0, letterSpacing: '0.02em' }}>
          A diverse team of soccer enthusiasts, tech innovators, and specialists united by
          one mission — ensuring no exceptional talent goes undiscovered.
        </p>
      </section>

      {/* ── Team grid ── */}
      <section style={{ background: 'var(--dark)', padding: isMobile ? '64px 24px' : '100px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 12 : 2,
          marginBottom: 2,
        }}>
          {team.slice(0, 4).map((m, i) => (
            <MemberCard key={m.name} {...m} index={i} />
          ))}
        </div>
        {/* 5th card centered */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 12 : 2,
          marginTop: isMobile ? 12 : 2,
        }}>
          <MemberCard {...team[4]} index={4} />
          {/* Join CTA card */}
          <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? '32px 24px' : '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--dark)' }}>
            <div className="overline" style={{ marginBottom: 16 }}>// JOIN THE TEAM</div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#F4F4F2', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              We're always looking for passionate people.
            </h3>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.85, color: '#888884', margin: '0 0 28px', letterSpacing: '0.02em' }}>
              If you love soccer, AI, and creating opportunities for players worldwide,
              we'd love to hear from you.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <TechBracket color="#FF0040" size={8}>
                <button className="btn-dark" style={{ padding: '10px 22px', fontSize: 11 }}>View Open Positions</button>
              </TechBracket>
              <a href="/contact" style={{ textDecoration: 'none' }}>
                <button className="btn-glass" style={{ padding: '10px 22px', fontSize: 11, fontFamily: 'JetBrains Mono' }}>Contact Us</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default TeamPage
