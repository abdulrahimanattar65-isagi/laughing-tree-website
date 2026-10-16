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
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [imageHovered, setImageHovered] = useState(false)
  const preview = hovered ?? focused ?? on
  const interacting = hovered !== null || focused !== null || imageHovered
  const section = useRef(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setPaused(motion.matches)
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
    if (paused || interacting || !inView || !pageVisible) return
    const timer = window.setTimeout(() => setOn(index => (index + 1) % DETAILS.length), 2500)
    return () => window.clearTimeout(timer)
  }, [on, selection, paused, interacting, inView, pageVisible])

  const select = index => {
    setOn(index)
    setSelection(value => value + 1)
  }
  return (
    <section ref={section} className={'details' + (interacting ? ' is-previewing' : '')} id="details" aria-labelledby="details-heading">
      <div className="pin">
        <div className="details-orbits" aria-hidden="true" style={{ '--orbit-phase': `${preview * 45}deg`, '--orbit-play': inView && pageVisible && !paused ? 'running' : 'paused' }}>
          <div className="details-orbit-position details-orbit-position--0">
            <div className="details-orbit-ring">
              {DETAILS.map((detail, index) => <div key={detail.name} className="details-orbit-photo" style={{ '--orbit-angle': `${index * 360 / DETAILS.length}deg` }}>
                <img src={`/images/${detail.img}.png`} alt="" loading="lazy" decoding="async" />
              </div>)}
            </div>
          </div>
        </div>
        <div className="d-list">
          <h2 id="details-heading">Little details.<br />Lasting memories.</h2>
          <ul onMouseLeave={() => setHovered(null)}>{DETAILS.map((d, k) => <li key={d.name}><button className={k === preview ? 'on' : ''} aria-pressed={k === on} aria-controls="details-preview" onClick={() => select(k)}
            onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setHovered(k) }}
            onFocus={() => setFocused(k)} onBlur={() => setFocused(null)}>{d.name}</button></li>)}</ul>
        </div>
        <figure className={'d-stage' + (interacting ? ' is-hovered' : '')} id="details-preview" aria-live={paused || interacting ? 'polite' : 'off'}
          onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setImageHovered(true) }} onMouseLeave={() => setImageHovered(false)}>
          {DETAILS.map((d, k) => <div key={d.name} className={'detail-photo' + (k === preview ? ' is-active' : '')} aria-hidden={k !== preview}><img src={`/images/${d.img}.png`} alt={d.name} loading="lazy" style={{ objectPosition: d.pos, '--z': d.z }} /></div>)}
          <figcaption key={preview} className="details-caption"><b>{DETAILS[preview].name}</b><span>{DETAILS[preview].text}</span></figcaption>
        </figure>
      </div>
    </section>
  )
}
