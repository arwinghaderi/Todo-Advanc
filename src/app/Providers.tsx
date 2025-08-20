// app/Providers.tsx
'use client'

import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/Redux/store'
import { setUser } from '@/Redux/stores/user'
import { User } from '@/types/module'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, Bounce } from 'react-toastify'

const queryClient = new QueryClient()

export default function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser: User | null
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <HydrateUser user={initialUser} />
        <div id="modal-root"></div>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </Provider>
    </QueryClientProvider>
  )
}

function HydrateUser({ user }: { user: User | null }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) dispatch(setUser(user))
  }, [user])

  return null
}
