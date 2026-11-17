import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollMotion.css'

gsap.registerPlugin(ScrollTrigger)

// One scheduler; local cinematic timelines keep ownership of their stages.
export default function ScrollMotion() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    document.documentElement.classList.add('has-scroll-motion')
    media.add({ desktop: '(min-width: 761px)', compact: '(max-width: 760px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduced) return
      const compact = context.conditions.compact
      const focusCleanups = []
      const targets = gsap.utils.toArray('section:not(.about) .rv, .svc, .comparison-card, .before-after .editorial-head, .story-film, .footer-brand, .footer-links, .footer-bottom')
        .filter(element => !element.parentElement.closest('.rv'))
      targets.forEach((element, index) => {
        const children = element.matches('.editorial-head, .svc-head, .gallery-heading') ? [...element.children] : [element]
        const tween = gsap.from(children, {
          y: compact ? 22 : 42, opacity: 0, duration: 1.05,
          stagger: .12, ease: 'power3.out', delay: element.matches('.step') ? index % 4 * .06 : 0,
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        })
        const revealOnFocus = () => tween.progress(1)
        element.addEventListener('focusin', revealOnFocus)
        focusCleanups.push(() => element.removeEventListener('focusin', revealOnFocus))
      })
      // Individual translate preserves the existing hover scale on each image.
      const images = gsap.utils.toArray('.svc > img, .cta > .bg, .story-film > video, .story-film > img')
      images.forEach(image => {
        image.classList.add('parallax-media')
        gsap.fromTo(image, { '--parallax-y': compact ? '-2%' : '-4%' }, {
          '--parallax-y': compact ? '2%' : '4%', ease: 'none',
          scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: .8 },
        })
      })
      return () => {
        focusCleanups.forEach(cleanup => cleanup())
        images.forEach(image => image.classList.remove('parallax-media'))
      }
    })
    let disposed = false
    const refresh = () => { if (!disposed) ScrollTrigger.refresh() }
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh, { once: true })
    return () => {
      disposed = true
      window.removeEventListener('load', refresh)
      media.revert()
      document.documentElement.classList.remove('has-scroll-motion')
    }
  }, [])
  return null
}
