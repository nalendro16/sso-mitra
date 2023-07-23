/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatedDiv, CardSedotSchedule, NewOrder } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { useGet, usePost } from 'hooks/useRequest'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { NEWORDER_LIST, USER_REVIEW } from 'utils/dumy'

export const Order: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [dataGetNewOrder, getNewOrder] = useGet({ isLoading: false })
  const [dataAcceptOrder, postAcceptOrder] = usePost({ isLoading: false })
  const [dataNewOrder, setDataNewOrder] = useState<any>([])

  useEffect(() => {
    getNewOrder.getRequest(API.NEW_ORDER)
  }, [])

  useEffect(() => {
    const { data } = dataGetNewOrder
    if (data?.status === 'success') {
      setDataNewOrder(data?.result)
    } else if (data?.status === 'fail') {
      setDataNewOrder(null)
    }

    return () => {
      setDataNewOrder(null)
    }
  }, [dataGetNewOrder])

  useEffect(() => {
    const { data } = dataAcceptOrder
    if (data?.status === 'success') {
      navigate('/payment-confirmed', { state: data?.result })
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
  }, [dataAcceptOrder])

  const handleAcceptOrder = (id: number) => {
    postAcceptOrder.getRequest(API.NEW_ORDER_CONFIRM, { id_transaction: id })
  }

  return (
    <div className='mb-4'>
      <div className='bg-gradient-header h-40 -mt-[6rem] -mx-4 font-bold text-white pt-8 text-center text-xl'>
        Order
      </div>
      <AnimatedDiv className='bg-white shadow-xl -mt-16 p-4 rounded-xl mx-4'>
        {dataGetNewOrder?.isLoading ? (
          <Skeleton width={230} height={20} />
        ) : (
          <div className='text-primary-darker font-bold'>
            {dataNewOrder?.length === 0
              ? 'Belum ada orderan masuk'
              : `${dataNewOrder?.length} Orderan belum di konfirmasi`}
          </div>
        )}
        {dataGetNewOrder?.isLoading ? (
          <Skeleton width={260} height={20} />
        ) : (
          <div className='text-sm text-neutral-30'>
            Segera konfirmasi orderan kamu, agar pelanggan tidak menunggu
          </div>
        )}
        <div className='mx-4'>
          {dataGetNewOrder?.isLoading ? (
            Array.from([1, 2, 3, 4, 5]).map((item: any) => {
              return (
                <div
                  className='my-6 !h-fit flex-none outline-1 outline outline-neutral-10 rounded-lg px-4 py-3 shadow-md'
                  key={item}
                >
                  <Skeleton width={80} height={20} />
                  <Skeleton width={250} height={20} className='my-2' />
                  <Skeleton width={200} height={30} />
                </div>
              )
            })
          ) : dataNewOrder?.length !== 0 ? (
            dataNewOrder?.map((item: any, index: number) => (
              <NewOrder
                data={item}
                className='my-6 !h-fit w-full'
                key={index}
                isLoading={dataAcceptOrder.isLoading}
                onCancelOrder={() => console.log('order canceled')}
                onAcceptOrder={() => handleAcceptOrder(item.id_transaction)}
              />
            ))
          ) : (
            <div className='flex justify-center w-full my-12 font-semi-bold text-neutral-20'>
              <div>Belum Ada Orderan Terbaru</div>
            </div>
          )}
        </div>
      </AnimatedDiv>

      <AnimatedDiv>
        <div className='text-primary-darker font-bold text-sm mt-8 mb-4'>
          Riwayat Order
        </div>
        <CardSedotSchedule history onClick={() => console.log('id')} />
        <CardSedotSchedule history onClick={() => console.log('id')} />
      </AnimatedDiv>

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
