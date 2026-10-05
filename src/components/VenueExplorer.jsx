import Reveal from './Reveal'

const venues = [
  { img: 'lt3', title: 'Garden celebrations', note: 'Open air · Floral · Unhurried' },
  { img: 'lt5', title: 'Terrace evenings', note: 'City views · Candlelight · Intimate' },
  { img: 'lt8', title: 'Grand halls', note: 'Statement entries · Draping · Scale' },
]

export default function VenueExplorer() {
  return <section className="venues" id="venues">
    <Reveal className="editorial-head"><span className="eyebrow">A setting for your story</span><h2>Find your<br /><em>somewhere.</em></h2><p>From garden vows to candlelit terraces, we shape the setting around the feeling you want to remember.</p></Reveal>
    <div className="venue-grid">{venues.map((v, i) => <a className="venue-card" href="#contact" key={v.title} data-cursor="Explore">
      <img src={`/images/${v.img}.png`} alt={v.title} loading="lazy" />
      <span className="venue-index">0{i + 1}</span><div><small>{v.note}</small><h3>{v.title}</h3><span className="venue-arrow">↗</span></div>
    </a>)}</div>
  </section>
}
