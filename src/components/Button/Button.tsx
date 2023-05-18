import clsx from 'clsx'
import { Spinner } from 'components/Spinner'
import React from 'react'
import './Button.scss'

interface ButtonProps {
  className?: string
  iconClassName?: string
  label?: string
  icon?: string
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}
export const Button: React.FC<ButtonProps> = ({
  className,
  iconClassName,
  label,
  icon,
  onClick,
  disabled,
  isLoading,
}) => {
  const handleOnClick = (e: any) => {
    if (isLoading || disabled) return
    e.stopPropagation()
    onClick()
  }
  return (
    <div
      className={clsx(
        'flex items-center justify-center w-fit h-[3rem] font-semi-bold rounded-md py-3 px-4 transition duration-150 ease-in-out',
        className,
        disabled ? 'disabled' : ''
      )}
      onClick={handleOnClick}
    >
      {isLoading ? (
        <Spinner className='btn-spinner' />
      ) : (
        <>
          {icon && (
            <img
              className={clsx(`w-6 h-6 ${label ? 'mr-2' : ''}`, iconClassName)}
              src={icon}
              alt=''
            />
          )}
          {label}
        </>
      )}
    </div>
  )
}
