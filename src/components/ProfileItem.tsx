import images from 'assets/images'
import clsx from 'clsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatedDiv } from './AnimatedDiv'

interface ProfileItemProps {
  className?: string
  iconClassName?: string
  item: {
    label: string
    icon: string
    to?: string
  }
  onClick?: () => void
}

export const ProfileItem: React.FC<ProfileItemProps> = ({
  className,
  iconClassName,
  item,
  onClick,
}) => {
  return (
    <AnimatedDiv
      className={clsx(
        'bg-white flex items-center justify-between py-2',
        className
      )}
      onClick={onClick}
    >
      <div className='flex items-center'>
        <div
          className={clsx(
            'flex items-center justify-center h-10 w-10 rounded-xl mr-3 bg-neutral-0',
            iconClassName
          )}
        >
          <img src={item.icon} alt='' className='!p-3' />
        </div>
        <div className='font-semi-bold text-primary-darker text-sm'>
          {item.label}
        </div>
      </div>
      <img src={images.ic_stroke_right} alt='' className='mr-2' />
    </AnimatedDiv>
  )
}
