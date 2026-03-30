'use client'
import Star from './Star'

export default function Popup({ content, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>✕</button>
        <span className="star-spin"><Star size={30} color="var(--red)" /></span>
        <h3>{content.title}</h3>
        <p>{content.text}</p>
        <form className="popup-form" onSubmit={e => { e.preventDefault(); alert('Дякую! Ми зв\u2019яжемося з вами найближчим часом.'); onClose() }}>
          <input type="text" placeholder="Ваше ім'я" required />
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Телефон" />
          <button type="submit" className="popup-submit">{content.btn}</button>
        </form>
        <p className="popup-note">{content.note}</p>
      </div>
    </div>
  )
}
