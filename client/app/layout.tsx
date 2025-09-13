import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sunrise Public School - Excellence in Education',
  description: 'A premier educational institution fostering academic excellence, character development, and holistic growth for students from diverse backgrounds.',
  keywords: 'school, education, CBSE, academics, admissions, sunrise public school',
  authors: [{ name: 'Sunrise Public School' }],
  openGraph: {
    title: 'Sunrise Public School - Excellence in Education',
    description: 'A premier educational institution fostering academic excellence, character development, and holistic growth.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}