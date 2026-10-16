import { useState } from 'react'
import Reveal from './Reveal'
import { CONTACT, EVENT_TYPES } from '../data'
export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', date: '', type: EVENT_TYPES[0], msg: '' })
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    const body = [
      'Hello Laughing Tree! I would like to enquire about an event.',
      '',
      `Name: ${f.name.trim()}`,
      `Phone: ${f.phone.trim()}`,
      `Event: ${f.type}`,
      `Date: ${f.date || 'To be decided'}`,
      ...(f.msg.trim() ? ['', `My vision: ${f.msg.trim()}`] : []),
    ].join('\n')
    window.location.href = `https://wa.me/${CONTACT.phone.replace(/\D/g, '')}?text=${encodeURIComponent(body)}`
  }
  return (
    <section className="contact" id="contact">
      <div className="wrap grid">
        <Reveal className="info">
          <span className="eyebrow">Private consultation</span><h2>Begin<br />beautifully.</h2>
          <p>Share your date, your people and the feeling you want to create. We’ll make time to listen.</p>
          <p><b>Phone</b><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></p>
          <p><b>Email</b><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p><b>Address</b>{CONTACT.address}</p>
          <p><b>Follow</b><a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram · @laughingtree.in</a></p>
        </Reveal>
        <Reveal as="form" onSubmit={submit}>
          <div className="two"><input placeholder="Your name" required value={f.name} onChange={set('name')} /><input placeholder="Phone number" required value={f.phone} onChange={set('phone')} /></div>
          <div className="two"><input type="date" aria-label="Event date" value={f.date} onChange={set('date')} />
            <select value={f.type} onChange={set('type')}>{EVENT_TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
          <textarea rows="4" placeholder="Tell us about your vision" value={f.msg} onChange={set('msg')} />
          <button className="btn fill" type="submit">Enquire on WhatsApp</button>
          <p className="enquiry-hint">Opens WhatsApp with your enquiry ready. Tap Send to share it with us.</p>
        </Reveal>
      </div>
    </section>
  )
}
