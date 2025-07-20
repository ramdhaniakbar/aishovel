import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Check if user has session by looking for auth cookies
  const hasSession = req.cookies.has('sb-access-token') || 
                    req.cookies.has('supabase-auth-token') ||
                    req.cookies.has('supabase.auth.token')

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/course/private',
    '/admin'
  ]

  // Define auth routes that should redirect if user is already logged in
  const authRoutes = ['/auth']

  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )
  
  const isAuthRoute = authRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute && !hasSession) {
    const redirectUrl = new URL('/auth', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated and trying to access auth routes, redirect to home
  if (isAuthRoute && hasSession) {
    const redirectPath = req.nextUrl.searchParams.get('redirect') || '/'
    return NextResponse.redirect(new URL(redirectPath, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}