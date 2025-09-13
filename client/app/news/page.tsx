import NewsHero from '@/components/pages/NewsHero'
import NewsList from '@/components/pages/NewsList'
import EventsList from '@/components/pages/EventsList'

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      <NewsHero />
      <NewsList />
      <EventsList />
    </main>
  )
}
