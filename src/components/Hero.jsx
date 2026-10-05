import { useState, useEffect } from 'react'
import { ENTRANCE } from '../data'

const experiences = [['about-us','Our story'],['services','Celebrations'],['venues','Venues'],['gallery','Our work'],['before-after','Transformations'],['process','Our process'],['moodboards','Moodboards'],['featured','Featured celebration'],['stories','Couple stories'],['details','Design details'],['testimonial','Kind words'],['contact','Consultation']]

export default function Hero() {
  const n = ENTRANCE.length
  const [active, setActive] = useState(n - 1)
  const [smokeKey, setSmokeKey] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const goTo = i => {
    if (i === active) return
    setActive(i)
    setSmokeKey(k => k + 1) // replays the smoke
  }

  // auto-rotate: each step moves the cards right to left
  useEffect(() => {
    if (isHovered) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      setActive(a => (a + 1) % n)
      setSmokeKey(k => k + 1)
    }, 3000)
    return () => clearInterval(t)
  }, [n, isHovered])

  // shortest circular distance from the focused card
  const offsetOf = i => {
    let d = (i - active + n) % n
    if (d > n / 2) d -= n
    return d
  }

  return <header className="celebration-hero" id="top">
    <div className="celebration-backdrops" aria-hidden="true">{ENTRANCE.map((item, i) => <img key={item.id} src={`/images/${item.img}.png`} alt="" className={active === i ? 'is-visible' : ''} fetchPriority={i === n - 1 ? 'high' : 'auto'}/>)}</div>

    {smokeKey > 0 && <div className="celebration-smoke" key={smokeKey} aria-hidden="true"><i/><i/><i/><i/><i/></div>}

    <div className="celebration-content">
      <span className="eyebrow">Weddings · Celebrations · Beautiful details</span>
      <h1>Your moments.<br/><em>Beautifully imagined.</em></h1>
      <p>Thoughtful design, heartfelt celebrations, and memories that feel like you.</p>
      <a className="celebration-cta" href="#contact">Plan your celebration <span aria-hidden="true">↗</span></a>
    </div>

    <div className="celebration-explore">
      <p className="explore-caption">Discover Laughing Tree <span>Choose where your story begins</span></p>
      <div className="experience-stage">
        <div className="experience-links"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>{ENTRANCE.map((item, i) => {
          const d = offsetOf(i), abs = Math.abs(d)
          return <button type="button" key={item.id}
            className={`experience-card${active === i ? ' is-active' : ''}${abs > 2 ? ' is-hidden' : ''}`}
            style={{ '--offset': d, '--abs': abs, zIndex: 10 - abs }}
            aria-label={`Preview ${item.label.toLowerCase()}`} aria-pressed={active === i}
            tabIndex={abs > 2 ? -1 : 0}
            onClick={() => goTo(i)}>
            <span className="experience-photo"><img className="experience-image" src={`/images/${item.img}.png`} alt="" loading="lazy"/></span>
          </button>
        })}</div>
      </div>
      <div className="experience-actions"><a className="experience-visit" href={`#${ENTRANCE[active].id}`}>Explore {ENTRANCE[active].label.toLowerCase()} <span aria-hidden="true">↗</span></a></div>
      <details className="experience-directory"><summary>All experiences <span aria-hidden="true">+</span></summary><div>{experiences.map(([id,label]) => <a href={`#${id}`} key={id} onClick={e => e.currentTarget.closest('details').removeAttribute('open')}>{label} <span aria-hidden="true">↗</span></a>)}</div></details>
    </div>
  </header>
}
