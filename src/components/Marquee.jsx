import { MARQUEE } from '../data'
export default function Marquee() {
  return <div className="occasion-strip" aria-label="Celebrations we design">{MARQUEE.map(t => <span key={t}>{t}</span>)}</div>
}
