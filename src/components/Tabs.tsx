import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface TabItem {
  title: string
  key: string
  to: string
}
interface TabsProps {
  className?: string
  items: TabItem[]
  onClickTab?: (e: TabItem | any) => void
  indicatorActive?: string
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  items,
  onClickTab,
  indicatorActive,
}) => {
  const navigate = useNavigate()
  const { type } = useParams()
  const [widthIndicator, setWidthIndicator] = useState('0%')
  const [positionIndicator, setPositionIndicator] = useState('0%')

  useEffect(() => {
    let index = items.findIndex(
      (p) => p.key === type || p.key === indicatorActive
    )
    setPositionIndicator(`${(100 / items.length) * index}%`)
    setWidthIndicator(`${100 / items.length}%`)
  }, [items, type])

  const isActive = (key: string) => {
    if (type) return type === key
    return indicatorActive === key
  }

  const handleOnClick = (item: TabItem, index: number) => {
    setPositionIndicator(`${(100 / items.length) * index}%`)
    navigate(item.to, { replace: true })
    if (onClickTab) onClickTab(item)
  }

  return (
    <div
      className={clsx(
        'sticky flex flex-col z-40 h-[2.5rem] bg-white -mx-4',
        className
      )}
    >
      <div className='flex flex-1'>
        {items.map((item, index) => (
          <div
            key={item.key}
            className={`flex flex-1 items-center justify-center font-bold text-sm mx-4 hover:text-secondary transition duration-300 ${
              isActive(item.key) ? 'text-secondary' : 'text-black-lighter'
            }`}
            onClick={() => handleOnClick(item, index)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div
        className={`relative bg-secondary h-0.5 transition-all ease-in-out duration-300`}
        style={{ width: widthIndicator, left: positionIndicator }}
      />
    </div>
  )
}
