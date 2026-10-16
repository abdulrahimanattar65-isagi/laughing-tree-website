import Reveal from './Reveal'
import { STEPS } from '../data'
import './Process.css'
const ROMAN = ['I', 'II', 'III', 'IV']
const icons = [
  <><path d="M9 12h30v23H24l-9 8v-8H9z" /><path d="M18 21h12m-12 6h17" /></>,
  <><path d="m13 36 3-10L35 7l7 7-19 19-10 3Zm3-10 7 7M31 11l7 7M10 43h33" /><path d="m9 9 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z" /></>,
  <><path d="M8 39h34M13 39V23a13 13 0 0 1 26 0v16M19 39V23a7 7 0 0 1 14 0v16M9 23h34" /><path d="m25 5 2-4 2 4m-4 0-2-4-2 4" /></>,
  <><path d="m8 42 8-24 16 16-24 8Zm8-24 16 16M12 30l8 8M28 7l-3 10m18 5-10 3M35 15l7-7" /><path d="m14 7 2 3m27 28-4-1m-3-33 2 1M24 41l1 4" /></>,
]
export default function Process() {
  return (
    <section className="process process-illustrated" id="process" data-light>
      <svg className="process-background" viewBox="0 0 1440 500" fill="none" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
        <g stroke="currentColor" strokeWidth="1.2">
          <path d="M-50 440C180 100 340 550 580 300S1000 480 1510 100" strokeDasharray="3 10" />
          <g transform="translate(1300 40) rotate(25)"><path d="M0 300Q-75 100 0-90M-5 235q-95-30-85-105 70 12 85 105Zm-12-75q80-15 83-85-70 5-83 85Zm7-75q-70-30-58-90 55 15 58 90Zm12-64q70-10 66-70Q10-40 2 21Z" /><circle cx="0" cy="-80" r="24" /><circle cx="0" cy="-80" r="10" /></g>
          <g transform="translate(30 470) rotate(-35)"><path d="M0 120V-180M0-20q-75-10-70-80Q-10-85 0-20Zm0-70q65-10 65-75Q5-155 0-90ZM0 50q70-15 70-75Q8-15 0 50Z" /></g>
          <circle cx="1090" cy="80" r="68" /><circle cx="1155" cy="80" r="68" />
          <path d="m690 75 5 15 15 5-15 5-5 15-5-15-15-5 15-5Zm-350 320 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" />
        </g>
      </svg>
      <Reveal as="h2">From idea<br />to applause</Reveal>
      <div className="steps">
        {STEPS.map(([t, d], k) => <Reveal className="step" key={t}><svg className="process-step-icon" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{icons[k]}</svg><b>{ROMAN[k]}</b><h3>{t}</h3><p>{d}</p></Reveal>)}
      </div>
    </section>
  )
}
