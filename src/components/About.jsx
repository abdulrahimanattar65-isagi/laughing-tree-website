import Reveal from './Reveal'

import { useEffect, useRef, useState } from 'react'
import './About.css'
import AboutStats from './AboutStats'

const FIRST_LINE = 'More than an event.'
const SECOND_LINE = 'A memory to hold onto.'

export default function About() {
  const heading = useRef(null)
  const [typingStarted, setTypingStarted] = useState(false)
  const [visibleCharacters, setVisibleCharacters] = useState(0)
  const totalCharacters = FIRST_LINE.length + SECOND_LINE.length

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setTypingStarted(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTypingStarted(true)
        observer.disconnect()
      }
    }, { threshold: 0.4, rootMargin: '0px 0px -8% 0px' })
    observer.observe(heading.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCharacters(totalCharacters)
      return
    }
    if (!typingStarted) return
    let characters = 0
    const timer = window.setInterval(() => {
      characters += 1
      setVisibleCharacters(characters)
      if (characters >= totalCharacters) window.clearInterval(timer)
    }, 55)
    return () => window.clearInterval(timer)
  }, [typingStarted, totalCharacters])

  return (
    <section className="about" id="about-us" data-light>
      <Reveal className="about-heading">
        <span className="eyebrow">A little about us</span>
        <h2 ref={heading} className="statement about-typing"
          aria-label={`${FIRST_LINE} ${SECOND_LINE}`}>
          <span className="about-heading-space" aria-hidden="true">{FIRST_LINE}<br/><em>{SECOND_LINE}</em></span>
          <span className="about-heading-text" aria-hidden="true">
            {FIRST_LINE.slice(0, visibleCharacters)}<br/>
            <em>{SECOND_LINE.slice(0, Math.max(0, visibleCharacters - FIRST_LINE.length))}</em>
          </span>
        </h2>
      </Reveal>
      <div className="ab-grid">
        <Reveal className="ab-left">
          <div className="ab-img a"><img src="/images/lt2.png" alt="Floral archway aisle" loading="lazy" /></div>
          <div className="ab-img b"><img src="/images/lt9.png" alt="Wedding stage framed with flowers and pink drapes" loading="lazy" /></div>
        </Reveal>
        <Reveal className="ab-copy">
          <p>Laughing Tree is a team of event planners, decorators and dreamers who believe a celebration should feel effortless for you and unforgettable for your guests.</p>
          <p>From the first mood board to the last fairy light, we design every corner of your event: mandaps, stages, entrances, tables and the small touches people remember for years.</p>
          <AboutStats />
        </Reveal>
      </div>
    </section>
  )
}
