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
  { img: 'lt9', title: 'Weddings', text: 'Mandaps, stages, entries and complete wedding design.' },
  { img: 'haldi-celebration', title: 'Haldi & Mehndi', text: 'Bright drapes, marigolds and cozy pre-wedding corners.' },
  { img: 'lt1', title: 'Holi Celebrations', text: 'Vibrant colours, festive settings and joyful gatherings, thoughtfully planned.' },
  { img: 'lt4', title: 'Anniversaries', text: 'Intimate, elegant setups for milestones worth marking.' },
  { img: 'lt8', title: 'Corporate Events', text: 'Conferences, galas and launches, run with precision.' },
]
export const GALLERY = [
  ['lt1', 'A celebration filled with colour'],
  ['lt3', 'Newlyweds in a sunlit garden'],
  ['lt4', 'A quiet moment together'],
  ['lt6', 'Wedding traditions and thoughtful details'],
  ['lt8', 'An elegant reception in blush and ivory'],
  ['lt9', 'A floral wedding stage'],
  ['lt10', 'Wedding vows in the garden'],
  ['lt11', 'The beginning of a new journey'],
]
export const STEPS = [
  ['Chat', "Let's Talk", "Tell us your wedding date, guest count and ideas. We'll listen to what you want."],
  ['Design', 'Plan Your Wedding', 'We choose colours, themes, decorations and designs based on your style.'],
  ['Create', 'Make It Happen', 'Our team handles the decorations, arrangements, lighting and setup.'],
  ['Celebrate', 'Enjoy Your Day', 'We take care of everything so you can relax and enjoy your special day.'],
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
