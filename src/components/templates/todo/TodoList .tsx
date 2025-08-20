'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '@/Redux/stores/todo'
import Item from './TodoItem'
import { useMemo } from 'react'
import { AppDispatch, RootState } from '@/Redux/store'
import { Todo } from '@/types/todo'

export default function List() {
  const dispatch = useDispatch<AppDispatch>()

  const queryFn = useMemo(() => {
    return async () => {
      const result = await dispatch(getTodos())

      if (getTodos.fulfilled.match(result)) {
        return result.payload
      }

      const errorMessage =
        typeof result.payload === 'object' &&
        result.payload !== null &&
        'message' in result.payload
          ? (result.payload as { message: string }).message
          : 'خطا در دریافت داده‌ها'

      throw new Error(errorMessage)
    }
  }, [dispatch])

  const { isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn,
  })

  const todos = useSelector((state: RootState) => state.todos.todos)

  if (isLoading) return <p>در حال دریافت...</p>
  if (error) return <p>خطا در دریافت داده‌ها</p>

  const validTodos = Array.isArray(todos)
    ? todos.filter(
        (todo): todo is Todo =>
          typeof todo?.todo === 'string' && typeof todo?.id !== 'undefined'
      )
    : []

  return (
    <section className="w-full px-4">
      <h2 className="font-extrabold text-4xl mb-6 text-center">لیست تودوها</h2>
      <div className="flex justify-center items-center">
        <ul className="w-full md:w-1/2 list-none">
          {validTodos.map((todo) => (
            <Item key={`todo-${todo.id}`} todo={todo} />
          ))}
        </ul>
      </div>
    </section>
  )
}
