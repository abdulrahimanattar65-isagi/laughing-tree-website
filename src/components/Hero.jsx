import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import './Hero.css'

gsap.registerPlugin(Flip)

const SCENES = [
  { image: 'hero-garden-reception', src: '/images/Pastel Floral Mandap by the Infinity Pool.png', mobileSrc: '/images/Tropical Floral Wedding Canopy Over Water.png', label: 'Floral wedding mandap over water', title: ['Where Love', 'Blossoms.'], caption: ['Soft blooms above tranquil waters.'] },
  { image: 'hero-sunset-beach-arch', label: 'Sunset beach wedding', title: ['Love in the', 'Golden Light.'], caption: ['Blush blooms beneath a sunset sky.'] },
  { image: 'hero-garden-aisle', label: 'Ceremony details', title: ['Every Step,', 'Together.'], caption: ['A flower-lined aisle. A moment to remember.'] },
  { image: 'hero-seaside', src: '/images/Golden Hour Seaside Wedding Setup.png', label: 'Golden hour seaside wedding', title: ['Promises by', 'the Sea.'], caption: ['A little sea breeze. A lifetime of memories.'] },
]
const DURATION = 4000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(document.hidden)
  const [inView, setInView] = useState(true)
  const [splashActive, setSplashActive] = useState(() => document.documentElement.classList.contains('brand-splash-active'))
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const touchStart = useRef(null)
  const hero = useRef(null)
  const story = useRef(null)
  const selector = useRef(null)
  const circleState = useRef(null)
  const outgoingCircle = useRef(null)
  const running = inView && !focused && !hovered && !hidden && !reducedMotion && !splashActive
  const selectScene = index => {
    if (index === active) return
    if (!reducedMotion && selector.current) {
      circleState.current = Flip.getState(selector.current.querySelectorAll('.cinematic-thumbnail'))
      outgoingCircle.current = selector.current.querySelector('.cinematic-thumbnail.is-active')
    }
    setActive(index)
  }
  const move = direction => selectScene((active + direction + SCENES.length) % SCENES.length)
  const orderedScenes = SCENES.map((_, offset) => {
    const index = (active + offset) % SCENES.length
    return { item: SCENES[index], index }
  })

  useEffect(() => {
    const finishSplash = () => setSplashActive(false)
    window.addEventListener('brand-splash-done', finishSplash)
    // The splash can finish before this effect mounts (for example, on asset failure).
    if (!document.documentElement.classList.contains('brand-splash-active')) finishSplash()
    return () => window.removeEventListener('brand-splash-done', finishSplash)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updateVisibility = () => setHidden(document.hidden)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(hero.current)
    return () => {
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => move(1), DURATION)
    return () => window.clearTimeout(timer)
  }, [active, running])

  useLayoutEffect(() => {
    if (!circleState.current || reducedMotion) return
    const outgoing = outgoingCircle.current
    gsap.set(outgoing, { zIndex: 0 })
    const animation = Flip.from(circleState.current, {
      duration: 1,
      ease: 'power2.inOut',
      scale: true,
      onComplete: () => gsap.set(outgoing, { clearProps: 'zIndex,opacity' }),
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, y: 24, scale: .7 }, { opacity: 1, y: 0, scale: 1, duration: .7, ease: 'power2.out' }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: .7, duration: .3 }),
    })
    // Hide the wrapping thumbnail until it has reached its final slot.
    gsap.set(outgoing, { opacity: 0 })
    circleState.current = null
    return () => {
      animation.kill()
      gsap.set(outgoing, { clearProps: 'zIndex,opacity' })
    }
  }, [active, reducedMotion])

  useLayoutEffect(() => {
    if (reducedMotion) return
    const context = gsap.context(() => {
      gsap.fromTo('.cinematic-reveal', { y: 12 }, {
        y: 0, duration: .7, stagger: .06, ease: 'power2.out',
        clearProps: 'transform',
      })
    }, story.current)
    return () => context.revert()
  }, [active, reducedMotion])

  return <header ref={hero} className="cinematic-hero" id="top" aria-label="The Laughing Tree experience">
    <div className="cinematic-scenes" aria-hidden="true">
      {SCENES.map((item, index) => <div key={item.image} className={'cinematic-scene cinematic-scene--' + item.image + (active === index ? ' is-active' : '')}>
        <picture>
          {item.mobileSrc && <source media="(max-width: 760px)" srcSet={item.mobileSrc} />}
          <img src={item.src || '/images/' + item.image + '.png'} alt="" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" draggable="false" />
        </picture>
      </div>)}
    </div>
    <div className="cinematic-shade" aria-hidden="true" />
    <div className="cinematic-content" role="region" aria-roledescription="carousel" aria-label="Wedding venue photographs"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      onKeyDown={event => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        if (event.key === 'Home') selectScene(0)
        else if (event.key === 'End') selectScene(SCENES.length - 1)
        else move(event.key === 'ArrowRight' ? 1 : -1)
      }}
      onTouchStart={event => {
        const touch = event.touches[0]
        touchStart.current = { x: touch.clientX, y: touch.clientY }
      }}
      onTouchEnd={event => {
        if (!touchStart.current) return
        const touch = event.changedTouches[0]
        const x = touch.clientX - touchStart.current.x
        const y = touch.clientY - touchStart.current.y
        if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y)) move(x < 0 ? 1 : -1)
        touchStart.current = null
      }}
      onTouchCancel={() => { touchStart.current = null }}>
      <div ref={story} className="cinematic-story">
        <h1><span className="cinematic-reveal">{SCENES[active].title[0]}</span><em className="cinematic-reveal">{SCENES[active].title[1]}</em></h1>
        <p className="cinematic-subheading cinematic-reveal">{SCENES[active].caption[0]}</p>
        <a href="#about-us" className="cinematic-cta cinematic-reveal">Explore
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
      <div ref={selector} className="cinematic-selector" role="group" aria-label="Choose a venue photograph"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {orderedScenes.map(({ item, index }) => <button key={item.image} type="button" className={'cinematic-thumbnail' + (active === index ? ' is-active' : '')}
          aria-label={'Show ' + item.label} aria-pressed={active === index} onClick={() => selectScene(index)}>
          <picture>
            {item.mobileSrc && <source media="(max-width: 760px)" srcSet={item.mobileSrc} />}
            <img src={item.src || '/images/' + item.image + '.png'} alt="" draggable="false" />
          </picture>
          {active === index && <svg key={active + '-' + running} className="cinematic-progress" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" style={{ animationDuration: DURATION + 'ms', animationPlayState: running ? 'running' : 'paused' }} /></svg>}
        </button>)}
      </div>
    </div>
  </header>
}
