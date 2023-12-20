import { Header } from 'components'
import { API } from 'config/api'
import { usePost } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate, useParams } from 'react-router-dom'

export const DumpingDetailHistory: React.FC = () => {
  const navigate = useNavigate()
  const { id_iplt } = useParams() as any
  const [dataListDumping, postListDumping] = usePost({ isLoading: false })
  const [listDumping, setListDumping] = useState<any>()
  const [dumpingDetail, setDumpingDetail] = useState<any>()

  useEffect(() => {
    const { data } = dataListDumping
    if (data?.status === 'success') {
      setListDumping(data?.result?.transaksi_sedot)
      setDumpingDetail(data?.result)
    } else if (data?.status === 'fail') {
      console.log('error', data?.messages)
    }
  }, [dataListDumping])

  useEffect(() => {
    const controller = new AbortController()
    postListDumping.getRequest(API.DETAIL_DUMPING_RIWAYAT, { id_iplt })
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <div>
      <Header
        label='Detail Dumping'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold'
        className='!bg-primary-base text-white'
        backWhite
      />

      <div>
        <div className='flex justify-between items-center'>
          <div className='text-primary-darker text-sm font-semibold mt-3'>
            Data Detail
          </div>
          <div
            className={`mt-4 ${handleStatus(
              dumpingDetail?.status
            )} text-white w-fit rounded-lg px-2`}
          >
            {dumpingDetail?.status}
          </div>
        </div>
        <div className='text-primary-darker text-sm font-semibold mt-3'>
          #{dumpingDetail?.number_dumping_iplt}
        </div>

        <div className='text-primary-darker text-sm font-semibold mt-3'>
          Kendaraan
        </div>
        {dataListDumping?.isLoading ? (
          <Skeleton height={18} width={60} />
        ) : (
          <div className='text-xs'>{dumpingDetail?.name ?? '-'}</div>
        )}

        <div className='text-primary-darker text-sm font-semibold mt-3'>
          No Plat
        </div>
        {dataListDumping?.isLoading ? (
          <Skeleton height={18} width={60} />
        ) : (
          <div className='text-xs'>
            {dumpingDetail?.number_accommodation ?? '-'}
          </div>
        )}

        <div className='text-primary-darker text-sm font-semibold mt-3'>
          Volume Tangki
        </div>
        {dataListDumping?.isLoading ? (
          <Skeleton height={18} width={60} />
        ) : (
          <div className='text-xs'>{dumpingDetail?.capacity ?? 0}L</div>
        )}

        <div className='text-primary-darker text-sm font-semibold mt-3'>
          Jumlah Penyedotan
        </div>
        {dataListDumping?.isLoading ? (
          <Skeleton height={18} width={60} />
        ) : (
          <div className='text-xs'>{dumpingDetail?.total_transaksi ?? 0}</div>
        )}
      </div>

      <div className='mx-2 mb-8'>
        <div className='text-primary-darker text-sm font-semibold mt-3 -mx-2'>
          Rincian
        </div>

        {listDumping?.map((item: any, index: number) => (
          <div className='rounded-xl shadow-xl p-4 mb-2 last:mb-0' key={index}>
            <div className='text-primary-darker text-sm font-semibold mt-3'>
              {item?.transaction_receipt_number ?? '-'}
            </div>
            <div className='text-primary-darker text-sm font-semibold mt-3'>
              Sedot {item?.type_sedot_wc ?? '-'}
            </div>
            <div className='text-xs'>
              {`${item?.address ? item?.address : ''} ${
                item?.subdistrict ? `${item?.subdistrict},` : ''
              } ${item?.district ? `${item?.district},` : ''} ${
                item?.city ? item?.city : ''
              }`}
            </div>

            <div className='text-primary-darker text-sm font-semibold mt-3'>
              Nama Pelanggan
            </div>
            <div className='text-xs'>{item?.user?.name ?? '-'}</div>

            <div className='text-primary-darker text-sm font-semibold mt-3'>
              Tanggal Order
            </div>
            <div className='text-xs'>{item?.time_confirm ?? 0}</div>

            <div className='text-primary-darker text-sm font-semibold mt-3'>
              Volume Sedot
            </div>
            <div className='text-xs'>{item?.volume_sedot_wc ?? 0}L</div>
          </div>
        ))}
      </div>
    </div>
  )
}
