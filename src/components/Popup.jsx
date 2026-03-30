'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Star from './Star'

export default function Popup({ content, onClose }) {
  const [sending, setSending] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    setSending(true)
    await supabase.from('submissions').insert({
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
    })
    setSending(false)
    alert('Дякую! Ми зв\u2019яжемося з вами найближчим часом.')
    onClose()
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>✕</button>
        <span className="star-spin"><Star size={30} color="var(--red)" /></span>
        <h3>{content.title}</h3>
        <p>{content.text}</p>
        <form className="popup-form" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Ваше ім'я" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="phone" type="tel" placeholder="Телефон" />
          <button type="submit" className="popup-submit" disabled={sending}>
            {sending ? 'Відправка...' : content.btn}
          </button>
        </form>
        <p className="popup-note">{content.note}</p>
      </div>
    </div>
  )
}
