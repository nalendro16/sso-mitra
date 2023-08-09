import clsx from 'clsx'
import { StorageKey } from 'config/storage'
import { LocalStorage, numberSeparator } from 'utils'

interface HistoryTransactionCardProps {
  data: {
    id_transaction: number
    transaction_receipt_number: string
    transaction_status_code: number
    transaction_status_text: string
    transaction_grandtotal: number
    name: string
    address: string
    ratings?: number
    date?: string
    completed_at?: string
  }
  onClick: () => void
  className?: string
  history?: boolean
}
export const HistoryTransactionCard: React.FC<HistoryTransactionCardProps> = ({
  className,
  history,
  onClick,
  data,
}) => {
  const storage = new LocalStorage()
  return (
    <div
      className={clsx(
        `bg-white border-b border-1 border-b-neutral-10 p-4 text-sm mb-2`,
        className
      )}
      onClick={onClick}
    >
      <div className='mb-2'>
        <div className='text-primary-darker font-bold'>
          {data?.transaction_receipt_number}
        </div>
        <div className='text-neutral-30 text-sm'>{data?.completed_at}</div>
      </div>
      <div className='flex justify-between mb-2'>
        <div className='text-primary-base'>
          {storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
            ? data?.name
            : 'Layanan sedot '}
          {storage.getItem(StorageKey?.LEVEL) !== 'Kontraktor' && (
            <span className='text-primary-darker font-bold'>{'Rumah'}</span>
          )}
        </div>
        <div className='text-primary-base font-bold'>
          {numberSeparator(data?.transaction_grandtotal, 'Rp')}
        </div>
      </div>
      <div className='line-clamp-2'>{data?.address}.</div>
    </div>
  )
}
