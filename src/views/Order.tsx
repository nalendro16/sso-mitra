/* eslint-disable react-hooks/exhaustive-deps */
import { CardSedotSchedule, NewOrder } from 'components'
import React, { useState, useEffect } from 'react'
import { NEWORDER_LIST, ORDER_LIST, USER_REVIEW } from 'utils/dumy'

export const Order: React.FC = () => {
  const [pendingOrderData, setPendingOrderData] = useState<any>()
  const [historyOrderData, setHistoryOrderData] = useState<any>()

  useEffect(() => {
    let tmpPending: any = []
    let tmpHistory: any = []
    ORDER_LIST?.forEach((item: any) => {
      if (item.need_paid) {
        tmpPending.push({ ...item })
        setPendingOrderData(tmpPending)
      } else {
        tmpHistory.push({ ...item })
        setHistoryOrderData(tmpHistory)
      }
    })
  }, [ORDER_LIST])

  const handleButtonClick = () => {}

  const handleCardClick = () => {}

  return (
    <div className='mb-4'>
      <div className='bg-gradient-header h-40 -mt-[6rem] -mx-4 font-bold text-white pt-8 text-center text-xl'>
        Order
      </div>
      <div className='bg-white shadow-xl -mt-16 p-4 rounded-xl mx-4'>
        <div className='text-primary-darker font-bold'>
          2 Orderan belum di konfirmasi
        </div>
        <div className='text-sm text-neutral-30'>
          Segera konfirmasi orderan kamu, agar pelanggan tidak menunggu
        </div>
        {NEWORDER_LIST.slice(0, 2)?.map((item: any, index: number) => (
          <NewOrder
            data={item}
            className='my-6 !w-full !h-fit flex-none'
            key={index}
          />
        ))}
      </div>

      <div className='text-primary-darker font-bold text-sm mt-8 mb-4'>
        Riwayat Order
      </div>
      <CardSedotSchedule history />
      <CardSedotSchedule history />

      <div className='flex justify-between'>
        <div className='text-primary-darker font-bold text-sm'>
          Ulasan Pengguna
        </div>
      </div>

      <div className='-mx-4 scroll-x pb-8'>
        {USER_REVIEW?.map((item: any, index: number) => (
          <div
            className='shadow-xl my-6 !w-4/5 !h-fit flex-none px-4 rounded-lg py-4'
            key={index}
          >
            <div className='flex justify-between items-center'>
              <div className='text-primary-darker font-bold text-sm'>
                {item.name}
              </div>
              <div className='text-xs text-neutral-20'>{item.time}</div>
            </div>
            <div className='justify-between flex items-center'>
              <div className='line-clamp-2 mt-2'>{item.review_text}</div>
              <img src={item.emoji} alt='' className='h-6' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
