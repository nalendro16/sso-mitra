import images from 'assets/images'
import { Button } from 'components'
import { useNavigate } from 'react-router-dom'

export const PaymentConfirmed: React.FC = () => {
  const navigate = useNavigate()
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
        <div>#4504Df0</div>
        <div>21 Juni 2023</div>
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
