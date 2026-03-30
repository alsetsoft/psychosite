import Star from '../Star'
import Reveal from '../Reveal'
import Counter from '../Counter'

function Marquee({ reverse }) {
  return (
    <div className={`st-marquee${reverse ? ' st-marquee-reverse' : ''}`}>
      <div className="st-marquee-track">
        {[...Array(4)].map((_, r) => (
          <span key={r} className="st-marquee-item">
            Результати <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span> Досвід <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span> Довіра <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span>&nbsp;
          </span>
        ))}
      </div>
    </div>
  )
}

export default function StatsSection({ content }) {
  const c = content
  const stats = [
    { end: c.s1num, suffix: c.s1suffix, label: c.s1label, accent: c.s1accent },
    { end: c.s2num, suffix: c.s2suffix, label: c.s2label, accent: c.s2accent },
    { end: c.s3num, suffix: c.s3suffix, label: c.s3label, accent: c.s3accent },
  ]

  return (
    <section className="st" id="stats" aria-label="Статистика">
      <Marquee />

      <div className="st-content">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.15}>
            <div className="st-item">
              <div className="st-item-left">
                <div className="st-num"><Counter end={s.end} suffix={s.suffix} duration={2500} /></div>
              </div>
              <div className="st-item-right">
                <div className="st-label">{s.label}</div>
                <div className="st-accent">{s.accent}</div>
              </div>
              <div className="st-item-hover-bg" />
            </div>
          </Reveal>
        ))}
      </div>

      <Marquee reverse />
    </section>
  )
}
