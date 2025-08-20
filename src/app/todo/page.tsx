// app/todo/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import TodoHeader from '@/components/templates/todo/TodoHeader '
import TodoList from '@/components/templates/todo/TodoList '
import TodoForm from '@/components/templates/todo/TodoForm '

const TodoPage = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center gap-8 py-10 px-4">
      <TodoHeader />
      <TodoForm />
      <TodoList />
    </main>
  )
}

export default TodoPage
