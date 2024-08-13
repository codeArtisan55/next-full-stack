// import { NextResponse } from 'next/server'
import  { NextRequest,NextResponse } from 'next/server'
 import {auth} from "@/auth"
 export { auth as middleware } from "@/auth" 
 // This function can be marked `async` if using `await` inside

export default auth((request:NextRequest) => {
  
  // req.auth
 })
 
// See "Matching Paths" below to learn more

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin','/dashboard/:path*',"/profile"],
}