import Reveal from '../Reveal'

export default function MarathonCtaBlock({ content }) {
  const c = content
  return (
    <Reveal>
      <div className="mcta">
        <h3 className="mcta-title">{c.priceLabel}</h3>
        <div className="mcta-prices">
          <div className="mcta-price-card">
            <span className="mcta-period">{c.period1}</span>
            <span className="mcta-price">{c.price1}</span>
          </div>
          <div className="mcta-price-card">
            <span className="mcta-period">{c.period2}</span>
            <span className="mcta-price">{c.price2}</span>
          </div>
        </div>
        <p className="mcta-note">{c.note}</p>
        {c.btnUrl ? (
          <a href={c.btnUrl} target="_blank" rel="noopener noreferrer" className="marathon-cta">{c.btn}</a>
        ) : (
          <button className="marathon-cta">{c.btn}</button>
        )}
      </div>
    </Reveal>
  )
}
