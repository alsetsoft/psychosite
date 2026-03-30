'use client'
import { useState, useEffect, useRef } from 'react'

export default function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.unobserve(el) } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const numEnd = parseInt(end, 10) || 0
    let start = 0
    const step = Math.ceil(numEnd / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= numEnd) { start = numEnd; clearInterval(timer) }
      setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
