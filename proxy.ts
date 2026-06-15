import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Next.js 16 Proxy convention
export default function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Static files (e.g. /_next, /favicon.ico, /logo.png, etc.)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match the root and locale-prefixed routes
    '/',
    '/(en|he|ar)/:path*'
  ]
};
