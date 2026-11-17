import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import './Moodboards.css'

// Sample testimonials for the design; replace with approved client reviews.
const columns = [
  [{ img: 'testimonial-priya-rahul-mandap', alt: 'Wedding mandap for Priya and Rahul’s celebration', couple: 'Priya & Rahul', comment: 'We had a very good experience with Laughing Tree. The team was helpful throughout, and we could enjoy the wedding with our families.' }],
  [
    { img: 'testimonial-ananya-reception', alt: 'Wedding reception setting', couple: 'Ananya & Arjun', comment: 'They were easy to talk to and understood what we wanted. We felt comfortable with the team right from our first meeting.' },
    { img: 'testimonial-sneha-karan-haldi', alt: 'Haldi celebration setting', couple: 'Sneha & Karan', comment: 'Such a friendly and patient team. Whenever we had a doubt, they were there to help. Our families were very happy too.' },
  ],
  [
    { img: 'testimonial-meera-aditya-engagement', alt: 'Engagement celebration', couple: 'Meera & Aditya', comment: 'We were quite worried about planning everything, but working with them made it much easier. Really happy we chose Laughing Tree.' },
    { img: 'testimonial-ishita-rohan-sangeet', alt: 'Sangeet celebration', couple: 'Ishita & Rohan', comment: 'The whole experience was smooth, and the team kept us updated. We had a lovely time with our family and friends.' },
  ],
  [{ img: 'testimonial-nisha-vikram-destination', alt: 'Destination wedding celebration', couple: 'Nisha & Vikram', comment: 'We could count on them whenever we needed help. Thank you to the whole team for making this such a happy memory for us.' }],
]
const testimonials = columns.flat()

export default function Moodboards() {
  const section = useRef(null)
  const [active, setActive] = useState(0)
  const [rotating, setRotating] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let timer
    const sync = () => {
      window.clearInterval(timer)
      const enabled = mobile.matches && !motion.matches
      setRotating(enabled)
      if (enabled && visible && !document.hidden) {
        timer = window.setInterval(() => setActive(value => (value + 1) % testimonials.length), 5000)
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    observer.observe(section.current)
    mobile.addEventListener('change', sync)
    motion.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      window.clearInterval(timer)
      observer.disconnect()
      mobile.removeEventListener('change', sync)
      motion.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return <section ref={section} className="moodboards testimonials-mosaic" id="testimonials" aria-labelledby="testimonials-title">
    <div className="testimonials-composition">
      <Reveal className="testimonials-intro">
        <span className="eyebrow">Testimonials</span>
        <h2 id="testimonials-title">Love notes.<br /><em>Beautiful memories.</em></h2>
        <p>Every celebration has a story. A glimpse of the joy, the details, and the moments that stay with us.</p>
      </Reveal>
      <div className="testimonials-columns" aria-label="Wedding celebration memories">
        {columns.map((cards, index) => <div className={`testimonials-column testimonials-column--${index + 1}`} key={index}>
          {cards.map(card => <figure className="testimonials-photo" key={card.img}
            data-stack-position={(testimonials.indexOf(card) - active + testimonials.length) % testimonials.length}
            aria-hidden={rotating && testimonials.indexOf(card) !== active ? true : undefined}>
            <div className="testimonials-photo-media"><img src={`/images/${card.img}.png`} alt={card.alt} loading="lazy" decoding="async" /></div>
            <figcaption className="testimonials-photo-caption">
              <h3>{card.couple}</h3>
              <span className="testimonials-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span>
              <blockquote>{card.comment}</blockquote>
            </figcaption>
          </figure>)}
        </div>)}
      </div>
    </div>
  </section>
}
