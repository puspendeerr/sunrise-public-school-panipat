'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, AcademicCapIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/outline'

export default function AboutPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Sunrise Public School</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2008, Sunrise Public School has been committed to providing 
              quality education that nurtures young minds and prepares them for the future.
            </p>
            <p className="text-gray-600 mb-8">
              Our mission is to create a learning environment that fosters creativity, 
              critical thinking, and character development in every student.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserGroupIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">1200+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpenIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Subjects</div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Learn More
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <AcademicCapIcon className="w-24 h-24 mx-auto mb-4 text-blue-500" />
                <p className="text-lg">School Building Image</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}