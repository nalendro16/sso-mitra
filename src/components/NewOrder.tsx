import clsx from 'clsx'
import { Button } from './Button/Button'
import React, { useState } from 'react'
import { Modal } from 'components'
import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'

interface NewOrderProps {
  className?: string
  data: {
    title: string
    address: string
    isActive: boolean
    id: number
  }
  onCancelOrder: () => void
  onAcceptOrder: () => void
}

export const NewOrder: React.FC<NewOrderProps> = ({
  className,
  data,
  onCancelOrder,
  onAcceptOrder,
}) => {
  const { openAlert } = useGlobalContext()
  // const [dataModal, setDataModal] = useState<any>()
  const [isShowModal, setShowModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  return (
    <div
      className={clsx(
        `outline-1 outline outline-neutral-10 rounded-lg h-36 px-4 py-3 shadow-md w-fit`,
        className
      )}
    >
      <div className='!font-bold text-sm text-primary-darker'>
        {data?.title}
      </div>
      <div className='line-clamp-3 mt-2 mb-4'>{data?.address}</div>
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
          <div>Samsul Bahri</div>
          <div>21 Juni 2023</div>
        </div>

        <div className='w-full flex justify-center'>
          <div className='flex flex-col justify-center w-fit my-4 items-center'>
            <div>
              {'Layanan sedot '}
              <span className='text-primary-darker font-bold'>{'Rumah'}</span>
            </div>
            <div className='relative text-center my-4'>
              <img src={images.ic_calender_order} alt='' />
              <div className='font-bold text-3xl absolute top-8 left-6'>13</div>
            </div>
            <div className='!font-bold text-xl text-primary-darker'>
              Januari 2023 10.00 WIB
            </div>
            <div className='text-neutral-20 text-sm line-clamp-2 w-3/4 text-center mb-4'>
              Jl. Gajah Mada No. 18, Genteng, Banyuwangi 68465
            </div>
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
            label='Tolak'
          />
          <Button
            className='btn-primary w-full basis-1/2'
            onClick={onAcceptOrder}
            label='Terima'
          />
        </div>
      </Modal>
    </div>
  )
}
