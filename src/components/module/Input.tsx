import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: React.ReactNode
  label?: string
  wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, error, label, className, placeholder, wrapperClassName, ...rest },
    ref
  ) => {
    return (
      <div className={`w-full ${wrapperClassName || ''}`}>
        {label && (
          <label
            htmlFor={rest.id}
            className="block mb-1 font-medium text-white"
          >
            {label}
          </label>
        )}

        <div className={`relative flex items-center gap-2`}>
          {icon && <span className="text-xl text-white">{icon}</span>}

          <input
            ref={ref}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg bg-white text-black placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              error ? 'border border-red-600' : ''
            } ${className || ''}`}
            {...rest}
          />
        </div>

        {error && (
          <span className="mt-2 block  font-extrabold text-sm text-red-800 ">
            {error}
          </span>
        )}
      </div>
    )
  }
)

export default Input
