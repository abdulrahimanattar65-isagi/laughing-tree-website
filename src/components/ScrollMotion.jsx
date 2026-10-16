import { useEffect } from 'react'
import './ScrollMotion.css'

// Animate existing content without adding wrappers around grids or sticky sections.
export default function ScrollMotion() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sections = [...document.querySelectorAll('section:not(.about):not(.portfolio-gallery), footer, .occasion-strip')]
    const revealTargets = []
    const mediaTargets = []
    sections.forEach(section => {
      const targets = section.querySelectorAll('.rv, .svc, .comparison-card, .before-after .editorial-head, .story-main, .d-list, .d-stage, .footer-contact, .foot-row, footer > .logo')
      const elements = targets.length ? [...targets] : [section]
      elements.forEach((element, index) => {
        element.dataset.scrollReveal = ''
        element.classList.add('scroll-motion')
        element.style.setProperty('--entrance-x', index % 2 === 0 ? '-12vw' : '12vw')
        element.style.setProperty('--entrance-delay', `${(index % 3) * 90}ms`)
        revealTargets.push(element)
      })
      section.querySelectorAll('.svc > img, .story-main > img, .mood-image > img, .album-backdrop, .cta > .bg').forEach(element => {
        element.dataset.scrollMedia = ''
        mediaTargets.push({ element, section })
      })
    })

    let observer
    let frame = 0
    const update = () => {
      frame = 0
      if (motion.matches) return
      const viewport = window.innerHeight
      // Read section positions together before writing styles.
      const positions = new Map(sections.map(section => [section, section.getBoundingClientRect()]))
      mediaTargets.forEach(({ element, section }) => {
        const { top, bottom, height } = positions.get(section)
        if (bottom < 0 || top > viewport) return
        const progress = Math.max(0, Math.min(1, (viewport - top) / (viewport + height)))
        element.style.setProperty('--media-shift', `${(progress - .5) * 24}px`)
      })
    }
    const schedule = () => {
      if (!frame && !motion.matches) frame = window.requestAnimationFrame(update)
    }
    const configure = () => {
      observer?.disconnect()
      window.cancelAnimationFrame(frame)
      frame = 0
      if (motion.matches || !('IntersectionObserver' in window)) {
        revealTargets.forEach(element => element.classList.add('is-scroll-visible'))
        mediaTargets.forEach(({ element }) => element.style.removeProperty('--media-shift'))
        return
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-scroll-visible')
          observer.unobserve(entry.target)
        })
      }, { threshold: 0, rootMargin: '0px 0px -6% 0px' })
      revealTargets.filter(element => !element.classList.contains('is-scroll-visible')).forEach(element => observer.observe(element))
      update()
    }
    configure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion.addEventListener('change', configure)
    return () => {
      observer?.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', configure)
      revealTargets.forEach(element => {
        delete element.dataset.scrollReveal
        element.classList.remove('scroll-motion', 'is-scroll-visible')
        element.style.removeProperty('--entrance-x')
        element.style.removeProperty('--entrance-delay')
      })
      mediaTargets.forEach(({ element }) => {
        delete element.dataset.scrollMedia
        element.style.removeProperty('--media-shift')
      })
    }
  }, [])
  return null
}
