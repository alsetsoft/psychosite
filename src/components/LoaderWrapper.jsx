'use client'
import { useState, useEffect } from 'react'
import Loader from './Loader'

export default function LoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div style={loading ? { visibility: 'hidden' } : undefined}>
        {children}
      </div>
    </>
  )
}
