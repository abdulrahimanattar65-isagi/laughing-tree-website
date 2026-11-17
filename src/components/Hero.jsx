import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { image: 'hero-garden-sea', title: ['A place', 'for forever.'], label: 'Garden romance', heading: 'An unforgettable setting for your story.', text: 'Quiet gardens, beautiful surroundings and moments that belong entirely to you.' },
  { image: 'hero-sunset-tree', title: ['Together', 'in golden light.'], label: 'Golden hour', heading: 'The beginning of a beautiful forever.', text: 'Celebrate your love with thoughtful planning and a setting that feels like you.' },
  { image: 'hero-garden-aisle', title: ['Every detail,', 'beautifully yours.'], label: 'Ceremony details', heading: 'A beautiful welcome to your next chapter.', text: 'From the ceremony aisle to the finishing touches, every detail is thoughtfully brought together.' },
  { image: 'hero-seaside', title: ['Promises', 'by the sea.'], label: 'Seaside celebrations', heading: 'A little breeze. A lifetime of memories.', text: 'Beautifully imagined celebrations, filled with light, love and unforgettable moments.' },
]
const DURATION = 6000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [interacting, setInteracting] = useState(false)
  const [hidden, setHidden] = useState(document.hidden)
  const [inView, setInView] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const touchStart = useRef(null)
  const hero = useRef(null)
  const running = inView && !interacting && !hidden && !reducedMotion
  const move = direction => setActive(value => (value + direction + SCENES.length) % SCENES.length)

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
    const element = hero.current
    const media = gsap.matchMedia()
    media.add({ desktop: '(min-width: 761px)', compact: '(max-width: 760px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduced) return
      const scenes = element.querySelector('.cinematic-scenes')
      gsap.fromTo(element.querySelector('.cinematic-curtain'), { scaleY: 1 }, {
        scaleY: 0, duration: 1.4, ease: 'power3.inOut',
      })
      gsap.fromTo(scenes, { clipPath: 'inset(8% 6% 8% 6%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'power3.inOut', clearProps: 'clipPath',
      })
      gsap.fromTo(element.querySelector('.cinematic-scroll'), { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, delay: .8, duration: 1.2, ease: 'power3.out',
      })
      gsap.timeline({ scrollTrigger: {
        trigger: element, start: 'top top', end: 'bottom top', scrub: .8,
      } })
        .to(scenes, { yPercent: context.conditions.compact ? 8 : 18, scale: 1.04, ease: 'none' }, 0)
        .to(element.querySelector('.cinematic-content'), { y: -60, opacity: 0, ease: 'none' }, 0)
    }, element)
    return () => media.revert()
  }, [])

  useLayoutEffect(() => {
    if (reducedMotion) return
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.cinematic-line > span', { yPercent: 110, duration: 1.15, stagger: .12 }, .25)
        .from('.cinematic-caption', { opacity: 0, y: 18, duration: .95, stagger: .12 }, .5)
    }, hero.current)
    return () => context.revert()
  }, [active, reducedMotion])

  const scene = SCENES[active]
  return <header ref={hero} className="cinematic-hero" id="top" aria-label="Discover Laughing Tree">
    <div className="cinematic-scenes" aria-hidden="true">
      {SCENES.map((item, index) => <div key={item.image} className={'cinematic-scene cinematic-scene--' + item.image + (active === index ? ' is-active' : '')}>
        <img src={item.src || '/images/' + item.image + '.png'} alt="" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" draggable="false" />
      </div>)}
    </div>
    <div className="cinematic-curtain" aria-hidden="true" />
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
        <h1>{scene.title.map(line => <span className="cinematic-line" key={line}><span>{line}</span></span>)}</h1>
      </div>
      <div className={'cinematic-selector' + (SCENES.length > 4 ? ' cinematic-selector--expanded' : '')} onMouseEnter={() => setInteracting(true)} onMouseLeave={event => { if (!event.currentTarget.contains(document.activeElement)) setInteracting(false) }}>
        {SCENES.map((item, index) => <button key={item.image} type="button" className={'cinematic-thumbnail' + (active === index ? ' is-active' : '')}
          aria-label={'Show ' + item.label} aria-pressed={active === index} onClick={() => setActive(index)}>
          <img src={item.src || '/images/' + item.image + '.png'} alt="" />
          <span className="cinematic-thumbnail-label">{item.label}</span>
          {active === index && <svg key={active + '-' + running} className="cinematic-progress" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" style={{ animationDuration: DURATION + 'ms', animationPlayState: running ? 'running' : 'paused' }} /></svg>}
        </button>)}
      </div>
    </div>
    <div className="cinematic-mist" aria-hidden="true" />
    <div className="cinematic-bottom">
      <div className="cinematic-caption" key={scene.image}>
        <h1 className="cinematic-mobile-title">{scene.title.map(line => <span className="cinematic-line" key={line}><span>{line}</span></span>)}</h1>
        <h2>{scene.heading}</h2><p>{scene.text}</p>
      </div>
      <a className="cinematic-scroll" href="#about-us">Discover Laughing Tree <span aria-hidden="true">↓</span></a>
    </div>
  </header>
}
