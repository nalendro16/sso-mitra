import images from 'assets/images'
import clsx from 'clsx'
import React from 'react'

interface InputProps {
  className?: string
  label?: string
  placeholder?: string
  type?: string
  inputClass?: string
  name: string
  value: string | number
  maxLength?: number
  rows?: number
  icon?: string
  error?: string
  isDisabled?: boolean
  labelClassName?: string
  onChange: (e: any) => void
}

export const Input: React.FC<InputProps> = ({
  className,
  inputClass,
  label,
  placeholder,
  type = 'text',
  name,
  value,
  maxLength,
  rows,
  icon,
  error,
  isDisabled,
  labelClassName,
  onChange,
}) => {
  const handleOnChange = (e: any) => {
    const { name, value } = e.target
    onChange({ name: name, value: value })
  }

  const handleOnKeyDown = (e: any) => {
    if (
      e.target.value.length >= e.target.maxLength &&
      e.key !== 'Backspace' &&
      type === 'number'
    ) {
      e.preventDefault()
    }
  }
  return (
    <div className={clsx('text-sm', className)}>
      {label && (
        <div
          className={clsx('font-medium text-black-light mb-2', labelClassName)}
        >
          {label}
        </div>
      )}
      {type === 'text-area' ? (
        <textarea
          className={`resize-none appearance-none focus:outline-none w-full rounded-md bg-neutral-10 focus:border-active ${
            icon ? 'pl-12 pr-3 py-3' : 'p-3'
          } ${error ? '!border-error' : ''}
          ${inputClass ? inputClass : ''}
          `}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleOnChange}
          disabled={isDisabled}
        />
      ) : (
        <div className='relative'>
          {icon && (
            <img
              className='absolute translate-y-1/2 left-3 w-6 h-6'
              src={icon}
              alt=''
            />
          )}
          <input
            className={`appearance-none focus:outline-none w-full rounded-md bg-neutral-10 focus:border-active ${
              icon ? 'pl-12 pr-3 py-3' : 'p-3'
            } ${error ? '!border-error' : ''}
            ${inputClass ? inputClass : ''}
            `}
            type={type}
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={handleOnChange}
            autoComplete='off'
            onKeyDown={handleOnKeyDown}
          />
        </div>
      )}
      {error && (
        <div className='flex items-center mt-1 ml-1'>
          <img className='w-3 h-3' src={images.ic_invalid} alt='' />
          <div className='text-error text-xs ml-1'>{error}</div>
        </div>
      )}
    </div>
  )
}
