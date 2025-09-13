'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CalendarIcon, AcademicCapIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const milestones = [
  {
    year: '1998',
    title: 'Foundation',
    description: 'Sunrise Public School was established with a vision to provide quality education to the community.',
    icon: AcademicCapIcon,
    color: 'from-blue-500 to-blue-600'
  },
  {
    year: '2005',
    title: 'First Graduation',
    description: 'Our first batch of students graduated, marking a significant milestone in our journey.',
    icon: TrophyIcon,
    color: 'from-green-500 to-green-600'
  },
  {
    year: '2010',
    title: 'CBSE Affiliation',
    description: 'Received CBSE affiliation, expanding our academic programs and recognition.',
    icon: CalendarIcon,
    color: 'from-purple-500 to-purple-600'
  },
  {
    year: '2015',
    title: 'Infrastructure Expansion',
    description: 'Major expansion with new classrooms, laboratories, and modern facilities.',
    icon: UserGroupIcon,
    color: 'from-orange-500 to-orange-600'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Implemented digital learning platforms and smart classroom technology.',
    icon: AcademicCapIcon,
    color: 'from-pink-500 to-pink-600'
  },
  {
    year: '2024',
    title: '25 Years of Excellence',
    description: 'Celebrating 25 years of educational excellence and community impact.',
    icon: TrophyIcon,
    color: 'from-indigo-500 to-indigo-600'
  }
]

export default function SchoolHistory() {
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
            Our <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A quarter-century of dedication to educational excellence, innovation, 
            and nurturing young minds for a brighter future.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="card p-8 group hover:scale-105 transition-transform duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-2xl flex items-center justify-center mb-6 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} group-hover:scale-110 transition-transform duration-300`}>
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Year */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-20 h-20 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-primary-600">{milestone.year}</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Legacy</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Over the past 25 years, Sunrise Public School has grown from a small institution 
              to a leading educational hub, touching the lives of thousands of students and 
              families. Our commitment to excellence, innovation, and holistic development 
              continues to shape the future of education.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
                <div className="text-gray-600">Alumni Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-600">Awards & Recognition</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-gray-600">Community Trust</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
