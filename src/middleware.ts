import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
export default async function middleware(request: NextRequest) {


}


export const config = {
  matcher: [ '/dashboard', '/u/:path*', '/signin', '/signup', '/verify-code'],
};
