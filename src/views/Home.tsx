/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import images from 'assets/images'
import { AnimatedDiv, CardSedotSchedule, NewOrder } from 'components'
import { USER_REVIEW } from 'utils/dumy'
import { useNavigate } from 'react-router-dom'
import { useGet, usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import Skeleton from 'react-loading-skeleton'
import { useGlobalContext } from 'hooks/context'

export const Home: React.FC = () => {
  const { openAlert } = useGlobalContext()
  const [dataGetSummaryHome, getSummaryHome] = useGet({ isLoading: false })
  const [dataAcceptOrder, postAcceptOrder] = usePost({ isLoading: false })
  const [dataConfirmedOrder, getConfirmedOrder] = useGet({ isLoading: false })
  const [dataGetNewOrder, getNewOrder] = useGet({ isLoading: false })
  const [dataSummary, setDataSummary] = useState<any>()
  const [dataNewOrder, setDataNewOrder] = useState<any>([])
  const [dataConfirmed, setDataConfirmed] = useState<any>([])

  useEffect(() => {
    const { data } = dataGetSummaryHome
    if (data?.status === 'success') {
      setDataSummary(data?.result)
    } else if (data?.status === 'fail') {
      setDataSummary(null)
    }
  }, [dataGetSummaryHome])

  useEffect(() => {
    const { data } = dataGetNewOrder
    if (data?.status === 'success') {
      setDataNewOrder(data?.result)
    } else if (data?.status === 'fail') {
      setDataNewOrder(null)
    }
  }, [dataGetNewOrder])

  useEffect(() => {
    const { data } = dataConfirmedOrder
    if (data?.status === 'success') {
      setDataConfirmed(data?.result)
    } else if (data?.status === 'fail') {
      setDataConfirmed(null)
    }
  }, [dataConfirmedOrder])

  useEffect(() => {
    getNewOrder.getRequest(API.NEW_ORDER)
    getSummaryHome.getRequest(API.SUMMARY_HOME)
    getConfirmedOrder.getRequest(API.CONFIRMED_ORDER + `today`)
  }, [])

  useEffect(() => {
    const { data } = dataAcceptOrder
    if (data?.status === 'success') {
      navigate('/payment-confirmed', { state: data?.result })
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
  }, [dataAcceptOrder])

  const navigate = useNavigate()

  const handleAcceptOrder = (id: number) => {
    postAcceptOrder.getRequest(API.NEW_ORDER_CONFIRM, { id_transaction: id })
  }

  return (
    <div className='-mt-[4rem]'>
      <div className='flex justify-between items-center'>
        <div className='text-primary-darker font-bold text-lg'>Sajang App</div>
        <img src={images.ic_notification_blue} alt='' className='h-6 w-5' />
      </div>

      <AnimatedDiv>
        <div className='shadow-md my-4 py-2 rounded-lg'>
          <div
            className='bg-gradient-header px-4 -mt-2 rounded-t-lg'
            onClick={() => navigate('/withdraw-home')}
          >
            <div className='flex justify-between items-center pt-4 mb-2'>
              {dataGetSummaryHome?.isLoading ? (
                <Skeleton height={20} width={140} />
              ) : (
                <div className=' text-white font-bold'>{dataSummary?.name}</div>
              )}
              <div className='justify-end items-center flex gap-2'>
                <div className=' text-white'>{dataSummary?.rating}</div>
                {dataSummary?.rating && (
                  <img src={images.ic_star_fill} alt='' className='h-4 w-4' />
                )}
              </div>
            </div>
            {dataGetSummaryHome?.isLoading ? (
              <Skeleton height={30} width={240} className='mb-4' />
            ) : (
              <div className='text-2xl font-semi-bold text-white pb-4'>
                {dataSummary?.current_balance_text}
              </div>
            )}
          </div>
          <div className='mx-4 my-2'>
            <div className='flex justify-between items-center mb-2'>
              <div className='text-sm'>Pekerjaan selesai</div>
              <div className='text-sm'>Pekerjaan Menunggu</div>
            </div>
            <div className='flex justify-between items-center'>
              {dataGetSummaryHome?.isLoading ? (
                <Skeleton height={20} width={100} />
              ) : (
                <div className='text-primary-darker font-bold'>
                  {dataSummary?.work_done} Pekerjaan
                </div>
              )}

              {dataGetSummaryHome?.isLoading ? (
                <Skeleton height={20} width={100} />
              ) : (
                <div className='text-primary-darker font-bold'>
                  {dataSummary?.work_waiting} Pekerjaan
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className='flex items-center justify-between gap-4 my-4 mt-6 mx-4'
          onClick={() => navigate('/sedot-schedule')}
        >
          <img src={images.ic_calendar} alt='' className='h-7 w-9 ml-2 mr-1' />
          <div>
            <div className='text-primary-darker font-bold text-sm'>
              Kalender Sedot
            </div>
            <div className='text-xxs text-neutral-30 w-3/4 line-clamp-2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
              placeat dolore, consequuntur esse eaque voluptate labore
              reiciendis perspiciatis commodi nisi.
            </div>
          </div>
          <img src={images.ic_stroke_right} alt='' className='w-3 h-4' />
        </div>

        <div className='flex items-center justify-between gap-4 my-4 mt-6 mx-4'>
          <img src={images.ic_home_panduanmitra} alt='' className='h-10 w-12' />
          <div>
            <div className='text-primary-darker font-bold text-sm'>
              Panduan Mitra
            </div>
            <div className='text-xxs text-neutral-30 w-3/4 line-clamp-2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
              placeat dolore, consequuntur esse eaque voluptate labore
              reiciendis perspiciatis commodi nisi.
            </div>
          </div>
          <img src={images.ic_stroke_right} alt='' className='w-3 h-4' />
        </div>

        <div className='text-primary-darker font-bold text-sm mb-4'>
          Jadwal Sedot
        </div>
        {dataConfirmedOrder.isLoading ? (
          Array.from({ length: 2 }, (index: number) => (
            <div
              className='my-6 !h-fit flex-none outline-1 outline outline-neutral-10 rounded-lg px-4 py-3 shadow-md'
              key={index}
            >
              <Skeleton width={80} height={20} />
              <Skeleton width={250} height={20} className='my-2' />
              <Skeleton width={200} height={30} />
            </div>
          ))
        ) : dataConfirmed?.length !== 0 ? (
          dataConfirmed?.map((item: any, index: number) => (
            <CardSedotSchedule data={item} key={index} className='my-4' />
          ))
        ) : (
          <div className='flex justify-center w-full my-12 font-semi-bold text-neutral-20'>
            <div>Belum Ada Orderan Terkonfirmasi</div>
          </div>
        )}

        <div className='flex justify-between mt-4'>
          <div className='text-primary-darker font-bold text-sm'>
            Orderan Terbaru
          </div>
          <div className='text-sm text-neutral-30'>Lihat Semua</div>
        </div>

        <div className='-mx-4 scroll-x pb-4'>
          {dataGetNewOrder?.isLoading ? (
            Array.from({ length: 3 }, (index: number) => (
              <div
                className='my-6 !w-4/5 !h-fit flex-none outline-1 outline outline-neutral-10 rounded-lg px-4 py-3 shadow-md'
                key={index}
              >
                <Skeleton width={80} height={20} />
                <Skeleton width={250} height={20} className='my-2' />
                <Skeleton width={200} height={30} />
              </div>
            ))
          ) : dataNewOrder?.length !== 0 ? (
            dataNewOrder?.map((item: any, index: number) => (
              <NewOrder
                data={item}
                className='my-6 !w-4/5 !h-fit flex-none'
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
      </AnimatedDiv>
    </div>
  )
}

export default Home
