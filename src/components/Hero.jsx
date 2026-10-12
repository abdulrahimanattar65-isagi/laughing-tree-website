import { useEffect, useRef, useState } from 'react'
import { ENTRANCE } from '../data'
import './Hero.css'

export default function Hero() {
  const [position, setPosition] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const touchStart = useRef(null)
  const autoplayTimer = useRef(null)
  const [manualRotation, setManualRotation] = useState(false)
  const count = ENTRANCE.length
  const active = ((position % count) + count) % count
  const move = direction => {
    window.clearTimeout(autoplayTimer.current)
    setManualRotation(true)
    setPosition(value => value + direction)
  }
  const goTo = index => {
    window.clearTimeout(autoplayTimer.current)
    setManualRotation(true)
    setPosition(value => {
      const current = ((value % count) + count) % count
      let distance = (index - current + count) % count
      if (distance > count / 2) distance -= count
      return value + distance
    })
  }

  useEffect(() => {
    if (hovered || focused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const stop = () => window.clearTimeout(autoplayTimer.current)
    const restart = () => {
      stop()
      if (document.hidden) return
      // Always wait a fresh three seconds; never catch up on hidden-tab time.
      autoplayTimer.current = window.setTimeout(() => {
        if (!document.hidden) {
          setManualRotation(false)
          setPosition(value => value + 1)
        }
      }, 3000)
    }

    restart()
    document.addEventListener('visibilitychange', restart)
    window.addEventListener('pagehide', stop)
    window.addEventListener('pageshow', restart)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', restart)
      window.removeEventListener('pagehide', stop)
      window.removeEventListener('pageshow', restart)
    }
  }, [hovered, focused, position])

  const offsetOf = index => {
    let offset = (index - active + count) % count
    if (offset > count / 2) offset -= count
    return offset
  }
  const current = ENTRANCE[active]

  return <header className="gallery-hero" data-light id="top" aria-label="Discover Laughing Tree">
    <div className="gallery-hero-intro">
      <span>Thoughtfully designed. Beautifully celebrated.</span>
      <a href="#contact">Begin your story <span aria-hidden="true">↗</span></a>
    </div>
    <div className="gallery-hero-stage" role="region" aria-roledescription="carousel" aria-label="Celebration experiences"
      onFocusCapture={event => setFocused(event.target.matches(':focus-visible'))}
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
      <div className="gallery-hero-track" style={{ '--rotation-duration': manualRotation ? '0.55s' : '1.2s' }}>
        {ENTRANCE.map((item, index) => {
          const offset = offsetOf(index)
          return <button key={item.id} type="button"
            className={'gallery-hero-card' + (index === active ? ' is-current' : '') + (Math.abs(offset) > 1 ? ' is-rear' : '')}
            style={{ '--angle': ((index - position) * 360 / count) + 'deg', '--distance': Math.abs(offset), '--card-scale': index === active ? 1.12 : 0.5 }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={() => goTo(index)} aria-hidden={Math.abs(offset) > 1} aria-label={'Preview ' + item.label} aria-pressed={index === active} tabIndex={index === active ? 0 : -1}>
            <img src={'/images/' + item.img + '.png'} alt={item.text} fetchPriority={index === 0 ? 'high' : 'auto'} draggable="false" />
            <span className="gallery-card-index" aria-hidden="true">0{index + 1}</span>
          </button>
        })}
      </div>
      <button type="button" className="gallery-side-select is-previous"
        aria-label={'Bring ' + ENTRANCE[(active - 1 + count) % count].label + ' to front'}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onClick={() => move(-1)} />
      <button type="button" className="gallery-side-select is-next"
        aria-label={'Bring ' + ENTRANCE[(active + 1) % count].label + ' to front'}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onClick={() => move(1)} />
      <h1 className="gallery-hero-title" aria-label="Laughing Tree — beautifully imagined celebrations">
        <span key={current.id} aria-hidden="true">{current.label}</span>
      </h1>
    </div>
    <div className="gallery-hero-footer">
      <div className="gallery-hero-description"><span className="gallery-hero-kicker">Your moments. Beautifully imagined.</span><p>{current.text}</p></div>
    </div>
  </header>
}
