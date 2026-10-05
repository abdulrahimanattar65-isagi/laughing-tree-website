import { useEffect, useRef } from 'react'
// Reveals content as it enters the viewport.
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Keep content visible in older browsers without IntersectionObserver.
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('in')
        io.unobserve(el)
      }
    }, { threshold: 0, rootMargin: '0px 0px 80px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`rv ${className}`} {...rest}>{children}</Tag>
}
