'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const leadership = [
  {
    name: 'Dr. Sarah Johnson',
    position: 'Principal',
    qualification: 'Ph.D. in Education, M.Ed., B.Ed.',
    experience: '15 years',
    specialization: 'Educational Leadership & Curriculum Development',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    achievements: ['NAAC Coordinator', 'Published 20+ Research Papers', 'Educational Excellence Award 2023']
  },
  {
    name: 'Mr. Rajesh Kumar',
    position: 'Vice Principal (Academics)',
    qualification: 'M.Sc. Mathematics, M.Ed., B.Ed.',
    experience: '12 years',
    specialization: 'Mathematics & Science Education',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    achievements: ['CBSE Resource Person', 'State Mathematics Award', 'Innovation in Teaching Award']
  },
  {
    name: 'Ms. Priya Sharma',
    position: 'Vice Principal (Administration)',
    qualification: 'M.A. English, M.Ed., B.Ed.',
    experience: '10 years',
    specialization: 'Language Education & Student Affairs',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    achievements: ['Language Excellence Award', 'Student Welfare Champion', 'Community Outreach Leader']
  },
  {
    name: 'Dr. Amit Verma',
    position: 'Head of Science Department',
    qualification: 'Ph.D. Physics, M.Sc. Physics, B.Ed.',
    experience: '14 years',
    specialization: 'Physics & STEM Education',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    achievements: ['Science Olympiad Coordinator', 'Research Publication Award', 'Innovation in STEM Award']
  },
  {
    name: 'Ms. Sneha Patel',
    position: 'Head of Primary School',
    qualification: 'M.A. Child Psychology, M.Ed., B.Ed.',
    experience: '11 years',
    specialization: 'Early Childhood Education',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    achievements: ['Child Development Expert', 'Primary Education Award', 'Creative Teaching Methods']
  },
  {
    name: 'Mr. Vikram Singh',
    position: 'Head of Sports & Physical Education',
    qualification: 'M.P.Ed., B.P.Ed., Diploma in Sports Science',
    experience: '9 years',
    specialization: 'Physical Education & Sports Management',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    achievements: ['State Sports Coordinator', 'National Level Coach', 'Physical Fitness Excellence Award']
  }
]

export default function LeadershipTeam() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Leadership Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated leaders who guide our institution with vision, 
            expertise, and unwavering commitment to educational excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadership.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary-100 group-hover:border-primary-300 transition-colors duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold text-lg mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.qualification}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <UserGroupIcon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-900">{member.experience}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-4 h-4 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="font-semibold text-gray-900 text-sm">{member.specialization}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-3">Key Achievements:</p>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leadership Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Our Leadership Philosophy</h3>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed mb-8">
              We believe in collaborative leadership that empowers every member of our community. 
              Our leadership team is committed to creating an environment where students, teachers, 
              and staff can thrive and reach their full potential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Educational Excellence</h4>
                <p className="text-primary-100">Committed to maintaining the highest standards of education</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Collaborative Approach</h4>
                <p className="text-primary-100">Working together to achieve common goals and vision</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrophyIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Continuous Growth</h4>
                <p className="text-primary-100">Always learning and improving for better outcomes</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
