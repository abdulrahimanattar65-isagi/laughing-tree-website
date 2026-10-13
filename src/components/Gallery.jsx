import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { GALLERY } from '../data'
import './Gallery.css'
import './GalleryAlbum.css'
export default function Gallery() {
  const [open, setOpen] = useState(null)
  const [albumIndex, setAlbumIndex] = useState(0)
  const [imageRatios, setImageRatios] = useState({})
  const [isPlaying, setIsPlaying] = useState(true)
  const touchStart = useRef(null)
  const suppressClickUntil = useRef(0)
  const turnPage = direction => setAlbumIndex(index => (index + direction + GALLERY.length) % GALLERY.length)
  const dialog = useRef(null)
  const isOpen = open !== null
  const selected = isOpen ? GALLERY[open] : null
  useEffect(() => {
    if (!isPlaying || isOpen) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setAlbumIndex(index => (index + 1) % GALLERY.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [isPlaying, isOpen, albumIndex])
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
        <Reveal className="gallery-album">
          <div className="album-backdrop" style={{ backgroundImage: `url(/images/${GALLERY[albumIndex][0]}.png)` }} aria-hidden="true" />
          <div className="album-label"><span aria-hidden="true">✧</span> The celebration album</div>
          <div className="album-stage" style={{ aspectRatio: imageRatios[GALLERY[albumIndex][0]] || 1672 / 941 }} role="region" aria-roledescription="carousel" aria-label="Celebration album" tabIndex={0}
            onKeyDown={event => {
              if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault()
                turnPage(event.key === 'ArrowRight' ? 1 : -1)
              }
            }}
            onTouchStart={event => { touchStart.current = event.touches[0].clientX }}
            onTouchCancel={() => { touchStart.current = null }}
            onTouchEnd={event => {
              if (touchStart.current === null) return
              const distance = event.changedTouches[0].clientX - touchStart.current
              if (Math.abs(distance) > 45) {
                suppressClickUntil.current = Date.now() + 400
                turnPage(distance < 0 ? 1 : -1)
              }
              touchStart.current = null
            }}>
            <div className="album-track" style={{ transform: `translateX(-${albumIndex * 100}%)` }}>
              {GALLERY.map(([path, alt], index) => <button type="button" key={path}
                className={'album-page' + (index === albumIndex ? ' is-current' : '')}
                tabIndex={index === albumIndex ? 0 : -1} aria-hidden={index !== albumIndex}
                aria-label={`Open photo ${index + 1}: ${alt}`} aria-haspopup="dialog"
                onClick={() => { if (Date.now() >= suppressClickUntil.current) setOpen(index) }}>
                <span className="album-photo">
                  <img src={`/images/${path}.png`} alt={alt} draggable="false" decoding="async"
                    onLoad={event => {
                      const { naturalWidth, naturalHeight } = event.currentTarget
                      if (naturalWidth && naturalHeight) setImageRatios(ratios => ({ ...ratios, [path]: naturalWidth / naturalHeight }))
                    }} />
                </span>
              </button>)}
            </div>
            <button className="album-stage-arrow album-stage-arrow--previous" type="button" onClick={() => turnPage(-1)} aria-label="Previous album photo">‹</button>
            <button className="album-stage-arrow album-stage-arrow--next" type="button" onClick={() => turnPage(1)} aria-label="Next album photo">›</button>
          </div>
          <div className="album-feature-copy" aria-hidden="true" key={albumIndex}>
            <h3>{GALLERY[albumIndex][1]}</h3>
            <i />
          </div>
          <div className="album-controls">
            <button type="button" className="album-playback" onClick={() => setIsPlaying(playing => !playing)} aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {isPlaying ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="M7 4v16l14-8z" />}
              </svg>
            </button>
          </div>
          <div className="album-dots" role="group" aria-label="Choose album photo">{GALLERY.map(([path, alt], index) => <button key={path} type="button" className={index === albumIndex ? 'is-current' : ''} onClick={() => setAlbumIndex(index)} aria-label={`Show photo ${index + 1}: ${alt}`} aria-pressed={index === albumIndex}><span /></button>)}</div>
        </Reveal>
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
