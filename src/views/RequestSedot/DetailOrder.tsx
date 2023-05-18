import images from 'assets/images'
import { Button, Header, renderLabel } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DetailOrder: React.FC = () => {
  const navigate = useNavigate()

  const onConfirm = () => {
    navigate('/payment')
  }
  return (
    <div className='flex flex-col h-full'>
      <Header
        label='Detail Order'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold'
      />

      <div className='rounded-md bg-neutral-10 p-3 text-sm text-black-lighter h-32 mb-6 flex gap-6 py-2'>
        <div className='rounded-full border border-primary-lightest h-10 w-10'>
          <img
            src={images.ic_layanan_rumah}
            alt=''
            className='w-4 h-4 my-2.5 mx-2'
          />
        </div>
        <div>
          <div className='font-bold text-primary-base'>
            {'Layanan Sedot Rumah'}
          </div>
          <div className='mt-2 mb-4'>
            {'Jl. Gajah Mada No. 18, Genteng, Banyuwangi 68465'}
          </div>
          <div className='flex justify-between w-3/4'>
            <div>Sabtu, 30 Des 2023</div>
            <div>10:00 WIB</div>
          </div>
        </div>
      </div>

      <div className='!font-bold text-primary-darker mb-4'>
        Ringkasan Belanja
      </div>
      <div className='border-b border-b-neutral-10 pl-4 mr-2'>
        {renderLabel({
          text: 'Subtotal',
          value: 12000,
          classAmount: '!font-bold text-primary-darker',
        })}
        {renderLabel({
          text: 'Potongan Harga',
          value: 0,
          classAmount: '!font-bold text-primary-darker',
        })}
      </div>

      <div className='font-bold my-4 mr-2'>
        {renderLabel({
          text: 'Subtotal',
          value: 12000,
          classText: 'font-bold text-primary-darker',
          classAmount: '!font-bold text-primary-darker',
        })}
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
          label='Pembayaran'
          onClick={onConfirm}
          // isLoading={dataConfirmDelivery?.isLoading}
        />
      </div>
    </div>
  )
}
