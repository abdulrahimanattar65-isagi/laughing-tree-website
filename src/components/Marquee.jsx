import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MARQUEE } from '../data'
import './Marquee.css'

export default function Marquee() {
  const root = useRef(null)
  const rail = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let visible = false
      const tween = gsap.to(rail.current, { xPercent: -50, duration: 38, repeat: -1, ease: 'none', paused: true })
      const sync = () => tween.paused(document.hidden || !visible)
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
      observer.observe(root.current)
      document.addEventListener('visibilitychange', sync)
      return () => {
        observer.disconnect()
        document.removeEventListener('visibilitychange', sync)
      }
    })
    return () => media.revert()
  }, [])

  return <div ref={root} className="occasion-strip motion-marquee" role="region" aria-label="Celebrations we design">
    <p className="marquee-accessible">{MARQUEE.join(', ')}</p>
    <div ref={rail} className="occasion-marquee-rail" aria-hidden="true">
      {[0, 1].map(copy => <div className="occasion-marquee-group" key={copy}>
        {MARQUEE.map(title => <span key={title}>{title}<i>&#10023;</i></span>)}
      </div>)}
    </div>
  </div>
}
