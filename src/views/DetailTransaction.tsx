/* eslint-disable react-hooks/exhaustive-deps */
import images from 'assets/images'
import { Header, renderLabel } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { usePost } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate, useParams } from 'react-router-dom'

export const DetailTransaction: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const { id_transaction } = useParams() as any
  const [dataDetailTrans, getDataDetailTrans] = usePost({ isLoading: false })
  const [detailTrans, setDetailTrans] = useState<any>()

  useEffect(() => {
    const { data } = dataDetailTrans
    if (data?.status === 'success') {
      setDetailTrans(data?.result)
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
  }, [dataDetailTrans])

  useEffect(() => {
    getDataDetailTrans.getRequest(API.TRANSACTION_HISTORY_DETAIL, {
      transaction_receipt_number: id_transaction,
    })
  }, [])

  return (
    <div>
      <Header
        onBackClick={() => navigate(-1)}
        label='Detail Transaksi'
        backWhite
        labelClassName='text-white'
        className='!bg-primary-base'
      />

      <div className='flex justify-between items-start'>
        <div className='mb-2'>
          {dataDetailTrans?.isLoading ? (
            <Skeleton height={18} width={160} />
          ) : (
            <div className='text-primary-darker text-sm font-semibold'>
              {detailTrans?.transaction_receipt_number}
            </div>
          )}
          {dataDetailTrans?.isLoading ? (
            <Skeleton height={18} width={100} />
          ) : (
            <div className='text-xs'>{detailTrans?.transaction_date}</div>
          )}
        </div>
        {dataDetailTrans?.isLoading ? (
          <Skeleton height={18} width={60} />
        ) : (
          <div className='text-primary-darker text-xs font-semibold'>
            {detailTrans?.transaction_status_text}
          </div>
        )}
      </div>

      <div className='text-primary-darker text-sm font-semibold mt-3'>
        Bangun dan Renovasi
      </div>
      {dataDetailTrans?.isLoading ? (
        <div>
          <Skeleton height={18} width={160} />
          <Skeleton height={18} width={200} />
        </div>
      ) : (
        <div className='text-sm'>
          {`${
            detailTrans?.address?.destination_address
              ? detailTrans?.address?.destination_address
              : ''
          } ${
            detailTrans?.address?.destination_subdistrict
              ? detailTrans?.address?.destination_subdistrict
              : ''
          }, ${
            detailTrans?.address?.destination_district
              ? detailTrans?.address?.destination_district
              : ''
          }, ${
            detailTrans?.address?.destination_city
              ? detailTrans?.address?.destination_city
              : ''
          }, ${
            detailTrans?.address?.destination_province
              ? detailTrans?.address?.destination_province
              : ''
          }`}
        </div>
      )}

      <div className='text-primary-darker text-sm font-semibold mt-3'>
        Metode Pembayaran
      </div>
      {dataDetailTrans?.isLoading ? (
        <Skeleton height={18} width={60} />
      ) : (
        <div className='text-xs'>{detailTrans?.payment}</div>
      )}

      <div className='text-primary-darker text-sm font-semibold mt-3'>
        Vendor
      </div>
      {dataDetailTrans?.isLoading ? (
        <Skeleton height={18} width={60} />
      ) : (
        <div className='text-xs'>
          {detailTrans?.outlet?.name?.outlet_name ?? '-'}
        </div>
      )}

      <div className='text-primary-darker text-sm font-semibold mt-3'>
        Armada
      </div>
      {dataDetailTrans?.isLoading ? (
        <Skeleton height={18} width={60} />
      ) : (
        <div className='text-xs'>{detailTrans?.accommodation?.name ?? '-'}</div>
      )}

      <div className='text-primary-darker text-sm font-semibold mt-3'>
        No. Kendaraan
      </div>
      {dataDetailTrans?.isLoading ? (
        <Skeleton height={18} width={60} />
      ) : (
        <div className='text-xs'>
          {detailTrans?.accommodation?.number_accommodation ?? '-'}
        </div>
      )}

      <div className='text-primary-darker text-sm font-semibold mt-3'>
        Volume Sedot
      </div>
      {dataDetailTrans?.isLoading ? (
        <Skeleton height={18} width={60} />
      ) : (
        <div className='text-xs'>
          {detailTrans?.accommodation?.capacity ?? 0}L
        </div>
      )}

      <div className='border-b border-b-neutral-10 my-4' />

      {dataDetailTrans?.isLoading ? (
        <div className='flex justify-between'>
          <Skeleton height={18} width={120} />
          <Skeleton height={18} width={80} />
        </div>
      ) : (
        detailTrans?.payment_detail?.map((item: any, index: number) =>
          renderLabel({
            text: item?.text,
            value: item?.value,
            withoutPerfix: true,
            classAmount: 'text-primary-base !font-bold',
            indx: index,
          })
        )
      )}

      {dataDetailTrans?.isLoading ? (
        <div className='flex justify-between'>
          <Skeleton height={18} width={120} />
          <Skeleton height={18} width={80} />
        </div>
      ) : (
        <div className='flex items-center justify-between mb-2 '>
          <span className='text-sm font-bold'>Total Bayar</span>
          <span className='text-sm font-bold text-primary-base'>
            {detailTrans?.transaction_grandtotal}
          </span>
        </div>
      )}

      <div className='border-b border-b-neutral-10 my-4' />

      {dataDetailTrans?.isLoading ? (
        <div className='bg-gradient-header py-4 px-8 rounded-xl flex flex-col'>
          <Skeleton height={14} width={120} baseColor='#90CDEB' />
          <Skeleton height={14} width={80} baseColor='#90CDEB' />
        </div>
      ) : (
        <div className='bg-gradient-header py-4 px-8 rounded-xl flex items-center gap-2'>
          <img src={images.ic_ask} alt='' />
          <div className='text-sm'>
            <div className='text-white font-semi-bold'>Bantuan</div>
            <div className='text-white'>Butuh bantuan</div>
          </div>
        </div>
      )}
    </div>
  )
}
