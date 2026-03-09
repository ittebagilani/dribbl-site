import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import WhyUsSection from './components/WhyUsSection'
import DemoSection from './components/DemoSection'
import WaitlistSection from './components/WaitlistSection'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'

/* ─────────────────────────────────────────────────────────
   Custom Cursor — white ring, mix-blend-mode:difference.
   Turns solid red on interactive elements.
   Hidden on touch devices.
───────────────────────────────────────────────────────── */
const CustomCursor = () => {
  const circleRef  = useRef(null)
  const posRef     = useRef({ x: -200, y: -200 })
  const targetRef  = useRef({ x: -200, y: -200 })
  const rafRef     = useRef(null)
  const pointerRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      pointerRef.current =
        el?.tagName === 'BUTTON' ||
        el?.tagName === 'A'      ||
        el?.tagName === 'INPUT'  ||
        el?.tagName === 'TEXTAREA' ||
        !!el?.closest('button')  ||
        !!el?.closest('a')
    }

    const loop = () => {
      const { x: px, y: py } = posRef.current
      const { x: tx, y: ty } = targetRef.current
      posRef.current = { x: px + (tx - px) * 0.13, y: py + (ty - py) * 0.13 }

      if (circleRef.current) {
        circleRef.current.style.transform =
          `translate(${posRef.current.x}px,${posRef.current.y}px) translate(-50%,-50%)`

        if (pointerRef.current) {
          circleRef.current.style.mixBlendMode = 'normal'
          circleRef.current.style.borderColor  = '#FF0040'
        } else {
          circleRef.current.style.mixBlendMode = 'difference'
          circleRef.current.style.borderColor  = '#ffffff'
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      ref={circleRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: '1.5px solid #ffffff',
        background: 'transparent',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
        transition: 'border-color 0.15s ease',
      }}
    />
  )
}

/* ── Scroll to top on route change ─────────────────── */
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ── Home page ─────────────────────────────────────── */
const HomePage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <WhyUsSection />
    <DemoSection />
    <WaitlistSection />
    <Footer />
  </>
)

/* ── App ────────────────────────────────────────────── */
const App = () => (
  <BrowserRouter>
    <CustomCursor />
    <Navbar />
    <main>
      <ScrollToTop />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/about"   element={<AboutPage />} />
        <Route path="/team"    element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
  </BrowserRouter>
)

export default App
