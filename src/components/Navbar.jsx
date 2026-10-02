import { useEffect, useState } from 'react'
import { NAV } from '../data'
import Logo from './Logo'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [light, setLight] = useState(false)
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 30)
      setLight([...document.querySelectorAll('[data-light], .moodboards, .couple-stories')].some(section => {
        const rect = section.getBoundingClientRect()
        return rect.top <= 50 && rect.bottom > 50
      }))
    }
    update(); addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])
  return (
    <nav className={`${scrolled ? 'scrolled' : ''}${light ? ' nav-light' : ''}`}>
      <a href="#top" className="logo" aria-label="Laughing Tree home"><Logo /></a>
      <ul className="nav-links">{NAV.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
    </nav>
  )
}
