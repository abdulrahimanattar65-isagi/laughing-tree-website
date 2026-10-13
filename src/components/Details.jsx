import { useState } from 'react'
import { DETAILS } from '../data'
import { useEffect, useRef } from 'react'
import './Details.css'
export default function Details() {
  const [on, setOn] = useState(0)
  const [selection, setSelection] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const section = useRef(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => { if (motion.matches) setPaused(true) }
    updateMotion()
    motion.addEventListener('change', updateMotion)
    const updateVisibility = () => setPageVisible(!document.hidden)
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, { threshold: 0.15 }) : null
    if (observer) observer.observe(section.current)
    else setInView(true)
    return () => {
      observer?.disconnect()
      motion.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (paused || !inView || !pageVisible) return
    const timer = window.setTimeout(() => setOn(index => (index + 1) % DETAILS.length), 4000)
    return () => window.clearTimeout(timer)
  }, [on, selection, paused, inView, pageVisible])

  const select = index => {
    setOn(index)
    setSelection(value => value + 1)
  }
  return (
    <section ref={section} className="details" id="details" aria-labelledby="details-heading">
      <div className="pin">
        <div className="d-list">
          <h2 id="details-heading">Little details.<br />Lasting memories.</h2>
          <ul>{DETAILS.map((d, k) => <li key={d.name}><button className={k === on ? 'on' : ''} aria-pressed={k === on} aria-controls="details-preview" onClick={() => select(k)}>{d.name}</button></li>)}</ul>
        </div>
        <figure className="d-stage" id="details-preview" aria-live={paused ? 'polite' : 'off'}>
          {DETAILS.map((d, k) => <div key={d.name} className={'detail-photo' + (k === on ? ' is-active' : '')} aria-hidden={k !== on}><img src={`/images/${d.img}.png`} alt={d.name} loading="lazy" style={{ objectPosition: d.pos, '--z': d.z }} /></div>)}
          <figcaption key={on} className="details-caption"><b>{DETAILS[on].name}</b><span>{DETAILS[on].text}</span></figcaption>
        </figure>
      </div>
    </section>
  )
}
