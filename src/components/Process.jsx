import Reveal from './Reveal'
import { STEPS } from '../data'
const ROMAN = ['I', 'II', 'III', 'IV']
export default function Process() {
  return (
    <section className="process" id="process" data-light>
      <Reveal as="h2">From idea<br />to applause</Reveal>
      <div className="steps">
        {STEPS.map(([t, d], k) => <Reveal className="step" key={t}><b>{ROMAN[k]}</b><h3>{t}</h3><p>{d}</p></Reveal>)}
      </div>
    </section>
  )
}
