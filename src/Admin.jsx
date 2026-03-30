import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadContent, saveContent, loadImages, saveImages, resetAll } from './content.js'
import './Admin.css'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'
const AUTH_KEY = 'admin_auth'

function Login({ onAuth }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const submit = e => {
    e.preventDefault()
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, '1')
      onAuth()
    } else {
      setError('Невірний логін або пароль')
    }
  }

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={submit}>
        <h1>Адмін-панель</h1>
        <p>Увійдіть, щоб редагувати сайт</p>
        {error && <div className="adm-error">{error}</div>}
        <input type="text" placeholder="Логін" value={user} onChange={e => setUser(e.target.value)} autoFocus />
        <input type="password" placeholder="Пароль" value={pass} onChange={e => setPass(e.target.value)} />
        <button type="submit">Увійти</button>
      </form>
    </div>
  )
}

const sectionLabels = {
  nav: 'Навігація',
  popup: 'Попап (форма)',
  hero: 'Перший екран',
  about: 'Про мене',
  products: 'Продукти',
  tv: 'Телепроєкти',
  stats: 'Статистика',
  consultation: 'Консультація',
  footer: 'Футер / Контакти',
}

const fieldLabels = {
  logo1: 'Логотип (ім\'я)', logo2: 'Логотип (прізвище)',
  link1: 'Посилання 1', link2: 'Посилання 2', link3: 'Посилання 3', link4: 'Посилання 4',
  cta: 'Кнопка CTA',
  title: 'Заголовок', text: 'Текст', btn: 'Кнопка', note: 'Примітка',
  tag: 'Тег', title1: 'Заголовок (рядок 1)', title2: 'Заголовок (рядок 2)',
  subtitle: 'Підзаголовок',
  listTitle: 'Заголовок списку',
  list1: 'Пункт 1', list2: 'Пункт 2', list3: 'Пункт 3',
  btn1: 'Кнопка 1', btn2: 'Кнопка 2',
  stat1num: 'Стат 1 число', stat1label: 'Стат 1 підпис',
  stat2num: 'Стат 2 число', stat2label: 'Стат 2 підпис',
  stat3num: 'Стат 3 число', stat3label: 'Стат 3 підпис',
  item1title: 'Блок 1 заголовок', item1text: 'Блок 1 текст',
  item2title: 'Блок 2 заголовок', item2text: 'Блок 2 текст',
  item3title: 'Блок 3 заголовок', item3text: 'Блок 3 текст',
  lead: 'Опис',
  p1title: 'Продукт 1 назва', p1result: 'Продукт 1 результат', p1price: 'Продукт 1 ціна', p1details: 'Продукт 1 деталі',
  p2title: 'Продукт 2 назва', p2result: 'Продукт 2 результат', p2price: 'Продукт 2 ціна', p2details: 'Продукт 2 деталі',
  p3title: 'Продукт 3 назва', p3result: 'Продукт 3 результат', p3price: 'Продукт 3 ціна', p3details: 'Продукт 3 деталі',
  v1url: 'Відео 1 URL (YouTube embed)', v1title: 'Відео 1 назва', v1desc: 'Відео 1 опис',
  v2url: 'Відео 2 URL (YouTube embed)', v2title: 'Відео 2 назва', v2desc: 'Відео 2 опис',
  s1num: 'Число 1', s1suffix: 'Суфікс 1', s1label: 'Підпис 1', s1accent: 'Акцент 1',
  s2num: 'Число 2', s2suffix: 'Суфікс 2', s2label: 'Підпис 2', s2accent: 'Акцент 2',
  s3num: 'Число 3', s3suffix: 'Суфікс 3', s3label: 'Підпис 3', s3accent: 'Акцент 3',
  name: 'Ім\'я', tagline: 'Підзаголовок',
  instagram: 'Instagram URL', telegram: 'Telegram URL', email: 'Email',
  copyright: 'Копірайт',
}

