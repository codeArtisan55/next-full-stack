import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
export default async function middleware(request: NextRequest) {
  const session = cookies().get("authjs.session-token");
  const decodedSession = await decode({
    token:session?.value,
    secret:process.env.SECRET!,
    salt:session?.name as string,

  })
  if(decodedSession){
    console.log("decodedSession", decodedSession);
    alert("decodedSession")

  }
alert("trying the middleware")
  const pathname = request.nextUrl.pathname;

  const publicPaths = ["/signin", "/signup", "/verify-code"];
  const isPublicPath = publicPaths.includes(pathname);

  if (decodedSession && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!decodedSession && !isPublicPath) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

}

export const config = {
  matcher: [ '/dashboard', '/u/:path*', '/signin', '/signup', '/verify-code'],
};
