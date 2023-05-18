import images from 'assets/images'
import { Header, InputCode, Numpad } from 'components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const VerifyOtp: React.FC = () => {
  const navigate = useNavigate()
  const [OTP, setOTP] = useState('')

  const onSubmit = (otp: string) => {
    console.log('OTP', otp)
    // navigate('/password-reset')
    navigate('/home')
  }

  const resendCode = () => {
    console.log('resendCode')
  }

  return (
    <div
      className={`content-full px-[theme('content.padding.x')] pt-[theme('content.padding.y')]`}
    >
      <Header label='Masuk' onBackClick={() => navigate(-1)} circled />
      <div className='text-neutral-40 text-sm mb-12 text-center'>
        {
          'Wah, ternyata kamu sudah memiliki akun. Silahkan masukkan kode OTP yang dikirimkan melalui SMS untuk melanjutkan.'
        }
      </div>

      <InputCode
        className='mx-[10%]'
        cols={6}
        value={OTP}
        onComplete={(e) => onSubmit(e)}
      />

      <div className='text-center my-8'>
        <div className='font-bold text-xs mb-2 flex justify-center'>
          <img src={images.ic_otp_clock} alt='' className='w-4 h-4 mr-3' />
          <p>{'00:58'}</p>
        </div>
        <div className='text-xs mb-2'>{'Tidak Menerima Kode?'}</div>
        <span className='font-bold text-neutral-20 tex-sm' onClick={resendCode}>
          {'Kirim Ulang'}
        </span>
      </div>

      <Numpad
        className='mx-[15%] my-8'
        onClick={(e) => (OTP.length !== 6 ? setOTP(OTP + e) : {})}
        onDelete={() => (OTP.length !== 0 ? setOTP(OTP.slice(0, -1)) : {})}
      />
    </div>
  )
}
