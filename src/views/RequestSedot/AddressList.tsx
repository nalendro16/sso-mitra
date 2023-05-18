import images from 'assets/images'
import { AddressCard, Button, Header } from 'components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADDRESS_LIST } from 'utils/dumy'

export const AddressList: React.FC = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState<string>('')
  return (
    <div>
      <Header onBackClick={() => navigate(-1)} label='Daftar Alamat' />
      <div className='bg-white p-4 mb-3'>
        <div className='relative flex items-center rounded bg-neutral-10 text-neutral-20 text-sm px-4 py-3 gap-3'>
          <img src={images.ic_search_address} alt='' className='w-5 h-5 mr-3' />
          <input
            name='search'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className='border-none bg-transparent -ml-4 focus:outline-none w-full'
            placeholder='Cari Alamat'
          />
        </div>
        <div className='!font-bold text-primary-darker mt-6 mb-4'>
          Alamat Tujuan
        </div>

        <div>
          {ADDRESS_LIST?.map((item: any, index: number) => (
            <AddressCard data={item} className='my-6' key={index} />
          ))}
        </div>
      </div>

      <div
        className={`fixed bottom-0 w-full  max-w-content -ml-4 bg-white p-4 mb-10`}
        // ${
        //   Capacitor.isNativePlatform()
        //     ? 'max-w-content-full'
        //     : 'max-w-content'
        // }
      >
        <Button
          className='btn-primary !w-full'
          label='Pilih Alamat'
          onClick={() => console.log('Pilih')}
          // isLoading={dataConfirmDelivery?.isLoading}
        />
      </div>
    </div>
  )
}
