'use client'

import React from 'react'

type Props = {
  text: string
  type?: 'button' | 'submit'
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: () => void | Promise<void>
  className?: string
}

export default function Button({
  text,
  type = 'button',
  loading = false,
  disabled = false,
  icon,
  onClick,
  className = '',
}: Props) {
  const baseStyle =
    'w-full py-3  cursor-pointer  px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all bg-indigo-600 text-white shadow-md'
  const hoverStyle = 'hover:bg-indigo-700 hover:scale-[1.02]'
  const loadingStyle = 'opacity-50 cursor-not-allowed'

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyle} ${
        disabled || loading ? loadingStyle : hoverStyle
      } ${className}`}
    >
      {loading ? (
        <span className=" animate-pulse">در حال ارسال...</span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </>
      )}
    </button>
  )
}
