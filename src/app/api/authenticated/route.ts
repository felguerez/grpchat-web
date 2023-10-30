import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headersObject = {};
  request.headers.forEach((value, name) => {
    // @ts-ignore
    headersObject[name] = value;
  });
  const url = new URL(request.nextUrl);
  const sessionId = url.searchParams.get('sessionId');

  // Log headers
  console.log('Request headers:', headersObject);

  // Generate an absolute URL for redirect
  const host = request.headers.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const rootUrl = `${protocol}://${host}`;

  if (sessionId) {
    // If sessionId exists, set it as a cookie and redirect to root
    const response = NextResponse.rewrite(`${rootUrl}/`, {status: 302});
    response.cookies.set('sessionId', sessionId, {
      path: '/',
      // other cookie options like secure, httpOnly, etc.
    });
    response.headers.set('Location', `${rootUrl}/`);
    return response;
  } else {
    // If sessionId doesn't exist, redirect to root with an error message
    return NextResponse.redirect(`${rootUrl}/?error=NoSessionId`);
  }
}
