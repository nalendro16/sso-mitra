/* eslint-disable react-hooks/exhaustive-deps */
import { OrderCard } from 'components'
import React, { useState, useEffect } from 'react'
import { ORDER_LIST } from 'utils/dumy'

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
    <div
      className={`bg-no-repeat bg-white bg-cover bg-center z-10 min-h-screen pb-24 top-0 left-0 w-full absolute bg-[url('/src/assets/images/ic_banner_order.png')] px-4 mt-[1rem]`}
    >
      <div className='font-bold text-center text-lg mb-4 mt-2'>Order</div>
      <div className='flex flex-col gap-2'>
        {pendingOrderData?.map((item: any, index: number) => (
          <OrderCard
            key={index}
            type={item.type}
            data={item}
            onButtonClick={handleButtonClick}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      <div className='mt-6 mb-4 font-semi-bold text-sm text-primary-darker'>
        {'Riwayat Order'}
      </div>

      <div className='flex flex-col gap-2'>
        {historyOrderData?.map((item: any, index: number) => (
          <OrderCard
            key={index}
            type={item.type}
            data={item}
            onButtonClick={handleButtonClick}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  )
}

export default Order
