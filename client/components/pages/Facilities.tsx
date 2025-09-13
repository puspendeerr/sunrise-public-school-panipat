'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  BeakerIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  HeartIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const facilities = [
  {
    icon: BeakerIcon,
    title: 'Science Laboratories',
    description: 'Well-equipped laboratories for Physics, Chemistry, and Biology with modern equipment and safety measures.',
    features: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Safety Equipment'],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: ComputerDesktopIcon,
    title: 'Computer Labs',
    description: 'State-of-the-art computer facilities with high-speed internet and latest software for digital learning.',
    features: ['High-Speed Internet', 'Latest Software', 'Digital Learning Tools', 'Coding Programs'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: BookOpenIcon,
    title: 'Library & Resource Center',
    description: 'Comprehensive library with extensive collection of books, digital resources, and quiet study areas.',
    features: ['Extensive Book Collection', 'Digital Resources', 'Study Areas', 'Research Support'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: PaintBrushIcon,
    title: 'Art & Craft Studios',
    description: 'Creative spaces for artistic expression and hands-on learning activities in various art forms.',
    features: ['Painting Studio', 'Pottery Workshop', 'Music Room', 'Dance Studio'],
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: AcademicCapIcon,
    title: 'Smart Classrooms',
    description: 'Technology-enabled classrooms with interactive whiteboards and digital learning tools.',
    features: ['Interactive Whiteboards', 'Audio-Visual Equipment', 'Digital Learning Tools', 'Climate Control'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: UserGroupIcon,
    title: 'Sports Complex',
    description: 'Comprehensive sports facilities including playgrounds, courts, and equipment for various sports.',
    features: ['Basketball Court', 'Football Ground', 'Indoor Games', 'Swimming Pool'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-indigo-500 to-indigo-600'
  }
]

const additionalFacilities = [
  {
    icon: HeartIcon,
    title: 'Medical Room',
    description: 'Fully equipped medical room with qualified nurse and first aid facilities.'
  },
  {
    icon: TrophyIcon,
    title: 'Auditorium',
    description: 'Large auditorium for events, assemblies, and cultural performances.'
  },
  {
    icon: BookOpenIcon,
    title: 'Cafeteria',
    description: 'Clean and hygienic cafeteria serving nutritious meals and snacks.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Transportation',
    description: 'Safe and reliable school bus service covering all major areas.'
  }
]

export default function Facilities() {
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
            World-Class <span className="gradient-text">Facilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our state-of-the-art facilities provide students with the perfect environment 
            for learning, creativity, and personal growth.
          </p>
        </motion.div>

        {/* Main Facilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${facility.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <facility.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {facility.description}
                  </p>
                  <div className="space-y-2">
                    {facility.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-400 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Facilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Additional Facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFacilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-50 transition-colors duration-300">
                  <facility.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {facility.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Facility Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Why Our Facilities Matter</h3>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Our facilities are designed to support every aspect of student development, 
              from academic excellence to physical fitness and creative expression. 
              We believe that the right environment is crucial for effective learning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary-300 mb-2">100%</div>
                <div className="text-primary-100">Safety Standards</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary-300 mb-2">24/7</div>
                <div className="text-primary-100">Security & Maintenance</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary-300 mb-2">A+</div>
                <div className="text-primary-100">Infrastructure Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
