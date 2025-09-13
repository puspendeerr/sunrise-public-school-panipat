import ExtracurricularsHero from '@/components/pages/ExtracurricularsHero'
import SportsPrograms from '@/components/pages/SportsPrograms'
import ArtsPrograms from '@/components/pages/ArtsPrograms'
import ClubsSocieties from '@/components/pages/ClubsSocieties'
import CommunityService from '@/components/pages/CommunityService'

export default function ExtracurricularsPage() {
  return (
    <main className="min-h-screen">
      <ExtracurricularsHero />
      <SportsPrograms />
      <ArtsPrograms />
      <ClubsSocieties />
      <CommunityService />
    </main>
  )
}
