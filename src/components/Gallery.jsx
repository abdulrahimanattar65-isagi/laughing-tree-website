import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { GALLERY } from '../data'
import './Gallery.css'
export default function Gallery() {
  const [open, setOpen] = useState(null)
  const dialog = useRef(null)
  const isOpen = open !== null
  const selected = isOpen ? GALLERY[open] : null
  useEffect(() => {
    if (!isOpen) return
    const viewer = dialog.current
    const previousOverflow = document.body.style.overflow
    viewer.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      viewer.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])
  const move = direction => setOpen(index => (index + direction + GALLERY.length) % GALLERY.length)
  return (
    <section className="gallery portfolio-gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery-inner">
        <Reveal className="gallery-heading">
          <div>
            <p className="gallery-eyebrow">The celebration collection</p>
            <h2 id="gallery-title">The moment<br /><em>everything changed.</em></h2>
          </div>
          <p className="gallery-intro">Beautiful spaces. Thoughtful details. Memories that stay with you. Explore a few of our favourite celebrations.</p>
        </Reveal>
        <div className="gallery-grid">
          {GALLERY.map(([path, alt], index) => (
            <Reveal as="figure" className="gallery-card" key={path}>
              <button className="gallery-image" onClick={() => setOpen(index)} aria-label={`View ${alt}`} aria-haspopup="dialog" data-cursor="View">
                <img src={`/images/${path}.png`} alt={alt} loading="lazy" decoding="async" width="800" height="1000" />
                <span className="gallery-view" aria-hidden="true">View moment <span>↗</span></span>
              </button>
              <figcaption className="gallery-caption">
                <span className="gallery-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{alt}</h3>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <p className="gallery-footnote">Every celebration has a story. Let us create yours.</p>
      </div>
      <dialog ref={dialog} className="gallery-lightbox" aria-label="Celebration photo viewer" aria-describedby={selected ? 'gallery-photo-caption' : undefined}
        onCancel={() => setOpen(null)} onClose={() => setOpen(null)}
        onClick={event => { if (event.target === event.currentTarget) setOpen(null) }}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
        }}>
        {selected && <>
          <div className="gallery-lightbox-toolbar">
            <span aria-live="polite">{String(open + 1).padStart(2, '0')} / {String(GALLERY.length).padStart(2, '0')}</span>
            <button autoFocus onClick={() => setOpen(null)} aria-label="Close photo viewer">Close <span aria-hidden="true">×</span></button>
          </div>
          <figure className="gallery-lightbox-photo">
            <img key={selected[0]} src={`/images/${selected[0]}.png`} alt={selected[1]} />
            <figcaption id="gallery-photo-caption" aria-live="polite">{selected[1]}</figcaption>
          </figure>
          <div className="gallery-lightbox-navigation">
            <button onClick={() => move(-1)} aria-label="Previous photo">← <span>Previous</span></button>
            <button onClick={() => move(1)} aria-label="Next photo"><span>Next</span> →</button>
          </div>
        </>}
      </dialog>
    </section>
  )
}
