import { useEffect, useState } from 'react'
import { NAV } from '../data'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30)
    update(); addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#top" className="logo">Laughing Tree</a>
      <ul className="nav-links">{NAV.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
    </nav>
  )
}
