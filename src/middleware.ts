import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.CARAPIS_APIKEY;

  // Proxy /media/* - Images and static files
  if (pathname.startsWith('/media/')) {
    const targetUrl = `${apiUrl}${pathname}${search}`;
    return NextResponse.rewrite(targetUrl);
  }

  // Proxy /apix/* - API endpoints with authentication
  if (pathname.startsWith('/apix/')) {
    const targetUrl = `${apiUrl}${pathname}${search}`;
    const headers = new Headers(request.headers);

    // Add API key for authenticated requests
    if (apiKey) {
      headers.set('X-API-Key', apiKey);
    }

    return NextResponse.rewrite(targetUrl, { request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/media/:path*', '/apix/:path*'],
};
