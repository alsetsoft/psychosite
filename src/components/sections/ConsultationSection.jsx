import Star from '../Star'
import Nl from '../Nl'
import PopupTrigger from '../PopupTrigger'

export default function ConsultationSection({ content, ctaUrl }) {
  const c = content

  return (
    <div className="band-red" id="consultation" aria-label="Консультація">
      <span className="star-spin"><Star size={40} color="rgba(255,255,255,0.15)" /></span>
      <h2 style={{ marginTop: '1.5rem' }}><Nl text={c.title} /></h2>
      <p><Nl text={c.text} /></p>
      {ctaUrl ? (
        <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-white" style={{ marginTop: '2.5rem' }}>{c.btn}</a>
      ) : (
        <PopupTrigger className="btn-white" style={{ marginTop: '2.5rem' }}>{c.btn}</PopupTrigger>
      )}
    </div>
  )
}
