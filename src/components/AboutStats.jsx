import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 500, suffix: '+', label: 'Events styled' },
  { value: 100, suffix: '%', label: 'Custom design' },
  { value: 1, suffix: '', label: 'Team, start to finish' },
]

export default function AboutStats() {
  const container = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame
    let observer
    const finish = () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      setProgress(1)
    }
    const onMotionChange = () => { if (motion.matches) finish() }
    const start = () => {
      observer?.disconnect()
      const startedAt = performance.now()
      const tick = now => {
        const elapsed = Math.min((now - startedAt) / 1600, 1)
        setProgress(1 - Math.pow(1 - elapsed, 3))
        if (elapsed < 1) frame = window.requestAnimationFrame(tick)
      }
      frame = window.requestAnimationFrame(tick)
    }

    if (motion.matches || !('IntersectionObserver' in window)) {
      finish()
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start()
      }, { threshold: 0.4 })
      observer.observe(container.current)
    }
    motion.addEventListener('change', onMotionChange)
    return () => {
      observer?.disconnect()
      window.cancelAnimationFrame(frame)
      motion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <div className="stats" ref={container}>
    {STATS.map(({ value, suffix, label }) => <div key={label}>
      <b className="stat-count" aria-label={`${value}${suffix}`}>
        <span className="stat-count-space" aria-hidden="true">{value}{suffix}</span>
        <span aria-hidden="true">{Math.floor(value * progress)}{suffix}</span>
      </b>
      <small>{label}</small>
    </div>)}
  </div>
}
