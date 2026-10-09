import { useEffect, useRef, useState } from 'react'
import { ENTRANCE } from '../data'
import './Hero.css'

export default function Hero() {
  const [position, setPosition] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const touchStart = useRef(null)
  const count = ENTRANCE.length
  const active = ((position % count) + count) % count
  const move = direction => setPosition(value => value + direction)
  const goTo = index => {
    let distance = (index - active + count) % count
    if (distance > count / 2) distance -= count
    setPosition(value => value + distance)
  }

  useEffect(() => {
    if (paused || hovered || focused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setPosition(value => value + 1), 3000)
    return () => window.clearInterval(timer)
  }, [count, paused, hovered, focused, position])

  const offsetOf = index => {
    let offset = (index - active + count) % count
    if (offset > count / 2) offset -= count
    return offset
  }
  const current = ENTRANCE[active]

  return <header className="gallery-hero" id="top" aria-label="Discover Laughing Tree">
    <div className="gallery-hero-intro">
      <span>Thoughtfully designed. Beautifully celebrated.</span>
      <a href="#contact">Begin your story <span aria-hidden="true">↗</span></a>
    </div>
    <div className="gallery-hero-stage" role="region" aria-roledescription="carousel" aria-label="Celebration experiences"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
      onTouchStart={event => { touchStart.current = event.touches[0].clientX }}
      onTouchEnd={event => {
        if (touchStart.current === null) return
        const distance = event.changedTouches[0].clientX - touchStart.current
        if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1)
        touchStart.current = null
      }}>
      <div className="gallery-hero-track">
        {ENTRANCE.map((item, index) => {
          const offset = offsetOf(index)
          return <button key={item.id} type="button"
            className={'gallery-hero-card' + (index === active ? ' is-current' : '')}
            style={{ '--angle': ((index - position) * 360 / count) + 'deg', '--distance': Math.abs(offset), '--card-scale': index === active ? 1.12 : 0.5 }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={() => goTo(index)} aria-label={'Preview ' + item.label} aria-pressed={index === active}>
            <img src={'/images/' + item.img + '.png'} alt={item.text} fetchPriority={index === 0 ? 'high' : 'auto'} draggable="false" />
            <span className="gallery-card-index" aria-hidden="true">0{index + 1}</span>
          </button>
        })}
      </div>
      <h1 className="gallery-hero-title" aria-label="Laughing Tree — beautifully imagined celebrations">
        <span key={current.id} aria-hidden="true">{current.label}</span>
      </h1>
      <span className="gallery-hero-side" aria-hidden="true">Weddings & celebrations · Est. with love</span>
    </div>
    <div className="gallery-hero-footer">
      <div className="gallery-hero-description"><span className="gallery-hero-kicker">Your moments. Beautifully imagined.</span><p>{current.text}</p></div>
      <div className="gallery-hero-selector" aria-label="Choose an experience">
        {ENTRANCE.map((item, index) => <button type="button" key={item.id} className={index === active ? 'is-current' : ''}
          aria-pressed={index === active} onClick={() => goTo(index)}>{item.label}</button>)}
      </div>
      <a className="gallery-hero-explore" href={'#' + current.id}>Explore {current.label.toLowerCase()} <span aria-hidden="true">↗</span></a>
    </div>
    <div className="gallery-hero-bottom">
      <a href="#about-us">Scroll to discover <span aria-hidden="true">↓</span></a>
      <div className="gallery-hero-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous experience">←</button>
        <span className="gallery-hero-count">0{active + 1} <i>/ 0{count}</i></span>
        <button type="button" onClick={() => move(1)} aria-label="Next experience">→</button>
        <button type="button" className="gallery-hero-pause" onClick={() => setPaused(value => !value)}
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused}>{paused ? 'Play' : 'Pause'}</button>
      </div>
    </div>
  </header>
}
