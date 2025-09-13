'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const stats = [
  { icon: AcademicCapIcon, value: 'Classes 6-8', label: 'Age Group 11-13' },
  { icon: UserGroupIcon, value: '30 Students', label: 'Per Class' },
  { icon: BookOpenIcon, value: 'Subject Specialization', label: 'Learning Approach' },
  { icon: LightBulbIcon, value: 'Critical Thinking', label: 'Development Focus' },
]

export default function MiddleSchoolHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-600 via-green-700 to-emerald-600 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg">
            Middle School
            <span className="block text-green-200">Classes 6-8</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-4xl mx-auto leading-relaxed">
            Building on foundational skills with subject specialization, critical thinking, 
            and preparation for higher academic challenges.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-green-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
