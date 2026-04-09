import MarathonCtaBlock from './MarathonCtaBlock'

export default function SelfEsteemSection({ ctaContent }) {
  return (
    <section className="s se">
      <div className="mp-wrap">
        <MarathonCtaBlock content={ctaContent} />
      </div>
    </section>
  )
}
