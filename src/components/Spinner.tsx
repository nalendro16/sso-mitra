import clsx from 'clsx'
import React from 'react'

export const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        'w-6 h-6 rounded-full animate-spin border-x border-solid border-primary-base border-t-transparent',
        className
      )}
    ></div>
  )
}
