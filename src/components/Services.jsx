import { useState } from 'react'
import Reveal from './Reveal'
import { SERVICES } from '../data'
export default function Services() {
  const [on, setOn] = useState(0)
  return (
    <section className="services" id="services">
      <Reveal className="svc-head"><h2>Events designed<br />for every occasion</h2><p>Tell us the moment. We'll shape the setting.</p></Reveal>
      <div className="svc-row">
        {SERVICES.map((s, k) => (
          <a href="#contact" key={s.title} className={`svc${on === k ? ' on' : ''}`} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)} data-cursor="Enquire">
            <img src={`/images/${s.img}.jpg`} alt={s.title} loading="lazy" />
            <span className="v">{s.title}</span>
            <div className="svc-in"><h3>{s.title}</h3><p>{s.text}</p></div>
          </a>
        ))}
      </div>
    </section>
  )
}
