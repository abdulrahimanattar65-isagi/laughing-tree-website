import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const SCENES = [
  { image: 'lt2', title: ['Beautiful', 'beginnings.'], label: 'Wedding dreams', heading: 'A little magic. A lifetime of memories.', text: 'Thoughtfully imagined weddings, filled with flowers, light and everything that makes you, you.', link: 'Explore our celebrations', target: 'services' },
  { image: 'lt9', title: ['Moments made', 'extraordinary.'], label: 'Our creations', heading: 'Every detail tells your story.', text: 'From the first welcome to the last dance, we turn your inspiration into a world of its own.', link: 'Discover our work', target: 'gallery' },
  { image: 'lt3', title: ['Your perfect', 'somewhere.'], label: 'Beautiful settings', heading: 'Find a place to fall in love with.', text: 'Intimate gardens, grand celebrations and beautiful spaces, brought to life with a personal touch.', link: 'Find your setting', target: 'venues' },
]
const DURATION = 6000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [interacting, setInteracting] = useState(false)
  const [hidden, setHidden] = useState(document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const touchStart = useRef(null)
  const hero = useRef(null)
  const running = !interacting && !hidden && !reducedMotion
  const move = direction => setActive(value => (value + direction + SCENES.length) % SCENES.length)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updateVisibility = () => setHidden(document.hidden)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => move(1), DURATION)
    return () => window.clearTimeout(timer)
  }, [active, running])

  useEffect(() => {
    const element = hero.current
    if (reducedMotion) {
      element.style.removeProperty('--hero-scroll')
      element.style.removeProperty('--hero-progress')
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const { top, height } = element.getBoundingClientRect()
      const distance = Math.min(height, Math.max(0, -top))
      element.style.setProperty('--hero-scroll', `${distance}px`)
      element.style.setProperty('--hero-progress', distance / height)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [reducedMotion])

  const scene = SCENES[active]
  return <header ref={hero} className="cinematic-hero" id="top" aria-label="Discover Laughing Tree">
    <div className="cinematic-scenes" aria-hidden="true">
      {SCENES.map((item, index) => <div key={item.image} className={'cinematic-scene cinematic-scene--' + item.image + (active === index ? ' is-active' : '')}>
        <img src={'/images/' + item.image + '.png'} alt="" fetchPriority={index === 0 ? 'high' : 'auto'} draggable="false" />
      </div>)}
    </div>
    <div className="cinematic-shade" aria-hidden="true" />
    <div className="cinematic-content" role="region" aria-roledescription="carousel" aria-label="Celebration inspiration"
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }}
      onKeyDown={event => {
        if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return
        event.preventDefault()
        move(event.key === 'ArrowRight' ? 1 : -1)
      }}
      onTouchStart={event => { touchStart.current = event.touches[0].clientX }}
      onTouchEnd={event => {
        if (touchStart.current === null) return
        const distance = event.changedTouches[0].clientX - touchStart.current
        if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1)
        touchStart.current = null
      }}>
      <div className="cinematic-story" key={scene.image}>
        <p className="cinematic-eyebrow">Laughing Tree · Weddings & celebrations</p>
        <h1>{scene.title.map(line => <span key={line}>{line}</span>)}</h1>
        <div className="cinematic-caption">
          <h2>{scene.heading}</h2><p>{scene.text}</p>
          <a href={'#' + scene.target}>{scene.link}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="cinematic-selector" onMouseEnter={() => setInteracting(true)} onMouseLeave={event => { if (!event.currentTarget.contains(document.activeElement)) setInteracting(false) }}>
        {SCENES.map((item, index) => <button key={item.image} type="button" className={'cinematic-thumbnail' + (active === index ? ' is-active' : '')}
          aria-label={'Show ' + item.label} aria-pressed={active === index} onClick={() => setActive(index)}>
          <img src={'/images/' + item.image + '.png'} alt="" />
          <span className="cinematic-thumbnail-label">{item.label}</span>
          {active === index && <svg key={active + '-' + running} className="cinematic-progress" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" style={{ animationDuration: DURATION + 'ms', animationPlayState: running ? 'running' : 'paused' }} /></svg>}
        </button>)}
      </div>
    </div>
    <div className="cinematic-mist" aria-hidden="true" />
    <div className="cinematic-bottom">
      <div className="cinematic-bottom-heading"><span>Made with heart. Remembered forever.</span></div>
      <div className="celebration-bar">
        <a href="#services"><span className="celebration-bar-icon" aria-hidden="true">✧</span><span><strong>Your celebration</strong><small>Discover what we create</small></span></a>
        <a href="#venues"><span className="celebration-bar-icon" aria-hidden="true">⌖</span><span><strong>The perfect setting</strong><small>Explore our venues</small></span></a>
        <a href="#gallery"><span className="celebration-bar-icon" aria-hidden="true">▧</span><span><strong>A little inspiration</strong><small>Wander through our work</small></span></a>
        <a className="celebration-bar-cta" href="#contact"><span>Let’s dream together</span><span className="celebration-bar-arrow" aria-hidden="true">↗</span></a>
      </div>
      <a className="cinematic-scroll" href="#about-us">Discover Laughing Tree <span aria-hidden="true">↓</span></a>
    </div>
  </header>
}
