import { useEffect, useState } from 'react'
import { NAV } from '../data'
import Logo from './Logo'
import './Navbar.css'

export default function Navbar() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 80)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <nav aria-label="Main navigation" className={'centered-nav nav-light' + (compact ? ' is-compact' : '')}>
    <a href="#top" className="logo" aria-label="Laughing Tree home"><Logo /></a>
    <div className="nav-pill">
      <ul className="nav-links">{NAV.map(([id, label]) => <li key={id}><a href={'#' + id}>{label}</a></li>)}</ul>
    </div>
  </nav>
}
