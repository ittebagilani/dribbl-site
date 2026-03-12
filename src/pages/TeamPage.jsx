import React, { useRef, useEffect, useState } from 'react'
import TechBracket from '../components/TechBracket'
import Footer from '../components/Footer'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useModal } from '../context/ModalContext'

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
        fontFamily: 'Inter',
        fontWeight: 800,
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
              <h3 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18, color: '#F4F4F2', letterSpacing: '-0.025em', margin: '0 0 4px' }}>
                {name}
              </h3>
              <div style={{ fontFamily: 'Manrope', fontSize: 10, color: '#FF0040', letterSpacing: '0.1em', marginBottom: 6 }}>
                {role}
              </div>
              <div style={{ fontFamily: 'Manrope', fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
                {university}
              </div>
            </div>
          </div>
          <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.85, color: 'rgba(244,244,242,0.65)', margin: 0, letterSpacing: '0.02em' }}>
            {bio}
          </p>
        </div>
      </TechBracket>
    </div>
  )
}

const team = [
  {
    name: 'Aruyan Puvanachandran',
    initials: 'AP',
    role: 'CEO',
    university: 'Toronto Metropolitan University · Computer Science',
    bio: 'TMU CS student and passionate soccer athlete focused on improving recruitment and building a national digital soccer community.',
    image: '/images/Aruyan.png',
  },
  {
    name: 'Azish Qureshi',
    initials: 'AZ',
    role: 'Founding Engineer · Lead Front-End',
    university: 'University of Guelph · Computer Science',
    bio: 'Guelph CS student leading the front-end and interested in reinventing soccer through technology.',
    image: '/images/Azish.jpeg',
  },
  {
    name: 'Akram Kai',
    initials: 'AK',
    role: 'Co-founder · CTO',
    university: 'University of Toronto · Computer Science',
    bio: 'U of T CS student passionate about disrupting the soccer industry through scalable product and infrastructure.',
    image: '/images/Akram.png',
  },
  {
    name: 'Areesh Khan',
    initials: 'AKH',
    role: 'Co-founder · Partnership Development',
    university: 'York Schulich School of Business · BBA',
    bio: 'Schulich BBA student focused on turning ideas into action through partnerships and go-to-market execution.',
    image: '/images/Areesh.png',
  },
  {
    name: 'Edris Adel',
    initials: 'EA',
    role: 'Co-founder · AI Development',
    university: 'Wilfrid Laurier University · Computer Science',
    bio: 'Wilfrid Laurier CS student learning AI and applying it to scouting, insights, and player development.',
    image: '/images/Edris.jpeg',
  },
  {
    name: 'Mohammed',
    initials: 'MO',
    role: 'Founding Engineer',
    university: 'Carleton University · Computer Science',
    bio: 'Carleton CS student and founding engineer focused on building reliable product foundations.',
    image: '/images/Mohamed.jpeg',
  },
  {
    name: 'Noor',
    initials: 'NO',
    role: 'Founding Engineer',
    university: 'University of Ottawa · Computer Science',
    bio: 'UOttawa CS student building core platform features and a smooth player experience.',
    image: '/images/Noor.jpeg',
  },
  {
    name: 'Taisho',
    initials: 'TA',
    role: 'Lead Digital Content Creator',
    university: 'Sheridan College · Film and Video',
    bio: 'Sheridan film and video student crafting storytelling and visual content for the Dribbl community.',
    image: '/images/Taisho.jpeg',
  },
]

const TeamPage = () => {
  const { isMobile } = useBreakpoint()
  const { openPositions } = useModal()

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: '#0A0A0A', padding: isMobile ? '120px 24px 80px' : '160px 80px 100px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="overline" style={{ marginBottom: 24 }}>// THE TEAM</div>
        <h1 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 72px)', color: '#F4F4F2', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 24px' }}>
          The People Behind Dribbl.
        </h1>
        <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.9, color: 'rgba(244,244,242,0.6)', maxWidth: 560, margin: 0, letterSpacing: '0.02em' }}>
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
          marginBottom: isMobile ? 12 : 16,
        }}>
          {team.map((m, i) => (
            <MemberCard key={m.name} {...m} index={i} />
          ))}
        </div>
        {/* Join CTA card */}
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? '32px 24px' : '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--dark)' }}>
          <div className="overline" style={{ marginBottom: 16 }}>// JOIN THE TEAM</div>
          <h3 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#F4F4F2', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            We're always looking for passionate people.
          </h3>
          <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.85, color: 'rgba(244,244,242,0.65)', margin: '0 0 28px', letterSpacing: '0.02em' }}>
            If you love soccer, AI, and creating opportunities for players worldwide,
            we'd love to hear from you.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <TechBracket color="#FF0040" size={8}>
              <button className="btn-dark" onClick={openPositions} style={{ padding: '10px 22px', fontSize: 11 }}>View Open Positions</button>
            </TechBracket>
            <a href="/contact" style={{ textDecoration: 'none' }}>
              <button className="btn-glass" style={{ padding: '10px 22px', fontSize: 11, fontFamily: 'Manrope' }}>Contact Us</button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default TeamPage
