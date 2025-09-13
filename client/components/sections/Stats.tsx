'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  HeartIcon,
  StarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    icon: UserGroupIcon,
    number: 1200,
    label: 'Happy Students',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: AcademicCapIcon,
    number: 85,
    label: 'Expert Teachers',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: TrophyIcon,
    number: 95,
    label: 'Success Rate',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    suffix: '%'
  },
  {
    icon: HeartIcon,
    number: 15,
    label: 'Years Experience',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600'
  },
  {
    icon: StarIcon,
    number: 4.9,
    label: 'Parent Rating',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    suffix: '/5'
  },
  {
    icon: BookOpenIcon,
    number: 50,
    label: 'Subjects Offered',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600'
  }
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Numbers that speak for our commitment to excellence in education
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className={`${stat.bgColor} rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm`}>
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${stat.bgColor} border-2 border-white shadow-lg`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                </motion.div>

                {/* Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="mb-4"
                >
                  <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.number}
                    {stat.suffix}
                  </span>
                </motion.div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                  {stat.label}
                </h3>

                {/* Decorative Element */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.1 + 0.5 
                  }}
                  className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mt-4 mx-auto`}
                  style={{ maxWidth: '60px' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/50 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Success Story
            </h3>
            <p className="text-gray-600 mb-6">
              Be part of a community that values excellence, innovation, and student success
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Learn More About Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}