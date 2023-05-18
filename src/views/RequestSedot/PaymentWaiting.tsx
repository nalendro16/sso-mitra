import { Header, MenuBottom } from 'components'
import { MENU_BOTTOM } from 'config/menu'
import { useNavigate } from 'react-router-dom'

export const PaymentWaiting: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='mb-16'>
      <div
        className={`absolute bg-primary-lighter z-20 bg-no-repeat bg-cover bg-center h-52 top-0 left-0 w-full bg-[url('/src/assets/images/ic_banner_order.png')]`}
      >
        <div className='ml-4'>
          <Header
            onBackClick={() => navigate(-1)}
            label=' Menunggu pembayaran'
            className='text-white z-20 bg-gradient-header'
            backWhite
          />
        </div>

        <div
          className='mt-20 text-center'
          onClick={() => navigate('/payment-confirmed')}
        >
          <div className='text-sm text-white'>BCA Virtual Account</div>
          <div className='text-xl text-white font-bold my-4'>
            80777087757150023
          </div>
          <div className='text-sm text-white'>
            Bayar sebelum{' '}
            <span className='font-bold'>Des 31, 2022 20.30 WIB</span>
          </div>
        </div>
      </div>

      <div className='mt-[10rem] p-4 rounded-2xl shadow-md'>
        <div className='!font-bold text-primary-darker mb-4'>
          Cara Pembayaran
        </div>
        <ol>
          <li>1. Lakukan log in pada aplikasi </li>
          <li>2. BCA Mobile Pilih menu m-BCA, kemudian</li>
          masukkan kode akses m-BCA
          <li>3. Pilih m-Transfer BCA Virtual Account </li>
          <li>
            4. Pilih dari Daftar Transfer, atau masukkan 5 angka kode perusahaan
            untuk Sajang (80777) dan nomor HP yang terdaftar di akun Rumaindo
            kamu (Contoh: 80777087757150023)
          </li>
          <li>5. Masukkan pin m-BCA Pembayaran selesai</li>
          <li>6. Simpan notifikasi yang muncul sebagai bukti pembayaran</li>
        </ol>
      </div>

      <MenuBottom menu={MENU_BOTTOM} />
    </div>
  )
}
