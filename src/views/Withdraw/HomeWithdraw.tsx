import images from 'assets/images'
import { AnimatedDiv, Header } from 'components'
import { useNavigate } from 'react-router-dom'

export const HomeWithdraw: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='mb-4'>
      <div className='bg-gradient-header h-40 -mt-[6rem] -mx-4 font-bold text-white pt-8 text-center text-lg flex'>
        <img
          className='w-6 h-6 ml-2.5 z-20'
          src={images.ic_arrow_back_white}
          alt=''
          onClick={() => navigate(-1)}
        />
        <div className='flex justify-center w-full -ml-8'>Pencairan</div>
      </div>
      <AnimatedDiv className='bg-white shadow-xl -mt-16 p-4 rounded-xl mx-4'>
        <div className='text-primary-darker font-bold'>Tujuan Pencairan</div>
        <div className='text-sm text-neutral-30'>
          Segera konfirmasi orderan kamu, agar pelanggan tidak menunggu
        </div>
      </AnimatedDiv>

      <div className='flex justify-between mt-6'>
        <div className='text-primary-darker font-bold text-sm'>
          Ulasan Pengguna
        </div>
      </div>

      <div className='-mx-4 scroll-x pb-8'>
        {/* {USER_REVIEW?.map((item: any, index: number) => (
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
    ))} */}
      </div>
    </div>
  )
}
