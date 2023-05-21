import images from 'assets/images'
import { useState } from 'react'
import { AnimatedDiv, Header, StepItem } from 'components'
import { useNavigate } from 'react-router-dom'
import { PROGRESS_TRACK } from 'utils/dumy'

export const TrackOrder: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='mb-16'>
      <Header
        label='Track Order'
        onBackClick={() => navigate('/transaksi')}
        labelClassName='!font-bold text-white'
        className='bg-grad-head'
        backWhite
      />

      <AnimatedDiv
        className='-mx-4 bg-grad-head px-4 pt-4 pb-8 -mt-5'
        animationType='animate-ease-top'
      >
        <div className='flex justify-between text-sm my-2 text-neutral-10'>
          <div>Order dari</div>
          <div>Tanggal order</div>
        </div>

        <div className='flex justify-between text-neutral-10 font-bold text-sm'>
          <div>Samsul Bahri</div>
          <div>21 Juni 2023</div>
        </div>

        <div className='flex flex-col justify-center my-4 items-center w-full '>
          <div className='text-neutral-10'>
            {'Layanan sedot '}
            <span className='text-neutral-10 font-bold'>{'Rumah'}</span>
          </div>
          <div className='relative text-center my-4'>
            <img src={images.ic_calender_order} alt='' />
            <div className='font-bold text-3xl absolute top-8 left-6'>13</div>
          </div>
          <div className='!font-bold text-xl text-neutral-10'>
            Januari 2023 10.00 WIB
          </div>
          <div className='text-neutral-10 text-sm line-clamp-2 w-3/4 text-center mb-4'>
            Jl. Gajah Mada No. 18, Genteng, Banyuwangi 68465
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv className='bg-white shadow-xl -mt-12 p-4 rounded-xl mx-4'>
        <div className='bg-primary-base p-4 rounded-md'>
          <div></div>
          <div className='text-sm text-white'>Progress</div>
          <div className='font-semi-bold text-white'>Kontruksi Renovasi</div>
          <div className='text-sm text-neutral-10'>
            Klik centang jika pekerjaan selsai
          </div>
        </div>

        <div className='mt-4'>
          {PROGRESS_TRACK?.map((item: any, index: number) => (
            <StepItem data={item} key={index} />
          ))}
        </div>
      </AnimatedDiv>
    </div>
  )
}
