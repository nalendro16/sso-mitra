import clsx from 'clsx'

interface CardSedotScheduleProps {
  className?: string
  history?: boolean
  data?: {
    address: string
    description: string
    id_transaction: number
    name: string
    postal_code: string
    time_by_admin: string
    subdistrict?: string
    district?: string
    city?: string
    province?: string
  }
}
export const CardSedotSchedule: React.FC<CardSedotScheduleProps> = ({
  className,
  history,
  data,
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
          <div className='text-neutral-30 text-sm'>
            {data?.time_by_admin || '13 Juni 2023'}
          </div>
          <div className='text-primary-darker font-bold'>
            {data?.id_transaction || '#D8FF2FDG'}
          </div>
        </div>
      )}
      <div className='flex justify-between mb-2'>
        <div className='text-primary-base'>
          {'Layanan sedot '}
          <span className='text-primary-darker font-bold'>
            {data?.name || 'Rumah'}
          </span>
        </div>

        {!history && (
          <div className='text-primary-darker font-bold'>
            {data?.time_by_admin || '13 Juni 2023'}
          </div>
        )}
      </div>
      <div className='line-clamp-2'>
        {`${data?.address ? `${data?.address},` : ''} ${
          data?.subdistrict ? `${data?.subdistrict},` : ''
        } ${data?.district ? `${data?.district},` : ''} ${
          data?.city ? `${data?.city},` : ''
        } ${data?.province ? `${data?.province},` : ''}`}
        {data?.postal_code ? data?.postal_code : ''}
      </div>
    </div>
  )
}
