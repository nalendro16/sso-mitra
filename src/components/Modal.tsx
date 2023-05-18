import clsx from 'clsx'
import React from 'react'

interface ModalProps {
  dialogClassName?: string
  contentClassName?: string
  show: boolean
  onHide?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  children,
  dialogClassName,
  contentClassName,
  show,
  onHide,
}) => {
  const handleOnHide = () => {
    if (onHide) onHide()
  }

  return (
    <>
      <div
        className={`bg-secondary fixed top-0 left-0 z-[55] w-screen h-screen transition-opacity ease-linear duration-150 ${
          show ? 'opacity-50' : 'opacity-0 -z-[1] hidden'
        }`}
      />
      <div
        className={`fixed top-0 left-0 z-[60] w-full h-full transition-opacity ease-linear duration-150 ${
          show ? 'opacity-100' : 'opacity-0 -z-[1] hidden'
        }`}
        onClick={handleOnHide}
      >
        <div
          className={clsx(
            'flex items-center justify-center max-w-content h-screen mx-auto',
            dialogClassName
          )}
        >
          <div
            className={clsx('w-full', contentClassName)}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
