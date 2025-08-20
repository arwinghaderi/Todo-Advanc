// app/layout.tsx
import { cookies } from 'next/headers'
import { makeStore } from '@/Redux/store'
import { fetchUserWithToken } from '@/Redux/stores/user'
import Providers from './Providers'
import './globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  const store = makeStore()
  let initialUser = null

  if (token) {
    await store.dispatch(fetchUserWithToken(token))
    const state = store.getState()
    initialUser = state.user.user
  }

  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers initialUser={initialUser}>{children}</Providers>
      </body>
    </html>
  )
}
