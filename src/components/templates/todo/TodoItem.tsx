import { FaCheckCircle, FaTrash } from 'react-icons/fa'

export default function Item({ text }: { text: string }) {
  return (
    <li className="bg-white  w-full text-black text-lg flex justify-between items-center px-4 py-2 rounded-full mb-2 transition-all">
      <span className="flex-1 text-right">{text}</span>
      <div className="flex gap-2">
        <button className="bg-yellow-400 cursor-pointer text-white px-4 py-2 rounded-full flex items-center justify-center">
          <FaCheckCircle className="pointer-events-none" />
        </button>
        <button className="bg-gray-400  cursor-pointer text-white px-4 py-2 rounded-full flex items-center justify-center">
          <FaTrash className="pointer-events-none" />
        </button>
      </div>
    </li>
  )
}
