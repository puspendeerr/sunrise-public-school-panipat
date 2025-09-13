'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'Phone Numbers',
    details: [
      { label: 'Main Office', value: '+91 12345 67890' },
      { label: 'Admissions', value: '+91 12345 67891' },
      { label: 'Emergency', value: '+91 12345 67892' }
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Addresses',
    details: [
      { label: 'General Info', value: 'info@sunriseschool.com' },
      { label: 'Admissions', value: 'admissions@sunriseschool.com' },
      { label: 'Principal', value: 'principal@sunriseschool.com' }
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: MapPinIcon,
    title: 'Address',
    details: [
      { label: 'Street', value: '123 Education Street' },
      { label: 'City', value: 'Knowledge City, State 12345' },
      { label: 'Country', value: 'India' }
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: ClockIcon,
    title: 'Office Hours',
    details: [
      { label: 'Monday - Friday', value: '8:00 AM - 4:00 PM' },
      { label: 'Saturday', value: '9:00 AM - 1:00 PM' },
      { label: 'Sunday', value: 'Closed' }
    ],
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
]

const departments = [
  {
    icon: AcademicCapIcon,
    title: 'Admissions Office',
    description: 'For enrollment inquiries, application process, and admission requirements.',
    contact: 'admissions@sunriseschool.com',
    phone: '+91 12345 67891'
  },
  {
    icon: UserGroupIcon,
    title: 'Student Affairs',
    description: 'For student support, counseling, and extracurricular activities.',
    contact: 'studentaffairs@sunriseschool.com',
    phone: '+91 12345 67893'
  }
]

export default function ContactInfo() {
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
            Contact <span className="gradient-text">Information</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with us through any of the following methods. 
            We're here to help and answer your questions.
          </p>
        </motion.div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <info.icon className={`w-8 h-8 ${info.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                {info.title}
              </h3>
              <div className="space-y-2">
                {info.details.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    <p className="text-sm text-gray-600 font-medium">{detail.label}</p>
                    <p className="text-gray-900 font-semibold break-all text-sm">{detail.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Departments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Department Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="card p-8 group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                    <dept.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {dept.title}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {dept.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <EnvelopeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700 break-all text-sm">{dept.contact}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <PhoneIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{dept.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Response Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Quick Response Times</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We understand the importance of timely communication. Here's how quickly you can expect to hear from us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2h</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone Calls</h4>
              <p className="text-gray-600">During office hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">24h</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Response</h4>
              <p className="text-gray-600">Within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">48h</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Complex Inquiries</h4>
              <p className="text-gray-600">Detailed responses</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
