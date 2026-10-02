import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { GALLERY } from '../data'
export default function Gallery() {
  const [open, setOpen] = useState(null)
  useEffect(() => { const k = e => e.key === 'Escape' && setOpen(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  return (
    <section className="gallery" id="gallery">
      <Reveal as="h2">The moment<br /><em>everything changed.</em></Reveal>
      <div className="masonry">
        {GALLERY.map(([p, alt]) => (
          <figure key={p} onClick={() => setOpen(p)} data-cursor="View"><img src={`/images/${p}.jpg`} alt={alt} loading="lazy" /><figcaption>{alt}</figcaption></figure>
        ))}
      </div>
      <div className={`lb ${open ? 'on' : ''}`} onClick={() => setOpen(null)}>
        {open && <img src={`/images/${open}.jpg`} alt="" />}<span>Close</span>
      </div>
    </section>
  )
}
