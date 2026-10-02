import Reveal from './Reveal'

export default function CoupleStories() {
  return <section className="couple-stories" id="stories">
    <Reveal><span className="eyebrow">The people behind the celebration</span><h2>Every love story<br />has its own <em>setting.</em></h2></Reveal>
    <div className="story-grid">
      <figure className="story-main"><img src="/images/m3.jpg" alt="A floral pathway ready for a wedding celebration" loading="lazy" /><figcaption>For the moments that feel like you.</figcaption></figure>
      <Reveal className="story-note"><span className="story-mark">“</span><p>Some celebrations are grand and full of colour. Others are quiet, close, and all about the people in the room. We make space for both.</p><a className="lnk" href="#contact">Tell us your story</a></Reveal>
    </div>
  </section>
}
