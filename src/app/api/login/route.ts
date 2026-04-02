import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId, password } = await request.json();

  if (userId === 'admin' && password === 'admin') {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('sqk_session', '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}