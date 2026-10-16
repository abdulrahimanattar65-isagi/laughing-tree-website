import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function VenueCube({ active, venues, stories, reducedMotion }) {
  const viewport = useRef(null)
  const cube = useRef(null)
  const faces = useRef([])
  const controller = useRef(null)

  useLayoutEffect(() => {
    let current = active
    let desired = active
    let timeline = null
    let disposed = false
    const context = gsap.context(() => {}, viewport.current)
    const settle = index => {
      gsap.set(cube.current, { clearProps: 'transform' })
      faces.current.forEach((face, i) => gsap.set(face, {
        x: 0, z: 0, rotationY: 0, visibility: i === index ? 'visible' : 'hidden',
      }))
      viewport.current.classList.remove('is-rotating')
      current = index
    }
    const rotate = () => {
      if (disposed || timeline || desired === current) return
      const next = desired
      if (reducedMotion) {
        settle(next)
        return
      }
      const depth = viewport.current.clientWidth / 2
      if (!depth) { settle(next); return }
      const direction = (next - current + venues.length) % venues.length === 1 ? 1 : -1
      const outgoing = faces.current[current]
      const incoming = faces.current[next]
      const image = incoming.querySelector('img')
      // Hidden/lazy images can miss the first fold. Keep the current face until loaded.
      if (!image.complete || !image.naturalWidth) return
      context.add(() => {
        viewport.current.classList.add('is-rotating')
        gsap.set(cube.current, { z: -depth, rotationY: 0 })
        gsap.set(outgoing, { x: 0, z: depth, rotationY: 0, visibility: 'visible' })
        gsap.set(incoming, { x: direction * depth, z: 0, rotationY: direction * 90, visibility: 'visible' })
        timeline = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            settle(next)
            timeline = null
            rotate() // Finish the current fold before following a rapid selection.
          },
        })
          .to(cube.current, { rotationY: -direction * 90, duration: 1.15 }, 0)
          .fromTo(incoming.querySelector('img'), { scale: 1.045 }, { scale: 1, duration: 1.15, ease: 'power2.out' }, .1)
          .fromTo(incoming.querySelectorAll('.venue-photo-caption > *'),
            { clipPath: 'inset(0 0 100% 0)', rotationX: 12 },
            { clipPath: 'inset(0 0 0% 0)', rotationX: 0, duration: .65, stagger: .08, ease: 'power2.out' }, .4)
      })
    }
    context.add(() => settle(active))
    controller.current = index => { desired = index; rotate() }
    // Width changes alter cube depth; complete the fold before remeasuring.
    let width = viewport.current.clientWidth
    const resize = new ResizeObserver(() => {
      const nextWidth = viewport.current.clientWidth
      if (Math.abs(width - nextWidth) < 1) return
      width = nextWidth
      timeline?.progress(1)
    })
    resize.observe(viewport.current)
    return () => {
      disposed = true
      controller.current = null
      resize.disconnect()
      context.revert()
      viewport.current?.classList.remove('is-rotating')
    }
  }, [reducedMotion])

  useLayoutEffect(() => { controller.current?.(active) }, [active, reducedMotion])

  return <div ref={viewport} className="venue-feature venue-cube-viewport" id="venue-feature">
    <div className="venue-cube-sizer" aria-hidden="true">
      <div className="venue-photo-stack"><img src={`/images/${venues[active].img}.png`} alt="" loading="eager" decoding="async" /></div>
      <div className="venue-photo-caption"><span>Imagine your day here</span><strong>{stories[active].mood}</strong></div>
    </div>
    <div ref={cube} className="venue-cube">
      {venues.map((item, index) => <figure key={item.img} ref={element => { faces.current[index] = element }} className="venue-cube-face" aria-hidden={index !== active}>
        <div className="venue-photo-stack"><img src={`/images/${item.img}.png`} alt={item.title} loading="eager" decoding="async" onLoad={() => controller.current?.(active)} /></div>
        <figcaption className="venue-photo-caption"><span>Imagine your day here</span><strong>{stories[index].mood}</strong></figcaption>
      </figure>)}
    </div>
  </div>
}
