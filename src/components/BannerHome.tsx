import images from 'assets/images'
import { useState } from 'react'

interface BannerHomeProps {
  user_name: string
  user_image?: string
  onNotificationClick: () => void
}

export const BannerHome: React.FC<BannerHomeProps> = ({
  user_name,
  user_image,
  onNotificationClick,
}) => {
  const [search, setSearch] = useState<string>('')
  return (
    <div
      className={`absolute bg-gradient-header bg-no-repeat bg-cover bg-center h-40 top-0 left-0 w-full`}
    >
      <div className='mt-16 mx-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <img
              src={user_image ? user_image : images.ic_user}
              alt=''
              className='h-11 w- rounded-full'
            />
            <div className='mx-2 text-white'>
              <div>Hallo, </div>
              <div className='font-semi-bold'>{user_name}</div>
            </div>
          </div>
          <img
            src={images.ic_notification}
            alt=''
            className='h-5 w-4'
            onClick={() => onNotificationClick()}
          />
        </div>
      </div>

      <div className='relative flex items-center rounded-xl bg-white text-neutral-20 text-sm py-3 my-5 mx-4 shadow-lg -bottom-2'>
        <img src={images.ic_search_gray} alt='' className='w-5 h-5 mx-4' />
        <input
          name='search'
          autoComplete='off'
          // onClick={() => navigate('/search-page')}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className='border-none bg-transparent w-full focus:outline-none mr-4'
          placeholder='Cari menu Layanan, Berita ...'
        />
      </div>
    </div>
  )
}
