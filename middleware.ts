import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Instancia del middleware de next-intl
const intlMiddleware = createIntlMiddleware(routing);

// Rutas protegidas por autenticación
const restrictedRoutes = ['/admin', '/reservas/reservation-list', '/reservation-list'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Evitamos afectar rutas de API, archivos estáticos y similares
  const isApiOrStatic =
    pathname.startsWith('/api') ||
    pathname.startsWith('/trpc') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.') // archivos estáticos como .js, .css, .png

  if (isApiOrStatic) {
    return NextResponse.next(); // no se aplica middleware
  }

  // Ejecutamos el middleware de internationalization
  const intlResponse = intlMiddleware(request);

  // Verificamos si es una ruta protegida
  if (restrictedRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    const token = request.cookies.get('authUser')?.value;
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(token, secretKey);
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // next-intl: todo menos API y estáticos
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',

    // rutas protegidas
    '/admin/:path*',
    '/reservas/reservation-list',
    '/reservas/reservation-list/:path*'
  ]
};




// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const restrictedRoutes = ['/admin', '/reservas/reservation-list', '/reservation-list'];
//   const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

//   try {
//     if (restrictedRoutes.some(route => pathname === route || pathname.startsWith(route))) {
//       const token = request.cookies.get("authUser")?.value;

//       if (!token) {
//         //console.log("Token no encontrado");
//         return NextResponse.redirect(new URL("/login", request.url));
//       }

//       // Verificar el token
//       try {
//         await jwtVerify(token, secretKey);
//         //console.log("Token válido");

//       } catch (error) {
//         console.error("Error al verificar el token:", error);
//         return NextResponse.redirect(new URL("/login", request.url));
//       }
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Middleware Error:", error);
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

// export const config = {
//   matcher: ['/admin/:path*', "/reservas/reservation-list", "/reservas/reservation-list/:path*"],
// };
