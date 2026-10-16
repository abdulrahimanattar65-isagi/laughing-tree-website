import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import './CoupleStories.css'

export default function CoupleStories() {
  const video = useRef(null)
  const manuallyPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const player = video.current
    if (!player) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const syncPlayback = () => {
      if (visible && !document.hidden && !motion.matches && !manuallyPaused.current) {
        player.play().catch(() => {})
      } else player.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    }, { threshold: .25 })
    observer.observe(player)
    motion.addEventListener('change', syncPlayback)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', syncPlayback)
      document.removeEventListener('visibilitychange', syncPlayback)
      player.pause()
    }
  }, [])

  const togglePlayback = () => {
    const player = video.current
    if (!player) return
    if (player.paused) {
      manuallyPaused.current = false
      player.play().catch(() => {})
    } else {
      manuallyPaused.current = true
      player.pause()
    }
  }

  return <section className="couple-stories couple-stories-film" id="stories" aria-labelledby="stories-heading">
    <Reveal><span className="eyebrow">The people behind the celebration</span><h2 id="stories-heading">Every love story<br />has its own <em>setting.</em></h2></Reveal>
    <div className="story-grid">
      <figure className="story-main story-film">
        {failed ? <img src="/images/lt2.png" alt="A floral pathway ready for a wedding celebration" loading="lazy" /> : <video
          ref={video}
          src="/images/video1.MP4"
          poster="/images/lt2.png"
          muted={muted}
          loop
          playsInline
          preload="none"
          aria-label="Laughing Tree celebration film"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        />}
        <div className="story-film-shade" aria-hidden="true" />
        <span className="story-film-label"><span aria-hidden="true" /> A Laughing Tree story</span>
        <figcaption><small>A feeling. A place. Forever.</small>For the moments<br /><em>that feel like you.</em></figcaption>
        {!failed && <div className="story-film-controls">
          <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause celebration film' : 'Play celebration film'} title={playing ? 'Pause' : 'Play'}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{playing ? <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></> : <path d="M8 4.5v15l12-7.5z" />}</svg>
          </button>
          <button type="button" onClick={() => setMuted(value => !value)} aria-label={muted ? 'Unmute celebration film' : 'Mute celebration film'} aria-pressed={!muted} title={muted ? 'Unmute' : 'Mute'}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4 6 8H3v8h3l5 4z" />
              {muted ? <path d="m16 9 6 6m0-6-6 6" /> : <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></>}
            </svg>
          </button>
        </div>}
      </figure>
      <Reveal className="story-note"><span className="story-mark">“</span><p>Some celebrations are grand and full of colour. Others are quiet, close, and all about the people in the room. We make space for both.</p><a className="lnk" href="#contact">Tell us your story</a></Reveal>
    </div>
  </section>
}
