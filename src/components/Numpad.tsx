import images from 'assets/images'
import React from 'react'

interface NumpadProps {
  className?: string
  onClick: (e: any) => void
  onDelete: () => void
}

const number_list = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  images.ic_backspace,
]

export const Numpad: React.FC<NumpadProps> = ({
  className,
  onClick,
  onDelete,
}) => {
  const handleOnClick = (item: string) => {
    if (/^[0-9]/.test(item)) {
      onClick(item)
    } else {
      onDelete()
    }
  }

  return (
    <div className={className}>
      <div className='grid grid-cols-3 gap-4 font-semi-bold text-2xl'>
        {number_list.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center rounded hover:bg-primary-lightest h-auto aspect-square last:col-start-3 ${
              item === '0' ? 'col-start-2' : ''
            }`}
            onClick={() => handleOnClick(item)}
          >
            {index === number_list.length - 1 ? (
              <img src={item} alt='' className='w-6 h-6' />
            ) : (
              item
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
