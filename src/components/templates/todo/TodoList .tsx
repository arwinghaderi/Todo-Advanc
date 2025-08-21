'use client'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getTodos, reorderTodos } from '@/Redux/stores/todo'
import { AppDispatch, RootState } from '@/Redux/store'
import { Todo } from '@/types/todo'
import Item from './TodoItem'
import Input from '../../module/Input'
import { FaSearch } from 'react-icons/fa'
import { useMemo, useState } from 'react'
import SortableItem from './SortableItem'

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

  const sensors = useSensors(useSensor(PointerSensor))

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

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = searchedTodos.findIndex((t) => t.id === active.id)
      const newIndex = searchedTodos.findIndex((t) => t.id === over?.id)
      const reordered = arrayMove(searchedTodos, oldIndex, newIndex)
      dispatch(reorderTodos(reordered))
    }
  }

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
          {isLoading ? (
            <li className="text-center text-white font-bold py-4">
              در حال دریافت...
            </li>
          ) : error ? (
            <li className="text-center text-red-500 font-bold py-4">
              خطا در دریافت داده‌ها
            </li>
          ) : searchedTodos.length === 0 ? (
            <li className="text-center text-white font-bold py-4">
              هیچ آیتمی برای نمایش وجود ندارد
            </li>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={searchedTodos.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {searchedTodos.map((todo) => (
                  <SortableItem key={todo.id} todo={todo} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </ul>
      </div>
    </section>
  )
}
