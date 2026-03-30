'use client'
import { useState, useEffect } from 'react'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState('counting')
  const [nameText, setNameText] = useState('')
  const fullName = 'Lesya Matveyeva'

  useEffect(() => {
    if (phase !== 'counting') return
    let current = 0
    const timer = setInterval(() => {
      current += Math.ceil(Math.random() * 3 + 1)
      if (current > 100) current = 100
      setCount(current)
      if (current >= 100) {
        clearInterval(timer)
        setTimeout(() => setPhase('name'), 200)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'name') return
    let i = 0
    const timer = setInterval(() => {
      i++
      setNameText(fullName.slice(0, i))
      if (i >= fullName.length) {
        clearInterval(timer)
        setTimeout(() => setPhase('fadeout'), 600)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'fadeout') return
    const timer = setTimeout(() => onDone(), 500)
    return () => clearTimeout(timer)
  }, [phase, onDone])

  return (
    <div className={`loader ${phase === 'fadeout' ? 'loader-exit' : ''}`}>
      <div className="loader-content">
        {phase === 'counting' && (
          <div className="loader-number">{count}</div>
        )}
        {(phase === 'name' || phase === 'fadeout') && (
          <div className="loader-name">
            {phase === 'name' ? nameText : fullName}
            {phase === 'name' && <span className="loader-cursor">|</span>}
          </div>
        )}
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" style={{ width: `${count}%` }} />
      </div>
    </div>
  )
}
