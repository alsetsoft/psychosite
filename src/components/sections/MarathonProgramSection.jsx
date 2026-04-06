import Reveal from '../Reveal'

export default function MarathonProgramSection({ content }) {
  const c = content
  const day1Items = c.day1list.split('\n')
  const day2Items = c.day2list.split('\n')

  return (
    <section className="s mp" aria-label="Програма Марафону">
      <div className="mp-wrap">
        <Reveal><h2 className="mp-title h2">{c.title}</h2></Reveal>
        <div className="mp-days">
          <Reveal delay={0.1}>
            <div className="mp-day">
              <div className="mp-day-header">
                <span className="mp-day-num">01</span>
                <h3 className="mp-day-title">{c.day1title}</h3>
              </div>
              <div className="mp-day-list">
                {day1Items.map((item, i) => (
                  <div className="mp-day-item" key={i}>{item}</div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mp-day">
              <div className="mp-day-header">
                <span className="mp-day-num">02</span>
                <h3 className="mp-day-title">{c.day2title}</h3>
              </div>
              <div className="mp-day-list">
                {day2Items.map((item, i) => (
                  <div className="mp-day-item" key={i}>{item}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
