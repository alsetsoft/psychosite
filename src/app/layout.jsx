import { Playfair_Display, Montserrat } from 'next/font/google'
import '../index.css'
import '../App.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://lesya-matveyeva.com'),
  title: {
    default: 'Леся Матвєєва — Психолог, Психоаналітик',
    template: '%s | Леся Матвєєва',
  },
  description: 'Леся Матвєєва — практичний психолог, психоаналітик, консультант з особистісного розвитку. Менторські групи, воркшопи, індивідуальні консультації.',
  keywords: ['психолог', 'психоаналітик', 'Леся Матвєєва', 'консультація психолога', 'менторська група', 'особистісний розвиток', 'психологія'],
  openGraph: {
    title: 'Леся Матвєєва — Психолог, Психоаналітик',
    description: 'Практичний психолог, психоаналітик, консультант з особистісного розвитку. Менторські групи, воркшопи, індивідуальні консультації.',
    url: 'https://lesya-matveyeva.com',
    siteName: 'Леся Матвєєва',
    images: [{ url: '/mainimg.JPG', width: 1200, height: 630 }],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Леся Матвєєва — Психолог, Психоаналітик',
    description: 'Практичний психолог, психоаналітик, консультант з особистісного розвитку.',
    images: ['/mainimg.JPG'],
  },
  alternates: {
    canonical: 'https://lesya-matveyeva.com',
  },
  icons: { icon: '/vite.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
