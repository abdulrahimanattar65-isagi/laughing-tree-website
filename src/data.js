// Edit your content here. Images live in /public/images
export const BEFORE_AFTER = [...Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  before: `/images/af${i + 1}.png`,
  after: `/images/bf${i + 1}.png`,
})), {
  id: 6,
  before: '/images/mantap-before.png',
  after: '/images/mantap-after.png',
  imageFilter: 'saturate(0.5) sepia(0.12) contrast(0.92) brightness(0.96)',
}]

export const CONTACT = {
  phone: '+91 9986342671',
  email: 'contact@laughingtree.com',
  address: 'Vidyanagar, Hubli',
  instagram: 'https://www.instagram.com/laughingtree.in/',
}
export const NAV = [
  ['about-us', 'Our story'], ['services', 'Celebrations'],
  ['gallery', 'Portfolio'], ['contact', 'Consultation'],
]
export const HERO = ['lt2', 'lt3', 'lt9', 'lt11']
export const MARQUEE = ['Weddings', 'Haldi & Mehndi', 'Holi Celebrations', 'Anniversaries', 'Corporate Events']
export const SERVICES = [
  { img: 'lt9', title: 'Weddings', text: 'Mandaps, stages, entrances and complete wedding décor.' },
  { img: 'haldi-celebration', title: 'Haldi & Mehndi', text: 'Bright drapes, marigolds and beautifully designed pre-wedding spaces.' },
  { img: 'lt1', title: 'Holi Celebrations', text: 'Vibrant colours and festive decor for joyful holi celebrations.' },
  { img: 'lt4', title: 'Anniversaries', text: 'Intimate, elegant setups for milestones worth marking.' },
  { img: 'lt8', title: 'Corporate Events', text: 'Elegant decor and customized setups for conferences, galas and launches.' },
]
export const GALLERY = [
  ['lt1.png', 'A celebration filled with colour'],
  ['portfolio-venue-at-dusk.png', 'An elegant wedding welcome at dusk'],
  ['hero-garden-lanterns.png', 'A garden reception beneath glowing lanterns'],
  ['portfolio-golden-reception.jpeg', 'A reception stage in warm golden light'],
  ['lt8.png', 'An elegant reception in blush and ivory'],
  ['lt9.png', 'A floral wedding stage'],
  ['hero-floral-mandap.jpeg', 'A blush and ivory floral mandap'],
  ['portfolio-crimson-rose-mandap.png', 'A traditional mandap with crimson roses and jasmine'],
  ['portfolio-pink-gold-mandap.png', 'A lavish wedding stage in pink and gold'],
]
export const STEPS = [
  ['Chat', "Let's Talk", "Tell us your wedding date, venue and decor ideas. we'll understand your vision."],
  ['Design', 'Plan Your Wedding', 'We create personalized decor concepts, colour palettes and themes that reflect your style.'],
  ['Create', 'Make It Happen', 'Our team brings your vision to life through beautiful decorations, lighting and venue setups.'],
  ['Celebrate', 'Enjoy Your Day', 'We take care of every decor detail so you can relax and enjoy your special day.'],
]
export const EVENT_TYPES = ['Wedding', 'Haldi / Mehndi', 'Holi Celebrations', 'Anniversary', 'Corporate Event']
export const DETAILS = [
  { name: 'Decor', img: 'lt9', pos: '50% 25%', z: 1.3, text: 'Drapes, garlands and backdrops designed around your story.' },
  { name: 'Lighting', img: 'lt8', pos: '50% 50%', z: 1, text: 'Chandeliers and candlelight that make a room glow.' },
  { name: 'Dining', img: 'lt5', pos: '50% 50%', z: 1.1, text: 'Lounges, buffets and tables styled to be remembered.' },
  { name: 'Venues', img: 'lt3', pos: '50% 55%', z: 1.1, text: 'Gardens, terraces and halls transformed end to end.' },
  { name: 'Stage production', img: 'lt11', pos: '50% 40%', z: 1.15, text: 'Entrances, sparklers and sound, timed to the second.' },
  { name: 'Guest experience', img: 'lt6', pos: '50% 35%', z: 1.1, text: 'Every guest welcomed, guided and looked after.' },
  { name: 'Event details', img: 'lt5', pos: '50% 50%', z: 1, text: 'Signage and small touches people remember for years.' },
]

export const ENTRANCE = [
  { id: 'about-us', label: 'Our story', img: 'lt2', background: 'BG1', text: 'Meet the dreamers' },
  { id: 'services', label: 'Celebrations', img: 'lt1', text: 'Moments made magical' },
  { id: 'gallery', label: 'Portfolio', img: 'lt9', background: 'BG2', text: 'Wander through our creations' },
  { id: 'contact', label: 'Your beginning', img: 'lt5', text: 'Let’s dream together' },
]
