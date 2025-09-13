'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline'

const newsItems = [
  {
    id: 1,
    title: 'Annual Sports Day 2024',
    excerpt: 'Our annual sports day was a huge success with students participating in various athletic events.',
    date: '2024-12-15',
    author: 'Sports Department',
    image: '/images/news-1.jpg'
  },
  {
    id: 2,
    title: 'Science Fair Winners',
    excerpt: 'Congratulations to our students who won first place in the regional science fair competition.',
    date: '2024-12-10',
    author: 'Science Department',
    image: '/images/news-2.jpg'
  },
  {
    id: 3,
    title: 'New Library Opening',
    excerpt: 'We are excited to announce the opening of our new state-of-the-art library facility.',
    date: '2024-12-05',
    author: 'Administration',
    image: '/images/news-3.jpg'
  }
]

export default function NewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest <span className="text-blue-600">News & Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings and achievements at Sunrise Public School
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href="/news">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm">News Image</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <UserIcon className="w-4 h-4 mr-1" />
                      <span>{item.author}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/news"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All News
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}