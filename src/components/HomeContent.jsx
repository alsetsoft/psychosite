'use client'

import LoaderWrapper from './LoaderWrapper'
import PopupProvider from './PopupProvider'
import Nav from './Nav'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import MarathonProgramSection from './sections/MarathonProgramSection'
import MarathonFormatSection from './sections/MarathonFormatSection'
import SelfEsteemSection from './sections/SelfEsteemSection'
import ProductsSection from './sections/ProductsSection'
import TvSection from './sections/TvSection'
import StatsSection from './sections/StatsSection'
import ConsultationSection from './sections/ConsultationSection'
import FooterSection from './sections/FooterSection'

export default function HomeContent({ content, images, products }) {
  return (
    <PopupProvider content={content.popup}>
      <LoaderWrapper>
        <Nav content={content.nav} />
        <main>
          <HeroSection content={content} images={images} />
          <AboutSection content={content.about} images={images} />
          <MarathonProgramSection content={content.marathon_program} />
          <MarathonFormatSection content={content.marathon_format} />
          <SelfEsteemSection content={content.self_esteem} ctaContent={content.marathon_cta} />
          <ProductsSection content={content.products} products={products} />
          <TvSection content={content.tv} />
          <StatsSection content={content.stats} />
          <ConsultationSection content={content.consultation} ctaUrl={content.nav.ctaUrl} />
        </main>
        <FooterSection content={{ footer: content.footer, nav: content.nav }} />
      </LoaderWrapper>
    </PopupProvider>
  )
}
