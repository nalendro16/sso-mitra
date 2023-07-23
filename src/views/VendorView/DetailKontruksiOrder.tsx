import images from 'assets/images'
import { Button, Header, Input, Modal } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { useGet } from 'hooks/useRequest'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

export const DetailKontruksiOrder: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [isShowModal, setShowModal] = useState<boolean>(false)
  const [dataDetail, setDataDetail] = useState<any>()
  const [dataNewOrderDetail, getDataDetailNewOrder] = useGet({
    isLoading: false,
  })
  const [dataRejectOrder, postRejectOrder] = useGet({ isLoading: false })
  const [dataAcceptOrder, postAcceptOrder] = useGet({ isLoading: false })
  const [form, setForm] = useState({
    tipe: 'Renovasi',
    deskripsi:
      'Saya ingin membangun toilet agar lebih luas dan mudh dibersihkan',
    alamat: 'Jl. Wates, no.18 Sleman',
    tanggal: '20 Juli 2023',
    anggaran: '2.500.000',
  })

  const onAcceptOrder = () => {
    navigate('/detail-kontruksi')
    // postAcceptOrder.getRequest(API)
  }

  const onCancelOrder = () => {
    postRejectOrder.getRequest(API)
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
            src='http://placekitten.com/g/300/300'
            alt=''
            className='h-16 object-cover rounded-md'
          />
          <img
            src='http://placekitten.com/g/300/303'
            alt=''
            className='h-16 object-cover rounded-md'
          />
          <img
            src='http://placekitten.com/g/300/302'
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
            onClick={() => setShowModal(true)}
            label='Terima'
            isLoading={dataAcceptOrder?.isLoading}
          />
        </div>
      </div>

      <Modal
        show={isShowModal}
        onHide={() => setShowModal(false)}
        showClassName='!opacity-10'
        contentClassName='animate-ease-body bg-white h-2/3 pt-4 px-4 bottom-0 fixed w-full max-w-content rounded-t-2xl'
      >
        <div className='!font-bold text-primary-darker mt-2 mb-6'>
          {'Konfirmasi Pesanan'}
        </div>
        <div className='flex justify-between text-sm my-2'>
          <div>Order dari</div>
          <div>Tanggal order</div>
        </div>

        <div className='flex justify-between text-primary-darker font-bold text-sm'>
          {dataNewOrderDetail?.isLoading ? (
            <Skeleton width={120} />
          ) : (
            <div>{dataDetail?.order_by}</div>
          )}
          {dataNewOrderDetail?.isLoading ? (
            <Skeleton width={120} />
          ) : (
            <div>{dataDetail?.order_time_formatted}</div>
          )}
        </div>

        <div className='w-full flex justify-center'>
          <div className='flex flex-col justify-center w-fit my-4 items-center'>
            {dataNewOrderDetail?.isLoading ? (
              <Skeleton width={180} height={20} />
            ) : (
              <div>
                {'Layanan sedot '}
                <span className='text-primary-darker font-bold'>
                  {dataDetail?.name}
                </span>
              </div>
            )}

            {dataNewOrderDetail?.isLoading ? (
              <Skeleton width={60} height={60} className='my-4' />
            ) : (
              <div className='relative text-center my-4'>
                <img src={images.ic_calender_order} alt='' />

                <div className='font-bold text-3xl absolute top-8 left-6'>
                  {dataDetail?.date_sedot_formatted}
                </div>
              </div>
            )}

            {dataNewOrderDetail?.isLoading ? (
              <Skeleton width={120} height={20} className='my-4' />
            ) : (
              <div className='!font-bold text-xl text-primary-darker'>
                {dataDetail?.time_sedot_formatted}
              </div>
            )}

            {dataNewOrderDetail?.isLoading ? (
              <Skeleton width={120} height={20} />
            ) : (
              <div className='text-neutral-20 text-sm line-clamp-2 w-3/4 text-center mb-4'>
                {`${dataDetail?.address ? `${dataDetail?.address},` : ''} ${
                  dataDetail?.subdistrict ? `${dataDetail?.subdistrict},` : ''
                } ${dataDetail?.district ? `${dataDetail?.district},` : ''} ${
                  dataDetail?.city ? `${dataDetail?.city},` : ''
                } ${dataDetail?.province ? `${dataDetail?.province},` : ''}`}
                {dataDetail?.postal_code ? dataDetail?.postal_code : ''}
              </div>
            )}
          </div>
        </div>

        <div className=' w-full bg-white px-8 pb-4 flex justify-between gap-4'>
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
            onClick={onAcceptOrder}
            label='Terima'
            isLoading={dataAcceptOrder?.isLoading}
          />
        </div>
      </Modal>
    </div>
  )
}
