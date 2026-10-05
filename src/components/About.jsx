import Reveal from './Reveal'

export default function About() {
  return (
    <section className="about" id="about-us" data-light>
      <Reveal className="about-heading">
        <span className="eyebrow">A little about us</span>
        <h2 className="statement">More than an event.<br/><em>A memory to hold onto.</em></h2>
      </Reveal>
      <div className="ab-grid">
        <div className="ab-left">
          <Reveal className="ab-img a"><img src="/images/lt2.png" alt="Floral archway aisle" loading="lazy" /></Reveal>
          <Reveal className="ab-img b"><img src="/images/lt9.png" alt="Wedding stage framed with flowers and pink drapes" loading="lazy" /></Reveal>
        </div>
        <Reveal className="ab-copy">
          <p>Laughing Tree is a team of event planners, decorators and dreamers who believe a celebration should feel effortless for you and unforgettable for your guests.</p>
          <p>From the first mood board to the last fairy light, we design every corner of your event: mandaps, stages, entrances, tables and the small touches people remember for years.</p>
          <div className="stats">
            <div><b>500+</b><small>Events styled</small></div>
            <div><b>100%</b><small>Custom design</small></div>
            <div><b>1</b><small>Team, start to finish</small></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
