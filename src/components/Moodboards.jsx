import Reveal from './Reveal'

const boards = [
  { img: 'h6', title: 'The marigold hour', palette: 'Saffron · Leaf · Sunlight', number: '01' },
  { img: 'm11', title: 'A garden in bloom', palette: 'Blush · Ivory · Wild green', number: '02' },
  { img: 'd-candle', title: 'After-dark romance', palette: 'Candlelight · Champagne · Plum', number: '03' },
]

export default function Moodboards() {
  return <section className="moodboards" id="moodboards">
    <Reveal className="editorial-head"><span className="eyebrow">A first glimpse of the feeling</span><h2>Set the <em>mood.</em></h2><p>Every celebration begins with a point of view. Explore a few palettes to start imagining yours.</p></Reveal>
    <div className="mood-grid">{boards.map(b => <Reveal className="mood-card" key={b.number}><div className="mood-image"><img src={`/images/${b.img}.jpg`} alt="" loading="lazy" /><span>{b.number}</span></div><h3>{b.title}</h3><p>{b.palette}</p></Reveal>)}</div>
  </section>
}
