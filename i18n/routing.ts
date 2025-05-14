import { defineRouting } from 'next-intl/routing';

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
    '/reservas/gracias': {
      en: '/booking/thanks',
      es: '/reservas/gracias'
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
      en: '/safety-tips',
      es: '/consejo-de-seguridad'
    },
    '/ayuda/terminos-y-condiciones': {
      en: '/help/terms-and-conditions',
      es: '/ayuda/terminos-y-condiciones'
    }
  }
});