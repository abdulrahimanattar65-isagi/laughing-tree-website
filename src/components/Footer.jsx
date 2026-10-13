import Logo from './Logo'
import { CONTACT } from '../data'
export default function Footer() {
  return (
    <footer>
      <a href="#top" className="logo" aria-label="Laughing Tree home"><Logo /></a>
      <address className="footer-contact">
        <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <span>{CONTACT.address}</span>
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram · @laughingtree.in</a>
      </address>
      <div className="foot-row"><span>Weddings · Events · Decor</span><a href="#top" className="lnk">Back to top</a><span>© 2026 Laughing Tree. All rights reserved.</span></div>
    </footer>
  )
}
