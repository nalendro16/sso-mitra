import images from 'assets/images'
import { Button } from 'components'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const PaymentConfirmed: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation() as any
  console.log(state)
  return (
    <div className='h-full w-full absolute top-0 left-0 bg-gradient-header flex flex-col px-4 pt-16 pb-8'>
      <div className='text-lg text-center text-white font-semi-bold my-4'>
        Sajang Sanitation App
      </div>
      <img
        src={images.bg_payment_success}
        alt=''
        className='w-64 h-32 mx-auto my-4'
      />
      <div className='text-xl text-center text-white font-semi-bold my-4'>
        Pesanan Terkonfirmasi
      </div>
      <p className='mb-4 text-sm text-center text-white'>
        Hore, order kamu berhasil dikonfirmasi. Selanjutnya, silahkan menunggu
        petugas SAJANG yang akan datang menuju alamat kamu.
      </p>

      <div className='flex justify-between text-sm text-white mb-4'>
        <div>INVOICE ID:</div>
        <div>TANGGAL</div>
      </div>

      <div className='flex justify-between text-white text-sm'>
        <div>{state?.invoice_id}</div>
        <div>{state?.time}</div>
      </div>

      <Button
        onClick={() => navigate('/track-order')}
        label='Track Order'
        className='bg-primary-base text-white w-full outline outline-white outline-1 mt-8 mb-4'
      />
      <Button
        onClick={() => navigate('/order')}
        label='Ok,Saya mengerti'
        className='bg-white text-primary-base w-full'
      />
    </div>
  )
}
