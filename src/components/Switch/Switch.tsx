import clsx from 'clsx'
import React from 'react'
import './Switch.scss'

interface SwitchProps {
  className?: string
  name: string
  checked: boolean
  disabled?: boolean
  onChange: (e: any) => void
}
export const Switch: React.FC<SwitchProps> = ({
  className,
  name,
  disabled,
  checked,
  onChange,
}) => {
  const handleChange = (e: any) => {
    if (onChange) onChange(e)
  }

  // console.log(onChange)
  return (
    <label className={clsx('relative inline-block mb-0 w-8 h-4', className)}>
      <input
        className='toggle-checkbox opacity-0'
        type='checkbox'
        name={name}
        disabled={disabled}
        onChange={(e) => handleChange(e)}
        checked={checked}
      />
      <span className='slider absolute inset-0 bg-black-lighter rounded-full transition-300 before:absolute before:h-[calc(100%-2px)] before:w-[calc(50%-2px)] before:left-px before:bottom-px before:bg-white before:rounded-full'></span>
    </label>
  )
}
