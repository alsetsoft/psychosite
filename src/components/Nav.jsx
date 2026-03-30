'use client'
import { useState, useEffect } from 'react'
import PopupTrigger from './PopupTrigger'

export default function Nav({ content }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className="nav" style={scrolled ? { boxShadow: '0 2px 20px rgba(0,0,0,0.06)' } : {}}>
      <div className="nav-inner">
        <div className="nav-logo">{content.logo1} <em>{content.logo2}</em></div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>{content.link1}</a></li>
          <li><a href="#products" onClick={() => setMenuOpen(false)}>{content.link2}</a></li>
          <li><a href="#tv" onClick={() => setMenuOpen(false)}>{content.link3}</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>{content.link4}</a></li>
          <li><PopupTrigger className="nav-cta">{content.cta}</PopupTrigger></li>
        </ul>
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </div>
    </nav>
  )
}
