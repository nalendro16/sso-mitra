import { Button, Header, Input } from 'components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from 'utils/validationEmail'

export const PasswordReset: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
  })
  const [error, setError] = useState({
    email: '',
  })

  const handleChangeForm = (e: any) => {
    setForm({
      ...form,
      [e.name]: e.value,
    })
    setError({ ...error, [e.name]: '' })
  }

  const validationForm = () => {
    const newError = { ...error }
    if (!validateEmail(form.email)) {
      newError.email = 'Masukkan email sesuai format, ex: konsul@gmail.com'
    }
    return newError
  }

  const onSubmit = () => {
    const findErrors = validationForm()
    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors)
    } else {
      console.log(form)
    }
    // setShowSetting(true)
    // navigate('/register')
  }

  return (
    <div
      className={`content-full px-[theme('content.padding.x')] pt-[theme('content.padding.y')]`}
    >
      <Header
        label='Reset Password'
        onBackClick={() => navigate(-1)}
        labelClassName='font-bold'
      />
      <div className='font-bold text-xl mb-3 mt-5 text-primary-darker'>
        {'Password Recovery'}
      </div>
      <div className='text-neutral-30 text-sm mb-7'>
        {
          'Masukkan email yang terdaftar pada akun Sajang untuk menerima instruksi kata sandi'
        }
      </div>

      <Input
        className='mb-7'
        name='email'
        label='Email'
        placeholder='Ketikkan Email'
        value={form?.email}
        error={error?.email}
        onChange={handleChangeForm}
      />

      <Button
        className='btn-primary !w-full'
        label='Submit'
        onClick={onSubmit}
      />
    </div>
  )
}
