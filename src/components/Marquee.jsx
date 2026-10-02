import { MARQUEE } from '../data'
export default function Marquee() {
  const row = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee"><div>
      {row.map((t, k) => <span key={k}><span>✦</span>{t}</span>)}
    </div></div>
  )
}
