import clsx from 'clsx'
import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'

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
    completed_at?: string
  }
  onClick: () => void
}
export const CardSedotSchedule: React.FC<CardSedotScheduleProps> = ({
  className,
  history,
  data,
  onClick,
}) => {
  const storage = new LocalStorage()
  return (
    <div
      className={clsx(
        `rounded-md bg-white outline outline-1 outline-neutral-10 p-4 text-sm mb-2 ${
          history ? 'h-fit' : 'h-24'
        }`,
        className
      )}
      onClick={() => onClick()}
    >
      {history && (
        <div className='flex justify-between mb-2'>
          <div className='text-neutral-30 text-sm'>{data?.completed_at}</div>
          <div className='text-primary-darker font-bold'>
            {data?.id_transaction || '#D8FF2FDG'}
          </div>
        </div>
      )}
      <div className='flex justify-between mb-2'>
        <div className='text-primary-base'>
          {storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
            ? ''
            : 'Layanan sedot '}
          <span className='text-primary-darker font-bold'>
            {data?.name || 'Rumah'}
          </span>
        </div>

        {!history && (
          <div className='text-primary-darker font-bold'>
            {data?.completed_at}
          </div>
        )}
      </div>
      {(data?.address ||
        data?.subdistrict ||
        data?.district ||
        data?.city ||
        data?.province ||
        data?.postal_code) && (
        <div className='line-clamp-2'>
          {`${data?.address ? `${data?.address},` : ''} ${
            data?.subdistrict ? `${data?.subdistrict},` : ''
          } ${data?.district ? `${data?.district},` : ''} ${
            data?.city ? `${data?.city},` : ''
          } ${data?.province ? `${data?.province},` : ''}`}
          {data?.postal_code ? data?.postal_code : ''}
        </div>
      )}
    </div>
  )
}
