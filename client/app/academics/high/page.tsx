import HighSchoolHero from '@/components/pages/HighSchoolHero'
import HighPrograms from '@/components/pages/HighPrograms'
import HighCurriculum from '@/components/pages/HighCurriculum'
import HighActivities from '@/components/pages/HighActivities'
import HighAssessment from '@/components/pages/HighAssessment'

export default function HighSchoolPage() {
  return (
    <main className="min-h-screen">
      <HighSchoolHero />
      <HighPrograms />
      <HighCurriculum />
      <HighActivities />
      <HighAssessment />
    </main>
  )
}
