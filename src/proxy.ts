import { NextResponse, type NextRequest } from 'next/server';
import { locales } from '@/i18n/config';

// Redirects any path without a locale prefix (e.g. "/") to /es or /en based on the browser language.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const prefersEnglish = request.headers.get('accept-language')?.toLowerCase().startsWith('en');
  request.nextUrl.pathname = `/${prefersEnglish ? 'en' : 'es'}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and any file with an extension (images, icons, etc.)
  matcher: ['/((?!_next|.*\\..*).*)'],
};
