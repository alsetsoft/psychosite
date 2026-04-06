'use client'

import { useState, useEffect } from 'react'
import { defaults, defaultImages } from '../content'
import { fetchContent, fetchImages } from '../lib/supabase'
import LoaderWrapper from '../components/LoaderWrapper'
import PopupProvider from '../components/PopupProvider'
import Nav from '../components/Nav'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import MarathonProgramSection from '../components/sections/MarathonProgramSection'
import MarathonFormatSection from '../components/sections/MarathonFormatSection'
import SelfEsteemSection from '../components/sections/SelfEsteemSection'
import ProductsSection from '../components/sections/ProductsSection'
import TvSection from '../components/sections/TvSection'
import StatsSection from '../components/sections/StatsSection'
import ConsultationSection from '../components/sections/ConsultationSection'
import FooterSection from '../components/sections/FooterSection'
import JsonLd from '../components/JsonLd'

export default function HomePage() {
  const [content, setContent] = useState(defaults)
  const [images, setImages] = useState(defaultImages)

  useEffect(() => {
    fetchContent().then(setContent)
    fetchImages().then(imgs => { if (imgs) setImages(prev => ({ ...prev, ...imgs })) })
  }, [])

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
          <ProductsSection content={content.products} images={images} />
          <TvSection content={content.tv} />
          <StatsSection content={content.stats} />
          <ConsultationSection content={content.consultation} />
        </main>
        <FooterSection content={{ footer: content.footer, nav: content.nav }} />
      </LoaderWrapper>
      <JsonLd content={content} />
    </PopupProvider>
  )
}
