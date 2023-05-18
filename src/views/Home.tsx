import React from 'react'
import images from 'assets/images'
import { CardSedotSchedule, NewOrder } from 'components'
import { NEWORDER_LIST } from 'utils/dumy'

export const Home: React.FC = () => {
  return (
    <div className='-mt-[4rem]'>
      <div className='flex justify-between items-center'>
        <div className='text-primary-darker font-bold text-lg'>Sajang App</div>
        <img src={images.ic_notification_blue} alt='' className='h-6 w-5' />
      </div>

      <div className='shadow-md my-4 py-2 rounded-lg'>
        <div className='bg-gradient-header px-4 -mt-2 rounded-t-lg'>
          <div className='flex justify-between items-center pt-4 mb-2'>
            <div className=' text-white font-bold'>
              Saldo CV Mandiri Sanitasi
            </div>
            <div className='justify-end items-center flex gap-2'>
              <div className=' text-white'>4.5</div>
              <img src={images.ic_star_fill} alt='' className='h-4 w-4' />
            </div>
          </div>
          <div className='text-2xl font-semi-bold text-white pb-4'>
            Rp. 1.250.000
          </div>
        </div>
        <div className='mx-4 my-2'>
          <div className='flex justify-between items-center mb-2'>
            <div className='text-sm'>Pekerjaan selesai</div>
            <div className='text-sm'>Pekerjaan Menunggu</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-primary-darker font-bold'>18 Pekerjaan</div>
            <div className='text-primary-darker font-bold'>20 Pekerjaan</div>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between gap-4 my-4 mt-6 mx-4'>
        <img src={images.ic_calendar} alt='' className='h-7 w-9 ml-2 mr-1' />
        <div>
          <div className='text-primary-darker font-bold text-sm'>
            Kalender Sedot
          </div>
          <div className='text-xxs text-neutral-30 w-3/4 line-clamp-2'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
            placeat dolore, consequuntur esse eaque voluptate labore reiciendis
            perspiciatis commodi nisi.
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
            placeat dolore, consequuntur esse eaque voluptate labore reiciendis
            perspiciatis commodi nisi.
          </div>
        </div>
        <img src={images.ic_stroke_right} alt='' className='w-3 h-4' />
      </div>

      <div className='text-primary-darker font-bold text-sm mb-4'>
        Jadwal Sedot
      </div>
      <CardSedotSchedule />

      <div className='flex justify-between mt-4'>
        <div className='text-primary-darker font-bold text-sm'>
          Jadwal Sedot
        </div>
        <div className='text-sm text-neutral-30'>Lihat Semua</div>
      </div>

      <div className='-mx-4 scroll-x pb-8'>
        {NEWORDER_LIST?.map((item: any, index: number) => (
          <NewOrder
            data={item}
            className='my-6 !w-4/5 !h-fit flex-none'
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
