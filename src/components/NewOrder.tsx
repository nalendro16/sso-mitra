import clsx from 'clsx'
import { Button } from './Button/Button'

interface NewOrderProps {
  className?: string
  data: {
    title: string
    address: string
    isActive: boolean
    id: number
  }
}

export const NewOrder: React.FC<NewOrderProps> = ({ className, data }) => {
  return (
    <div
      className={clsx(
        `outline-1 outline outline-neutral-10 rounded-lg h-36 px-4 py-3 shadow-md`,
        className
      )}
    >
      <div className='!font-bold text-sm text-primary-darker'>
        {data?.title}
      </div>
      <div className='line-clamp-3 mt-2 mb-4'>{data?.address}</div>
      <div className='flex justify-between mb-2 gap-2'>
        <Button
          onClick={() => console.log('clicked')}
          label='Detail Order'
          className='btn-primary w-full'
        />
      </div>
    </div>
  )
}
