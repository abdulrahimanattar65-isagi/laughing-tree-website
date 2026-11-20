import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
const code = fs.readFileSync('src/splash/splash.js', 'utf8').replace(/^import .*;\r?\n/gm, '').replace('export function runSplash', 'function runSplash')
async function check(mode) {
  const nodes = [], timers = new Map(), keys = new Map()
  let focus, done = 0, id = 0
  function node(tag) {
    const classes = new Set()
    const e = { tag, inert: false, children: [], events: {}, duration: 7, currentTime: 0,
      classList: { add: (...v) => v.forEach(x => classes.add(x)), remove: (...v) => v.forEach(x => classes.delete(x)), contains: x => classes.has(x) },
      setAttribute() {}, removeAttribute() {}, load() {}, pause() {},
      play: () => mode === 'autoplay' ? Promise.reject(new Error('blocked')) : Promise.resolve(),
      append(...v) { this.children.push(...v) }, appendChild(v) { this.children.push(v) },
      contains(v) { return v === this || this.children.includes(v) }, focus() { focus = this },
      remove() { this.removed = true }, addEventListener(k, f) { this.events[k] = f } }
    nodes.push(e); return e
  }
  const root = node('root'), html = node('html'), body = node('body'); focus = body
  vm.runInNewContext(code + '\nrunSplash({onDone: done})', {
    document: { getElementById: () => root, documentElement: html, body, createElement: node, get activeElement() { return focus } },
    window: { matchMedia: () => ({ matches: mode === 'reduced' }), addEventListener: (k, f) => keys.set(k, f), removeEventListener: k => keys.delete(k) },
    setTimeout: (f, ms) => { timers.set(++id, { f, ms }); return id }, clearTimeout: i => timers.delete(i), done: () => done++
  })
  const video = nodes.find(n => n.tag === 'video'), button = nodes.find(n => n.tag === 'button')
  assert.equal(video.muted, true); assert.equal(video.playsInline, true)
  if (mode !== 'reduced') assert.equal(root.inert, true)
  if (mode === 'ended') { video.events.playing(); video.events.ended(); video.events.ended() }
  assert.equal(button, undefined, 'no Skip button')
  if (mode === 'error') video.events.error()
  if (mode === 'escape') keys.get('keydown')({ key: 'Escape', preventDefault() {} })
  await Promise.resolve(); await Promise.resolve()
  while (timers.size) { const [key, timer] = [...timers][0]; timers.delete(key); timer.f() }
  assert.equal(done, 1); assert.equal(root.inert, false)
  assert.equal(html.classList.contains('brand-splash-active'), false)
  assert.equal(root.classList.contains('brand-splash-behind'), false)
  assert.equal(nodes.find(n => n.tag === 'div').removed, true)
  assert.equal(keys.size, 0)
  console.log('PASS ' + mode)
}
for (const mode of ['ended', 'error', 'escape', 'autoplay', 'timeout', 'reduced']) await check(mode)

