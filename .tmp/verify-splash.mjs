import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const code = fs.readFileSync('src/splash/splash.js', 'utf8')
  .replace(/^import .*;\r?\n/gm, '')
  .replace('export function runSplash', 'function runSplash')
const meta = JSON.parse(fs.readFileSync('src/splash/logo-pieces.json', 'utf8'))

async function check(name, options = {}) {
  let id = 0, now = 0, completed = 0, focus
  const rafs = new Map(), timers = new Map(), listeners = new Map(), warnings = []
  const nodes = []
  const classList = () => {
    const values = new Set()
    return { add: (...v) => v.forEach(x => values.add(x)), remove: (...v) => v.forEach(x => values.delete(x)), contains: v => values.has(v) }
  }
  const gradient = { addColorStop() {} }
  const context = new Proxy({}, { get: (target, key) => target[key] ?? (String(key).startsWith('create') ? () => gradient : () => {}) })
  function element(tag) {
    const e = { tag, children: [], classList: classList(), inert: false, listeners: {}, setAttribute() {},
      append(...items) { this.children.push(...items) }, appendChild(item) { this.children.push(item) },
      remove() { this.removed = true }, contains(item) { return item === this || this.children.includes(item) },
      focus() { focus = this }, addEventListener(type, fn) { this.listeners[type] = fn },
      getContext() { return options.noCanvas ? null : context } }
    nodes.push(e)
    return e
  }
  const root = element('root'), html = element('html'), body = element('body')
  focus = body
  const document = { documentElement: html, body, getElementById: () => root, createElement: element, get activeElement() { return focus } }
  const window = { innerWidth: options.mobile ? 390 : 1440, innerHeight: options.mobile ? 844 : 900, devicePixelRatio: 2,
    location: { search: options.replay ? '?splash' : '' }, matchMedia: () => ({ matches: !!options.reduced }),
    addEventListener(type, fn) { listeners.set(type, fn) }, removeEventListener(type) { listeners.delete(type) } }
  class Image {
    set src(value) { queueMicrotask(() => options.assetFailure ? this.onerror(new Error('test missing asset')) : this.onload()) }
    decode() { return Promise.resolve() }
  }
  const sandbox = { window, document, Image, meta, atlasUrl: 'atlas.png', logoUrl: 'logo.webp', URLSearchParams,
    sessionStorage: { getItem() { return options.seen ? '1' : null }, setItem() {} },
    requestAnimationFrame(fn) { rafs.set(++id, fn); return id }, cancelAnimationFrame(i) { rafs.delete(i) },
    setTimeout(fn, delay) { timers.set(++id, { fn, at: now + delay }); return id }, clearTimeout(i) { timers.delete(i) },
    console: { warn: (...args) => warnings.push(args) }, done: () => completed++ }
  vm.runInNewContext(code + '\nrunSplash({ onDone: done });', sandbox)
  for (let i = 0; i < 10; i++) await Promise.resolve()
  if (!options.noCanvas && !options.assetFailure) {
    assert.equal(root.inert, true, name + ': blocks background focus')
    assert.equal(html.classList.contains('brand-splash-active'), true)
  }
  if (options.skip) nodes.find(e => e.tag === 'button').listeners.click()
  if (options.mobile && listeners.has('resize')) listeners.get('resize')()
  for (now = 33; now <= 9000 && !completed; now += 33) {
    const batch = [...rafs.values()]; rafs.clear(); batch.forEach(fn => fn(now))
    for (const [key, timer] of timers) if (timer.at <= now) { timers.delete(key); timer.fn() }
  }
  assert.equal(completed, 1, name + ': reveals website once')
  assert.equal(root.inert, false, name + ': restores interaction')
  assert.equal(html.classList.contains('brand-splash-active'), false)
  assert.equal(root.classList.contains('brand-splash-behind'), false)
  assert.equal(rafs.size, 0)
  assert.equal(listeners.size, 0)
  assert.equal(warnings.length, 0, name + ': no drawing failures')
  console.log('PASS ' + name)
}
await check('full animation')
await check('mobile and resize', { mobile: true })
await check('reduced motion', { reduced: true })
await check('skip', { skip: true })
await check('failed assets reveal site', { assetFailure: true })
await check('canvas unavailable reveals site', { noCanvas: true })
await check('refresh replays even with previous session flag', { seen: true })
await check('explicit replay', { seen: true, replay: true })
