import { useState } from 'react'
import { DETAILS } from '../data'
export default function Details() {
  const [on, setOn] = useState(0)
  return (
    <section className="details" id="details">
      <div className="pin">
        <div className="d-list">
          <h2>Little details.<br />Lasting memories.</h2>
          <ul>{DETAILS.map((d, k) => <li key={d.name}><button className={k === on ? 'on' : ''} aria-pressed={k === on} onClick={() => setOn(k)}>{d.name}</button></li>)}</ul>
        </div>
        <div className="d-stage">
          {DETAILS.map((d, k) => <figure key={d.name} className={k <= on ? 'in' : ''} style={{ zIndex: k }}><img src={`/images/${d.img}.jpg`} alt={d.name} loading="lazy" style={{ objectPosition: d.pos, '--z': d.z }} /></figure>)}
          <figcaption key={on}><b>{DETAILS[on].name}</b><span>{DETAILS[on].text}</span></figcaption>
        </div>
      </div>
    </section>
  )
}
