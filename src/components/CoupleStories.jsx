import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import './CoupleStories.css'

export default function CoupleStories() {
  const video = useRef(null)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const player = video.current
    if (!player) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const syncPlayback = () => {
      if (visible && !document.hidden && !motion.matches) {
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

  return <section className="couple-stories couple-stories-film" id="stories" aria-labelledby="stories-heading">
    <div className="story-heading">
      <Reveal><span className="eyebrow">The people behind the celebration</span><h2 id="stories-heading">Every love story<br />has its own <em>setting.</em></h2></Reveal>
      <svg className="story-botanical" viewBox="0 0 480 240" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <defs>
          <g id="story-leaf"><path d="M0 0C-28-8-36-30-29-48-8-40 3-21 0 0ZM0 0l-25-39" /></g>
          <g id="story-flower"><circle r="8" /><path d="M0-8C-20-32 20-32 0-8ZM7-4C18-33 38 1 7-4ZM7 4C38-1 18 33 7 4ZM0 8C20 32-20 32 0 8ZM-7 4C-18 33-38-1-7 4ZM-7-4C-38 1-18-33-7-4Z" /></g>
        </defs>
        <g opacity=".7">
          <circle cx="222" cy="119" r="48" /><circle cx="280" cy="119" r="48" />
          <circle cx="222" cy="119" r="43" /><circle cx="280" cy="119" r="43" />
        </g>
        <path d="M112 208C94 161 111 102 157 65M116 190C66 173 44 134 51 94M323 205C365 174 379 112 354 49M337 190C389 178 420 145 430 110" />
        <use href="#story-leaf" transform="translate(110 174) rotate(-18) scale(.8)" />
        <use href="#story-leaf" transform="translate(115 140) rotate(75) scale(.7)" />
        <use href="#story-leaf" transform="translate(133 96) rotate(105) scale(.65)" />
        <use href="#story-leaf" transform="translate(77 158) rotate(-35) scale(.65)" />
        <use href="#story-leaf" transform="translate(354 160) rotate(85) scale(.9)" />
        <use href="#story-leaf" transform="translate(363 120) rotate(-10) scale(.75)" />
        <use href="#story-leaf" transform="translate(375 178) rotate(140) scale(.7)" />
        <use href="#story-leaf" transform="translate(405 150) rotate(70) scale(.65)" />
        <use href="#story-flower" transform="translate(153 64) scale(.8)" />
        <use href="#story-flower" transform="translate(52 93) scale(.65)" />
        <use href="#story-flower" transform="translate(353 49) scale(.9)" />
        <use href="#story-flower" transform="translate(429 109) scale(.65)" />
        <path d="m246 40 3 8 8 3-8 3-3 8-3-8-8-3 8-3ZM195 200l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
      </svg>
    </div>
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
          onError={() => setFailed(true)}
        />}
        <div className="story-film-shade" aria-hidden="true" />
        <span className="story-film-label"><span aria-hidden="true" /> A Laughing Tree story</span>
        <figcaption><small>A feeling. A place. Forever.</small>For the moments<br /><em>that feel like you.</em></figcaption>
        {!failed && <div className="story-film-controls">
          <button type="button" onClick={() => setMuted(value => !value)} aria-label={muted ? 'Unmute celebration film' : 'Mute celebration film'} aria-pressed={!muted} title={muted ? 'Unmute' : 'Mute'}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4 6 8H3v8h3l5 4z" />
              {muted ? <path d="m16 9 6 6m0-6-6 6" /> : <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></>}
            </svg>
          </button>
        </div>}
      </figure>
      <Reveal className="story-note">
        <svg className="story-note-art story-note-art--invitation" viewBox="0 0 140 110" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <g transform="rotate(-9 70 55)"><path d="M19 39 70 9l51 30v60H19ZM19 39l42 30m18 0 42-30M19 99l36-31m30 0 36 31" /><path d="M37 51V24h66v27M49 35h42M54 43h32" /><circle cx="70" cy="71" r="13" /><path d="M70 77c-12-7-7-15 0-9 7-6 12 2 0 9Z" /></g>
        </svg>
        <span className="story-mark" aria-hidden="true">&#8220;</span>
        <p>Some celebrations are grand and full of colour. Others are intimate, personal, and filled with meaningful moments. We create beautiful spaces for both.</p>
        <a className="lnk story-contact-button" href="#contact">Tell us your story <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M3 12h18m-6-6 6 6-6 6" /></svg></a>
        <svg className="story-note-art story-note-art--sprig" viewBox="0 0 200 110" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M24 94C77 87 115 57 154 24M58 85C45 78 42 65 45 53c15 6 21 16 13 32ZM79 75c2-17 12-27 28-28-3 16-13 26-28 28ZM103 59c-15-4-23-16-22-29 16 3 25 14 22 29ZM125 43c1-14 10-24 23-26-1 14-9 23-23 26ZM44 90C39 77 27 72 16 75c3 12 13 18 28 15Z" />
          <g transform="translate(160 22)"><circle r="5" /><path d="M0-5C-11-22 11-22 0-5ZM5-2C17-15 23 6 5-2ZM3 4C21 8 5 24 3 4ZM-3 4C-5 24-21 8-3 4ZM-5-2C-23 6-17-15-5-2Z" /></g>
          <path d="m177 65 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
        </svg>
      </Reveal>
    </div>
  </section>
}
