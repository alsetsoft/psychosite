import React, { useState, useEffect, useRef } from 'react'
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [popup, setPopup] = useState(false)
  const [loading, setLoading] = useState(true)

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
            <h3>Придбати гайд</h3>
            <p>62 сторінки. 5 блоків. Приклади, механізми, покрокові інструкції + бонус.</p>
            <div className="popup-price">
              <span className="popup-price-old">1200 ₴</span>
              <span className="popup-price-new">799 ₴</span>
            </div>
            <form className="popup-form" onSubmit={e => { e.preventDefault(); alert('Дякую! Перевірте вашу пошту.'); setPopup(false) }}>
              <input type="text" placeholder="Ваше ім'я" required />
              <input type="email" placeholder="Email" required />
              <button type="submit" className="popup-submit">Оплатити та отримати</button>
            </form>
            <p className="popup-note">Миттєва доставка на email у PDF-форматі</p>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="nav" style={scrolled ? { boxShadow: '0 2px 20px rgba(0,0,0,0.06)' } : {}}>
        <div className="nav-inner">
          <div className="nav-logo">Леся <em>Матвєєва</em></div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>Про гайд</a></li>
            <li><a href="#signs" onClick={() => setMenuOpen(false)}>Ознаки</a></li>
            <li><a href="#results" onClick={() => setMenuOpen(false)}>Результат</a></li>
            <li><button className="nav-cta" onClick={() => { setMenuOpen(false); setPopup(true) }}>Придбати</button></li>
          </ul>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag-line">Психологічний гайд</div>
          <h1>Гайд по<br />нарцисизму<span>від Лесі Матвєєвої</span></h1>
          <p className="hero-subtitle">
            Покрокова система розуміння, розпізнавання та відновлення.
            Зрозумій механізми, побач ознаки, поверни себе.
          </p>
          <div className="hero-actions">
            <button onClick={() => setPopup(true)} className="hero-btn-red">Придбати гайд</button>
            <a href="#about" className="hero-btn-ghost">Дізнатися більше ↓</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-num">62</div><div className="hero-stat-label">сторінки</div></div>
            <div className="hero-stat"><div className="hero-stat-num">5</div><div className="hero-stat-label">блоків</div></div>
            <div className="hero-stat"><div className="hero-stat-num">10+</div><div className="hero-stat-label">ознак</div></div>
          </div>
          <div className="hero-star"><span className="star-spin"><Star size={70} color="rgba(255,255,255,0.9)" /></span></div>
        </div>
        <div className="hero-right">
          <img src="/mainimg.JPG" alt="Леся Матвєєва" />
        </div>
      </section>

      {/* ===== БЛОК 2: ДЛЯ КОГО ===== */}
      <section className="s s-lg" id="about">
        <div className="wrap">
          <Reveal><h2 className="h2">Цей гайд<br /><em>для вас, якщо</em></h2></Reveal>
          <Reveal delay={0.15}>
            <div className="star-text">
              <div className="star-text-icon"><span className="star-spin"><Star size={50} color="var(--red)" /></span></div>
              <div className="star-text-body">
                <p>Ви відчуваєте, що у стосунках щось не так, але не можете це пояснити. Вам здається, що ви постійно «недостатня». Після розмов з партнером ви почуваєтесь розгубленою, виснаженою, винною.</p>
                <div className="statement">Цей гайд дає ясність. Не щоб поставити діагноз, а щоб повернути опору на власне сприйняття.</div>
              </div>
            </div>
          </Reveal>
          <div className="divider" />
          <Reveal>
            <div className="audience-grid">
              {[
                { t: 'Ви у стосунках', d: 'і відчуваєте емоційні гойдалки, знецінення, контроль під виглядом турботи — але не розумієте, чи це нормально.', icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
                { t: 'Ви вийшли', d: 'зі стосунків, але досі відчуваєте потяг, провину, нав\'язливі думки й не можете рухатись далі.', icon: <path d="M18 6L6 18M6 6l12 12"/> },
                { t: 'Ви хочете розпізнавати', d: 'токсичну динаміку на етапі знайомства, щоб більше не потрапляти в руйнівні стосунки.', icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></> },
              ].map((c, i) => (
                <div className="audience-card" key={i}>
                  <div className="audience-card-top">
                    <div className="audience-card-num">0{i + 1}</div>
                    <div className="audience-card-icon"><svg viewBox="0 0 24 24">{c.icon}</svg></div>
                  </div>
                  <h4>{c.t}</h4>
                  <p>{c.d}</p>
                  <div className="audience-card-line" />
                </div>
              ))}
            </div>
          </Reveal>
          <div className="star-divider" style={{ margin: '4rem 0 3rem' }}><span className="star-spin-fast"><Star size={18} color="var(--red)" /></span></div>
          <Reveal><h3 className="h3">У гайді — <em>5 блоків</em></h3></Reveal>
          <Reveal delay={0.1}>
            <div className="contents-grid" style={{ border: '1px solid rgba(0,0,0,0.06)', marginTop: '2rem' }}>
              {[
                { t: 'Поняття', d: 'Що таке нарцисизм, рівні, НРЛ — чітко і без зайвого.', icon: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></> },
                { t: 'Ознаки у стосунках', d: 'Love bombing, газлайтинг, знецінення, контроль — з прикладами.', icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></> },
                { t: 'Динаміка циклу', d: 'Ідеалізація → знецінення → відкидання → повернення.', icon: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></> },
                { t: 'Вплив на вас', d: '8 змін, які відбуваються з вашою психікою.', icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
                { t: 'Як собі допомогти', d: '7 конкретних кроків відновлення з поясненнями.', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
                { t: 'Бонус', d: 'Як розпізнати нарциса на побаченні + фільми.', icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/> },
              ].map((c, i) => (
                <div className="contents-item" key={i}>
                  <h4>{c.t}</h4>
                  <p>{c.d}</p>
                  <div className="contents-item-icon"><svg viewBox="0 0 24 24">{c.icon}</svg></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== БЛОК 3: ЩО ВСЕРЕДИНІ — ВЕРТИКАЛЬНИЙ ТАЙМЛАЙН ===== */}
      <section className="s s-lg" id="signs" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <Reveal><div className="tag">Що всередині</div></Reveal>
          <Reveal delay={0.1}><h2 className="h2">Ви навчитесь<br /><em>розпізнавати</em></h2></Reveal>
          <Reveal delay={0.2}><p className="lead">Основні ознаки нарцисичної динаміки — з поясненням механізму та внутрішнім маркером.</p></Reveal>

          <div className="timeline">
            {[
              { n: '01', title: 'Love bombing', text: 'Стрімке, захопливе зближення. Розмови про майбутнє з перших днів. Мета — швидко сформувати емоційну залежність.', inner: 'Легка втрата орієнтації — ніби ви не встигаєте зрозуміти, що відбувається.' },
              { n: '02', title: '«Тепло — холод»', text: 'Після близькості раптово настає холод. Без причин. Рідкісне тепло закріплюється сильніше, ніж стабільне.', inner: 'Постійна напруга. Ви живете в очікуванні: коли знову стане тепло.' },
              { n: '03', title: 'Газлайтинг', text: 'Систематична підміна фактів. Ви бачите одне — вам кажуть, що цього не було. «Ти надто чутлива».', inner: 'Ви перевіряєте листування, щоб переконатися, що вам не здалося.' },
              { n: '04', title: 'Знецінення', text: 'Тонкі уколи під виглядом жартів. Ваші досягнення зменшуються, ваше «ні» не приймається спокійно.', inner: 'Ви все рідше кажете «ні», бо не хочете наслідків.' },
              { n: '05', title: 'Перевертання відповідальності', text: 'Будь-який конфлікт — ваша вина. З часом ви автоматично шукаєте в собі причину.', inner: 'Хронічне почуття провини.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-left">
                    <div className="timeline-num">{s.n}</div>
                    <div className="timeline-line" />
                  </div>
                  <div className="timeline-content">
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                    <div className="timeline-marker">
                      <span className="star-spin-fast"><Star size={12} color="var(--red)" /></span>
                      <p>{s.inner}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="star-spin-fast"><Star size={20} color="var(--red)" /></span>
              <div className="statement-red" style={{ margin: 0 }}>
                У гайді — 10+ ознак з прикладами, порівнянням зі здоровими стосунками та поясненням «для чого він це робить».
              </div>
            </div>
            <button onClick={() => setPopup(true)} className="btn-outline" style={{ marginTop: '2rem' }}>Отримати повний гайд</button>
          </Reveal>
        </div>
      </section>

      {/* ===== БЛОК 4: РЕЗУЛЬТАТ (з фото) ===== */}
      <section className="results-section" id="results">
        <div className="results-content">
          <Reveal><h2 className="h2">Після цього гайду<br /><em>ви зможете</em></h2></Reveal>
          <Reveal delay={0.1}>
            <div className="results-list">
              {[
                'Зрозуміти, що з вами відбувалось — і що причина не у вас',
                'Розпізнавати маніпуляції, газлайтинг, знецінення',
                'Побачити цикл: ідеалізація → знецінення → відкидання',
                'Зрозуміти, чому так важко піти — і що це не любов',
                'Отримати 7 кроків відновлення',
                'Розпізнавати токсичну людину на першому побаченні',
              ].map((item, i) => (
                <div className="results-item" key={i}>
                  <div className="results-check">✓</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="quote" style={{ marginTop: '2rem' }}>
              <p><strong>62 сторінки.</strong> 5 блоків. Приклади, механізми, покрокові інструкції + бонус.</p>
            </div>
            <button onClick={() => setPopup(true)} className="btn-red" style={{ marginTop: '2rem' }}>Придбати гайд — 799 ₴</button>
          </Reveal>
        </div>
        <div className="results-image">
          <img src="/secondimg.JPG" alt="" />
        </div>
      </section>

      {/* ===== БЛОК 5: CTA ===== */}
      <div className="band-red" id="cta">
        <span className="star-spin"><Star size={40} color="rgba(255,255,255,0.15)" /></span>
        <h2 style={{ marginTop: '1.5rem' }}>Є одне головне —<br />зберегти себе</h2>
        <p>Берегти свій час — означає берегти свою психіку.<br />Берегти свою психіку — означає берегти своє майбутнє.</p>
        <button onClick={() => setPopup(true)} className="btn-white" style={{ marginTop: '2.5rem' }}>Придбати гайд</button>
      </div>

    </>
  )
}

export default App
