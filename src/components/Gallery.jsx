import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { GALLERY } from '../data'
import './Gallery.css'
import './GalleryAlbum.css'

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const [active, setActive] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const track = useRef(null)
  const stage = useRef(null)
  const photos = useRef([])
  const activeRef = useRef(0)
  const dialog = useRef(null)
  const isOpen = open !== null
  const selected = isOpen ? GALLERY[open] : null

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const bounds = track.current.getBoundingClientRect()
      const stageHeight = stage.current.offsetHeight
      const travel = Math.max(1, bounds.height - stageHeight)
      const stickyTop = parseFloat(window.getComputedStyle(stage.current).top) || 0
      const position = reducedMotion ? activeRef.current : Math.max(0, Math.min(GALLERY.length - 1, (stickyTop - bounds.top) / travel * (GALLERY.length - 1)))
      const index = Math.round(position)
      const compact = window.innerWidth <= 760
      if (activeRef.current !== index) {
        activeRef.current = index
        setActive(index)
      }
      photos.current.forEach((photo, photoIndex) => {
        const offset = photoIndex - position
        const outgoing = Math.max(0, Math.min(1, -offset))
        const incoming = Math.max(0, Math.min(1, offset))
        const visible = offset >= -1.15 && offset <= 1.15
        const scale = reducedMotion ? 1 : 1 - outgoing * .78 - incoming * .72
        photo.style.setProperty('--photo-x', `${reducedMotion ? 0 : -outgoing * (compact ? 1 : 3) + incoming * 60}vw`)
        photo.style.setProperty('--photo-y', `${reducedMotion ? 0 : (-outgoing * (compact ? .01 : .04) + incoming * (compact ? .42 : .6)) * stageHeight}px`)
        photo.style.setProperty('--photo-scale', scale)
        photo.style.opacity = reducedMotion ? (photoIndex === index ? '1' : '0') : String(visible ? Math.min(1, (1.15 - Math.abs(offset)) / .15) : 0)
        photo.style.visibility = (reducedMotion ? photoIndex === index : visible) ? 'visible' : 'hidden'
        photo.style.zIndex = photoIndex === index ? '3' : '2'
        photo.style.pointerEvents = photoIndex === index ? 'auto' : 'none'
      })
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [reducedMotion, active])

  const goTo = index => {
    const next = Math.max(0, Math.min(GALLERY.length - 1, index))
    if (reducedMotion) {
      activeRef.current = next
      setActive(next)
      return
    }
    const bounds = track.current.getBoundingClientRect()
    const top = bounds.top + window.scrollY
    const travel = Math.max(0, bounds.height - stage.current.offsetHeight)
    const stickyTop = parseFloat(window.getComputedStyle(stage.current).top) || 0
    window.scrollTo({ top: top - stickyTop + travel * next / (GALLERY.length - 1), behavior: 'smooth' })
  }

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

  return <section className="gallery portfolio-gallery" id="gallery" aria-labelledby="gallery-title">
    <div className="gallery-inner">
      <Reveal className="gallery-heading">
        <div><p className="gallery-eyebrow">The celebration collection</p><h2 id="gallery-title">The moment<br /><em>everything changed.</em></h2></div>
        <p className="gallery-intro">Beautiful spaces. Thoughtful details. Memories that stay with you. Scroll through a few of our favourite celebrations.</p>
      </Reveal>
      <div ref={track} className={'gallery-scroll-track' + (reducedMotion ? ' is-reduced-motion' : '')} style={{ '--photo-count': GALLERY.length }}>
        <div ref={stage} className="gallery-scroll-stage" role="region" aria-label="Scroll through celebration photos" tabIndex={0}
          onKeyDown={event => {
            if (event.target !== event.currentTarget) return
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault()
              goTo(active + (event.key === 'ArrowRight' ? 1 : -1))
            }
          }}>
          <div className="gallery-scroll-label"><span>Laughing Tree / The celebration edit</span><span>Scroll to discover ↓</span></div>
          <div className="gallery-scroll-canvas">
            {GALLERY.map(([path, alt], index) => <button key={path} ref={element => { photos.current[index] = element }} type="button"
              className={'gallery-scroll-photo' + (index === active ? ' is-active' : '')}
              style={{ visibility: index === 0 ? 'visible' : 'hidden' }}
              tabIndex={index === active ? 0 : -1} aria-hidden={index !== active}
              aria-label={'Open photo: ' + alt} aria-haspopup="dialog" onClick={() => setOpen(index)}>
              <img src={`/images/${path}.png`} alt={alt} draggable="false" loading="lazy" decoding="async" />
              <span className="gallery-scroll-expand" aria-hidden="true">↗</span>
            </button>)}
          </div>
          <div className="gallery-scroll-copy" key={active}>
            <span className="gallery-scroll-eyebrow">Moments worth keeping</span>
            <h3>{GALLERY[active][1]}</h3>
            <p>Every celebration has a story.<br />Let us create yours.</p>
            <a href="#contact">Begin your story <span aria-hidden="true">↗</span></a>
          </div>
        </div>
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
        <div className="gallery-lightbox-toolbar"><button autoFocus onClick={() => setOpen(null)} aria-label="Close photo viewer">Close <span aria-hidden="true">×</span></button></div>
        <figure className="gallery-lightbox-photo"><img key={selected[0]} src={`/images/${selected[0]}.png`} alt={selected[1]} /><figcaption id="gallery-photo-caption" aria-live="polite">{selected[1]}</figcaption></figure>
        <div className="gallery-lightbox-navigation"><button onClick={() => move(-1)} aria-label="Previous photo">← <span>Previous</span></button><button onClick={() => move(1)} aria-label="Next photo"><span>Next</span> →</button></div>
      </>}
    </dialog>
  </section>
}
