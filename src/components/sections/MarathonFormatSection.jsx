import Reveal from '../Reveal'

export default function MarathonFormatSection({ content }) {
  const c = content
  const items = [c.item1, c.item2, c.item3, c.item4]
  const icons = ['📹', '📝', '💬', '🎬']

  return (
    <section className="s mf" aria-label="Формат Марафону">
      <div className="mp-wrap">
        <Reveal><h2 className="mp-title h2">{c.title}</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="mf-items">
            {items.map((item, i) => (
              <div className="mf-item" key={i}>
                <span className="mf-item-icon">{icons[i]}</span>
                <span className="mf-item-num">0{i + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
