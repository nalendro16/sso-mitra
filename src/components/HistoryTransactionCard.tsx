import clsx from 'clsx'

interface HistoryTransactionCardProps {
  className?: string
  history?: boolean
}
export const HistoryTransactionCard: React.FC<HistoryTransactionCardProps> = ({
  className,
  history,
}) => {
  return (
    <div
      className={clsx(
        `bg-white border-b border-1 border-b-neutral-10 p-4 text-sm mb-2`,
        className
      )}
    >
      <div className='mb-2'>
        <div className='text-primary-darker font-bold'>{'#D8FF2FDG'}</div>
        <div className='text-neutral-30 text-sm'>{'13 Juni 2023'}</div>
      </div>
      <div className='flex justify-between mb-2'>
        <div className='text-primary-base'>
          {'Layanan sedot '}
          <span className='text-primary-darker font-bold'>{'Rumah'}</span>
        </div>
        <div className='text-primary-base font-bold'>{'Rp. 500.000'}</div>
      </div>
      <div className='line-clamp-2'>
        {'Jl. Gajah Mada No. 18, Genteng, Banyuwangi 68465'} Lorem ipsum dolor
        sit, amet consectetur.
      </div>
    </div>
  )
}
