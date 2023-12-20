/* eslint-disable react-hooks/exhaustive-deps */
import {
  AnimatedDiv,
  CardSedotSchedule,
  ModalArmada,
  NewOrder,
} from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { useGet, usePost } from 'hooks/useRequest'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
export const Order: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [listOrder, setListOrder] = useState<any>()
  const [dataGetNewOrder, getNewOrder] = useGet({ isLoading: false })
  const [dataAcceptOrder, postAcceptOrder] = usePost({ isLoading: false })
  const [dataHistoryOrder, postHistoryOrder] = usePost({ isLoading: false })
  const [selectedID, setSelectedID] = useState<number>()
  const [openModalArmada, setOpenModalArmada] = useState<boolean>(false)
  const [dataNewOrder, setDataNewOrder] = useState<any>([])

  useEffect(() => {
    getNewOrder.getRequest(API.NEW_ORDER)
    postHistoryOrder.getRequest(API.TRANSACTION_HISTORY_ORDER)
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
    const { data } = dataHistoryOrder
    if (data?.status === 'success') {
      setListOrder(data?.result)
    }
  }, [dataHistoryOrder])

  useEffect(() => {
    const { data } = dataAcceptOrder
    if (data?.status === 'success') {
      navigate('/payment-confirmed', { state: data?.result })
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
  }, [dataAcceptOrder])

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
                onAcceptOrder={() => {
                  setSelectedID(item.id_transaction)
                  setOpenModalArmada(true)
                }}
                onAcceptOrderKontraktor={() =>
                  navigate(`/detail-kontruksi-order/${item.id_transaction}`)
                }
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

        {listOrder?.map((item: any, index: number) => (
          <CardSedotSchedule
            data={item}
            key={index}
            className='my-4'
            history
            onClick={() => navigate(`/track-order/${item?.id_transaction}`)}
          />
        ))}
      </AnimatedDiv>
      <ModalArmada
        onHide={() => setOpenModalArmada(false)}
        isOpen={openModalArmada}
        onClick={(e) => {
          setOpenModalArmada(false)
          postAcceptOrder.getRequest(API.NEW_ORDER_CONFIRM, {
            id_accommodation: e,
            id_transaction: selectedID,
          })
        }}
      />
    </div>
  )
}

export default Order
