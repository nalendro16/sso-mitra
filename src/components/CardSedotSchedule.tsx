import clsx from 'clsx'

interface CardSedotScheduleProps {
  className?: string
  history?: boolean
}
export const CardSedotSchedule: React.FC<CardSedotScheduleProps> = ({
  className,
  history,
}) => {
  return (
    <div
      className={clsx(
        `rounded-md bg-white outline outline-1 outline-neutral-10 p-4 text-sm mb-2 ${
          history ? 'h-32' : 'h-24'
        }`,
        className
      )}
    >
      {history && (
        <div className='flex justify-between mb-2'>
          <div className='text-neutral-30 text-sm'>{'13 Juni 2023'}</div>
          <div className='text-primary-darker font-bold'>{'#D8FF2FDG'}</div>
        </div>
      )}
      <div className='flex justify-between mb-2'>
        <div className='text-primary-base'>
          {'Layanan sedot '}
          <span className='text-primary-darker font-bold'>{'Rumah'}</span>
        </div>

        {!history && (
          <div className='text-primary-darker font-bold'>{'13 Juni 2023'}</div>
        )}
      </div>
      <div className='line-clamp-2'>
        {'Jl. Gajah Mada No. 18, Genteng, Banyuwangi 68465'} Lorem ipsum dolor
        sit, amet consectetur.
      </div>
    </div>
  )
}
