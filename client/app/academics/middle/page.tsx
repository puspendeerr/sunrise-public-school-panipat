import MiddleSchoolHero from '@/components/pages/MiddleSchoolHero'
import MiddlePrograms from '@/components/pages/MiddlePrograms'
import MiddleCurriculum from '@/components/pages/MiddleCurriculum'
import MiddleActivities from '@/components/pages/MiddleActivities'
import MiddleAssessment from '@/components/pages/MiddleAssessment'

export default function MiddleSchoolPage() {
  return (
    <main className="min-h-screen">
      <MiddleSchoolHero />
      <MiddlePrograms />
      <MiddleCurriculum />
      <MiddleActivities />
      <MiddleAssessment />
    </main>
  )
}
