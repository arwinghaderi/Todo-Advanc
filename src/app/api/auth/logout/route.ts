// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { message: 'خروج از حساب با موفقیت انجام شد ✅' },
    { status: 200 }
  )

  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  })

  return response
}
