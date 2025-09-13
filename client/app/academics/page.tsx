import AcademicsHero from '@/components/pages/AcademicsHero'
import AcademicPrograms from '@/components/pages/AcademicPrograms'
import Curriculum from '@/components/pages/Curriculum'
import Facilities from '@/components/pages/Facilities'
import Assessment from '@/components/pages/Assessment'

export default function AcademicsPage() {
  return (
    <main className="min-h-screen">
      <AcademicsHero />
      <AcademicPrograms />
      <Curriculum />
      <Facilities />
      <Assessment />
    </main>
  )
}
