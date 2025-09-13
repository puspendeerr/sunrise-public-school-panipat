import PrimarySchoolHero from '@/components/pages/PrimarySchoolHero'
import PrimaryPrograms from '@/components/pages/PrimaryPrograms'
import PrimaryCurriculum from '@/components/pages/PrimaryCurriculum'
import PrimaryActivities from '@/components/pages/PrimaryActivities'
import PrimaryAssessment from '@/components/pages/PrimaryAssessment'

export default function PrimarySchoolPage() {
  return (
    <main className="min-h-screen">
      <PrimarySchoolHero />
      <PrimaryPrograms />
      <PrimaryCurriculum />
      <PrimaryActivities />
      <PrimaryAssessment />
    </main>
  )
}
