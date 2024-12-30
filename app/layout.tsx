import './css/style.css'

import { Inter } from 'next/font/google'
import Theme from './theme-provider'
import AppProvider from './app-provider'
import { Toaster } from '@/components/ui/toaster'
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: "%s | Movil Renta",
    default: "Movil Renta",
  },
  icons: {
    icon: "/apple-icon-60x60.png", // Ruta del favicon
    shortcut: "/apple-icon-60x60.png", // Para navegadores que usan el tipo "shortcut icon"
    apple: "/apple-icon-60x60.png", // Icono para dispositivos Apple si es necesario
  },
  description:
    "Movil Renta ofrece servicios de alquiler de vehículos con más de 50 años de experiencia. Garantizamos seguridad, calidad y atención personalizada para satisfacer las necesidades de nuestros clientes.",
  authors: {
    name: "Smart Solutions",
  },
  keywords: [
    "alquiler de vehículos", "renta de autos", "Movil Renta", "seguridad", "calidad", "flota nueva", "atención personalizada", "seguro automotriz",
  ],
  openGraph: {
    title: "Movil Renta - Líderes en Alquiler de Vehículos desde 1971",
    description: 
      "Más de 50 años de experiencia nos posicionan como pioneros en el alquiler de vehículos. Descubre un servicio fácil, rápido, seguro y económico.",
    url: "https://car-movilrenta.vercel.app/",
    siteName: "Movil Renta | Rent a car",
    images: [
      {
        url: "https://car-movilrenta.vercel.app/brand.png",
        width: 1200,
        height: 630,
        alt: "Vista previa de Movil Renta | Rent a Car",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movil Renta - Líderes en Alquiler de Vehículos desde 1971',
    description:
      'En Movil Renta, ofrecemos vehículos nuevos, seguros y mantenidos con estándares de calidad superiores. Reserva hoy mismo.',
    images: ['/apple-icon-60x60.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = 'width=device-width, initial-scale=1';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable}`} suppressHydrationWarning>{/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body className="font-inter antialiased bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        <Theme>
          <AppProvider>
            
            {children}
            <Toaster/>
            
          </AppProvider>
        </Theme>
      </body>
    </html>
  )
}
