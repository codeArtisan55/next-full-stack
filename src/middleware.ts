"use client"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//  export { auth as middleware } from "@/auth"
// This function can be marked `async` if using `await` inside
 export default async function middleware(request: NextRequest) {
  const session=request.cookies.get("authjs.session-token")?.value
  const pathname=request.nextUrl.pathname
  const publicPath=pathname==="/signin" || pathname==="/signup" || pathname==="/verify-code"
  if(session && publicPath){
    return NextResponse.redirect(new URL("/dashboard",request.url))
  }
  if(!session && !publicPath){
    return NextResponse.redirect(new URL("/",request.url))
  }
   // study why export every route

}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin','/dashboard/:path*',"/profile"],
}