import clsx from 'clsx'
import { Button } from './Button/Button'
import images from 'assets/images'

interface AddressCardProps {
  className?: string
  data: {
    title: string
    address: string
    isActive: boolean
    id: number
  }
}

export const AddressCard: React.FC<AddressCardProps> = ({
  className,
  data,
}) => {
  return (
    <div
      className={clsx(
        `outline-1 outline outline-neutral-10 rounded-lg h-36 px-4 py-3 ${
          data?.isActive ? 'bg-neutral-10 !outline-neutral-20' : 'bg-white'
        }`,
        className
      )}
    >
      <div className='!font-bold text-primary-darker'>{data?.title}</div>
      <div className='line-clamp-3 mt-2 mb-4'>{data?.address}</div>
      <div className='flex justify-between mb-2 gap-2'>
        <Button
          onClick={() => console.log('clicked')}
          label='Ubah Alamat'
          className='btn-primary w-full'
        />
        <Button
          onClick={() => console.log('clicked')}
          icon={images.ic_setting_address}
          className='btn-primary'
          iconClassName='h-5'
        />
      </div>
    </div>
  )
}
