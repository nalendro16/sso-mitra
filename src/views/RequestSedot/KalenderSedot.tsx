/* eslint-disable react-hooks/exhaustive-deps */
import {
  AnimatedDiv,
  CardSedotSchedule,
  Header,
  KalenderPicker,
} from 'components'
import { API } from 'config/api'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useGet } from 'hooks/useRequest'
import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

export const KalenderSedot: React.FC = () => {
  const navigate = useNavigate()
  const [dataGetAllDate, getAllDate] = useGet()
  const [dataSelectedDate, getSelectedDate] = useGet()
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [allDate, setAllDate] = useState([])
  const [dataPerDay, setDataPerDay] = useState<any>()
  const [currentMonth, setCurrentMonth] = useState<any>(
    format(new Date(), 'yyy-MM', { locale: id })
  )

  useEffect(() => {
    getAllDate.getRequest(API.CALENDER_GET_DATES + currentMonth)
  }, [currentMonth])

  useEffect(() => {
    getSelectedDate.getRequest(
      API.CALENDER_GET_DATE + format(selectedDay, 'yyy-MM-dd', { locale: id })
    )
  }, [selectedDay])

  useEffect(() => {
    const { data } = dataSelectedDate
    if (data?.status === 'success') {
      setDataPerDay(data?.result)
    } else if (data?.status === 'fail') {
      setDataPerDay(null)
    }
  }, [dataSelectedDate])

  useEffect(() => {
    const { data } = dataGetAllDate
    if (data?.status === 'success') {
      let tmp: any = []
      data?.result.map((item: any) => {
        tmp.push(new Date(item))
      })
      setAllDate(tmp)
    } else if (data?.status === 'fail') {
      setAllDate([])
    }
  }, [dataGetAllDate])

  return (
    <div className='flex flex-col h-full'>
      <Header
        label='Kalender Sedot'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-white'
        className='bg-gradient-header'
        backWhite
      />

      <AnimatedDiv>
        <KalenderPicker
          onChangeSelected={(e) => setSelectedDay(e)}
          onMonthChange={(e) =>
            setCurrentMonth(format(e, 'yyy-MM', { locale: id }))
          }
          merkedDate={allDate}
        />

        <div className='flex justify-between mb-4'>
          <div className='text-primary-darker font-bold text-sm'>
            Jadwal {format(selectedDay, 'dd MMMM yyy', { locale: id })}
          </div>
        </div>

        {dataSelectedDate.isLoading ? (
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
        ) : dataPerDay?.length !== 0 ? (
          dataPerDay?.map((item: any, index: number) => (
            <CardSedotSchedule
              data={item}
              key={index}
              className='my-4'
              onClick={() => navigate(`/track-order/${item?.id_transaction}`)}
            />
          ))
        ) : (
          <div className='flex justify-center w-full my-12 font-semi-bold text-neutral-20'>
            <div>Belum Ada Order</div>
          </div>
        )}
      </AnimatedDiv>
    </div>
  )
}
