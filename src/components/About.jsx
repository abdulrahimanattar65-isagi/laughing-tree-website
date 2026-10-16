import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'
import AboutStats from './AboutStats'

gsap.registerPlugin(ScrollTrigger)
const FIRST_LINE = 'More than an event.'
const SECOND_LINE = 'A memory to hold onto.'

export default function About() {
  const section = useRef(null)
  const frame = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add({ desktop: '(min-width: 761px)', compact: '(max-width: 760px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      const { compact, reduced } = context.conditions
      if (reduced) return
      const element = frame.current
      const image = element.querySelector('.about-cinema-media')
      const words = element.querySelectorAll('.about-editorial-word')
      const heading = element.querySelector('.about-cinema-heading')
      const copy = element.querySelectorAll('.about-cinema-copy')
      const shade = element.querySelector('.about-cinema-shade')
      const width = () => element.clientWidth * (compact ? .62 : .32)
      gsap.set(image, { width, height: () => width() / (1672 / 941), borderRadius: 6 })
      gsap.set(heading, { autoAlpha: 0, y: -60 })
      gsap.set(copy, { autoAlpha: 0, y: 28 })
      gsap.set(shade, { opacity: 0 })
      gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        scrollTrigger: {
          id: 'about-cinematic', trigger: element,
          start: () => `top ${compact ? 84 : 86}px`,
          end: () => `+=${window.innerHeight * (compact ? 1.5 : 1.8)}`,
          pin: true, scrub: .8, anticipatePin: 1, invalidateOnRefresh: true,
        },
      })
        .to(image, { width: '100%', height: '100%', borderRadius: 0, duration: 2.2 }, 0)
        .to(words[0], { xPercent: -40, scale: 1.12, autoAlpha: 0, duration: 1.3 }, .15)
        .to(words[1], { xPercent: 40, scale: 1.12, autoAlpha: 0, duration: 1.3 }, .15)
        .to(shade, { opacity: 1, duration: 1.2 }, 1.1)
        .to(heading, { autoAlpha: 1, y: 0, duration: 1.1 }, 1.65)
        .to(copy, { autoAlpha: 1, y: 0, duration: .85, stagger: .18 }, 2.35)
        .to({}, { duration: .45 })
    }, section.current)
    // Font metrics and the incoming image may resolve after ScrollTrigger initializes.
    let disposed = false
    document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return <section ref={section} className="about about-cinematic" id="about-us" aria-labelledby="about-title">
    <div ref={frame} className="about-cinema">
      <span className="about-cinema-eyebrow">A little about us</span>
      <div className="about-cinema-media"><img src="/images/lt2.png" alt="Floral archway aisle" loading="eager" decoding="async" /><div className="about-cinema-shade" aria-hidden="true" /></div>
      <div className="about-editorial-word about-editorial-word--left" aria-hidden="true">{FIRST_LINE}</div>
      <div className="about-editorial-word about-editorial-word--right" aria-hidden="true">{SECOND_LINE}</div>
      <h2 id="about-title" className="about-cinema-heading"><span>{FIRST_LINE}</span><em>{SECOND_LINE}</em></h2>
      <p className="about-cinema-copy about-cinema-copy--left">Laughing Tree is a team of event planners, decorators and dreamers who believe a celebration should feel effortless for you and unforgettable for your guests.</p>
      <p className="about-cinema-copy about-cinema-copy--right">From the first mood board to the last fairy light, we design every corner of your event: mandaps, stages, entrances, tables and the small touches people remember for years.</p>
    </div>
    <div className="about-details">
      <img src="/images/lt9.png" alt="Wedding stage framed with flowers and pink drapes" loading="lazy" />
      <AboutStats />
    </div>
  </section>
}
