import { Device } from '@capacitor/device'
import images from 'assets/images'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { formatRupiah } from 'utils/formatRupiah'

interface InputCurrencyProps {
  className?: string
  length?: number
  label?: string
  error?: string
  name?: string
  type?: string
  value: any
  onChange: (e: any) => void
}

export const InputCurrency: React.FC<InputCurrencyProps> = ({
  className,
  length = 13,
  label,
  value,
  name,
  type,
  error,
  onChange,
}) => {
  const [isIos, setCheckIos] = useState<boolean>(false)
  const handleKeydown = (e: any) => {
    onChange(formatRupiah(e.target.value))
    e.target.value = formatRupiah(e.target.value)
  }

  useEffect(() => {
    getDeviceInfo()
  }, [])

  const getDeviceInfo = async () => {
    const info = await Device.getInfo()
    if (info.operatingSystem === 'ios') {
      setCheckIos(true)
    } else {
      setCheckIos(false)
    }
  }

  return (
    <div className={clsx('flex flex-col justify-between mt-4', className)}>
      {label && <p>{label}</p>}

      <div className='w-full flex justify-start items-center bg-neutral-10 rounded-lg'>
        <div className='ml-4 pr-3 flex items-center border-neutral-20 mr-2 border-r-2'>
          Rp.
        </div>
        <input
          placeholder='Masukan total anggaran'
          type={type}
          className={`${
            isIos && 'border border-neutral-20'
          } p-2 bg-neutral-10 appearance-none focus:outline-none `}
          name={name}
          autoComplete='off'
          onChange={handleKeydown}
          value={value}
          maxLength={length}
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
