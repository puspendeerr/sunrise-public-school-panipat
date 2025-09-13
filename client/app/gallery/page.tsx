import GalleryHero from '@/components/pages/GalleryHero'
import PhotoGallery from '@/components/pages/PhotoGallery'
import VideoGallery from '@/components/pages/VideoGallery'

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <GalleryHero />
      <PhotoGallery />
      <VideoGallery />
    </main>
  )
}
