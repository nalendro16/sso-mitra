import clsx from 'clsx'
import { Button } from './Button/Button'
import React, { useEffect, useState } from 'react'
import { Modal } from 'components'
import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import { useGet } from 'hooks/useRequest'
import { API } from 'config/api'
import Skeleton from 'react-loading-skeleton'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'

interface NewOrderProps {
  className?: string
  data: {
    address: string
    id_transaction: number
    name: string
    postal_code: string
  }
  isLoading?: boolean
  onCancelOrder: () => void
  onAcceptOrder: () => void
  onAcceptOrderKontraktor: () => void
}

export const NewOrder: React.FC<NewOrderProps> = ({
  className,
  data,
  isLoading,
  onCancelOrder,
  onAcceptOrder,
  onAcceptOrderKontraktor,
}) => {
  const { openAlert } = useGlobalContext()
  const storage = new LocalStorage()
  let levelMitra = storage.getItem(StorageKey?.LEVEL)
  const [dataNewOrderDetail, getDataNewOrderDetail] = useGet({
    isLoading: false,
  })
  const [dataDetail, setDetail] = useState<any>()
  const [isShowModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    const { data } = dataNewOrderDetail
    if (data?.status === 'success') {
      setDetail(data?.result)
    } else if (data?.status === 'fail') {
      setDetail(null)
    }
  }, [dataNewOrderDetail])

  const handleOpenModal = () => {
    if (levelMitra === 'Kontraktor') {
      onAcceptOrderKontraktor()
    } else {
      setShowModal(true)
      getDataNewOrderDetail.getRequest(
        API.NEW_ORDER_DETAIL + `${data.id_transaction}`
      )
    }
  }

  return (
    <div
      className={clsx(
        `outline-1 outline outline-neutral-10 rounded-lg h-36 px-4 py-3 shadow-md w-fit`,
        className
      )}
    >
      <div className='!font-bold text-sm text-primary-darker'>{data?.name}</div>
      <div className='line-clamp-3 mt-2 mb-4'>
        {data?.address}, {data?.postal_code}
      </div>
      <div className='flex justify-between mb-2 gap-2'>
        <Button
          onClick={handleOpenModal}
          label='Detail Order'
          className='btn-primary w-full'
        />
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
                {storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
                  ? 'Layanan renovasi '
                  : 'Layanan sedot '}
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
                  {dataDetail?.date_sedot_formatted ||
                    dataDetail?.date_renov_formatted}
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
            isLoading={isLoading}
            label='Tolak'
          />
          <Button
            className='btn-primary w-full basis-1/2'
            onClick={onAcceptOrder}
            label='Terima'
            isLoading={isLoading}
          />
        </div>
      </Modal>
    </div>
  )
}
