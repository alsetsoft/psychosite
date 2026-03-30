import React, { useState, useEffect, useRef } from 'react'
import { loadContent, loadImages } from './content.js'
import './App.css'

const Star = ({ size = 50, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
    <path d="M50 0 L54 42 L100 50 L54 58 L50 100 L46 58 L0 50 L46 42 Z" />
  </svg>
)

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ className = 'anim-fade-up', delay = 0, children }) {
  const ref = useReveal()
  return <div ref={ref} className={className} style={{ transitionDelay: `${delay}s` }}>{children}</div>
}

/* ===== LOADER ===== */
function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState('counting')
  const [nameText, setNameText] = useState('')
  const fullName = 'Lesya Matveyeva'

  useEffect(() => {
    if (phase !== 'counting') return
    let current = 0
    const timer = setInterval(() => {
      current += Math.ceil(Math.random() * 3 + 1)
      if (current > 100) current = 100
      setCount(current)
      if (current >= 100) {
        clearInterval(timer)
        setTimeout(() => setPhase('name'), 200)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'name') return
    let i = 0
    const timer = setInterval(() => {
      i++
      setNameText(fullName.slice(0, i))
      if (i >= fullName.length) {
        clearInterval(timer)
        setTimeout(() => setPhase('fadeout'), 600)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'fadeout') return
    const timer = setTimeout(() => onDone(), 500)
    return () => clearTimeout(timer)
  }, [phase, onDone])

  return (
    <div className={`loader ${phase === 'fadeout' ? 'loader-exit' : ''}`}>
      <div className="loader-content">
        {phase === 'counting' && (
          <div className="loader-number">{count}</div>
        )}
        {(phase === 'name' || phase === 'fadeout') && (
          <div className="loader-name">
            {phase === 'name' ? nameText : fullName}
            {phase === 'name' && <span className="loader-cursor">|</span>}
          </div>
        )}
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" style={{ width: `${count}%` }} />
      </div>
    </div>
  )
}

/* ===== ANIMATED COUNTER ===== */
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.unobserve(el) } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const numEnd = parseInt(end, 10) || 0
    let start = 0
    const step = Math.ceil(numEnd / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= numEnd) { start = numEnd; clearInterval(timer) }
      setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ===== MULTILINE TEXT HELPER ===== */
function Nl({ text }) {
  return text.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
  ))
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [popup, setPopup] = useState(false)
  const [loading, setLoading] = useState(true)

  const c = loadContent()
  const img = loadImages()

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = popup ? 'hidden' : ''
  }, [loading, popup])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (loading) return <Loader onDone={() => setLoading(false)} />

  return (
    <>
      {/* POPUP */}
      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(false)}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setPopup(false)}>✕</button>
            <span className="star-spin"><Star size={30} color="var(--red)" /></span>
            <h3>{c.popup.title}</h3>
            <p>{c.popup.text}</p>
            <form className="popup-form" onSubmit={e => { e.preventDefault(); alert('Дякую! Ми зв\u2019яжемося з вами найближчим часом.'); setPopup(false) }}>
              <input type="text" placeholder="Ваше ім'я" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Телефон" />
              <button type="submit" className="popup-submit">{c.popup.btn}</button>
            </form>
            <p className="popup-note">{c.popup.note}</p>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="nav" style={scrolled ? { boxShadow: '0 2px 20px rgba(0,0,0,0.06)' } : {}}>
        <div className="nav-inner">
          <div className="nav-logo">{c.nav.logo1} <em>{c.nav.logo2}</em></div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>{c.nav.link1}</a></li>
            <li><a href="#products" onClick={() => setMenuOpen(false)}>{c.nav.link2}</a></li>
            <li><a href="#tv" onClick={() => setMenuOpen(false)}>{c.nav.link3}</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>{c.nav.link4}</a></li>
            <li><button className="nav-cta" onClick={() => { setMenuOpen(false); setPopup(true) }}>{c.nav.cta}</button></li>
          </ul>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag-line">{c.hero.tag}</div>
          <h1>{c.hero.title}<span>{c.hero.subtitle}</span></h1>
          <p className="hero-subtitle"><Nl text={c.hero.text} /></p>
          <div className="hero-list">
            <p>{c.hero.listTitle}</p>
            <ul>
              <li>{c.hero.list1}</li>
              <li>{c.hero.list2}</li>
              <li>{c.hero.list3}</li>
            </ul>
          </div>
          <div className="hero-actions">
            <button onClick={() => setPopup(true)} className="hero-btn-red">{c.hero.btn1}</button>
            <a href="#products" className="hero-btn-ghost">{c.hero.btn2}</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-num">{c.hero.stat1num}</div><div className="hero-stat-label">{c.hero.stat1label}</div></div>
            <div className="hero-stat"><div className="hero-stat-num">{c.hero.stat2num}</div><div className="hero-stat-label">{c.hero.stat2label}</div></div>
            <div className="hero-stat"><div className="hero-stat-num">{c.hero.stat3num}</div><div className="hero-stat-label">{c.hero.stat3label}</div></div>
          </div>
          <div className="hero-star"><span className="star-spin"><Star size={70} color="rgba(255,255,255,0.9)" /></span></div>
        </div>
        <div className="hero-right">
          <img src={img.heroImage} alt={c.nav.logo1 + ' ' + c.nav.logo2} />
        </div>
      </section>

      {/* ===== БЛОК 2: ПРО ЛЕСЮ ===== */}
      <section className="about-full" id="about">
        <div className="about-full-image">
          <img src={img.aboutImage} alt={c.about.title1 + ' ' + c.about.title2} />
        </div>
        <div className="about-full-content">
          <Reveal><div className="tag">{c.about.tag}</div></Reveal>
          <Reveal delay={0.1}><h2 className="h2">{c.about.title1}<br /><em>{c.about.title2}</em></h2></Reveal>
          <Reveal delay={0.2}>
            <div className="about-items">
              <div className="about-item">
                <div className="about-item-num">01</div>
                <div><h4>{c.about.item1title}</h4><p>{c.about.item1text}</p></div>
              </div>
              <div className="about-item">
                <div className="about-item-num">02</div>
                <div><h4>{c.about.item2title}</h4><p>{c.about.item2text}</p></div>
              </div>
              <div className="about-item">
                <div className="about-item-num">03</div>
                <div><h4>{c.about.item3title}</h4><p>{c.about.item3text}</p></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== БЛОК 3: ПРОДУКТИ ===== */}
      <section className="products-section" id="products">
        <div className="products-header">
          <Reveal><div className="tag">{c.products.tag}</div></Reveal>
          <Reveal delay={0.1}><h2 className="h2">{c.products.title1}<br /><em>{c.products.title2}</em></h2></Reveal>
          <Reveal delay={0.2}><p className="lead">{c.products.lead}</p></Reveal>
        </div>

        <div className="products-showcase">
          {[
            { img: img.product1Image, title: c.products.p1title, result: c.products.p1result, price: c.products.p1price, details: c.products.p1details, icon: <><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></> },
            { img: img.product2Image, title: c.products.p2title, result: c.products.p2result, price: c.products.p2price, details: c.products.p2details, icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></> },
            { img: img.product3Image, title: c.products.p3title, result: c.products.p3result, price: c.products.p3price, details: c.products.p3details, icon: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></> },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className={`product-row ${i % 2 !== 0 ? 'product-row-reverse' : ''}`}>
                <div className="product-row-img">
                  <img src={p.img} alt={p.title} />
                  <div className="product-row-num">0{i + 1}</div>
                </div>
                <div className="product-row-body">
                  <div className="product-row-icon"><svg viewBox="0 0 24 24">{p.icon}</svg></div>
                  <h3>{p.title}</h3>
                  <p className="product-row-desc">{p.result}</p>
                  <div className="product-row-details">
                    <span className="star-spin-fast"><Star size={10} color="var(--red)" /></span>
                    <span>{p.details}</span>
                  </div>
                  <div className="product-row-bottom">
                    <div className="product-row-price">{p.price}</div>
                    <button onClick={() => setPopup(true)} className="product-row-btn">{c.products.btn}</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== БЛОК 4: ТЕЛЕПРОЄКТИ ===== */}
      <section className="s s-lg" id="tv">
        <div className="wrap-wide">
          <Reveal><div className="tag">{c.tv.tag}</div></Reveal>
          <Reveal delay={0.1}><h2 className="h2">{c.tv.title1}<br /><em>{c.tv.title2}</em></h2></Reveal>
          <Reveal delay={0.2}><p className="lead">{c.tv.lead}</p></Reveal>

          <Reveal delay={0.3}>
            <div className="tv-grid">
              <div className="tv-item">
                <div className="tv-video">
                  <iframe src={c.tv.v1url} title={c.tv.v1title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <h4>{c.tv.v1title}</h4>
                <p>{c.tv.v1desc}</p>
              </div>
              <div className="tv-item">
                <div className="tv-video">
                  <iframe src={c.tv.v2url} title={c.tv.v2title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <h4>{c.tv.v2title}</h4>
                <p>{c.tv.v2desc}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== БЛОК 5: СТАТИСТИКА ===== */}
      <section className="st" id="stats">
        <div className="st-marquee">
          <div className="st-marquee-track">
            {[...Array(4)].map((_, r) => (
              <span key={r} className="st-marquee-item">
                Результати <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span> Досвід <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span> Довіра <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span>&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="st-content">
          {[
            { end: c.stats.s1num, suffix: c.stats.s1suffix, label: c.stats.s1label, accent: c.stats.s1accent },
            { end: c.stats.s2num, suffix: c.stats.s2suffix, label: c.stats.s2label, accent: c.stats.s2accent },
            { end: c.stats.s3num, suffix: c.stats.s3suffix, label: c.stats.s3label, accent: c.stats.s3accent },
          ].map((s, i) => (
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

        <div className="st-marquee st-marquee-reverse">
          <div className="st-marquee-track">
            {[...Array(4)].map((_, r) => (
              <span key={r} className="st-marquee-item">
                Результати <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span> Досвід <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span> Довіра <span className="st-marquee-star"><Star size={14} color="var(--red)" /></span>&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== БЛОК 6: ОСОБИСТА КОНСУЛЬТАЦІЯ ===== */}
      <div className="band-red" id="consultation">
        <span className="star-spin"><Star size={40} color="rgba(255,255,255,0.15)" /></span>
        <h2 style={{ marginTop: '1.5rem' }}><Nl text={c.consultation.title} /></h2>
        <p><Nl text={c.consultation.text} /></p>
        <button onClick={() => setPopup(true)} className="btn-white" style={{ marginTop: '2.5rem' }}>{c.consultation.btn}</button>
      </div>

      {/* ===== БЛОК 7: FOOTER / КОНТАКТИ ===== */}
      <footer className="ft" id="contact">
        <div className="ft-bg-star"><span className="star-spin"><Star size={300} color="rgba(255,255,255,0.015)" /></span></div>
        <div className="ft-bg-star ft-bg-star-2"><span className="star-spin-fast"><Star size={150} color="rgba(255,255,255,0.02)" /></span></div>

        <Reveal>
          <div className="ft-top">
            <span className="star-spin-fast"><Star size={24} color="var(--red)" /></span>
            <h2 className="ft-heading">{c.footer.name}</h2>
            <p className="ft-tagline">{c.footer.tagline}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="ft-socials">
            <a className="ft-social" href={c.footer.instagram} target="_blank" rel="noopener noreferrer">
              <div className="ft-social-icon">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <span>Instagram</span>
            </a>
            <a className="ft-social" href={c.footer.telegram} target="_blank" rel="noopener noreferrer">
              <div className="ft-social-icon">
                <svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </div>
              <span>Telegram</span>
            </a>
            <a className="ft-social" href={'mailto:' + c.footer.email}>
              <div className="ft-social-icon">
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <span>Email</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="ft-nav">
            <a href="#about">{c.nav.link1}</a>
            <span className="ft-nav-dot" />
            <a href="#products">{c.nav.link2}</a>
            <span className="ft-nav-dot" />
            <a href="#tv">{c.nav.link3}</a>
            <span className="ft-nav-dot" />
            <a href="#consultation">Консультація</a>
          </div>
        </Reveal>

        <div className="ft-line" />

        <div className="ft-bottom">
          <p>{c.footer.copyright}</p>
        </div>
      </footer>
    </>
  )
}

export default App
