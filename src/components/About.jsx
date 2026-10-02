import { useEffect, useRef } from 'react'
import Reveal from './Reveal'
const A = "WE DON'T JUST CREATE EVENTS.".split(' '), B = 'WE CREATE EXPERIENCES THAT STAY.'.split(' ')
export default function About() {
  const ref = useRef(null)
  useEffect(() => {
    const f = () => { const r = ref.current.getBoundingClientRect(); ref.current.style.setProperty('--p', Math.max(0, Math.min(1, (innerHeight * 0.8 - r.top) / (r.height * 0.8)))) }
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  const n = A.length + B.length
  const words = (arr, o) => arr.map((w, i) => <b className="w" key={i} style={{ '--k': (o + i) / n }}>{w} </b>)
  return (
    <section className="about" id="about-us" ref={ref} data-light>
      <h2 className="statement"><span>{words(A, 0)}</span><em>{words(B, A.length)}</em></h2>
      <div className="ab-grid">
        <div className="ab-left">
          <Reveal className="ab-img a"><img src="/images/m4.jpg" alt="Floral archway aisle" /></Reveal>
          <Reveal className="ab-img b"><img src="/images/h3.jpg" alt="Haldi decor with green drapes" /></Reveal>
        </div>
        <Reveal className="ab-copy">
          <p>Laughing Tree is a team of event planners, decorators and dreamers who believe a celebration should feel effortless for you and unforgettable for your guests.</p>
          <p>From the first mood board to the last fairy light, we design every corner of your event: mandaps, stages, entrances, tables and the small touches people remember for years.</p>
          <div className="stats">
            <div><b>500+</b><small>Events styled</small></div>
            <div><b>100%</b><small>Custom design</small></div>
            <div><b>1</b><small>Team, start to finish</small></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
