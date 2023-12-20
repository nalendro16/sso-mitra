import images from 'assets/images'
import clsx from 'clsx'
import { Button } from './Button/Button'
import ProgressBar from '@ramonak/react-progress-bar'

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
    id_accommodation: number
    id_outlet: number
    create?: boolean
    percen?: number
    number_dumping_iplt?: string
    status?: string
  }
  isDumping?: boolean
  className?: string
  simpleCard?: boolean
  hideBtn?: boolean
  onClickDots: () => void
  onEdit: () => void
  onDelete: () => void
  onClick: (id: number) => void
  onDumpingClick?: () => void
}

export const ArmadaCard: React.FC<ArmadaCardProps> = ({
  data,
  className,
  simpleCard = false,
  isDumping = false,
  hideBtn = true,
  onClickDots,
  onDumpingClick,
  onEdit,
  onDelete,
  onClick,
}) => {
  const handlePercent = (persen: number) => {
    switch (true) {
      case persen <= 25:
        return '#82C341'
      case persen <= 50:
        return '#EBC71B'
      case persen <= 75:
        return '#F0592C'
      case persen <= 100:
        return '#F04848'
      default:
        return '#F04848'
    }
  }

  const handleStatus = (status: any) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow'
      case 'Completed':
        return 'bg-success'
      case 'Rejected':
        return 'bg-error'
      default:
        return 'bg-success'
    }
  }

  return (
    <div
      className={clsx(
        'rounded-lg drop-shadow-xl p-4 mb-4 last:mb-0 bg-white',
        className,
        data?.isDotActive ? 'relative' : '',
        data?.status_accommodation === 1 ? '' : 'opacity-60'
      )}
      onClick={
        simpleCard ? () => onClick(data?.id_accommodation) : () => void 0
      }
    >
      <div className='font-semi-bold text-neutral-20 text-sm flex justify-between items-start'>
        <div>{data?.name}</div>
        {isDumping && (
          <div className='text-neutral-20'>{data?.number_dumping_iplt}</div>
        )}
        {!simpleCard && (
          <img
            src={images.ic_dots}
            alt='dots'
            className='h-4 opacity-60'
            onClick={() => onClickDots()}
          />
        )}
        {data?.isDotActive && (
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
      {!isDumping && (
        <img
          src={data.url_accommodation}
          alt='truck'
          className='mx-auto my-4 w-40 h-28 object-cover'
        />
      )}
      <div
        className={`text-primary-darker font-semi-bold ${
          isDumping ? 'my-4 text-base' : 'text-sm'
        }`}
      >
        {data?.merk} {data?.type}
      </div>
      <div className='flex justify-between mt-2 text-xs font-semi-bold pt-2 border-t border-neutral-10'>
        <div className='flex items-center gap-1 w-full justify-center'>
          <img src={images.ic_armada_plat} alt='plat no' />
          <div>{data?.number_accommodation}</div>
        </div>
        <div className='flex items-center gap-1 w-full justify-center'>
          <img src={images.ic_armada_capacity} alt='capacity' />
          <div>{data?.capacity}</div>
        </div>
        <div className='flex items-center gap-1 w-full justify-center'>
          <img src={images.ic_armada_total} alt='total transaksi' />
          <div>{data?.total}</div>
        </div>
      </div>

      {isDumping && !hideBtn && (
        <div className='mt-4'>
          <ProgressBar
            completed={`${data?.percen ?? 0}`}
            customLabel=' '
            height='12px'
            bgColor={`${handlePercent(data?.percen || 0)}`}
          />
          <div className='text-sm text-center mt-2'>{`${Math.floor(
            data?.percen || 0
          )}% Persentase Tangki`}</div>
        </div>
      )}

      {isDumping && !hideBtn && (
        <Button
          onClick={onDumpingClick ? () => onDumpingClick() : () => void 0}
          label={data?.create ? 'Dumping' : 'Menunggu Verifikasi IPLT'}
          className='btn-primary mt-4 w-full !rounded-xl'
          disabled={!data?.create}
        />
      )}

      {isDumping && hideBtn && (
        <div
          className={`mt-4 ${handleStatus(
            data?.status
          )} text-white w-fit rounded-lg px-2`}
        >
          {data?.status}
        </div>
      )}
    </div>
  )
}
