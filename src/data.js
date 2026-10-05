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
export const HERO = ['lt2', 'lt3', 'lt9', 'lt11']
export const MARQUEE = ['Weddings', 'Haldi & Mehndi', 'Birthdays', 'Anniversaries', 'Corporate Events', 'Home Functions', 'Floral Decor']
export const SERVICES = [
  { img: 'lt9', title: 'Weddings', text: 'Mandaps, stages, entries and complete wedding design.' },
  { img: 'lt1', title: 'Haldi & Mehndi', text: 'Bright drapes, marigolds and cozy pre-wedding corners.' },
  { img: 'lt4', title: 'Anniversaries', text: 'Intimate, elegant setups for milestones worth marking.' },
  { img: 'lt8', title: 'Corporate Events', text: 'Conferences, galas and launches, run with precision.' },
  { img: 'lt5', title: 'Home Functions', text: 'Griha pravesh, festivals and family gatherings styled at home.' },
]
export const GALLERY = [
  ['lt1', 'A celebration filled with colour'],
  ['lt2', 'Floral ceremony arch and white aisle'],
  ['lt3', 'Newlyweds in a sunlit garden'],
  ['lt4', 'A quiet moment together'],
  ['lt5', 'An intimate floral table setting'],
  ['lt6', 'Wedding traditions and thoughtful details'],
  ['lt8', 'An elegant reception in blush and ivory'],
  ['lt9', 'A floral wedding stage'],
  ['lt10', 'Wedding vows in the garden'],
  ['lt11', 'The beginning of a new journey'],
]
export const STEPS = [
  ['Chat', 'Share your date, guest count and dream. We listen first.'],
  ['Design', 'Mood boards, colours and layouts made only for you.'],
  ['Create', 'Our crew builds, styles and lights every detail.'],
  ['Celebrate', 'We manage the day so you just enjoy it.'],
]
export const EVENT_TYPES = ['Wedding', 'Haldi / Mehndi', 'Birthday', 'Anniversary', 'Corporate Event', 'Home Function']
export const DETAILS = [
  { name: 'Decor', img: 'lt9', pos: '50% 25%', z: 1.3, text: 'Drapes, garlands and backdrops designed around your story.' },
  { name: 'Lighting', img: 'lt8', pos: '50% 50%', z: 1, text: 'Chandeliers and candlelight that make a room glow.' },
  { name: 'Floral design', img: 'lt2', pos: '50% 40%', z: 1.25, text: 'Fresh blooms in arches, aisles and canopies.' },
  { name: 'Dining', img: 'lt5', pos: '50% 50%', z: 1.1, text: 'Lounges, buffets and tables styled to be remembered.' },
  { name: 'Venues', img: 'lt3', pos: '50% 55%', z: 1.1, text: 'Gardens, terraces and halls transformed end to end.' },
  { name: 'Stage production', img: 'lt11', pos: '50% 40%', z: 1.15, text: 'Entrances, sparklers and sound, timed to the second.' },
  { name: 'Guest experience', img: 'lt6', pos: '50% 35%', z: 1.1, text: 'Every guest welcomed, guided and looked after.' },
  { name: 'Event details', img: 'lt5', pos: '50% 50%', z: 1, text: 'Signage and small touches people remember for years.' },
]

export const ENTRANCE = [
  { id: 'about-us', label: 'Our story', img: 'lt2', background: 'BG1', text: 'Meet the dreamers' },
  { id: 'services', label: 'Celebrations', img: 'lt1', text: 'Moments made magical' },
  { id: 'gallery', label: 'Our work', img: 'lt9', background: 'BG2', text: 'Wander through our creations' },
  { id: 'venues', label: 'Venues', img: 'lt3', text: 'Find your perfect setting' },
  { id: 'contact', label: 'Your beginning', img: 'lt5', text: 'Let’s dream together' },
]
