export default function JsonLd({ content }) {
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Леся Матвєєва',
        jobTitle: 'Психолог, психоаналітик, консультант',
        description: content.about.item1text,
        url: 'https://example.com',
        image: 'https://example.com/mainimg.JPG',
        sameAs: [
          content.footer.instagram,
          content.footer.telegram,
        ],
      },
      {
        '@type': 'ProfessionalService',
        name: 'Леся Матвєєва — Психолог',
        provider: { '@type': 'Person', name: 'Леся Матвєєва' },
        serviceType: 'Психологічні консультації',
        areaServed: { '@type': 'Country', name: 'Україна' },
        url: 'https://example.com',
      },
      {
        '@type': 'WebSite',
        name: 'Леся Матвєєва',
        url: 'https://example.com',
        inLanguage: 'uk',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
    />
  )
}
