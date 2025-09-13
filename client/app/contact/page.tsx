import ContactHero from '@/components/pages/ContactHero'
import ContactForm from '@/components/pages/ContactForm'
import ContactInfo from '@/components/pages/ContactInfo'
import MapSection from '@/components/pages/MapSection'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
    </main>
  )
}
