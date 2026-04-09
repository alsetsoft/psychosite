import Reveal from '../Reveal'

export default function MarathonProgramSection({ content, marathonDays }) {
  const c = content
  const days = marathonDays || []

  return (
    <section className="s mp" aria-label="Програма Марафону">
      <div className="mp-wrap">
        <Reveal><h2 className="mp-title h2">{c.title}</h2></Reveal>
        <div className="mp-days">
          {days.map((day, i) => {
            const items = day.list_items ? day.list_items.split('\n').filter(Boolean) : []
            return (
              <Reveal delay={0.1 * (i + 1)} key={day.id}>
                <div className="mp-day">
                  <div className="mp-day-header">
                    <span className="mp-day-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mp-day-title">{day.title}</h3>
                  </div>
                  {items.length > 0 && (
                    <div className="mp-day-list">
                      {items.map((item, j) => (
                        <div className="mp-day-item" key={j}>{item}</div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
