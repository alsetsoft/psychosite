import Image from 'next/image'
import Reveal from '../Reveal'

export default function AboutSection({ content, images }) {
  const c = content

  return (
    <section className="about-full" id="about" aria-label="Про мене">
      <div className="about-full-image">
        <Image
          src={images.aboutImage}
          alt="Леся Матвєєва — про мене"
          width={600}
          height={800}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <div className="about-full-content">
        <Reveal><div className="tag">{c.tag}</div></Reveal>
        <Reveal delay={0.1}><h2 className="h2">{c.title1}<br /><em>{c.title2}</em></h2></Reveal>
        <Reveal delay={0.2}>
          <div className="about-items">
            <div className="about-item">
              <div className="about-item-num">01</div>
              <div><h4>{c.item1title}</h4><p>{c.item1text}</p></div>
            </div>
            <div className="about-item">
              <div className="about-item-num">02</div>
              <div><h4>{c.item2title}</h4><p>{c.item2text}</p></div>
            </div>
            <div className="about-item">
              <div className="about-item-num">03</div>
              <div><h4>{c.item3title}</h4><p>{c.item3text}</p></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
