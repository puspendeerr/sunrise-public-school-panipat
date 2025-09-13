'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  TrophyIcon,
  SparklesIcon,
  HeartIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

const values = [
  {
    icon: AcademicCapIcon,
    title: 'Excellence',
    description: 'We strive for the highest standards in everything we do, from academics to character development.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: HeartIcon,
    title: 'Integrity',
    description: 'We uphold strong moral principles and ethical behavior in all our interactions.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: SparklesIcon,
    title: 'Innovation',
    description: 'We embrace new ideas and creative approaches to learning and teaching.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: UserGroupIcon,
    title: 'Respect',
    description: 'We value diversity and treat everyone with dignity and understanding.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: BookOpenIcon,
    title: 'Learning',
    description: 'We foster a love for lifelong learning and intellectual curiosity.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: TrophyIcon,
    title: 'Achievement',
    description: 'We celebrate success and encourage students to reach their full potential.',
    color: 'from-yellow-500 to-yellow-600'
  }
]

export default function MissionVision() {
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
            Our <span className="gradient-text">Mission & Vision</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our mission and vision guide everything we do, shaping the educational 
            experience we provide to our students and community.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8 md:p-12 group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <TrophyIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              To provide a nurturing environment where every student can discover their 
              potential, develop critical thinking skills, and grow into responsible 
              citizens who contribute positively to society. We are committed to 
              fostering academic excellence, character development, and lifelong learning.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">Empowering students with knowledge and skills for the 21st century</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">Building character and instilling strong moral values</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">Creating a safe and inclusive learning environment</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-8 md:p-12 group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <SparklesIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              To be a leading educational institution that inspires lifelong learning, 
              fosters innovation, and prepares students to excel in an ever-changing 
              global landscape. We envision a school where every student becomes a 
              confident, compassionate, and capable leader of tomorrow.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">A beacon of educational excellence and innovation</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">Preparing students for global citizenship and leadership</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">Creating a community of lifelong learners and achievers</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Join Our Mission</h3>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Be part of a community that values excellence, integrity, and innovation. 
              Together, we can shape the future of education and empower the next generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Learn More About Us
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                Schedule a Visit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
