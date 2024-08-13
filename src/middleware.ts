// import { NextResponse } from 'next/server'
import  { NextRequest,NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin','/dashboard/:path*',"/profile"],
}