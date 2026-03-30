const STORAGE_KEY = 'site_content'
const IMG_STORAGE_KEY = 'site_images'

export const defaults = {
  nav: {
    logo1: 'Леся',
    logo2: 'Матвєєва',
    link1: 'Про мене',
    link2: 'Продукти',
    link3: 'Телепроєкти',
    link4: 'Контакти',
    cta: 'Стати учасницею',
  },
  popup: {
    title: 'Стати учасницею',
    text: 'Менторська група \u00abВільна\u00bb \u2014 5 зустрічей + 1 особиста сесія. Старт 7 квітня.',
    btn: 'Записатися',
    note: '5 учасниць у групі. Кількість місць обмежена.',
  },
  hero: {
    tag: 'Менторська група',
    title: 'Вільна',
    subtitle: 'Жіноча менторська група Лесі Матвєєвої',
    text: 'Ти не одна така.\nПросто ти живеш однією частиною себе \u2014 і втомилась.',
    listTitle: 'Ми розберемо:',
    list1: 'чому твої сценарії повторюються',
    list2: 'де ти втрачаєш себе',
    list3: 'і як повернути внутрішню опору',
    btn1: 'Стати учасницею',
    btn2: 'Купити \u2193',
    stat1num: '7.04', stat1label: 'старт',
    stat2num: '5+1', stat2label: 'зустрічей',
    stat3num: '5', stat3label: 'учасниць',
  },
  about: {
    tag: 'Про мене',
    title1: 'Леся',
    title2: 'Матвєєва',
    item1title: 'Кваліфікація',
    item1text: 'Практичний психолог, психоаналітик, магістр психології. Член Національної Психологічної Асоціації.',
    item2title: 'Спеціалізація',
    item2text: 'Консультант з особистісного розвитку та ефективності. Тренер впевненості у собі.',
    item3title: 'Досвід',
    item3text: '15 років практичної роботи. Сотні консультацій, авторські програми та менторські групи. Участь у телепроєктах як експерт з психології.',
  },
  products: {
    tag: 'Продукти',
    title1: 'Мої',
    title2: 'продукти',
    lead: 'Кожен продукт \u2014 це інструмент для роботи з собою. Обирайте те, що відгукується саме зараз.',
    p1title: 'Група \u00abВільна\u00bb',
    p1result: 'Повернути внутрішню опору та зрозуміти свої сценарії',
    p1price: 'Старт 7 квітня',
    p1details: '5 зустрічей + 1 особиста сесія',
    p2title: 'Воркшоп \u00abКордони\u00bb',
    p2result: 'Навчитись говорити \u00abні\u00bb та зберігати себе у стосунках',
    p2price: 'Найближчий потік',
    p2details: 'Інтенсив з практичними завданнями',
    p3title: 'Особиста сесія',
    p3result: 'Індивідуальна робота з вашим запитом у безпечному просторі',
    p3price: 'За записом',
    p3details: '60 хвилин глибинної роботи',
    btn: 'Купити',
  },
  tv: {
    tag: 'Телепроєкти',
    title1: 'Виступи та',
    title2: 'телепроєкти',
    lead: 'Участь як експерт з психології у телевізійних та медіа проєктах.',
  },
  stats: {
    s1num: '500', s1suffix: '+', s1label: 'клієнтів', s1accent: 'довірили свій шлях',
    s2num: '15', s2suffix: '', s2label: 'років досвіду', s2accent: 'практичної роботи',
    s3num: '95', s3suffix: '%', s3label: 'задоволених', s3accent: 'рекомендують мене',
  },
  consultation: {
    title: 'Потрібна\nособиста консультація?',
    text: 'Індивідуальна робота з вашим запитом у безпечному просторі.\nБез оцінок, без тиску \u2014 у вашому темпі.',
    btn: 'Записатися на консультацію',
  },
  footer: {
    name: 'Леся Матвєєва',
    tagline: 'Психоаналітик \u00b7 Тренер \u00b7 Консультант',
    instagram: 'https://instagram.com',
    telegram: 'https://t.me',
    email: 'hello@lesyamatveyeva.com',
    copyright: '\u00a9 2025 Леся Матвєєва. Усі права захищені.',
  },
}

export const defaultImages = {
  heroImage: '/mainimg.JPG',
  aboutImage: '/secondimg.JPG',
  product1Image: '/mainimg.JPG',
  product2Image: '/secondimg.JPG',
  product3Image: '/mainimg.JPG',
}

export function loadContent() {
  if (typeof window === 'undefined') return { ...defaults }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaults }
    const saved = JSON.parse(raw)
    // merge with defaults so new fields always exist
    const merged = {}
    for (const section of Object.keys(defaults)) {
      merged[section] = { ...defaults[section], ...saved[section] }
    }
    return merged
  } catch { return { ...defaults } }
}

export function saveContent(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function loadImages() {
  if (typeof window === 'undefined') return { ...defaultImages }
  try {
    const raw = localStorage.getItem(IMG_STORAGE_KEY)
    if (!raw) return { ...defaultImages }
    return { ...defaultImages, ...JSON.parse(raw) }
  } catch { return { ...defaultImages } }
}

export function saveImages(data) {
  localStorage.setItem(IMG_STORAGE_KEY, JSON.stringify(data))
}

export function resetAll() {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(IMG_STORAGE_KEY)
}
