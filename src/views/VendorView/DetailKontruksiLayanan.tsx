import { Header, renderLabel } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGet } from 'hooks/useRequest'
import { API } from 'config/api'
import images from 'assets/images'
import { numberSeparator } from 'utils'

export const DetailKontruksiLayanan: React.FC = () => {
  const navigate = useNavigate()
  const { id_transaction } = useParams() as any
  const [dataDetailRAB, getDetailRAB] = useGet({ isLoading: false })
  const [detailRAB, setDetailRAB] = useState<any>()

  useEffect(() => {
    getDetailRAB.getRequest(API.RAB_DETAIL + id_transaction)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_transaction])

  useEffect(() => {
    const { data } = dataDetailRAB
    if (data?.status === 'success') {
      setDetailRAB(data?.result)
    } else if (data?.status === 'fail') {
      console.log(data?.messages)
    }
  }, [dataDetailRAB])

  return (
    <div>
      <Header
        label='Detail Layanan Konstruksi'
        onBackClick={() => navigate(-2)}
        labelClassName='!font-bold text-white'
        className='bg-gradient-header'
        backWhite
      />

      <div className='font-bold text-primary-darker'>Detail Pengerjaan</div>
      <div className='mt-4 p-4 bg-neutral-10 rounded-xl mx-2'>
        <div className='font-bold text-primary-darker mb-4'>
          Layanan Renovasi
        </div>
        <div className='flex justify-start items-start gap-3'>
          <img src={images.ic_document} alt='' className='h-6' />
          <div className='text-black-light'>
            {detailRAB?.order_detail?.description}
          </div>
        </div>

        <div className='flex justify-start items-start gap-3 my-2 '>
          <img src={images.ic_order_location} alt='' className='h-6' />
          <div className='text-black-light'>
            {detailRAB?.order_detail?.address},
            {detailRAB?.order_detail?.subdistrict},
            {detailRAB?.order_detail?.district},{detailRAB?.order_detail?.city}
          </div>
        </div>

        <div className='flex justify-start items-start gap-3 mb-2'>
          <img src={images.ic_calendar} alt='' className='h-6' />
          <div className='text-black-light'>
            {detailRAB?.order_detail?.order_time_formatted}
          </div>
        </div>

        <div className='flex justify-start items-start gap-3'>
          <img src={images.ic_wallet} alt='' className='h-6' />
          <div className='text-black-light'>
            {numberSeparator(detailRAB?.order_detail?.anggaran, 'Rp.')}
          </div>
        </div>
      </div>

      <div className='font-bold text-primary-darker my-5'>
        Rancangan Anggaran Biaya
      </div>
      <div className='text-sm'>
        Berikut ini adalah RAB pembangunan/renovasi yang akan dilakukan
        berdasarkan survey yang telah dilakukan oleh petugas pada{' '}
        {detailRAB?.order_detail?.date_renov_formatted}
      </div>

      <div className='mt-4 p-4 bg-neutral-10 rounded-xl mx-2'>
        <div className='font-bold text-primary-darker mb-2'>
          Subtotal Material
        </div>
        <div>
          {detailRAB?.rab?.material?.map((item: any, index: number) =>
            renderLabel({
              text: item.name_product,
              value: item.product_price,
              indx: index,
            })
          )}
        </div>

        <div className='font-bold text-primary-darker mt-4 mb-2'>
          Subtotal Jasa
        </div>
        <div>
          {detailRAB?.rab?.jasa?.map((item: any, index: number) =>
            renderLabel({
              text: item.name_product,
              value: item.product_price,
              indx: index,
            })
          )}
        </div>

        <div className='flex justify-between items-start gap-3 W-FULL text-primary-darker mt-4 '>
          <div className='font-bold'>Total</div>
          <div className='font-bold'>
            {numberSeparator(detailRAB?.total, 'Rp.')}
          </div>
        </div>
      </div>
    </div>
  )
}
