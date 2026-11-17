import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { STEPS } from '../data'
import './Process.css'

const FLOW_STYLES = [
  { image: 'flow-chat', color: '#a05d43' },
  { image: 'flow-design', color: '#63764e' },
  { image: 'flow-create', color: '#987327' },
  { image: 'flow-celebrate', color: '#a45970' },
]

function ProcessIcon({ index }) {
  const drawings = [
    <g key="chat"><path d="M5 6h22v15H15l-7 6v-6H5z" /><path d="M18 25h7l6 5v-5h4V12h-4M11 12h10M11 16h7" /></g>,
    <g key="design"><path d="M8 8h17v6M25 27v7H8V8M12 29h9M12 24h5" /><path d="m17 22 3-8L30 4l6 6-10 10-9 2ZM28 6l6 6M20 14l6 6" /></g>,
    <g key="create"><path d="M5 34h30M8 34V17l12-9 12 9v17M8 17h24M14 34V22h12v12M20 8V3M20 3h8l-3 3h-5" /><path d="m3 12 2-3 2 3M32 8l2-3 2 3" /></g>,
    <g key="celebrate"><path d="m7 34 6-22 15 15L7 34ZM13 12l15 15M11 20l9 9M10 27l4 4M23 5l-2 6M31 9l-3 6M35 19l-6 1M16 4l1 3M34 30l-3-1" /><path d="m27 3 1 2 2 1-2 1-1 2-1-2-2-1 2-1ZM34 12l1 1M18 14l1 1" /></g>,
  ]
  return <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[index]}</svg>
}

export default function Process() {
  const stage = useRef(null)
  const [turn, setTurn] = useState(0)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [reduced, setReduced] = useState(false)
  const active = turn % STEPS.length

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    const observer = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting && entry.intersectionRatio >= .4
      if (!inView) setTurn(0)
      setVisible(inView)
    }, { threshold: [0, .4] })
    observer.observe(stage.current)
    return () => { observer.disconnect(); media.removeEventListener('change', update) }
  }, [])

  useEffect(() => {
    if (reduced || !visible || hovered) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setTurn(value => value + 1)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [reduced, visible, hovered])

  const pauseOnHover = event => {
    if (event.pointerType !== 'mouse') return
    setHovered(true)
    stage.current.getAnimations({ subtree: true }).forEach(animation => animation.pause())
  }

  const resumeOnLeave = () => {
    setHovered(false)
    stage.current.getAnimations({ subtree: true }).forEach(animation => {
      if (animation.playState === 'paused') animation.play()
    })
  }

  return <section className="process process-clock" id="process" style={{ '--flow-accent': FLOW_STYLES[active].color }} data-light data-clock-visible={visible} aria-labelledby="process-heading" onPointerEnter={pauseOnHover} onPointerLeave={resumeOnLeave} onPointerCancel={resumeOnLeave}>
    <Reveal className="process-clock-heading">
      <span className="eyebrow">Thoughtfully planned. Beautifully brought to life.</span>
      <h2 id="process-heading">From Idea to <em>Celebration</em></h2>
    </Reveal>
    <div ref={stage} className="process-clock-stage">
      <div className="process-clock-art" aria-hidden="true">
        {FLOW_STYLES.map(({ image }, index) => <img key={image} className={active === index ? 'is-active' : ''} src={`/images/${image}.jpg`} alt="" loading="lazy" decoding="async" />)}
      </div>
      <div className="process-clock-arc" aria-hidden="true" />
      <div className="process-clock-wheel" style={{ '--turn': `${-turn * 30}deg` }} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => {
          const distance = (index - turn % 12 + 18) % 12 - 6
          return <div key={index} className={`process-clock-spoke${distance === 0 ? ' is-active' : ''}`} style={{ '--angle': `${index * 30}deg`, '--step-color': FLOW_STYLES[index % STEPS.length].color, opacity: Math.abs(distance) > 2 ? 0 : undefined }}>
            <span className="process-clock-dot" />
            <span className="process-clock-number">0{index % STEPS.length + 1}</span>
          </div>
        })}
      </div>
      <div className="process-clock-copy" key={active}>
        <span className="process-clock-icon"><ProcessIcon index={active} /></span>
        <h3>{STEPS[active][0]}</h3>
        <span className="process-clock-subtitle">{STEPS[active][1]}</span>
        <p>{STEPS[active][2]}</p>
      </div>
    </div>
  </section>
}
