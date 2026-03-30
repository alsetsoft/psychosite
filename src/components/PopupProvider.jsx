'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import Popup from './Popup'

const PopupContext = createContext()

export function usePopup() {
  return useContext(PopupContext)
}

export default function PopupProvider({ content, children }) {
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    document.body.style.overflow = popup ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [popup])

  return (
    <PopupContext.Provider value={{ openPopup: () => setPopup(true) }}>
      {children}
      {popup && <Popup content={content} onClose={() => setPopup(false)} />}
    </PopupContext.Provider>
  )
}
