import Image from 'next/image'
import Star from '../Star'
import Nl from '../Nl'
import PopupTrigger from '../PopupTrigger'

export default function HeroSection({ content, images }) {
  const c = content.hero

  return (
    <section className="hero" aria-label="Головний екран">
      <div className="hero-left">
        <div className="hero-tag-line">{c.tag}</div>
        <h1>{c.title}<span>{c.subtitle}</span></h1>
        <p className="hero-subtitle"><Nl text={c.text} /></p>
        <div className="hero-list">
          <p>{c.listTitle}</p>
          <ul>
            <li>{c.list1}</li>
            <li>{c.list2}</li>
            <li>{c.list3}</li>
          </ul>
        </div>
        <div className="hero-actions">
          <PopupTrigger className="hero-btn-red">{c.btn1}</PopupTrigger>
          <a href="#products" className="hero-btn-ghost">{c.btn2}</a>
        </div>
        <div className="hero-star"><span className="star-spin"><Star size={70} color="rgba(255,255,255,0.9)" /></span></div>
      </div>
      <div className="hero-right">
        <Image
          src={images.heroImage}
          alt="Леся Матвєєва — психолог, психоаналітик"
          width={600}
          height={800}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
    </section>
  )
}
