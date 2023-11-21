import images from 'assets/images'
import clsx from 'clsx'

interface ArmadaCardProps {
  data: {
    name: string
    number_accommodation: number
    url_accommodation: string
    capacity: string
    total: number
    type: string
    merk: string
    isDotActive?: boolean
    status_accommodation: number
  }
  className?: string
  onClickDots: () => void
  onEdit: () => void
  onDelete: () => void
}

export const ArmadaCard: React.FC<ArmadaCardProps> = ({
  data,
  className,
  onClickDots,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={clsx(
        'rounded-lg drop-shadow-xl p-4 mb-4 last:mb-0 bg-white',
        className,
        data.isDotActive ? 'relative' : '',
        data?.status_accommodation === 1 ? '' : 'opacity-60'
      )}
    >
      <div className='font-semi-bold text-neutral-20 text-sm flex justify-between items-start'>
        <div>{data.name}</div>
        <img
          src={images.ic_dots}
          alt='dots'
          className='h-4 opacity-60'
          onClick={() => onClickDots()}
        />
        {data.isDotActive && (
          <div className='rounded-md absolute shadow-xl bg-white px-3 py-1 top-0 right-4 text-sm text-black-darker text-opacity-90 mt-8 border border-1 border-neutral-20 border-opacity-50'>
            {data?.status_accommodation === 1 && (
              <div onClick={() => onEdit()}>Ubah</div>
            )}
            <div className='mt-2' onClick={() => onDelete()}>
              {data?.status_accommodation === 1 ? 'Non Aktifkan' : 'Aktifkan'}
            </div>
          </div>
        )}
      </div>
      <img
        src={data.url_accommodation}
        alt='truck'
        className='mx-auto my-4 w-40 h-28 object-cover'
      />
      <div className='text-primary-darker font-semi-bold text-sm'>
        {data.merk} {data.type}
      </div>
      <div className='flex justify-between mt-2 text-xs font-semi-bold pt-2 border-t border-neutral-10'>
        <div className='flex items-center gap-1 w-full justify-center'>
          <img src={images.ic_armada_plat} alt='plat no' />
          <div>{data.number_accommodation}</div>
        </div>
        <div className='flex items-center gap-1 w-full justify-center'>
          <img src={images.ic_armada_capacity} alt='capacity' />
          <div>{data.capacity}</div>
        </div>
        <div className='flex items-center gap-1 w-full justify-center'>
          <img src={images.ic_armada_total} alt='total transaksi' />
          <div>{data.total}</div>
        </div>
      </div>
    </div>
  )
}
