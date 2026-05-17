import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Stub: in production, proxy to Admin BFF POST /v1/auth/phone or /v1/auth/code
  if (body.code) {
    // Step 2: verify OTP code
    const response = NextResponse.json({
      accessToken: 'stub_access_token_jwt',
      user: { id: 1, name: 'Admin', phone: body.phone, role: 'platform_admin' },
    });
    response.cookies.set('refresh_token', 'stub_refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return response;
  }

  // Step 1: send OTP
  return NextResponse.json({ userId: 1, message: 'OTP sent' });
}
