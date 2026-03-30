import Reveal from '../Reveal'

export default function TvSection({ content }) {
  const c = content

  return (
    <section className="s s-lg" id="tv" aria-label="Телепроєкти">
      <div className="wrap-wide">
        <Reveal><div className="tag">{c.tag}</div></Reveal>
        <Reveal delay={0.1}><h2 className="h2">{c.title1}<br /><em>{c.title2}</em></h2></Reveal>
        <Reveal delay={0.2}><p className="lead">{c.lead}</p></Reveal>

        <Reveal delay={0.3}>
          <div className="tv-grid">
            <div className="tv-item">
              <div className="tv-video">
                <iframe src={c.v1url} title={c.v1title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <h4>{c.v1title}</h4>
              <p>{c.v1desc}</p>
            </div>
            <div className="tv-item">
              <div className="tv-video">
                <iframe src={c.v2url} title={c.v2title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <h4>{c.v2title}</h4>
              <p>{c.v2desc}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
