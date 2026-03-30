'use client'
import { useState, useRef, useEffect } from 'react'
import { defaults, defaultImages } from './content.js'
import { supabase, fetchContent, saveContentToSupabase } from './lib/supabase'
import './Admin.css'

function Login({ onAuth }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    })
    setLoading(false)
    if (err) {
      setError('Невірний email або пароль')
    } else {
      onAuth()
    }
  }

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={submit}>
        <h1>Адмін-панель</h1>
        <p>Увійдіть, щоб редагувати сайт</p>
        {error && <div className="adm-error">{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
        <input type="password" placeholder="Пароль" value={pass} onChange={e => setPass(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? 'Вхід...' : 'Увійти'}</button>
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

function VideoManager() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('videos').select('*').order('sort_order').then(({ data }) => {
      if (data) setVideos(data)
      setLoading(false)
    })
  }, [])

  const updateVideo = (idx, field, value) => {
    setVideos(prev => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v))
  }

  const addVideo = () => {
    setVideos(prev => [...prev, {
      id: null,
      title: '',
      description: '',
      youtube_url: '',
      sort_order: prev.length + 1,
    }])
  }

  const removeVideo = async (idx) => {
    const video = videos[idx]
    if (video.id) {
      await supabase.from('videos').delete().eq('id', video.id)
    }
    setVideos(prev => prev.filter((_, i) => i !== idx))
  }

  const moveVideo = (idx, dir) => {
    const next = idx + dir
    if (next < 0 || next >= videos.length) return
    setVideos(prev => {
      const arr = [...prev]
      ;[arr[idx], arr[next]] = [arr[next], arr[idx]]
      return arr.map((v, i) => ({ ...v, sort_order: i + 1 }))
    })
  }

  const saveVideos = async () => {
    setSaving(true)
    for (const v of videos) {
      if (v.id) {
        await supabase.from('videos').update({
          title: v.title,
          description: v.description,
          youtube_url: v.youtube_url,
          sort_order: v.sort_order,
        }).eq('id', v.id)
      } else {
        const { data } = await supabase.from('videos').insert({
          title: v.title,
          description: v.description,
          youtube_url: v.youtube_url,
          sort_order: v.sort_order,
        }).select()
        if (data?.[0]) v.id = data[0].id
      }
    }
    setSaving(false)
  }

  if (loading) return <p>Завантаження відео...</p>

  return (
    <div className="adm-videos">
      <h3 style={{ marginBottom: '1rem' }}>Відео</h3>
      {videos.map((v, i) => (
        <div key={v.id || i} className="adm-video-row">
          <div className="adm-video-fields">
            <div className="adm-field">
              <label>Назва</label>
              <input type="text" value={v.title} onChange={e => updateVideo(i, 'title', e.target.value)} />
            </div>
            <div className="adm-field">
              <label>Опис</label>
              <input type="text" value={v.description} onChange={e => updateVideo(i, 'description', e.target.value)} />
            </div>
            <div className="adm-field">
              <label>YouTube URL</label>
              <input type="text" value={v.youtube_url} onChange={e => updateVideo(i, 'youtube_url', e.target.value)} />
            </div>
          </div>
          <div className="adm-video-actions">
            <button type="button" onClick={() => moveVideo(i, -1)} disabled={i === 0} title="Up">&#8593;</button>
            <button type="button" onClick={() => moveVideo(i, 1)} disabled={i === videos.length - 1} title="Down">&#8595;</button>
            <button type="button" onClick={() => removeVideo(i)} className="adm-btn-delete" title="Delete">&#10005;</button>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button type="button" className="adm-btn-save" onClick={addVideo}>+ Додати відео</button>
        <button type="button" className="adm-btn-save" onClick={saveVideos} disabled={saving}>
          {saving ? 'Збереження...' : 'Зберегти відео'}
        </button>
      </div>
    </div>
  )
}

function SubmissionsManager() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('submissions').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setSubmissions(data)
      setLoading(false)
    })
  }, [])

  const removeSubmission = async (id) => {
    await supabase.from('submissions').delete().eq('id', id)
    setSubmissions(prev => prev.filter(s => s.id !== id))
  }

  if (loading) return <p>Завантаження заявок...</p>
  if (!submissions.length) return <p style={{ color: '#888' }}>Заявок поки немає.</p>

  return (
    <div className="adm-fields">
      {submissions.map(s => (
        <div key={s.id} className="adm-video-row" style={{ alignItems: 'flex-start' }}>
          <div className="adm-video-fields" style={{ flex: 1 }}>
            <div className="adm-field">
              <label>Ім'я</label>
              <input type="text" value={s.name} readOnly />
            </div>
            <div className="adm-field">
              <label>Email</label>
              <input type="text" value={s.email} readOnly />
            </div>
            <div className="adm-field">
              <label>Телефон</label>
              <input type="text" value={s.phone || '—'} readOnly />
            </div>
            <div className="adm-field">
              <label>Дата</label>
              <input type="text" value={new Date(s.created_at).toLocaleString('uk-UA')} readOnly />
            </div>
          </div>
          <div className="adm-video-actions">
            <button type="button" onClick={() => removeSubmission(s.id)} className="adm-btn-delete" title="Видалити">✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function AdminPanel() {
  const [content, setContent] = useState(defaults)
  const [images, setImages] = useState(defaultImages)
  const [activeSection, setActiveSection] = useState('hero')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showImages, setShowImages] = useState(false)
  const [showSubmissions, setShowSubmissions] = useState(false)

  useEffect(() => {
    fetchContent().then(setContent)
  }, [])

  const updateField = (section, field, value) => {
    setContent(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
    setSaved(false)
  }

  const updateImage = (key, value) => {
    setImages(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    await saveContentToSupabase(content)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = async () => {
    if (!window.confirm('Скинути всі зміни до стандартних значень?')) return
    await saveContentToSupabase(defaults)
    setContent({ ...defaults })
    setImages({ ...defaultImages })
    setSaved(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
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
              className={`adm-side-btn ${activeSection === key && !showImages && !showSubmissions ? 'active' : ''}`}
              onClick={() => { setActiveSection(key); setShowImages(false); setShowSubmissions(false) }}
            >
              {sectionLabels[key]}
            </button>
          ))}
          <div className="adm-side-divider" />
          <button
            className={`adm-side-btn ${showImages ? 'active' : ''}`}
            onClick={() => { setShowImages(true); setShowSubmissions(false) }}
          >
            Зображення
          </button>
          <button
            className={`adm-side-btn ${showSubmissions ? 'active' : ''}`}
            onClick={() => { setShowSubmissions(true); setShowImages(false) }}
          >
            Заявки
          </button>
        </nav>
        <div className="adm-side-bottom">
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm-side-link">Переглянути сайт</a>
          <button className="adm-side-logout" onClick={handleLogout}>Вийти</button>
        </div>
      </aside>

      {/* main */}
      <main className="adm-main">
        <header className="adm-header">
          <h1>{showSubmissions ? 'Заявки' : showImages ? 'Зображення' : sectionLabels[activeSection]}</h1>
          <div className="adm-header-actions">
            <button className="adm-btn-reset" onClick={handleReset}>Скинути все</button>
            <button className="adm-btn-save" onClick={handleSave} disabled={saving}>
              {saving ? 'Збереження...' : saved ? 'Збережено!' : 'Зберегти'}
            </button>
          </div>
        </header>

        <div className="adm-body">
          {showSubmissions ? (
            <SubmissionsManager />
          ) : showImages ? (
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
              {activeSection === 'tv' && <VideoManager />}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session)
      setChecking(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (checking) return null
  if (!authed) return <Login onAuth={() => setAuthed(true)} />
  return <AdminPanel />
}
