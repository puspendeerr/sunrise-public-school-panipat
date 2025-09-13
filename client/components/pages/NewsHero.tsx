'use client'

export default function NewsHero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg">
            News & Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto leading-relaxed">
            Stay updated with the latest news, events, and happenings at our school.
          </p>
        </div>
      </div>
    </section>
  )
}