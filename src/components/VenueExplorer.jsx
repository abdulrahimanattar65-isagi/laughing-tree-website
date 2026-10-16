import Reveal from './Reveal'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import VenueCube from './VenueCube'
import './VenueExplorer.css'

const venues = [
  { img: 'lt3', title: 'Garden celebrations', note: 'Open air · Floral · Unhurried' },
  { img: 'lt5', title: 'Terrace evenings', note: 'City views · Candlelight · Intimate' },
  { img: 'lt8', title: 'Grand halls', note: 'Statement entries · Draping · Scale' },
]

export default function VenueExplorer() {
  const [active, setActive] = useState(0)
  const section = useRef(null)
  const story = useRef(null)
  const [inView, setInView] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 })
    observer.observe(section.current)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])
  useEffect(() => {
    if (!inView || interacting || !pageVisible || reducedMotion) return
    const timer = window.setTimeout(() => setActive(index => (index + 1) % venues.length), 2500)
    return () => window.clearTimeout(timer)
  }, [active, inView, interacting, pageVisible, reducedMotion])
  useLayoutEffect(() => {
    if (reducedMotion) return
    const context = gsap.context(() => {
      gsap.fromTo(story.current.querySelector('p'),
        { clipPath: 'inset(0 0 100% 0)', rotationX: 8, transformOrigin: 'center bottom' },
        { clipPath: 'inset(0 0 0% 0)', rotationX: 0, duration: .8, delay: .25, ease: 'power2.out' })
    }, section.current)
    return () => context.revert()
  }, [active, reducedMotion])
  const stories = [
    { mood: 'Under the open sky', note: 'Open air · Floral · Unhurried', description: 'A canopy of green, a flower-lined aisle, and room for the day to unfold naturally. A little wild. Entirely romantic.' },
    { mood: 'A little closer to the stars', note: 'City views · Candlelight · Intimate', description: 'Gather your favourite people around candlelit tables. Soft florals, warm light, and an evening that feels beautifully your own.' },
    { mood: 'Make an entrance', note: 'Statement entries · Draping · Scale', description: 'Sweeping drapes, considered lighting, and flowers that fill the room with possibility. A setting for your grandest moments.' },
  ]
  return <section ref={section} className="venues venue-explorer" id="venues" aria-labelledby="venue-heading">
    <div className="venue-explorer-inner">
      <Reveal className="venue-collection-head"><span className="eyebrow">A setting for your story</span><span>Three moods. Endless possibilities.</span></Reveal>
      <div className="venue-experience"
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={event => { if (!event.currentTarget.contains(document.activeElement)) setInteracting(false) }}
        onFocusCapture={() => setInteracting(true)}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }}>
        <Reveal className="venue-visual">
          <div className="venue-arch-outline" aria-hidden="true" />
          <VenueCube active={active} venues={venues} stories={stories} reducedMotion={reducedMotion} />
          <div className="venue-collection-seal" aria-hidden="true"><span>Made for</span><i>your story</i><span>Laughing Tree</span></div>
        </Reveal>
        <Reveal className="venue-discovery">
          <h2 id="venue-heading">Find your<br /><em>somewhere.</em></h2>
          <p className="venue-discovery-intro">Not just a place. A feeling. Explore the setting that feels like the beginning of your story.</p>
          <div className="venue-choices" role="group" aria-label="Explore celebration settings" style={{ '--active-choice': active }}
            onKeyDown={event => {
              if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
              event.preventDefault()
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? venues.length - 1 : (active + (event.key === 'ArrowDown' ? 1 : -1) + venues.length) % venues.length
              event.currentTarget.querySelectorAll('button')[next].focus()
            }}>{venues.map((item, index) => <button type="button" key={item.title} className={'venue-choice' + (active === index ? ' is-selected' : '')} aria-pressed={active === index} aria-controls="venue-feature venue-story" onClick={() => setActive(index)} onFocus={() => setActive(index)} onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setActive(index) }}>
            <span className="venue-choice-number">0{index + 1}</span><span className="venue-choice-copy"><strong>{item.title}</strong><small>{stories[index].note}</small></span><span className="venue-choice-arrow" aria-hidden="true">↗</span>
          </button>)}</div>
          <div ref={story} className="venue-story" id="venue-story" aria-live={interacting ? 'polite' : 'off'} aria-atomic="true"><p key={active}>{stories[active].description}</p></div>
        </Reveal>
      </div>
      <Reveal className="venue-closing-note"><span aria-hidden="true">✧</span><p>You bring the dream. We bring the setting to life.</p><span aria-hidden="true">✧</span></Reveal>
    </div>
  </section>
}
