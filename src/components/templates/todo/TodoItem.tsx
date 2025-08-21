import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/Redux/store'
import { removeTodo, toggleTodo } from '@/Redux/stores/todo'
import { Todo } from '@/types/todo'

interface ItemProps {
  todo: Todo
  dragHandleProps?: any
}

export default function Item({ todo, dragHandleProps }: ItemProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    dispatch(removeTodo(todo))
  }

  const handleToggle = () => {
    dispatch(toggleTodo(todo))
  }

  return (
    <li
      className={`bg-white text-black text-lg flex justify-between items-center px-4 py-2 rounded-full mb-2 transition-all ${
        todo.completed ? 'line-through opacity-60' : ''
      }`}
    >
      <span className="flex-1 text-right">{todo.todo}</span>

      <div className="flex gap-2 items-center">
        <button
          onClick={handleToggle}
          className={`cursor-pointer ${
            todo.completed ? 'bg-green-600' : 'bg-yellow-400'
          } text-white px-4 py-2 rounded-full flex items-center justify-center`}
        >
          <FaCheckCircle className="text-xl pointer-events-none" />
        </button>

        <button
          onClick={handleDelete}
          className="bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-full flex items-center justify-center"
        >
          <FaTrashAlt className="text-xl pointer-events-none" />
        </button>

        <span
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing px-2 text-indigo-600 text-xl"
          title="برای جابجایی بکشید"
        >
          ⠿
        </span>
      </div>
    </li>
  )
}
