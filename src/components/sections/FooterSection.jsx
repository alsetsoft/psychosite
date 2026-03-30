import Star from '../Star'
import Reveal from '../Reveal'

export default function FooterSection({ content }) {
  const { footer: c, nav } = content

  return (
    <footer className="ft" id="contact" aria-label="Контакти">
      <div className="ft-bg-star"><span className="star-spin"><Star size={300} color="rgba(255,255,255,0.015)" /></span></div>
      <div className="ft-bg-star ft-bg-star-2"><span className="star-spin-fast"><Star size={150} color="rgba(255,255,255,0.02)" /></span></div>

      <Reveal>
        <div className="ft-top">
          <span className="star-spin-fast"><Star size={24} color="var(--red)" /></span>
          <h2 className="ft-heading">{c.name}</h2>
          <p className="ft-tagline">{c.tagline}</p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="ft-socials">
          <a className="ft-social" href={c.instagram} target="_blank" rel="noopener noreferrer">
            <div className="ft-social-icon">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
            <span>Instagram</span>
          </a>
          <a className="ft-social" href={c.telegram} target="_blank" rel="noopener noreferrer">
            <div className="ft-social-icon">
              <svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </div>
            <span>Telegram</span>
          </a>
          <a className="ft-social" href={'mailto:' + c.email}>
            <div className="ft-social-icon">
              <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <span>Email</span>
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="ft-nav">
          <a href="#about">{nav.link1}</a>
          <span className="ft-nav-dot" />
          <a href="#products">{nav.link2}</a>
          <span className="ft-nav-dot" />
          <a href="#tv">{nav.link3}</a>
          <span className="ft-nav-dot" />
          <a href="#consultation">Консультація</a>
        </div>
      </Reveal>

      <div className="ft-line" />

      <div className="ft-bottom">
        <p>{c.copyright}</p>
      </div>
    </footer>
  )
}
