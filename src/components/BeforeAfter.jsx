import { useState } from 'react'
import { BEFORE_AFTER } from '../data'

function Comparison({ pair }) {
  const [position, setPosition] = useState(50)

  return (
    <figure className="comparison-card">
      <div className="comparison" style={{ '--split': `${position}%` }}>
        <img src={pair.after} alt={`Celebration space ${pair.id} after styling`} loading="lazy" draggable="false" />
        <img className="comparison-before" src={pair.before} alt={`Celebration space ${pair.id} before styling`} loading="lazy" draggable="false" />
        <span className="comparison-label before-label">Before</span>
        <span className="comparison-label after-label">After</span>
        <div className="comparison-divider" aria-hidden="true"><span>↔</span></div>
        <input
          className="comparison-slider"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={event => setPosition(Number(event.target.value))}
          aria-label={`Before and after comparison ${pair.id}`}
          aria-valuetext={`${position}% before, ${100 - position}% after`}
        />
      </div>
      <figcaption><span>Transformation {String(pair.id).padStart(2, '0')}</span><span>Slide to compare</span></figcaption>
    </figure>
  )
}

export default function BeforeAfter() {
  return (
    <section className="before-after" id="before-after" aria-labelledby="before-after-title">
      <div className="editorial-head">
        <span className="eyebrow">The transformation</span>
        <h2 id="before-after-title">Before <em>and after.</em></h2>
        <p>From a blank canvas to a celebration. Drag the slider to see each space come to life.</p>
      </div>
      <div className="comparison-grid">{BEFORE_AFTER.map(pair => <Comparison key={pair.id} pair={pair} />)}</div>
    </section>
  )
}
