import Logo from './Logo'
import { CONTACT } from '../data'
import './Footer.css'

export default function Footer() {
  const phone = CONTACT.phone.replace(/\s/g, '')
  return <footer className="site-footer">
    <svg className="footer-illustrations" viewBox="0 0 1440 850" fill="none" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <defs>
        <g id="footer-flower"><circle r="7" /><ellipse cy="-17" rx="7" ry="11" /><ellipse cy="17" rx="7" ry="11" /><ellipse cx="-17" rx="11" ry="7" /><ellipse cx="17" rx="11" ry="7" /><path d="m-12-12-5-5m29 5 5-5m-29 29-5 5m29-5 5 5" /></g>
        <g id="footer-leaf"><path d="M0 0C-23-35-16-61 0-78 16-61 23-35 0 0Zm0 0v-62" /></g>
      </defs>
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-80 28Q160 200 400 28T880 28T1360 28T1840 28M-80 42Q160 215 400 42T880 42T1360 42" />
        {[40, 160, 280, 520, 640, 760, 1000, 1120, 1240, 1360].map((x, index) => <g key={x} transform={`translate(${x} ${index % 3 === 1 ? 120 : 88})`}><path d="M0-24v-38" /><use href="#footer-flower" /><path d="M0 28v18m-4-3 4 7 4-7" /></g>)}
        <g transform="translate(-55 320)">
          <path d="M0 430V185a185 185 0 0 1 370 0v245M24 430V185a161 161 0 0 1 322 0v245M-12 430h394M185 0v430M0 185h370" />
          <path d="M24 185q60 80 161 100 101-20 161-100M24 200q22 122 0 230m322-230q-22 122 0 230" />
          {[30, 75, 120, 165].map((angle, index) => <use key={angle} href="#footer-flower" transform={`translate(${185 + 185 * Math.cos(angle * Math.PI / 180)} ${185 - 185 * Math.sin(angle * Math.PI / 180)}) scale(${index % 2 ? .7 : .9})`} />)}
        </g>
        <g transform="translate(1280 365) rotate(-18)">
          <circle r="94" /><circle cx="96" cy="26" r="94" /><circle r="85" /><circle cx="96" cy="26" r="85" />
          <use href="#footer-flower" transform="translate(-42 -88) scale(1.2)" /><use href="#footer-leaf" transform="translate(-30 -85) rotate(50) scale(.8)" /><use href="#footer-leaf" transform="translate(-50 -85) rotate(-45) scale(.8)" />
        </g>
        <g transform="translate(1370 750)">
          <path d="M0 70Q-115-70-65-230M0 70Q-85-150-200-210M0 70Q-100-20-235 10" />
          <use href="#footer-leaf" transform="translate(-68 -75) rotate(-25)" /><use href="#footer-leaf" transform="translate(-118 -108) rotate(-75)" /><use href="#footer-leaf" transform="translate(-175 -17) rotate(-95)" /><use href="#footer-flower" transform="translate(-65 -230) scale(1.3)" /><use href="#footer-flower" transform="translate(-200 -210)" /><use href="#footer-flower" transform="translate(-235 10) scale(.8)" />
        </g>
        <path d="m430 440 5 14 14 5-14 5-5 14-5-14-14-5 14-5Zm610 120 4 11 11 4-11 4-4 11-4-11-11-4 11-4Z" />
      </g>
    </svg>
    <div className="footer-main">
      <div className="footer-brand">
        <a href="#top" className="logo" aria-label="Laughing Tree home"><Logo /></a>
        <p>Thoughtful celebrations. Beautiful settings. From intimate gatherings to grand weddings, we bring your story to life, one detail at a time.</p>
        <a href="#contact" className="footer-talk">Let’s talk <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-links" role="navigation" aria-label="Footer company links">
        <h2>Company</h2>
        <a href="#top">Home</a><a href="#about-us">Our story</a><a href="#services">Celebrations</a><a href="#gallery">Our work</a><a href="#contact">Contact</a>
      </div>
      <div className="footer-links" role="navigation" aria-label="Footer celebration links">
        <h2>Your celebration</h2>
        <a href="#services">Weddings</a><a href="#services">Haldi &amp; Mehndi</a><a href="#services">Anniversaries</a><a href="#services">Corporate events</a><a href="#venues">Explore settings <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-connect footer-links">
        <h2>Connect</h2>
        <a href={`tel:${phone}`}><span aria-hidden="true">↗</span>{CONTACT.phone}</a>
        <a href={`mailto:${CONTACT.email}`}><span aria-hidden="true">✉</span>Email us <span aria-hidden="true">↗</span></a>
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">@laughingtree.in <span aria-hidden="true">↗</span></a>
        <address>{CONTACT.address}<br />Karnataka, India</address>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Laughing Tree. All rights reserved.</span></div>
    <a href="#top" className="footer-wordmark" aria-label="Laughing Tree — back to top"
      onPointerMove={event => {
        const bounds = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
        event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
        event.currentTarget.style.setProperty('--logo-tilt-x', `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 8}deg`)
        event.currentTarget.style.setProperty('--logo-tilt-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}deg`)
      }}
      onPointerLeave={event => {
        event.currentTarget.style.setProperty('--logo-tilt-x', '0deg')
        event.currentTarget.style.setProperty('--logo-tilt-y', '0deg')
      }}>
      <Logo />
      <span className="footer-logo-spotlight" aria-hidden="true"><Logo /></span>
    </a>
  </footer>
}

