import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/sessions'];
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

  // Redirect if trying to access a protected route without an access token
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // Redirect if trying to access a public route while already authenticated
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // Allow the request to proceed
  return NextResponse.next();
}
