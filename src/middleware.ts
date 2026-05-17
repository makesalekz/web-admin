import { authMiddleware } from '@/lib/auth/middleware';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
