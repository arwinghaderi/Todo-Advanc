'use client'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'

const options = [
  { value: 'all', label: 'همه' },
  { value: 'completed', label: 'انجام‌شده' },
  { value: 'incomplete', label: 'انجام‌نشده' },
]

export default function CustomSelect() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])

  const handleSelect = (option: typeof selected) => {
    setSelected(option)
    setOpen(false)
  }

  return (
    <div className="relative w-full md:w-[10rem]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="appearance-none bg-white text-yellow-400 px-4 py-2  rounded-xl w-full text-right flex justify-between items-center relative"
      >
        <span className="flex-1 text-right  font-bold pr-4">{selected.label}</span>

        <div className="absolute inset-y-0 left-0 w-10 bg-yellow-400 rounded-l-xl flex items-center justify-center pointer-events-none">
          <FaChevronDown
            className={`text-white text-sm transition-transform duration-300 ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>

      {open && (
        <ul className="absolute top-full right-0 mt-2 w-full bg-white rounded-xl shadow-lg z-10 overflow-hidden border border-yellow-200">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 font-bold text-right cursor-pointer transition-all
                ${
                  selected.value === option.value
                    ? 'bg-yellow-100 text-black '
                    : ' text-black '
                }
                hover:bg-yellow-50 hover:text-yellow-500`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
