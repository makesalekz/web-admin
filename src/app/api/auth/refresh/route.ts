import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token');
  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  // Stub: in production, proxy to Admin BFF POST /v1/auth/refresh
  return NextResponse.json({ accessToken: 'stub_new_access_token_jwt' });
}
