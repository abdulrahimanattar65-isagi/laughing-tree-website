import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

const STATS = [
  { value: 500, suffix: '+', label: 'Events styled' },
  { value: 100, suffix: '%', label: 'Custom design' },
  { value: 1, suffix: '', label: 'Team, start to finish' },
]

export default function AboutStats() {
  const container = useRef(null)
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const counters = container.current.querySelectorAll('[data-count]')
      const animation = gsap.timeline({ paused: true })
      counters.forEach((element, index) => {
        const count = { value: 0 }
        element.textContent = '0'
        animation.to(count, {
          value: Number(element.dataset.count), duration: 1.8, ease: 'power3.out',
          onUpdate: () => { element.textContent = String(Math.round(count.value)) },
        }, index * .1)
      })
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        animation.play()
        observer.disconnect()
      }, { threshold: .5 })
      observer.observe(container.current)
      return () => {
        observer.disconnect()
        counters.forEach(element => { element.textContent = element.dataset.count })
      }
    }, container.current)
    return () => media.revert()
  }, [])

  return <div className="stats" ref={container}>
    {STATS.map(({ value, suffix, label }) => <div key={label}>
      <b className="stat-count" aria-label={String(value) + suffix}>
        <span className="stat-count-space" aria-hidden="true">{value}{suffix}</span>
        <span aria-hidden="true"><span data-count={value}>{value}</span>{suffix}</span>
      </b>
      <small>{label}</small>
    </div>)}
  </div>
}
