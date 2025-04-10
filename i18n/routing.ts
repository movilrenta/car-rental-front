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
    '/reservas/confirmar': {
      en: '/booking/confirm',
      es: '/reservas/confirmar'
    },
    '/reservas/payments': {
      en: '/booking/payments',
      es: '/reservas/pagos'
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
    '/ayuda/terminos-y-condiciones': {
      en: '/terms-and-conditions',
      es: '/ayuda/terminos-y-condiciones'
    },
    '/ayuda': {
      en: '/safety-tips',
      es: '/ayuda'
    }
  }
});