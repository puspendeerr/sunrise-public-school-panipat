import AssessmentHero from '@/components/pages/AssessmentHero'
import AssessmentPolicy from '@/components/pages/AssessmentPolicy'
import GradingSystem from '@/components/pages/GradingSystem'
import ReportCards from '@/components/pages/ReportCards'
import ParentTeacherMeetings from '@/components/pages/ParentTeacherMeetings'

export default function AssessmentPage() {
  return (
    <main className="min-h-screen">
      <AssessmentHero />
      <AssessmentPolicy />
      <GradingSystem />
      <ReportCards />
      <ParentTeacherMeetings />
    </main>
  )
}
