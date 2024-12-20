import '../css/style.css'

import { Inter } from 'next/font/google'

import Navbar from '../navbar'
import Footer from '../footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Movil Renta',
  description: 'Generated by create next app',
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
        <div>
            <Navbar />
            {children}
            <Footer />
            <Toaster/>
          </div>
  )
}
