'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  TrophyIcon,
  StarIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const achievements = [
  {
    year: '2024',
    title: 'CBSE Excellence Award',
    description: 'Recognized for outstanding academic performance and 98% pass rate in board examinations.',
    category: 'Academic Excellence',
    icon: TrophyIcon,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    year: '2023',
    title: 'NAAC A+ Accreditation',
    description: 'Achieved highest grade in National Assessment and Accreditation Council evaluation.',
    category: 'Quality Assurance',
    icon: StarIcon,
    color: 'from-blue-500 to-blue-600'
  },
  {
    year: '2023',
    title: 'Best School in District',
    description: 'Awarded first position in district-level school ranking for overall performance.',
    category: 'Recognition',
    icon: AcademicCapIcon,
    color: 'from-green-500 to-green-600'
  },
  {
    year: '2022',
    title: 'Innovation in Education Award',
    description: 'Recognized for implementing innovative teaching methods and digital learning.',
    category: 'Innovation',
    icon: BookOpenIcon,
    color: 'from-purple-500 to-purple-600'
  },
  {
    year: '2022',
    title: 'Community Service Excellence',
    description: 'Awarded for outstanding contribution to community development and social welfare.',
    category: 'Social Impact',
    icon: HeartIcon,
    color: 'from-pink-500 to-pink-600'
  },
  {
    year: '2021',
    title: 'Sports Excellence Award',
    description: 'Recognized for outstanding performance in inter-school sports competitions.',
    category: 'Sports',
    icon: UserGroupIcon,
    color: 'from-orange-500 to-orange-600'
  }
]

const statistics = [
  {
    icon: AcademicCapIcon,
    value: '98%',
    label: 'Board Exam Pass Rate',
    description: 'Consistent high performance in CBSE examinations'
  },
  {
    icon: TrophyIcon,
    value: '150+',
    label: 'Awards & Recognition',
    description: 'Received over 150 awards and certificates'
  },
  {
    icon: UserGroupIcon,
    value: '5000+',
    label: 'Successful Alumni',
    description: 'Graduates excelling in various fields worldwide'
  },
  {
    icon: StarIcon,
    value: 'A+',
    label: 'NAAC Rating',
    description: 'Highest grade in quality assessment'
  }
]

const studentAchievements = [
  {
    name: 'Priya Sharma',
    achievement: 'State Topper in Class 12 Science',
    year: '2024',
    description: 'Scored 98.5% in CBSE Class 12 examinations'
  },
  {
    name: 'Rajesh Kumar',
    achievement: 'National Science Olympiad Gold Medal',
    year: '2023',
    description: 'First position in National Science Olympiad'
  },
  {
    name: 'Anjali Mehta',
    achievement: 'Inter-School Debate Championship Winner',
    year: '2023',
    description: 'Led team to victory in state-level debate competition'
  },
  {
    name: 'Vikram Singh',
    achievement: 'National Mathematics Olympiad Silver Medal',
    year: '2022',
    description: 'Second position in National Mathematics Olympiad'
  }
]

export default function Achievements() {
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
            Our <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence has been recognized through numerous awards, 
            certifications, and outstanding student achievements over the years.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {statistics.map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-primary-600 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="card p-8 group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{achievement.year}</div>
                    <div className="text-sm text-gray-500">{achievement.category}</div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Student Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studentAchievements.map((student, index) => (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="card p-6 group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                    <TrophyIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {student.name}
                      </h4>
                      <span className="text-sm text-gray-500">{student.year}</span>
                    </div>
                    <h5 className="text-primary-600 font-medium mb-2">{student.achievement}</h5>
                    <p className="text-gray-600 text-sm">{student.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Be Part of Our Success Story</h3>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Join our community of achievers and become part of our legacy of excellence. 
              Your success is our success, and together we can achieve great things.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Apply for Admission
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                Learn More About Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
