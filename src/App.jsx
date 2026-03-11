import React, { useEffect } from 'react'
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
