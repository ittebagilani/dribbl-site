import React from 'react'

/**
 * TechBracket - Precisely positioned L-shaped corner brackets.
 * Renders children inside four 1px bordered corner decorations.
 */
const TechBracket = ({
  children,
  color = '#FF0040',
  size = 14,
  thickness = 1,
  className = '',
  style = {},
  innerStyle = {},
  padding = 0,
}) => {
  const corner = (placement) => {
    const base = {
      position: 'absolute',
      width: size,
      height: size,
      pointerEvents: 'none',
    }
    const sides = {}
    const b = `${thickness}px solid ${color}`
    if (placement.includes('top'))    sides.borderTop    = b
    if (placement.includes('bottom')) sides.borderBottom = b
    if (placement.includes('left'))   sides.borderLeft   = b
    if (placement.includes('right'))  sides.borderRight  = b
    const pos = {}
    if (placement.includes('top'))    pos.top    = -thickness
    if (placement.includes('bottom')) pos.bottom = -thickness
    if (placement.includes('left'))   pos.left   = -thickness
    if (placement.includes('right'))  pos.right  = -thickness
    return { ...base, ...sides, ...pos }
  }

  return (
    <div
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
    >
      <span style={corner('top-left')} />
      <span style={corner('top-right')} />
      <span style={corner('bottom-left')} />
      <span style={corner('bottom-right')} />
      <div style={{ padding, height: style.height ? '100%' : undefined, boxSizing: 'border-box', ...innerStyle }}>{children}</div>
    </div>
  )
}

export default TechBracket
