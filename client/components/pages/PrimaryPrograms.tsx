'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  BookOpenIcon,
  PaintBrushIcon,
  CalculatorIcon,
  GlobeAltIcon,
  HeartIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'

const subjects = [
  {
    icon: BookOpenIcon,
    title: 'English Language',
    description: 'Reading, writing, speaking, and listening skills development',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: CalculatorIcon,
    title: 'Mathematics',
    description: 'Number sense, basic operations, and problem-solving skills',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: GlobeAltIcon,
    title: 'Environmental Studies',
    description: 'Science, social studies, and environmental awareness',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: PaintBrushIcon,
    title: 'Art & Craft',
    description: 'Creative expression through various art forms and crafts',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: MusicalNoteIcon,
    title: 'Music & Dance',
    description: 'Rhythm, melody, and movement for creative development',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: HeartIcon,
    title: 'Moral Values',
    description: 'Character building, ethics, and social responsibility',
    color: 'from-red-500 to-red-600'
  }
]

const features = [
  'Small class sizes (25 students maximum)',
  'Play-based learning approach',
  'Individual attention and care',
  'Safe and nurturing environment',
  'Regular parent-teacher communication',
  'Extracurricular activities included'
]

export default function PrimaryPrograms() {
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
            Primary School <span className="gradient-text">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our primary school program focuses on building strong foundations in 
            literacy, numeracy, and social skills through engaging, age-appropriate activities.
          </p>
        </motion.div>

        {/* Subjects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <subject.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                {subject.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {subject.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Program Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Program Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
