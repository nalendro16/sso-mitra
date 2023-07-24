import { Capacitor } from '@capacitor/core'
import { Button, Header } from 'components'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const WithdrawalDetail: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation() as any
  const { state } = location

  const onBack = () => {
    navigate(-2)
  }

  return (
    <div className='flex flex-col h-full'>
      <Header label='Tarik Saldo' onBackClick={() => navigate(-1)} />
      <div className='flex flex-col flex-1 -mx-4 -mt-4 -mb-[4rem]'>
        <div className='bg-white px-4 py-7 mb-3'>
          <div className='font-semi-bold text-neutral-30 text-xs tracking-wider mb-4'>
            {'JUMLAH PENARIKAN'}
          </div>
          <div className='font-bold text-2xl mb-3'>{`Rp. ${state.amount}`}</div>
        </div>

        <div className='flex flex-col flex-1 bg-white px-4 py-7'>
          <div className='font-semi-bold text-neutral-30 text-xs tracking-wider mb-4'>
            {'DIKIRIM KE'}
          </div>

          <div className='flex items-center'>
            <img
              src={state?.bank_image}
              alt=''
              className='w-10 h-10 rounded-full'
            />
            <div className='flex-1 px-4'>
              <div className='text-sm mb-2'>{state?.bank_account_name}</div>
              <div className='text-neutral-20 text-xs'>
                {state?.bank_account_number}
              </div>
            </div>
          </div>

          <div className='font-semi-bold text-neutral-30 text-xs tracking-wider mb-4 mt-10'>
            {'WAKTU'}
          </div>
          <div className='flex font-semi-bold text-sm space-x-4'>
            {state.date}
          </div>

          <div
            className={`fixed bottom-0 w-full bg-white p-4 -mx-4 top-shadow ${
              Capacitor.isNativePlatform()
                ? 'max-w-content-full'
                : 'max-w-content'
            }`}
          >
            <Button
              className='btn-primary !w-full'
              label='Kembali ke Saldo'
              onClick={onBack}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
