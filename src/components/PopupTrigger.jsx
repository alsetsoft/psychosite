'use client'
import { usePopup } from './PopupProvider'

export default function PopupTrigger({ className, style, children }) {
  const { openPopup } = usePopup()
  return (
    <button className={className} style={style} onClick={openPopup}>
      {children}
    </button>
  )
}