const imageLabels = {
  heroImage: 'Головне фото (Hero)',
  aboutImage: 'Фото "Про мене"',
  product1Image: 'Фото Продукт 1',
  product2Image: 'Фото Продукт 2',
  product3Image: 'Фото Продукт 3',
}

function ImageUploader({ label, value, onChange }) {
  const inputRef = useRef()
  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onChange(ev.target.result)
    reader.readAsDataURL(file)
  }
  return (
    <div className="adm-image-field">
      <label>{label}</label>
      <div className="adm-image-preview">
        <img src={value} alt={label} />
      </div>
      <div className="adm-image-actions">
        <button type="button" onClick={() => inputRef.current.click()}>Завантажити нове</button>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      </div>
    </div>
  )
}

function AdminPanel() {
  const navigate = useNavigate()
  const [content, setContent] = useState(loadContent)
  const [images, setImages] = useState(loadImages)
  const [activeSection, setActiveSection] = useState('hero')
  const [saved, setSaved] = useState(false)
  const [showImages, setShowImages] = useState(false)

  const updateField = (section, field, value) => {
    setContent(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
    setSaved(false)
  }

  const updateImage = (key, value) => {
    setImages(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    saveContent(content)
    saveImages(images)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (!window.confirm('Скинути всі зміни до стандартних значень?')) return
    resetAll()
    setContent(loadContent())
    setImages(loadImages())
    setSaved(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    navigate('/admin')
    window.location.reload()
  }

  const isLongField = key => key.includes('text') || key === 'text' || key === 'lead' || key === 'title' || key === 'copyright'

  return (
    <div className="adm">
      {/* sidebar */}
      <aside className="adm-side">
        <div className="adm-side-logo">Admin</div>
        <nav className="adm-side-nav">
          {Object.keys(sectionLabels).map(key => (
            <button
              key={key}
              className={`adm-side-btn ${activeSection === key && !showImages ? 'active' : ''}`}
              onClick={() => { setActiveSection(key); setShowImages(false) }}
            >
              {sectionLabels[key]}
            </button>
          ))}
          <div className="adm-side-divider" />
          <button
            className={`adm-side-btn ${showImages ? 'active' : ''}`}
            onClick={() => setShowImages(true)}
          >
            Зображення
          </button>
        </nav>
        <div className="adm-side-bottom">
          <a href="/public" target="_blank" rel="noopener noreferrer" className="adm-side-link">Переглянути сайт</a>
          <button className="adm-side-logout" onClick={handleLogout}>Вийти</button>
        </div>
      </aside>

      {/* main */}
      <main className="adm-main">
        <header className="adm-header">
          <h1>{showImages ? 'Зображення' : sectionLabels[activeSection]}</h1>
          <div className="adm-header-actions">
            <button className="adm-btn-reset" onClick={handleReset}>Скинути все</button>
            <button className="adm-btn-save" onClick={handleSave}>
              {saved ? 'Збережено!' : 'Зберегти'}
            </button>
          </div>
        </header>

        <div className="adm-body">
          {showImages ? (
            <div className="adm-images-grid">
              {Object.keys(imageLabels).map(key => (
                <ImageUploader
                  key={key}
                  label={imageLabels[key]}
                  value={images[key]}
                  onChange={val => updateImage(key, val)}
                />
              ))}
            </div>
          ) : (
            <div className="adm-fields">
              {Object.keys(content[activeSection] || {}).map(field => (
                <div className="adm-field" key={field}>
                  <label>{fieldLabels[field] || field}</label>
                  {isLongField(field) ? (
                    <textarea
                      value={content[activeSection][field]}
                      onChange={e => updateField(activeSection, field, e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[activeSection][field]}
                      onChange={e => updateField(activeSection, field, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(sessionStorage.getItem(AUTH_KEY) === '1')
  if (!authed) return <Login onAuth={() => setAuthed(true)} />
  return <AdminPanel />
}
