import {
  AnimatedDiv,
  CardSedotSchedule,
  Header,
  KalenderPicker,
} from 'components'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const KalenderSedot: React.FC = () => {
  const navigate = useNavigate()
  const today = format(new Date(), 'dd MMMM yyy', { locale: id })
  const [selectedDay, setSelectedDay] = useState()

  console.log(selectedDay)
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
        <KalenderPicker onChangeSelected={(e) => setSelectedDay(e)} />

        <div className='flex justify-between mb-4'>
          <div className='text-primary-darker font-bold text-sm'>
            Jadwal {today}
          </div>
        </div>
        <CardSedotSchedule />
        <CardSedotSchedule className='my-4' />
        <CardSedotSchedule className='my-4' />
      </AnimatedDiv>
    </div>
  )
}
