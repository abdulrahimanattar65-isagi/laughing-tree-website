import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import './Moodboards.css'

const boards = [
  { img: 'lt1', title: 'The marigold hour', palette: 'Saffron · Leaf · Sunlight', colors: ['#d49a38', '#63734e', '#f4dfab'], note: 'Joy, in full colour' },
  { img: 'lt2', title: 'A garden in bloom', palette: 'Blush · Ivory · Wild green', colors: ['#d9a5a5', '#f4eadb', '#75826a'], note: 'A little wild. Entirely yours.' },
  { img: 'lt5', title: 'After-dark romance', palette: 'Candlelight · Champagne · Plum', colors: ['#d2ad69', '#e6d8bc', '#6e4555'], note: 'When the lights turn golden' },
  { img: 'lt8', title: 'An evening in ivory', palette: 'Pearl · Rose · Soft gold', colors: ['#ede5d4', '#c99d97', '#b49a67'], note: 'Soft light, lasting memories' },
  { img: 'lt9', title: 'Flowers, everywhere', palette: 'Petal · Coral · Forest', colors: ['#e1b6ba', '#c97f6b', '#465e43'], note: 'For the beautifully bold' },
  { img: 'lt3', title: 'Under the open sky', palette: 'Sage · Linen · Garden green', colors: ['#a1ad8d', '#e8ddcb', '#546d47'], note: 'Room for a little wonder' },
]

export default function Moodboards() {
  const ribbon = useRef(null)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(!document.hidden)

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting)) : null
    if (observer) observer.observe(ribbon.current)
    else setInView(true)
    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  return <section className="moodboards mood-ribbon-section" id="moodboards" aria-labelledby="mood-title">
    <Reveal className="editorial-head">
      <span className="eyebrow">A first glimpse of the feeling</span>
      <h2 id="mood-title">Set the <em>mood.</em></h2>
      <p>Every celebration begins with a point of view. Find a colour, a feeling, a little spark of something that feels like you.</p>
    </Reveal>
    <div ref={ribbon} className="mood-ribbon-window" role="region" aria-label="Celebration moodboard inspiration">
      <div className="mood-ribbon-track" style={{ animationPlayState: inView && pageVisible ? 'running' : 'paused' }}>
        {[false, true].map(copy => <div key={String(copy)} className={'mood-ribbon-group' + (copy ? ' is-copy' : '')} aria-hidden={copy || undefined} inert={copy ? '' : undefined}>
          {boards.map((board, index) => <article key={board.img} className={'mood-ribbon-card mood-ribbon-card--' + index % 3}>
            <div className="mood-ribbon-card-top"><span aria-hidden="true">✳</span></div>
            <div className="mood-ribbon-photo"><img src={`/images/${board.img}.png`} alt={board.title} loading="lazy" draggable="false" /><span>{board.note}</span></div>
            <div className="mood-ribbon-swatches" aria-hidden="true">{board.colors.map(color => <i key={color} style={{ backgroundColor: color }} />)}<span>Made for your moment</span></div>
            <h3>{board.title}</h3><p>{board.palette}</p>
          </article>)}
        </div>)}
      </div>
    </div>
  </section>
}
