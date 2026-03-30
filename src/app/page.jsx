import { defaults, defaultImages } from '../content'
import LoaderWrapper from '../components/LoaderWrapper'
import PopupProvider from '../components/PopupProvider'
import Nav from '../components/Nav'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProductsSection from '../components/sections/ProductsSection'
import TvSection from '../components/sections/TvSection'
import StatsSection from '../components/sections/StatsSection'
import ConsultationSection from '../components/sections/ConsultationSection'
import FooterSection from '../components/sections/FooterSection'
import JsonLd from '../components/JsonLd'

export default function HomePage() {
  return (
    <PopupProvider content={defaults.popup}>
      <LoaderWrapper>
        <Nav content={defaults.nav} />
        <main>
          <HeroSection content={defaults} images={defaultImages} />
          <AboutSection content={defaults.about} images={defaultImages} />
          <ProductsSection content={defaults.products} images={defaultImages} />
          <TvSection content={defaults.tv} />
          <StatsSection content={defaults.stats} />
          <ConsultationSection content={defaults.consultation} />
        </main>
        <FooterSection content={{ footer: defaults.footer, nav: defaults.nav }} />
      </LoaderWrapper>
      <JsonLd content={defaults} />
    </PopupProvider>
  )
}
