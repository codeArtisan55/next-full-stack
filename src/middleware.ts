"use client"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';

//  export { auth as middleware } from "@/auth"
// This function can be marked `async` if using `await` inside
 export default async function middleware(request: NextRequest) { 
   // study why export every route
  const Cookie=cookies().get("authjs.session-token")


 const {pathname}=request.nextUrl

 const publicPath=pathname==="/signup" || pathname==="/signin" || pathname==="/verify-code"


 if(Cookie && publicPath){
   return NextResponse.redirect(new URL('/dashboard', request.url))
 }
 if(!Cookie && !publicPath){
   return NextResponse.redirect(new URL('/', request.url))
 }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin','/dashboard/:path*',"/profile"],
}