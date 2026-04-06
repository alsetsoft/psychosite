import { defaults, defaultImages } from '../content'
import { fetchContent, fetchImages, fetchSiteProducts, fetchVideos } from '../lib/supabase'
import HomeContent from '../components/HomeContent'
import JsonLd from '../components/JsonLd'

export const revalidate = 60

export default async function HomePage() {
  const [content, fetchedImages, products, videos] = await Promise.all([
    fetchContent(),
    fetchImages(),
    fetchSiteProducts(),
    fetchVideos(),
  ])
  const images = fetchedImages ? { ...defaultImages, ...fetchedImages } : defaultImages

  return (
    <>
      <HomeContent content={content} images={images} products={products} videos={videos} />
      <JsonLd content={content} />
    </>
  )
}
