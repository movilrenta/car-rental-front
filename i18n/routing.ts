import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['es', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'es',

  // Pathnames
  pathnames: {
    '/home': {
      en: '/',
      es: '/'
    },
    '/reservas': {
      en: '/booking',
      es: '/reservas'
    },
    '/empresas': {
      en: '/companies',
      es: '/empresas'
    },
    '/flota': {
      en: '/fleet',
      es: '/flota'
    },
    '/nosotros': {
      en: '/about',
      es: '/nosotros'
    },
    '/contacto': {
      en: '/contact',
      es: '/contacto'
    },
    '/ayuda': {
      en:'/help',
      es:'/ayuda'
    },
    '/ayuda/terminos-y-condiciones': {
      en:'/help/terms-and-conditions',
      es:'/ayuda/terminos-y-condiciones'
    },
    '/reservas/gracias': {
      en:'/booking/thanks',
      es:'/reservas/gracias'
    }
  }
});