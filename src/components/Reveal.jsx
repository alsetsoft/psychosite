'use client'
import { useRef, useEffect } from 'react'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function Reveal({ className = 'anim-fade-up', delay = 0, children }) {
  const ref = useReveal()
  return <div ref={ref} className={className} style={{ transitionDelay: `${delay}s` }}>{children}</div>
}
