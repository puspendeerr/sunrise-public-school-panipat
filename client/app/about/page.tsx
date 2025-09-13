import AboutHero from '@/components/pages/AboutHero'
import SchoolHistory from '@/components/pages/SchoolHistory'
import LeadershipTeam from '@/components/pages/LeadershipTeam'
import MissionVision from '@/components/pages/MissionVision'
import Facilities from '@/components/pages/Facilities'
import Achievements from '@/components/pages/Achievements'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <SchoolHistory />
      <MissionVision />
      <LeadershipTeam />
      <Facilities />
      <Achievements />
    </main>
  )
}
