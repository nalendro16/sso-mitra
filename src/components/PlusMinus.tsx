import images from 'assets/images'
import clsx from 'clsx'
import { Button } from 'components'
import React, { useEffect, useState } from 'react'

interface PlusMinusProps {
  className?: string
  value: number | undefined
  max?: number
  min?: number
  isLimited?: boolean
  disabled?: boolean
  onChange: (e: any) => void
}

export const PlusMinus: React.FC<PlusMinusProps> = ({
  className,
  value,
  max = 999,
  min = 0,
  isLimited,
  disabled,
  onChange,
}) => {
  const [sValue, setValue] = useState<number | null>()

  const increaseValue = () => {
    if (sValue === max) return

    if (!sValue) {
      onChange(min)
    } else {
      onChange(sValue + 1)
    }
  }

  const decreaseValue = () => {
    if (!sValue) return
    if (sValue === min) return
    onChange(sValue - 1)
  }

  const handleOnChange = (e: string) => {
    if (isLimited) {
      onChange(max)
      return
    }

    if (e === '') {
      onChange(e)
      return
    }
    if (!isNaN(parseInt(e, 10))) {
      onChange(parseInt(e, 10))
      return
    }

    onChange(Number(e))
  }

  const handleOnBlur = (e: string) => {
    if (e === '' || Number(e) < min || Number(e) > max) {
      onChange(min)
      return
    }
    if (!isNaN(parseInt(e, 10))) {
      onChange(parseInt(e, 10))
      return
    }
    onChange(Number(e))
  }

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      <Button
        className='rounded-full !p-0 h-0'
        iconClassName='w-6 h-6'
        icon={disabled ? images.ic_minus_grey : images.ic_minus_white}
        disabled={value ? value <= min : false}
        onClick={disabled ? () => void 0 : () => decreaseValue()}
      />
      <input
        className='appearance-none focus:outline-none w-8 text-center rounded border border-neutral-20 text-sm py-px'
        type='number'
        value={value}
        onChange={({ target }) => handleOnChange(target.value)}
        onBlur={({ target }) => handleOnBlur(target.value)}
      />
      <Button
        className='rounded-full !p-0 !h-0'
        iconClassName='w-6 h-6'
        icon={disabled ? images.ic_plus_grey : images.ic_plus_yellow}
        disabled={value ? value >= max : false}
        onClick={disabled ? () => void 0 : () => increaseValue()}
      />
    </div>
  )
}
