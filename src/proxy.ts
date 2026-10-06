import { NextResponse, type NextRequest } from 'next/server';
import { locales } from '@/i18n/config';

// Redirects any path without a locale prefix (e.g. "/") to /es or /en based on the browser language.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  // First es/en in the browser's ordered list ("fr, en" -> en); anything else -> es
  const preferred = request.headers.get('accept-language')?.toLowerCase().split(',')
    .map((l) => l.trim().slice(0, 2)).find((l) => l === 'en' || l === 'es');
  request.nextUrl.pathname = `/${preferred ?? 'es'}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, icons, etc.)
  matcher: ['/((?!_next|api/|.*\\..*).*)'],
};
