import Image from 'next/image'
import Star from '../Star'
import Nl from '../Nl'

export default function HeroSection({ content, images }) {
  const c = content.hero

  return (
    <section className="hero" aria-label="Головний екран">
      <div className="hero-left">
        <div className="hero-mobile-photo">
          <Image
            src={images.heroImage}
            alt="Леся Матвєєва"
            width={300}
            height={300}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="hero-tag-line">{c.tag}</div>
        <h1>{c.title}<span>{c.subtitle}</span></h1>
        <p className="hero-subtitle"><Nl text={c.text} /></p>
        <div className="hero-star"><span className="star-spin"><Star size={70} color="rgba(255,255,255,0.9)" /></span></div>
      </div>
      <div className="hero-right">
        <Image
          src={images.heroImageDesktop || images.heroImage}
          alt="Леся Матвєєва — психолог, психоаналітик"
          width={600}
          height={800}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </section>
  )
}
