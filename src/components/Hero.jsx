import { useEffect, useRef, useState } from 'react'
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export default function Hero() {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  const [clip, setClip] = useState(0)
  useEffect(() => { const t = setTimeout(() => setReady(true), still() ? 0 : 2300); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const h = ref.current, vs = h.querySelectorAll('video')
    if (!ready || still()) return
    const io = new IntersectionObserver(([e]) => vs.forEach(v => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())), { threshold: 0.05 })
    io.observe(h)
    return () => { io.disconnect(); vs.forEach(v => v.pause()) }
  }, [ready])
  useEffect(() => {
    const h = ref.current
    const sc = () => h.style.setProperty('--s', Math.min(scrollY / innerHeight, 1))
    const mv = e => { h.style.setProperty('--mx', e.clientX / innerWidth - 0.5); h.style.setProperty('--my', e.clientY / innerHeight - 0.5) }
    addEventListener('scroll', sc, { passive: true }); addEventListener('mousemove', mv)
    return () => { removeEventListener('scroll', sc); removeEventListener('mousemove', mv) }
  }, [])
  const clips = ['/hero-sequence-1.mp4', '/hero-sequence-2.mp4', '/hero-sequence-3.mp4']
  const vid = <video src={clips[clip]} muted playsInline autoPlay poster="/images/hero-poster.jpg" preload="auto" aria-hidden="true" onEnded={() => setClip(index => (index + 1) % clips.length)} />
  return (
    <header className={`hero${ready ? ' ready' : ''}`} id="top" ref={ref}>
      <div className="intro" aria-hidden="true"><div><span>Laughing Tree</span></div><i /></div>
      <div className="hero-video" aria-hidden="true">{vid}</div>
      <h1><span className="w w1"><b>Beautiful</b></span><span className="w w2"><b>celebrations</b></span></h1>
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-foot">
        <p>Thoughtfully imagined.<br />Beautifully brought to life.</p>
        <a href="#about-us" className="scroll" aria-label="Scroll to discover"><span>Scroll</span><i /></a>
        <div className="hero-links"><a href="#contact" className="lnk">Plan your event</a><a href="#gallery" className="lnk">View our work</a></div>
      </div>
    </header>
  )
}
