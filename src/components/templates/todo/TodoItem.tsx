import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa'

interface ItemProps {
  text: string
  completed: boolean
}

export default function Item({ text, completed }: ItemProps) {
  return (
    <li
      className={`bg-white text-black text-lg flex justify-between items-center px-4 py-2 rounded-full mb-2 transition-all ${
        completed ? 'line-through opacity-60' : ''
      }`}
    >
      <span className="flex-1 text-right">{text.slice(0,50)}...</span>
      <div className="flex gap-2">
        <button className="bg-yellow-400 text-white px-4 py-2 rounded-full flex items-center justify-center">
          <FaCheckCircle className="text-xl pointer-events-none" />
        </button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded-full flex items-center justify-center">
          <FaTrashAlt className="text-xl pointer-events-none" />
        </button>
      </div>
    </li>
  )
}
