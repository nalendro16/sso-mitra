import images from 'assets/images'
import { HistoryTransactionCard } from 'components'
import React, { useState } from 'react'

export const Transaksi: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  return (
    <div className='-mt-[4rem]'>
      <div className='bg-gradient-header h-40 -mt-[6rem] -mx-4 text-white pt-8 text-center text-xl'>
        <div className='font-bold'>Transaksi</div>
        <div className='relative flex items-center rounded-xl bg-white text-neutral-20 text-sm py-3 my-5 mx-4 shadow-lg -bottom-2'>
          <img src={images.ic_search_gray} alt='' className='w-5 h-5 mx-4' />
          <input
            name='search'
            autoComplete='off'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className='border-none bg-transparent w-full focus:outline-none mr-4'
            placeholder='Pencarian...'
          />
        </div>
      </div>
      <div className='mt-4'>
        <HistoryTransactionCard />
        <HistoryTransactionCard />
        <HistoryTransactionCard />
      </div>
    </div>
  )
}

export default Transaksi
