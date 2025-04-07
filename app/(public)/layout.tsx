import '../css/style.css'

import { Inter } from 'next/font/google'

import Navbar from '../navbar'
import Footer from '../footer'
import { Toaster } from '@/components/ui/toaster'
import AdminButton from '../admin-button'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    template: "%s | Movil Renta",
    default: "Movil Renta",
  },
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
            <AdminButton />
            <Toaster/>
          </div>
  )
}
