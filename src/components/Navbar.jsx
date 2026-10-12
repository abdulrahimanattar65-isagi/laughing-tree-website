import { useEffect, useRef, useState } from 'react'
import { NAV } from '../data'
import Logo from './Logo'
import './Navbar.css'

export default function Navbar() {
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggle = useRef(null)
  const navigation = useRef(null)

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 80)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px)')
    const closeOnDesktop = () => { if (!mobile.matches) setMenuOpen(false) }
    mobile.addEventListener('change', closeOnDesktop)
    return () => mobile.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOutside = event => {
      if (!navigation.current?.contains(event.target)) setMenuOpen(false)
    }
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuToggle.current?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return <nav ref={navigation} aria-label="Main navigation" className={'centered-nav nav-light' + (compact ? ' is-compact' : '') + (menuOpen ? ' is-menu-open' : '')}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false) }}>
    <a href="#top" className="logo" aria-label="Laughing Tree home" onClick={() => setMenuOpen(false)}><Logo /></a>
    <button ref={menuToggle} type="button" className="nav-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-nav-links" onClick={() => setMenuOpen(open => !open)}>
      <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
    </button>
    <div className="nav-pill" id="main-nav-links">
      <ul className="nav-links">{NAV.map(([id, label]) => <li key={id}><a href={'#' + id} onClick={() => setMenuOpen(false)}>{label}</a></li>)}</ul>
    </div>
  </nav>
}
