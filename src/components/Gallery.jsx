import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'
import { GALLERY } from '../data'
import './Gallery.css'
import './GalleryAlbum.css'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const [active, setActive] = useState(0)
  const experience = useRef(null)
  const viewport = useRef(null)
  const rail = useRef(null)
  const progress = useRef(null)
  const position = useRef({ phase: 0 })
  const transition = useRef(null)
  const scrollTrigger = useRef(null)
  const activeRef = useRef(0)
  const touchStart = useRef(null)
  const dialog = useRef(null)
  const isOpen = open !== null
  const selected = isOpen ? GALLERY[open] : null

  const updatePosition = amount => {
    if (!viewport.current || !rail.current) return
    const fraction = Math.max(0, Math.min(1, amount))
    progress.current?.style.setProperty('--portfolio-progress', fraction)
    const index = Math.round(fraction * (GALLERY.length - 1))
    const phase = fraction * (GALLERY.length - 1)
    const compact = window.innerWidth <= 760
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const height = viewport.current.clientHeight
    Array.from(rail.current.children).forEach((slide, photoIndex) => {
      const offset = photoIndex - phase
      const outgoing = Math.max(0, Math.min(1, -offset))
      const incoming = Math.max(0, Math.min(1, offset))
      const entrance = incoming ** 3
      const visible = reduced ? photoIndex === index : Math.abs(offset) < 1
      const scale = reduced ? 1 : 1 - outgoing * .78 - entrance * .72
      const x = reduced ? 0 : (-outgoing * .04 + entrance * .6) * viewport.current.clientWidth
      const y = reduced ? 0 : (-outgoing * (compact ? .01 : .04) + entrance * (compact ? .42 : .6)) * height
      slide.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
      slide.style.opacity = String(visible ? (reduced ? 1 : 1 - outgoing - entrance) : 0)
      slide.style.visibility = visible ? 'visible' : 'hidden'
      // Keep the incoming photo above the outgoing photo throughout the transition.
      slide.style.zIndex = String(photoIndex + 1)
      slide.style.pointerEvents = photoIndex === index ? 'auto' : 'none'
    })
    if (activeRef.current !== index) {
      activeRef.current = index
      setActive(index)
    }
  }

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add({ compact: '(max-width: 760px)', desktop: '(min-width: 761px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduced) {
        updatePosition(activeRef.current / (GALLERY.length - 1))
        return
      }
      position.current.phase = 0
      updatePosition(0)
      const container = experience.current
      const previousHeight = container.style.height
      const scrollDistance = () => (GALLERY.length - 1) * viewport.current.clientHeight * (context.conditions.compact ? .45 : .55)
      const measure = () => {
        container.style.height = `${viewport.current.clientHeight + scrollDistance()}px`
      }
      container.classList.add('is-scroll-driven')
      measure()
      const tween = gsap.to(position.current, {
        phase: 1,
        ease: 'none',
        onUpdate: () => updatePosition(position.current.phase),
        scrollTrigger: {
          id: 'portfolio-photo-transition',
          trigger: container,
          start: () => `top ${getComputedStyle(viewport.current).getPropertyValue('--portfolio-top').trim()}`,
          end: () => '+=' + scrollDistance(),
          scrub: .3,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
          onRefresh: () => updatePosition(position.current.phase),
        },
      })
      scrollTrigger.current = tween.scrollTrigger
      return () => {
        scrollTrigger.current = null
        container.classList.remove('is-scroll-driven')
        container.style.height = previousHeight
      }
    }, viewport.current)
    return () => {
      transition.current?.kill()
      media.revert()
    }
  }, [])

  const goTo = index => {
    const next = Math.max(0, Math.min(GALLERY.length - 1, index))
    const fraction = next / (GALLERY.length - 1)
    if (scrollTrigger.current) {
      const scroll = scrollTrigger.current
      window.scrollTo({ top: scroll.start + (scroll.end - scroll.start) * fraction, behavior: 'smooth' })
      return
    }
    transition.current?.kill()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      position.current.phase = fraction
      updatePosition(fraction)
      return
    }
    transition.current = gsap.to(position.current, {
      phase: fraction, duration: .9, ease: 'power2.inOut',
      onUpdate: () => updatePosition(position.current.phase),
    })
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
        <div><h2 id="gallery-title">Portfolio</h2><p className="gallery-subheading">A Collection of Beautiful Celebrations</p></div>
        <p className="gallery-intro">Every celebration tells a unique story. Explore our collection of beautifully planned weddings, stunning decorations, and unforgettable moments crafted with passion and creativity.</p>
      </Reveal>
      <div ref={experience} className="portfolio-experience">
        <div ref={viewport} className="portfolio-viewport" role="region" aria-roledescription="carousel" aria-label="Wedding portfolio. Scroll down for the next photo, scroll up for the previous photo, or use arrow keys." tabIndex={0}
          onTouchStart={event => {
            const touch = event.touches[0]
            touchStart.current = { x: touch.clientX, y: touch.clientY }
          }}
          onTouchEnd={event => {
            if (touchStart.current === null) return
            const distance = event.changedTouches[0].clientX - touchStart.current.x
            const verticalDistance = event.changedTouches[0].clientY - touchStart.current.y
            if (Math.abs(distance) > 50 && Math.abs(distance) > Math.abs(verticalDistance) * 1.25) goTo(activeRef.current + (distance < 0 ? 1 : -1))
            touchStart.current = null
          }}
          onTouchCancel={() => { touchStart.current = null }}
          onKeyDown={event => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault()
              goTo(active + (event.key === 'ArrowRight' ? 1 : -1))
            } else if (event.key === 'Home' || event.key === 'End') {
              event.preventDefault()
              goTo(event.key === 'Home' ? 0 : GALLERY.length - 1)
            }
          }}>
          <div ref={rail} className="portfolio-rail" role="list">
            {GALLERY.map(([path, alt], index) => <article className={'portfolio-slide' + (index === active ? ' is-active' : '')} key={path} role="listitem" aria-hidden={index !== active} aria-label={(index + 1) + ' of ' + GALLERY.length}>
              <button type="button" className="portfolio-photo" tabIndex={index !== active ? -1 : 0}
                aria-label={'Open photo: ' + alt} aria-haspopup="dialog" onClick={() => setOpen(index)}>
                <img className="portfolio-photo-image" src={'/images/' + path + '.png'} alt={alt} draggable="false" loading={index <= active + 1 ? 'eager' : 'lazy'} decoding="async" />
              </button>
            </article>)}
          </div>
          <div className="portfolio-caption" aria-live="off"><h3>{GALLERY[active][1]}</h3></div>
          <div ref={progress} className="portfolio-progress" aria-hidden="true"><span /></div>
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
        <div className="gallery-lightbox-navigation"><button onClick={() => move(-1)} aria-label="Previous photo">Previous</button><button onClick={() => move(1)} aria-label="Next photo">Next</button></div>
      </>}
    </dialog>
  </section>
}
