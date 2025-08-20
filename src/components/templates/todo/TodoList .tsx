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
  const filter = useSelector((state: RootState) => state.todos.filter)
  const todos = useSelector((state: RootState) => state.todos.todos)

  const queryFn = useMemo(() => {
    return () => dispatch(getTodos()).unwrap()
  }, [dispatch])

  const { isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn,
  })

  if (isLoading) return <p>در حال دریافت...</p>
  if (error) return <p>خطا در دریافت داده‌ها</p>

  const validTodos = Array.isArray(todos)
    ? todos.filter(
        (todo): todo is Todo =>
          typeof todo?.todo === 'string' && typeof todo?.id !== 'undefined'
      )
    : []

  const filteredTodos = validTodos.filter((todo) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'incomplete') return !todo.completed
    return true
  })

  return (
    <section className="w-full px-4">
      <h2 className="font-extrabold text-4xl mb-6 text-center">لیست تودوها</h2>
      <div className="flex justify-center items-center">
        <ul className="w-full md:w-1/2 list-none">
          {filteredTodos.map((todo) => (
            <Item key={`todo-${todo.id}`} todo={todo} />
          ))}
        </ul>
      </div>
    </section>
  )
}
