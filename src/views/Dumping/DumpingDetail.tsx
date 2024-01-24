import { Capacitor } from '@capacitor/core'
import ProgressBar from '@ramonak/react-progress-bar'
import { Button, Header } from 'components'
import { API } from 'config/api'
import { usePost } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate, useParams } from 'react-router-dom'

export const DumpingDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id_accommodation } = useParams() as any
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
    postListDumping.getRequest(API.DETAIL_DUMPING, { id_accommodation })
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div className='text-primary-darker text-sm font-semibold mt-3'>
          Data Detail
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

        {dataListDumping?.isLoading ? (
          <div className='flex justify-center flex-col w-full'>
            <Skeleton height={10} width={200} />
            <Skeleton height={10} width={120} />
          </div>
        ) : (
          <div className='mt-4'>
            <ProgressBar
              completed={`${dumpingDetail?.percen ?? 0}`}
              customLabel=' '
              height='12px'
              bgColor={`${handlePercent(dumpingDetail?.percen || 0)}`}
            />
            <div className='text-sm text-center mt-2'>{`${Math.floor(
              dumpingDetail?.percen || 0
            )}% Persentase Tangki`}</div>
          </div>
        )}
      </div>

      <div className='mx-2 mb-8'>
        {dumpingDetail?.create && (
          <div className='text-primary-darker text-sm font-semibold mt-3 -mx-2'>
            Rincian
          </div>
        )}

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

      <div
        className={`fixed bottom-0 w-full bg-white p-4 -mx-4 ${
          Capacitor.isNativePlatform() ? 'max-w-content-full' : 'max-w-content'
        }`}
      >
        <Button
          className='btn-primary !w-full'
          label={dumpingDetail?.create ? 'Dumping' : 'Tangki Kosong'}
          disabled={!dumpingDetail?.create}
          onClick={() => navigate('/dumping-create', { state: dumpingDetail })}
        />
      </div>
    </div>
  )
}
