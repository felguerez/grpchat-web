import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const headersObject = {};
  request.headers.forEach((value, name) => {
    // @ts-ignore
    headersObject[name] = value;
  });
  const url = new URL(request.nextUrl);
  const sessionId = url.searchParams.get("sessionId");

  // Generate an absolute URL for redirect
  const host = request.headers.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const rootUrl = `${protocol}://${host}`;
  console.log('rootUrl  :', );

  if (sessionId) {
    // If sessionId exists, set it as a cookie and redirect to root
    const response = NextResponse.redirect(`${rootUrl}/`, 302);
    response.cookies.set("sessionId", sessionId, {
      path: "/",
      // other cookie options like secure, httpOnly, etc.
    });
    return response;
  } else {
    // If sessionId doesn't exist, redirect to root with an error message
    return NextResponse.redirect(`${rootUrl}/?error=NoSessionId`, 302);
  }
}
