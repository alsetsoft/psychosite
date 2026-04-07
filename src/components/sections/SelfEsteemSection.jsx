import Reveal from '../Reveal'
import MarathonCtaBlock from './MarathonCtaBlock'

export default function SelfEsteemSection({ content, ctaContent }) {
  const c = content

  return (
    <section className="s se" aria-label="Самооцінка">
      <div className="mp-wrap">
        <Reveal><h2 className="mp-title h2">{c.title}</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="se-texts">
            <p className="se-text">{c.text1}</p>
            <p className="se-text">{c.text2}</p>
            <p className="se-text">{c.text3}</p>
          </div>
        </Reveal>
        <MarathonCtaBlock content={ctaContent} />
      </div>
    </section>
  )
}
