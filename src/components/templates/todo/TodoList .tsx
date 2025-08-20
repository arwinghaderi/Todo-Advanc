'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '@/Redux/stores/todo'
import Item from './TodoItem'
import { useMemo } from 'react'
import { AppDispatch, RootState } from '../../../Redux/store'

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

  return (
    <>
      <h2 className="font-extrabold text-4xl">لیست تودوها</h2>
      <div className="flex justify-center w-2/3 items-center px-4">
        <ul className="w-full md:w-1/2 list-none">
          {todos.map((todo) => (
            <Item
              key={`todo-${todo.id}-${todo.userId ?? 'custom'}`}
              text={todo.todo}
              completed={todo.completed}
            />
          ))}
        </ul>
      </div>
    </>
  )
}
