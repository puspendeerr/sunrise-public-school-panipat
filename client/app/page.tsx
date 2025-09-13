import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import AboutPreview from '../components/sections/AboutPreview'
import AcademicsPreview from '../components/sections/AcademicsPreview'
import NewsSection from '../components/sections/NewsSection'
import Testimonials from '../components/sections/Testimonials'
import Stats from '../components/sections/Stats'
import CTA from '../components/sections/CTA'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Features />
      <AboutPreview />
      <AcademicsPreview />
      <NewsSection />
      <Testimonials />
      <CTA />
    </main>
  )
}
