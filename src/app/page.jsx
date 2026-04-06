import { defaults, defaultImages } from '../content'
import { fetchContent, fetchImages } from '../lib/supabase'
import HomeContent from '../components/HomeContent'
import JsonLd from '../components/JsonLd'

export const revalidate = 60

export default async function HomePage() {
  const content = await fetchContent()
  const fetchedImages = await fetchImages()
  const images = fetchedImages ? { ...defaultImages, ...fetchedImages } : defaultImages

  return (
    <>
      <HomeContent content={content} images={images} />
      <JsonLd content={content} />
    </>
  )
}
