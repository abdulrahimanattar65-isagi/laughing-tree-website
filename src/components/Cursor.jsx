import { useEffect, useRef } from 'react'
export default function Cursor() {
  const el = useRef(null)
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const c = el.current, dot = c.firstChild
    let x = 0, y = 0, tx = 0, ty = 0, raf
    const mv = e => {
      tx = e.clientX; ty = e.clientY
      dot.dataset.label = e.target.closest?.('[data-cursor]')?.dataset.cursor || ''
      c.classList.toggle('hot', !!e.target.closest?.('a,button'))
    }
    const loop = () => { x += (tx - x) * 0.2; y += (ty - y) * 0.2; c.style.transform = `translate3d(${x}px,${y}px,0)`; raf = requestAnimationFrame(loop) }
    document.documentElement.classList.add('cur')
    addEventListener('mousemove', mv); loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', mv); document.documentElement.classList.remove('cur') }
  }, [])
  return <div className="cursor" ref={el} aria-hidden="true"><span /></div>
}
