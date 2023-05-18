import images from 'assets/images'
import { Button } from './Button/Button'
import clsx from 'clsx'

interface OrderCardProps {
  className?: string
  type: 'product' | 'sedot'
  data: {
    date: string
    product_name: string
    product_image: string
    price: string
    total: number
    status: string
    need_paid: boolean
    can_review: boolean
    address?: string
    already_review: boolean
  }
  onCardClick: () => void
  onButtonClick: () => void
}

export const OrderCard: React.FC<OrderCardProps> = ({
  className,
  type,
  data,
  onCardClick,
  onButtonClick,
}) => {
  return (
    <div
      className={clsx('bg-white shadow-xl p-3 rounded-md z-30', className)}
      onClick={() => onCardClick()}
    >
      <div className='flex justify-between items-center'>
        <div className='text-neutral-20 text-xs'>{data?.date}</div>
        {data?.need_paid && data?.status === 'Menunggu Pembayaran' ? (
          <div className='bg-apricot text-white text-xxs rounded-3xl py-1 px-3'>
            {data?.status}
          </div>
        ) : (
          !data?.need_paid &&
          data?.status === 'Selesai' && (
            <div className='bg-success text-white text-xxs rounded-3xl py-1 px-3'>
              {data?.status}
            </div>
          )
        )}
      </div>

      {type === 'sedot' && (
        <div className='font-bold text-primary-darker text-sm mt-3 mb-2.5'>
          {'Layanan Sedot Rumah'}
        </div>
      )}

      {type === 'sedot' && (
        <div className='flex flex-row justify-start items-start gap-2'>
          <img src={images.ic_order_location} alt='' className='h-6 w-6' />
          <div className='line-clamp-3'>{data?.address}</div>
        </div>
      )}

      {type === 'product' && (
        <div className='flex gap-3 mt-4 mb-2.5'>
          <img
            src='https://picsum.photos/60/60/'
            alt=''
            className='rounded-lg'
          />
          <div className='text-sm'>
            <div className='font-bold text-primary-darker'>
              {data?.product_name}
            </div>
            <div>{`${data?.total} barang`}</div>
          </div>
        </div>
      )}

      <div className='flex justify-between items-center mt-2.5'>
        <div className='flex flex-col'>
          <div className='text-neutral-20 text-xs'>{'Harga Total'}</div>
          <div className='font-bold text-primary-darker text-sm mt-3 mb-2.5'>
            {data?.price}
          </div>
        </div>

        <Button
          onClick={() => onButtonClick()}
          label={`${
            data?.can_review
              ? data?.already_review
                ? 'Beli Lagi'
                : 'Ulasan'
              : 'Bayar'
          }`}
          className='rounded-xl bg-primary-base px-6 !py-1.5 h-fit text-white w-28 text-sm'
        />
      </div>
    </div>
  )
}
