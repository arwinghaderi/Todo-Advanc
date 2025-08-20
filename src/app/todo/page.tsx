import TodoHeader from '@/components/templates/todo/TodoHeader '
import TodoList from '@/components/templates/todo/TodoList '
import TodoForm from '@/components/templates/todo/TodoForm '

export default function TodoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center gap-8 py-10 px-4">
      <TodoHeader />
      <TodoForm />
      <TodoList />
    </main>
  )
}
