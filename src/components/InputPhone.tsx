import images from 'assets/images'
import clsx from 'clsx'
import React from 'react'

interface InputPhoneProps {
  className?: string
  label?: string
  placeholder?: string
  name: string
  value: string | number
  maxLength?: number
  error?: string
  onChange: (e: any) => void
}

export const InputPhone: React.FC<InputPhoneProps> = ({
  className,
  label,
  placeholder,
  name,
  value,
  maxLength = 13,
  error,
  onChange,
}) => {
  const handleOnChange = (e: any) => {
    const { name, value } = e.target
    let val = value
    if (value[0] === '0' || value[0] !== '8') {
      val = value.substring(1)
    }
    onChange({ name: name, value: val })
  }
  return (
    <div className={clsx('text-sm', className)}>
      {label && (
        <div className='font-semi-bold text-neutral-30 mb-2'>{label}</div>
      )}

      <div className='relative'>
        <div className='absolute translate-y-[-50%] top-1/2 border-r border-neutral-10 px-3 py-1'>
          {'+62'}
        </div>
        <input
          className={`appearance-none focus:outline-none w-full rounded-md border border-neutral-20 bg-white focus:border-active pl-16 pr-3 py-3
            ${error ? '!border-error' : ''}`}
          type='tel'
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => handleOnChange(e)}
          autoComplete='off'
        />
      </div>

      {error && (
        <div className='flex items-center mt-1 ml-1'>
          <img className='w-3 h-3' src={images.ic_invalid} alt='' />
          <div className='text-error text-xs ml-1'>{error}</div>
        </div>
      )}
    </div>
  )
}
