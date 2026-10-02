import { useLayoutEffect, useRef, useState } from 'react'
import { ENTRANCE } from '../data'

const experiences = [['about-us','Our story'],['services','Celebrations'],['venues','Venues'],['gallery','Our work'],['before-after','Transformations'],['process','Our process'],['moodboards','Moodboards'],['featured','Featured celebration'],['stories','Couple stories'],['details','Design details'],['testimonial','Kind words'],['contact','Consultation']]

export default function Hero() {
  const [active, setActive] = useState(ENTRANCE.length - 1)
  const [frame, setFrame] = useState(null)
  const stageRef = useRef(null)
  const cardsRef = useRef([])
  const focusExperience = i => {
    setActive(i)
  }
  useLayoutEffect(() => {
    const stage = stageRef.current
    const measure = () => {
      const card = cardsRef.current[active]
      if (!card) return
      const bounds = stage.getBoundingClientRect()
      const rect = card.getBoundingClientRect()
      const width = rect.width * 5
      setFrame({ width, height: width * 808 / 1946,
        x: rect.left - bounds.left + rect.width / 2 - width * .665 })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    cardsRef.current.forEach(card => card && observer.observe(card))
    return () => observer.disconnect()
  }, [active])
  return <header className="celebration-hero" id="top">
    <div className="celebration-backdrops" aria-hidden="true">{ENTRANCE.map((item, i) => <img key={item.id} src={`/images/${item.img}.jpg`} alt="" className={active === i ? 'is-visible' : ''} fetchPriority={i === 2 ? 'high' : 'auto'}/>)}</div>
    <div className="celebration-content">
      <span className="eyebrow">Weddings · Celebrations · Beautiful details</span>
      <h1>Your moments.<br/><em>Beautifully imagined.</em></h1>
      <p>Thoughtful design, heartfelt celebrations, and memories that feel like you.</p>
      <a className="celebration-cta" href="#contact">Plan your celebration <span aria-hidden="true">↗</span></a>
    </div>
    <div className="celebration-explore">
      <p className="explore-caption">Discover Laughing Tree <span>Choose where your story begins</span></p>
      <div className="experience-stage" ref={stageRef} onMouseLeave={() => setActive(ENTRANCE.length - 1)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setActive(ENTRANCE.length - 1) }}>
        <div className="celebration-procession" aria-hidden="true" style={frame ? { width: frame.width, height: frame.height, transform: `translate3d(${frame.x}px, 0, 0)` } : undefined}>
          <div className="procession-window">{ENTRANCE.map((item, i) => <img key={item.id} src={`/images/${item.img}.jpg`} alt="" className={active === i ? 'is-visible' : ''} />)}</div>
          <img className="procession-artwork" src="/images/wedding-procession-pastel.png" alt="" width="1946" height="808" />
        </div>
        <div className="experience-links">{ENTRANCE.map((item, i) => <button type="button" key={item.id} ref={el => { cardsRef.current[i] = el }} className={`experience-card${active === i ? ' is-active' : ''}`} aria-label={`Preview ${item.label.toLowerCase()}`} aria-pressed={active === i} onMouseEnter={() => focusExperience(i)} onFocus={() => focusExperience(i)} onClick={() => focusExperience(i)}>
          <img className="experience-image" src={`/images/${item.img}.jpg`} alt="" loading="lazy"/>
        </button>)}</div>
      </div>
      <div className="experience-actions"><a className="experience-visit" href={`#${ENTRANCE[active].id}`}>Explore {ENTRANCE[active].label.toLowerCase()} <span aria-hidden="true">↗</span></a></div>
      <details className="experience-directory"><summary>All experiences <span aria-hidden="true">＋</span></summary><div>{experiences.map(([id,label]) => <a href={`#${id}`} key={id} onClick={e => e.currentTarget.closest('details').removeAttribute('open')}>{label} <span aria-hidden="true">↗</span></a>)}</div></details>
    </div>
  </header>
}
