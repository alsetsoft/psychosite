import Image from 'next/image'
import Star from '../Star'
import Reveal from '../Reveal'
import PopupTrigger from '../PopupTrigger'

const icons = [
  <><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></>,
  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
]

export default function ProductsSection({ content, products }) {
  const c = content

  if (!products || products.length === 0) return null

  return (
    <section className="products-section" id="products" aria-label="Продукти">
      <div className="products-header">
        <Reveal><div className="tag">{c.tag}</div></Reveal>
        <Reveal delay={0.1}><h2 className="h2">{c.title1}<br /><em>{c.title2}</em></h2></Reveal>
        <Reveal delay={0.2}><p className="lead">{c.lead}</p></Reveal>
      </div>

      <div className="products-showcase">
        {products.map((p, i) => (
          <Reveal key={p.id || i} delay={i * 0.15}>
            <div className={`product-row ${i % 2 !== 0 ? 'product-row-reverse' : ''}`}>
              <div className="product-row-img">
                <Image
                  src={p.image_url || '/mainimg.JPG'}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="product-row-num">0{i + 1}</div>
              </div>
              <div className="product-row-body">
                <div className="product-row-icon"><svg viewBox="0 0 24 24">{icons[i % 3]}</svg></div>
                <h3>{p.title}</h3>
                <p className="product-row-desc">{p.result}</p>
                <div className="product-row-details">
                  <span className="star-spin-fast"><Star size={10} color="var(--red)" /></span>
                  <span>{p.details}</span>
                </div>
                <div className="product-row-bottom">
                  <div className="product-row-price">{p.price}</div>
                  {p.buy_url ? (
                    <a href={p.buy_url} target="_blank" rel="noopener noreferrer" className="product-row-btn">{c.btn}</a>
                  ) : (
                    <PopupTrigger className="product-row-btn">{c.btn}</PopupTrigger>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
