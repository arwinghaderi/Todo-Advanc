'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '@/Redux/stores/todo'
import Item from './TodoItem'
import { useMemo, useState } from 'react'
import { AppDispatch, RootState } from '@/Redux/store'
import { Todo } from '@/types/todo'
import Input from '../../module/Input'
import { FaSearch } from 'react-icons/fa'


export default function List() {
  const dispatch = useDispatch<AppDispatch>()
  const filter = useSelector((state: RootState) => state.todos.filter)
  const todos = useSelector((state: RootState) => state.todos.todos)
  const [searchTerm, setSearchTerm] = useState('')

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

  const searchedTodos = filteredTodos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="w-full px-4">
      <h2 className="font-extrabold text-4xl mb-6 text-center">لیست تودوها</h2>

      <div className="flex justify-center items-center my-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="در بین برنامه خود جستجو کنید"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<FaSearch />}
            className="pl-10" 
          />
        </div>
      </div>

      <div className="flex justify-center items-center my-5">
        <ul className="w-full md:w-1/2 list-none">
          {searchedTodos.length === 0 ? (
            <li className="text-center text-white font-bold py-4">
              هیچ آیتمی برای نمایش وجود ندارد
            </li>
          ) : (
            searchedTodos.map((todo) => (
              <Item key={`todo-${todo.id}`} todo={todo} />
            ))
          )}
        </ul>
      </div>
    </section>
  )
}
