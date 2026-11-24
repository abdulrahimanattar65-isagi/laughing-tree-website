import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'
import AboutStats from './AboutStats'

gsap.registerPlugin(ScrollTrigger)
const FIRST_LINE = 'Laughing Tree Events'
const SECOND_LINE = 'Where Your Dream Wedding Comes to Life'

export default function About() {
  const section = useRef(null)
  const frame = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add({ desktop: '(min-width: 761px)', compact: '(max-width: 760px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      const { compact, reduced } = context.conditions
      if (reduced) return
      const element = frame.current
      if (compact) element.classList.add('is-scroll-animated')
      const image = element.querySelector('.about-cinema-media')
      const words = element.querySelectorAll('.about-editorial-word')
      const heading = element.querySelector('.about-cinema-heading')
      const copy = element.querySelectorAll('.about-cinema-copy')
      const shade = element.querySelector('.about-cinema-shade')
      const eyebrow = element.querySelector('.about-cinema-eyebrow')
      // Read rendered colours so the tween always receives concrete RGB values.
      const darkText = getComputedStyle(eyebrow).color
      const lightText = getComputedStyle(heading).color
      const initialWidth = compact ? '62%' : '32%'
      const initialHeight = () => (element.clientWidth || window.innerWidth) * (compact ? .62 : .32) / (1672 / 941)
      gsap.set(heading, { autoAlpha: 0, y: compact ? -30 : -60 })
      gsap.set(copy, { autoAlpha: 0, y: 28 })
      gsap.set(shade, { opacity: 0 })
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        scrollTrigger: {
          id: 'about-cinematic', trigger: element,
          start: () => `top ${compact ? 84 : 86}px`,
          end: () => `+=${compact ? element.clientHeight * 1.6 : window.innerHeight * 2.2}`,
          pin: true, scrub: 1.2, anticipatePin: 1, invalidateOnRefresh: true,
        },
      })
        .fromTo(image,
          { width: initialWidth, height: initialHeight, top: compact ? '43%' : '50%', borderRadius: 6, autoAlpha: 1 },
          { width: '100%', height: '100%', top: '50%', borderRadius: 0, duration: 2.2, ease: 'power2.inOut' }, 0)
        .to(words[0], { xPercent: -40, scale: 1.12, autoAlpha: 0, duration: 1.3 }, .15)
        .to(words[1], { xPercent: 40, scale: 1.12, autoAlpha: 0, duration: 1.3 }, .15)
        .to(shade, { opacity: 1, duration: 1.2 }, 1.1)
        .fromTo(eyebrow,
          { color: darkText },
          { color: lightText, opacity: 1, duration: 1.2 }, 1.1)
        .to(heading, { autoAlpha: 1, y: 0, duration: 1.1 }, 1.65)
        .to(copy, { autoAlpha: 1, y: 0, duration: .85, stagger: .18 }, 2.35)
        .to({}, { duration: compact ? .9 : .45 })
      if (compact) {
        timeline.fromTo(eyebrow,
          { top: () => words[0].offsetTop - words[0].offsetHeight / 2 - eyebrow.offsetHeight - 12 },
          { top: 16, duration: 2.2 }, 0)
      }
      return () => element.classList.remove('is-scroll-animated')
    }, section.current)
    // Font metrics and the incoming image may resolve after ScrollTrigger initializes.
    let disposed = false
    document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return <section ref={section} className="about about-cinematic" id="about-us" aria-labelledby="about-title">
    <div ref={frame} className="about-cinema">
      <span className="about-cinema-eyebrow">About Us</span>
      <div className="about-cinema-media"><img src="/images/lt2.png" alt="Floral archway aisle" width="1672" height="941" loading="eager" decoding="async" /><div className="about-cinema-shade" aria-hidden="true" /></div>
      <div className="about-editorial-word about-editorial-word--left" aria-hidden="true">{FIRST_LINE}</div>
      <div className="about-editorial-word about-editorial-word--right" aria-hidden="true">{SECOND_LINE}</div>
      <div className="about-cinema-content">
      <h2 id="about-title" className="about-cinema-heading"><span>{FIRST_LINE}</span><em>{SECOND_LINE}</em></h2>
      <p className="about-cinema-copy about-cinema-copy--left">At Laughing Tree, we specialize in turning your wedding day into a magical and unforgettable experience.</p>
      <p className="about-cinema-copy about-cinema-copy--right">From intimate ceremonies to grand celebrations, our dedicated team of wedding décor specialists and designers work closely with you…</p>
      </div>
    </div>
    <div className="about-details">
      <img src="/images/fingerprint-tree-guestbook.png" alt="A guest adding a fingerprint to the Laughing Tree wedding guestbook" loading="lazy" />
      <AboutStats />
    </div>
  </section>
}
