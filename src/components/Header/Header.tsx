import images from 'assets/images'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.scss'
import clsx from 'clsx'

// interface iconItems {
//   icon: string
// }

interface HeaderPropss {
  label?: string
  onCloseClick?: (e: any) => void
  onBackClick?: (e: any) => void
  onHistoryClick?: (e: any) => void
  onShareClick?: (e: any) => void
  onFilterClick?: (e: any) => void
  onSecondarySearchClick?: (e: any) => void
  labelClassName?: string
  profile?: string
  icon?: { icon: string; to?: string }[]
  iconClassName?: string
  onIconClick?: (e: any) => void
  circled?: boolean
  className?: string
  backWhite?: boolean
}

export const Header: React.FC<HeaderPropss> = ({
  label,
  onCloseClick,
  onBackClick,
  onHistoryClick,
  onShareClick,
  onIconClick,
  onSecondarySearchClick,
  labelClassName,
  profile,
  icon,
  iconClassName,
  className,
  circled,
  backWhite,
}) => {
  const navigate = useNavigate()

  const handleOnItemClick = (to: any) => {
    navigate(to)
  }

  return (
    <div
      className={clsx(
        'component__header h-[60px] max-h-[60px] bg-white max-w-content fixed top-0 w-full flex flex-col justify-center z-50 px-4 py-2 -ml-4',
        className
      )}
    >
      <div className='safe-top flex items-center justify-between'>
        {onBackClick && (
          <img
            className={`${
              circled
                ? ''
                : backWhite
                ? 'w-6 h-6 ml-2.5'
                : 'w-[9px] h-[18px] ml-2.5'
            }`}
            src={
              circled
                ? images.ic_arrow_back_rounded
                : backWhite
                ? images.ic_arrow_back_white
                : images.ic_arrow_back
            }
            alt=''
            onClick={onBackClick}
          />
        )}

        {onCloseClick && (
          <img
            className='w-6 h-6 mr-6'
            src={images.ic_close}
            alt=''
            onClick={onCloseClick}
          />
        )}

        {profile && <img src={profile} className='h-8 w-8 mr-3' alt='' />}

        {label && (
          <div
            className={clsx(
              'flex-1 truncate font-semi-bold text-center pr-8',
              labelClassName
            )}
          >
            {label}
          </div>
        )}

        {icon &&
          icon?.map((item) => (
            <img
              src={item.icon}
              alt=''
              className={`mx-1.5 ,${iconClassName}`}
              onClick={item.to ? () => handleOnItemClick(item.to) : onIconClick}
            />
          ))}

        <div className='flex items-center relative'>
          {onHistoryClick && (
            <img
              className='w-6 h-6 ml-3'
              src={images.ic_history_active}
              alt=''
              onClick={onHistoryClick}
            />
          )}
          {onShareClick && (
            <img
              className='w-6 h-6 ml-3'
              src={images.ic_share}
              alt=''
              onClick={onShareClick}
            />
          )}
          {onSecondarySearchClick && (
            <img
              className='w-6 h-6 ml-3'
              src={images.ic_search}
              alt=''
              onClick={onShareClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}
