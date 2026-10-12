import Reveal from './Reveal'

import { useState } from 'react'
import './VenueExplorer.css'

const venues = [
  { img: 'lt3', title: 'Garden celebrations', note: 'Open air · Floral · Unhurried' },
  { img: 'lt5', title: 'Terrace evenings', note: 'City views · Candlelight · Intimate' },
  { img: 'lt8', title: 'Grand halls', note: 'Statement entries · Draping · Scale' },
]

export default function VenueExplorer() {
  const [active, setActive] = useState(0)
  const stories = [
    { mood: 'Under the open sky', note: 'Open air · Floral · Unhurried', description: 'A canopy of green, a flower-lined aisle, and room for the day to unfold naturally. A little wild. Entirely romantic.' },
    { mood: 'A little closer to the stars', note: 'City views · Candlelight · Intimate', description: 'Gather your favourite people around candlelit tables. Soft florals, warm light, and an evening that feels beautifully your own.' },
    { mood: 'Make an entrance', note: 'Statement entries · Draping · Scale', description: 'Sweeping drapes, considered lighting, and flowers that fill the room with possibility. A setting for your grandest moments.' },
  ]
  return <section className="venues venue-explorer" id="venues" aria-labelledby="venue-heading">
    <div className="venue-explorer-inner">
      <Reveal className="venue-collection-head"><span className="eyebrow">A setting for your story</span><span>Three moods. Endless possibilities.</span></Reveal>
      <div className="venue-experience">
        <Reveal className="venue-visual">
          <div className="venue-arch-outline" aria-hidden="true" />
          <figure className="venue-feature" id="venue-feature">
            <div className="venue-photo-stack">{venues.map((item, index) => <img key={item.img} src={`/images/${item.img}.png`} alt={index === active ? item.title : ''} aria-hidden={index !== active} className={index === active ? 'is-selected' : ''} loading="lazy" decoding="async" />)}</div>
            <figcaption key={active} className="venue-photo-caption"><span>Imagine your day here</span><strong>{stories[active].mood}</strong></figcaption>
          </figure>
          <div className="venue-collection-seal" aria-hidden="true"><span>Made for</span><i>your story</i><span>Laughing Tree</span></div>
          <div className="venue-visual-footer"><span>THE SETTING COLLECTION</span><span>0{active + 1} / 03</span></div>
        </Reveal>
        <Reveal className="venue-discovery">
          <h2 id="venue-heading">Find your<br /><em>somewhere.</em></h2>
          <p className="venue-discovery-intro">Not just a place. A feeling. Explore the setting that feels like the beginning of your story.</p>
          <div className="venue-choices" role="group" aria-label="Explore celebration settings">{venues.map((item, index) => <button type="button" key={item.title} className={'venue-choice' + (active === index ? ' is-selected' : '')} aria-pressed={active === index} aria-controls="venue-feature venue-story" onClick={() => setActive(index)}>
            <span className="venue-choice-number">0{index + 1}</span><span className="venue-choice-copy"><strong>{item.title}</strong><small>{stories[index].note}</small></span><span className="venue-choice-arrow" aria-hidden="true">↗</span>
          </button>)}</div>
          <div className="venue-story" id="venue-story" aria-live="polite" aria-atomic="true"><p key={active}>{stories[active].description}</p></div>
          <a className="venue-enquire" href="#contact">Let’s find your setting <span aria-hidden="true">↗</span></a>
        </Reveal>
      </div>
      <Reveal className="venue-closing-note"><span aria-hidden="true">✧</span><p>You bring the dream. We bring the setting to life.</p><span aria-hidden="true">✧</span></Reveal>
    </div>
  </section>
}
