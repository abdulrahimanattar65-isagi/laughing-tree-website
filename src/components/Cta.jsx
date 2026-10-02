import Reveal from './Reveal'
export default function Cta() {
  const mv = e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--lx', e.clientX - r.left + 'px'); e.currentTarget.style.setProperty('--ly', e.clientY - r.top + 'px') }
  return (
    <section className="cta" onMouseMove={mv}>
      <img className="bg" src="/images/m6.jpg" alt="" />
      <Reveal className="cta-in">
        <h2><span>YOUR NEXT</span><em>UNFORGETTABLE MOMENT</em><span>STARTS HERE.</span></h2>
        <a href="#contact" className="cta-link">Begin your story <span aria-hidden="true">→</span></a>
      </Reveal>
    </section>
  )
}
