import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Details from './components/Details'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Process from './components/Process'
import Cta from './components/Cta'
import Contact from './components/Contact'
import Footer from './components/Footer'
import VenueExplorer from './components/VenueExplorer'
import Moodboards from './components/Moodboards'
import FeaturedCelebration from './components/FeaturedCelebration'
import CoupleStories from './components/CoupleStories'
import Testimonial from './components/Testimonial'
import BeforeAfter from './components/BeforeAfter'
export default function App() {
  return (
    <>
      <Navbar /><Hero /><Marquee /><About /><Services /><VenueExplorer />
      <Gallery /><BeforeAfter /><Process /><Moodboards /><FeaturedCelebration /><CoupleStories />
      <Details /><Testimonial /><Cta /><Contact /><Footer />
    </>
  )
}
