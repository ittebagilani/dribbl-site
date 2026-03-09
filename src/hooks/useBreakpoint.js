import { useState, useEffect } from 'react'

export const useBreakpoint = () => {
  const [width, setWidth] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth : 1200),
  )

  useEffect(() => {
    const handle = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handle, { passive: true })
    return () => window.removeEventListener('resize', handle)
  }, [])

  return {
    isMobile: width < 768,
    isTablet: width < 1024,
    width,
  }
}
