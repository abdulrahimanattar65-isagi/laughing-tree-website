import Reveal from './Reveal'

export default function FeaturedCelebration() {
  return <section className="featured" id="featured">
    <div className="featured-image"><img src="/images/m7.jpg" alt="Floral mandap surrounded by colour" loading="lazy" /></div>
    <Reveal className="featured-copy"><span className="eyebrow">Featured celebration · The wedding edit</span><h2>Colour in<br /><em>full bloom.</em></h2><p>A garden ceremony framed with layered florals, a glowing mandap and a joyful palette made for a day that felt entirely their own.</p><a className="btn" href="#gallery">Explore the gallery</a></Reveal>
  </section>
}
