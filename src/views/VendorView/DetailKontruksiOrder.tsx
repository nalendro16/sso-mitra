import images from 'assets/images'
import { Button, Header, Modal } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { useGet, usePost } from 'hooks/useRequest'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate, useParams } from 'react-router-dom'

export const DetailKontruksiOrder: React.FC = () => {
  const { id_transaction } = useParams() as any
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [dataNewOrderDetail, getDataDetailNewOrder] = useGet({
    isLoading: false,
  })
  const [dataRejectOrder, postRejectOrder] = usePost({ isLoading: false })
  const [dataAcceptOrder, postAcceptOrder] = usePost({ isLoading: false })
  const [form, setForm] = useState({
    tipe: '',
    deskripsi: '',
    alamat: '',
    tanggal: '',
    anggaran: '',
    attachment: '',
  })

  useEffect(() => {
    const { data } = dataNewOrderDetail
    if (data?.status === 'success') {
      setForm({
        tipe: data?.result?.name,
        deskripsi: data?.result?.description,
        alamat: `${data?.result?.address}, ${data?.result?.subdistrict}, ${data?.result?.district}, ${data?.result?.city} `,
        tanggal: data?.result?.order_time_formatted,
        anggaran: data?.result?.anggaran,
        attachment: data?.result?.attachment,
      })
    } else if (data?.status === 'fail') {
      console.log(data?.messages)
    }
  }, [dataNewOrderDetail])

  useEffect(() => {
    getDataDetailNewOrder.getRequest(
      API.NEW_ORDER_DETAIL_KONTRAKTOR + `${id_transaction}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_transaction])

  useEffect(() => {
    const { data } = dataAcceptOrder
    if (data?.status === 'success') {
      navigate('/payment-confirmed', { state: data?.result })
    } else if (data?.status === 'fail') {
      console.log(data?.messages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAcceptOrder])

  const onAcceptOrder = () => {
    postAcceptOrder.getRequest(API.RENOV_CONFIRM, { id_transaction })
  }

  const onCancelOrder = () => {
    // postRejectOrder.getRequest(API)
  }

  return (
    <div>
      <Header
        label='Detail Order'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-white'
        className='bg-gradient-header'
        backWhite
      />

      <div className='mb-3 mt-6'>
        <div className='font-semi-bold text-primary-darker mb-2 text-sm'>
          Tipe Layanan
        </div>
        <div className='bg-neutral-10 w-full p-2 rounded-lg text-sm text-neutral-20'>
          {form.tipe}
        </div>
      </div>

      <div className='mb-3'>
        <div className='font-semi-bold text-primary-darker mb-2 text-sm'>
          Deskripsi permintaan
        </div>
        <div className='bg-neutral-10 w-full p-2 rounded-lg text-sm min-h-[56px] text-neutral-20'>
          {form.deskripsi}
        </div>
      </div>

      <div className='mb-3'>
        <div className='font-semi-bold text-primary-darker mb-2 text-sm'>
          Alamat
        </div>
        <div className='bg-neutral-10 w-full p-2 rounded-lg text-sm min-h-[56px] text-neutral-20'>
          {form.alamat}
        </div>
      </div>

      <div className='mb-3'>
        <div className='font-semi-bold text-primary-darker mb-2 text-sm'>
          Tanggal
        </div>
        <div className='bg-neutral-10 w-full p-2 rounded-lg text-sm text-neutral-20'>
          {form.tanggal}
        </div>
      </div>

      <div className='mb-3'>
        <div className='font-semi-bold text-primary-darker mb-2 text-sm'>
          Anggaran
        </div>
        <div className='bg-neutral-10 w-full p-2 rounded-lg text-sm text-neutral-20'>
          {form.anggaran}
        </div>
      </div>

      <div className='mb-3'>
        <div className='font-semi-bold text-primary-darker mb-2 text-sm'>
          Lampiran Foto
        </div>
        <div className='grid grid-cols-7 gap-2'>
          <img
            src={form?.attachment}
            alt=''
            className='h-16 object-cover rounded-md'
          />
        </div>
      </div>

      <div className='fixed bottom-0 pb-4 w-full bg-white px-8 -ml-4  gap-4 max-w-content top-shadow pt-8 rounded-t-3xl'>
        <div className='mb-4'>
          Baca mengenai SOP layanan Bangun dan Renovasi sebelum melanjutkan. SOP
          Layanan
        </div>
        <div className='flex justify-between gap-4'>
          <Button
            className='btn-outline !border-primary-lighter w-full basis-1/2'
            onClick={() =>
              openAlert({
                messages:
                  'Sepertinya kamu sedang lelah setelah menyelesaikan banyak pekerjaan',
                title: 'Yakin menolak orderan?',
                isConfirm: true,
                showBtnClose: false,
                images: images.ic_reject_order,
                imagesClassName: 'mb-4 text-center',
                btnConfirmText: 'Tolak',
                callback: (e: any) => {
                  if (e.isConfirm) {
                    onCancelOrder()
                  }
                },
              })
            }
            isLoading={dataAcceptOrder?.isLoading}
            label='Tolak'
          />
          <Button
            className='btn-primary w-full basis-1/2'
            onClick={() => onAcceptOrder()}
            label='Terima'
            isLoading={dataAcceptOrder?.isLoading}
          />
        </div>
      </div>
    </div>
  )
}
