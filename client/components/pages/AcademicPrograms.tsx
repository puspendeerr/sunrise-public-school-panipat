'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpenIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const programs = [
  {
    icon: BookOpenIcon,
    title: 'Primary School',
    grades: 'Classes 1-5',
    description: 'Foundation program focusing on basic literacy, numeracy, and social skills development.',
    features: ['Interactive Learning', 'Creative Arts', 'Physical Education', 'Moral Values'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: UserGroupIcon,
    title: 'Middle School',
    grades: 'Classes 6-8',
    description: 'Intermediate program with subject specialization and critical thinking development.',
    features: ['Subject Specialization', 'Project-Based Learning', 'Leadership Skills', 'Technology Integration'],
    color: 'from-green-500 to-green-600'
  },
  {
    icon: AcademicCapIcon,
    title: 'High School',
    grades: 'Classes 9-12',
    description: 'Advanced program preparing students for board examinations and higher education.',
    features: ['Board Preparation', 'Career Guidance', 'Research Projects', 'University Preparation'],
    color: 'from-purple-500 to-purple-600'
  }
]

export default function AcademicPrograms() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Academic <span className="gradient-text">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive academic programs are designed to nurture intellectual 
            curiosity, critical thinking, and lifelong learning skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card p-8 group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <program.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {program.title}
              </h3>
              <p className="text-primary-600 font-semibold mb-4">{program.grades}</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {program.description}
              </p>
              
              <ul className="space-y-2">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}