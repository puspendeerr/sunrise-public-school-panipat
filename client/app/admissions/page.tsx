import AdmissionsHero from '@/components/pages/AdmissionsHero'
import AdmissionProcess from '@/components/pages/AdmissionProcess'
import ApplicationForm from '@/components/pages/ApplicationForm'
import AdmissionRequirements from '@/components/pages/AdmissionRequirements'
import FeeStructure from '@/components/pages/FeeStructure'

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">
      <AdmissionsHero />
      <AdmissionProcess />
      <AdmissionRequirements />
      <FeeStructure />
      <ApplicationForm />
    </main>
  )
}
