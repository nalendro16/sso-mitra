import { Button, Header, renderLabel } from 'components'
import { useGlobalContext } from 'hooks/context'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAYMENT_DATA } from 'utils/dumy'

export const Payment: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [form, setForm] = useState<any>()
  const onConfirm = () => {
    if (!form?.payment_type) {
      openAlert({ title: 'Pilih pembayaran terlabih dahulu' })
    } else {
      navigate('/payment-waiting')
    }
  }

  return (
    <div>
      <Header onBackClick={() => navigate(-1)} label='Pembayaran' />

      <div className='bg-neutral-10 p-2 rounded-lg'>
        <div className='!font-bold text-primary-darker mb-4'>
          Ringkasan Belanja
        </div>
        <div className='border-b border-neutral-20 pl-4 mr-2'>
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
            text: 'Total Belanja',
            value: 12000,
            classText: 'font-bold text-primary-darker',
            classAmount: '!font-bold text-primary-darker',
          })}
        </div>
      </div>

      <div className='!font-bold text-primary-darker my-6'>
        Metode Pembayaran
      </div>
      {PAYMENT_DATA.map((item: any, index: number) => (
        <div className='mt-3' key={index}>
          <div className='flex items-center bg-white border border-neutral-10 rounded-lg px-3 py-1.5'>
            <label className='flex flex-1 items-center text-sm justify-between'>
              <div className='flex flex-1 items-center text-sm'>
                <img
                  src={item?.logo}
                  alt=''
                  className='w-10 h-8 rounded-md mr-3'
                />
                {item.text}
              </div>
              <input
                id='radioButton'
                className={`appearance-none rounded-full h-5 w-5 border border-neutral-20 bg-white checked:bg-white checked:border-primary-lighter checked:bg-[url('/src/assets/images/ic_dot_white.svg')] focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left ml-4`}
                type='radio'
                name='payment_method'
                value={item?.payment_method}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payment_type: item?.payment_gateway,
                    payment_detail: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </div>
      ))}

      <div
        className={`fixed bottom-0 w-full  max-w-content -ml-4 bg-white p-4 mb-10`}
      >
        <Button
          className='btn-primary !w-full'
          label='Pesan Sekarang'
          onClick={onConfirm}
          // isLoading={dataConfirmDelivery?.isLoading}
        />
      </div>
    </div>
  )
}
