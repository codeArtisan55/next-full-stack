"use client"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//  export { auth as middleware } from "@/auth"
// This function can be marked `async` if using `await` inside
 export default async function middleware(request: NextRequest) {
  // List of methods and properties available in the `request` object:
  //
  // Methods:
  // - request.json(): Promise<any>
  // - request.text(): Promise<string>
  // - request.arrayBuffer(): Promise<ArrayBuffer>
  // - request.blob(): Promise<Blob>
  // - request.formData(): Promise<FormData>
  //
  // Properties:
  // - request.url: string
  // - request.method: string
  // - request.headers: Headers
  // - request.cookies: Cookies
  // - request.body: ReadableStream<Uint8Array> | null
  // - request.bodyUsed: boolean
  // - request.referrer: string
  // - request.referrerPolicy: ReferrerPolicy
  // - request.mode: RequestMode
  // - request.credentials: RequestCredentials
  // - request.cache: RequestCache
  // - request.redirect: RequestRedirect
  // - request.integrity: string
  // - request.keepalive: boolean
  // - request.signal: AbortSignal
  // - request.destination: RequestDestination
  // - request.clone(): Request

  // List of methods and properties available in the `response` object:
  //
  // Methods:
  // - response.json(): Response
  //   Creates a new Response object with the provided JSON data.
  // - response.text(): Response
  //   Creates a new Response object with the provided text data.
  // - response.redirect(url: string, status?: number): Response
  //   Creates a new Response object that redirects to the specified URL with an optional status code.
  // - response.error(): Response
  //   Creates a new Response object indicating a network error.
  // - response.rewrite(url: string): Response
  //   Creates a new Response object that rewrites the request to the specified URL.
  // - response.next(): Response
  //   Creates a new Response object that allows the request to continue to the next middleware or handler.
  //
  // Properties:
  // - response.headers: Headers
  //   Represents the headers of the response.
  // - response.status: number
  //   Represents the status code of the response.
  // - response.statusText: string
  //   Represents the status text of the response.
  // - response.ok: boolean
  //   Indicates whether the response was successful (status in the range 200-299).
  // - response.redirected: boolean
  //   Indicates whether the response is the result of a redirection.
  // - response.type: ResponseType
  //   Represents the type of the response (e.g., basic, cors, error, opaque, opaqueredirect).
  // - response.url: string
  //   Represents the URL of the response.
  // - response.body: ReadableStream<Uint8Array> | null
  //   Represents the body of the response as a readable stream.
  // - response.bodyUsed: boolean
  //   Indicates whether the body has been read.
  // - response.clone(): Response
  //   Creates a clone of the response object.
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