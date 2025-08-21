// app/layout.tsx
import { cookies } from 'next/headers'
import { makeStore } from '@/Redux/store'
import { fetchUserWithToken, setUser } from '@/Redux/stores/user'
import Providers from './Providers'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: ' TodoMaster ',
  description: 'در این صفحه می‌توانید وظایف جدید خود را ثبت و مدیریت کنید.',
  icons: {
    icon: [{ url: '/images.png', sizes: '64x64', type: 'image/png' }],
  },
}

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
  } else {
    store.dispatch(setUser(null))
  }

  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers initialUser={initialUser}>{children}</Providers>
      </body>
    </html>
  )
}
