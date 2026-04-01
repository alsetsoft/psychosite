export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin' }],
    sitemap: 'https://lesya-matveyeva.com/sitemap.xml',
  }
}
