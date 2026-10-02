// Edit your content here. Images live in /public/images
export const BEFORE_AFTER = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  before: `/images/af${i + 1}.png`,
  after: `/images/bf${i + 1}.png`,
}))

export const CONTACT = {
  phone: '+91 00000 00000',
  email: 'hello@laughingtree.in',
  social: 'Instagram · Facebook · WhatsApp',
}
export const NAV = [
  ['about-us', 'Our story'], ['services', 'Celebrations'], ['venues', 'Venues'],
  ['gallery', 'Our work'], ['contact', 'Consultation'],
]
export const HERO = ['m2', 'm1', 'm5', 'm6']
export const MARQUEE = ['Weddings', 'Haldi & Mehndi', 'Birthdays', 'Anniversaries', 'Corporate Events', 'Home Functions', 'Floral Decor']
export const SERVICES = [
  { img: 'm9', title: 'Weddings', text: 'Mandaps, stages, entries and complete wedding design.' },
  { img: 'h2', title: 'Haldi & Mehndi', text: 'Bright drapes, marigolds and cozy pre-wedding corners.' },
  { img: 'b2', title: 'Birthdays', text: 'Balloon arches, backdrops and themed setups.' },
  { img: 'a2', title: 'Anniversaries', text: 'Intimate, elegant setups for milestones worth marking.' },
  { img: 'c1', title: 'Corporate Events', text: 'Conferences, galas and launches, run with precision.' },
  { img: 'h5', title: 'Home Functions', text: 'Griha pravesh, festivals and family gatherings styled at home.' },
]
export const GALLERY = [
  ['m8', 'Bridal entry with cold sparklers'], ['h1', 'Yellow and green haldi setup'],
  ['m12', 'Garden wedding'], ['b1', 'Birthday balloon garland'], ['m3', 'Pink floral pathway'],
  ['c2', 'Terrace buffet lounge'], ['m10', 'Phoolon ki chaadar entry'], ['g1', 'Staircase with pink drapes'],
  ['m7', 'Floral mandap with colour smoke'], ['h4', 'Green haldi canopy'], ['m11', 'Fairy-lit floral arch'],
  ['a1', 'Anniversary welcome sign'], ['h6', 'Marigold facade decor'], ['m4', 'Arched floral aisle'],
]
export const STEPS = [
  ['Chat', 'Share your date, guest count and dream. We listen first.'],
  ['Design', 'Mood boards, colours and layouts made only for you.'],
  ['Create', 'Our crew builds, styles and lights every detail.'],
  ['Celebrate', 'We manage the day so you just enjoy it.'],
]
export const EVENT_TYPES = ['Wedding', 'Haldi / Mehndi', 'Birthday', 'Anniversary', 'Corporate Event', 'Home Function']
export const DETAILS = [
  { name: 'Decor', img: 'h3', pos: '50% 25%', z: 1.3, text: 'Drapes, garlands and backdrops designed around your story.' },
  { name: 'Lighting', img: 'd-light', pos: '50% 50%', z: 1, text: 'Chandeliers and candlelight that make a room glow.' },
  { name: 'Floral design', img: 'm11', pos: '50% 40%', z: 1.25, text: 'Fresh blooms in arches, aisles and canopies.' },
  { name: 'Dining', img: 'c2', pos: '50% 50%', z: 1.1, text: 'Lounges, buffets and tables styled to be remembered.' },
  { name: 'Venues', img: 'm12', pos: '50% 55%', z: 1.1, text: 'Gardens, terraces and halls transformed end to end.' },
  { name: 'Stage production', img: 'm8', pos: '50% 40%', z: 1.15, text: 'Entrances, sparklers and sound, timed to the second.' },
  { name: 'Guest experience', img: 'm10', pos: '50% 35%', z: 1.1, text: 'Every guest welcomed, guided and looked after.' },
  { name: 'Event details', img: 'd-candle', pos: '50% 50%', z: 1, text: 'Signage and small touches people remember for years.' },
]

export const ENTRANCE = [
  { id: 'about-us', label: 'Our story', img: 'm3', text: 'Meet the dreamers' },
  { id: 'services', label: 'Celebrations', img: 'h2', text: 'Moments made magical' },
  { id: 'gallery', label: 'Our work', img: 'm11', text: 'Wander through our creations' },
  { id: 'venues', label: 'Venues', img: 'm12', text: 'Find your perfect setting' },
  { id: 'contact', label: 'Your beginning', img: 'm4', text: 'Let’s dream together' },
]
