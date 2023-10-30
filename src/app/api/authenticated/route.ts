import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionId = request.headers.get("sessionId");
  if (sessionId) {
    // If sessionId exists, set it as a cookie and redirect to root
    const response = NextResponse.redirect('/');
    response.cookies.set('sessionId', sessionId, {
      path: '/',
      httpOnly: true
    });
    return response;
  } else {
    // If sessionId doesn't exist, redirect to root with an error message
    return NextResponse.redirect('/?error=NoSessionId');
  }
}
