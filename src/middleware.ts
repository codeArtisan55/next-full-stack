import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  const session = request.cookies.get("authjs.session-token")?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = ["/signin", "/signup", "/verify-code"];
  const isPublicPath = publicPaths.includes(pathname);

  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next(); // Allow request to proceed if no redirect is needed
}

export const config = {
  matcher: ['/signin', '/dashboard/:path*', '/profile'],
};
