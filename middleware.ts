import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/sessions', '/products'];
const publicRoutes = [
  '/',
  '/signup',
  '/confirm-account',
  '/forgot-password', // Added leading slash
  '/reset-password', // Added leading slash
  '/verify-mfa', // Added leading slash
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const accessToken = req.cookies.get('accessToken')?.value;

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}
