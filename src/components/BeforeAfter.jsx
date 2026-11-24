import { useRef, useState } from 'react'
import { BEFORE_AFTER } from '../data'

function Comparison({ pair }) {
  const [position, setPosition] = useState(50)
  const drag = useRef(null)

  const stopDrag = event => {
    if (drag.current?.pointerId !== event.pointerId) return
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <figure className="comparison-card">
      <div className="comparison" style={{ '--split': `${position}%`, '--image-filter': pair.imageFilter }}>
        <img src={pair.after} alt={`Celebration space ${pair.id} after styling`} loading="lazy" draggable="false" />
        <img className="comparison-before" src={pair.before} alt={`Celebration space ${pair.id} before styling`} loading="lazy" draggable="false" />
        <div className="comparison-divider" aria-hidden="true"><span>↔</span></div>
        <button
          className="comparison-slider"
          type="button"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={position}
          aria-orientation="horizontal"
          onPointerDown={event => {
            if (!event.isPrimary || event.button !== 0) return
            drag.current = {
              pointerId: event.pointerId, x: event.clientX, y: event.clientY,
              position, width: event.currentTarget.parentElement.getBoundingClientRect().width,
              direction: null,
            }
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={event => {
            const gesture = drag.current
            if (!gesture || gesture.pointerId !== event.pointerId) return
            const dx = event.clientX - gesture.x
            const dy = event.clientY - gesture.y
            if (!gesture.direction) {
              if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return
              gesture.direction = Math.abs(dx) > Math.abs(dy) * 1.25 ? 'horizontal' : 'vertical'
            }
            if (gesture.direction !== 'horizontal') return
            setPosition(Math.round(Math.max(0, Math.min(100, gesture.position + dx / gesture.width * 100))))
          }}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onLostPointerCapture={() => { drag.current = null }}
          onKeyDown={event => {
            const values = {
              ArrowLeft: position - 1, ArrowDown: position - 1,
              ArrowRight: position + 1, ArrowUp: position + 1,
              PageDown: position - 10, PageUp: position + 10, Home: 0, End: 100,
            }
            if (!(event.key in values)) return
            event.preventDefault()
            setPosition(Math.max(0, Math.min(100, values[event.key])))
          }}
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
