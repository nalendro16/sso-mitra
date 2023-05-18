import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Input, Button } from 'components'
import { InputPIN } from 'components/InputPin'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onSubmit = () => {
    navigate('/register-two')
  }

  const handleChangeForm = (e: any) => {
    const { value, name } = e
    setForm({ ...form, [name]: value })
    setError({ ...error, [name]: '' })
  }

  return (
    <div
      className={`content-full px-[theme('content.padding.x')] pt-[theme('content.padding.y')]`}
    >
      <Header
        label='Daftar'
        circled
        onBackClick={() => navigate(-1)}
        labelClassName='font-bold'
      />

      <div className='text-neutral-30 text-sm mb-7'>
        {'Selamat datang di Sajang, yuk buat akunmu terlebih dahulu'}
      </div>

      <Input
        className='mb-4'
        name='name'
        placeholder='Nama'
        label='Nama'
        value={form.name}
        onChange={(e) => handleChangeForm(e)}
      />

      <Input
        className='mb-4'
        name='email'
        placeholder='Email/No. Handphone'
        label='Email'
        value={form.email}
        onChange={(e) => handleChangeForm(e)}
      />

      <InputPIN
        name='password'
        label='Password'
        placeholder='Ketikkan Password'
        value={form.password}
        onChange={(e) => handleChangeForm(e.value)}
      />

      <Button
        className='btn-primary !w-full my-10'
        label='Selanjutnya'
        onClick={onSubmit}
      />

      <div className='text-sm text-center'>
        Sudah punya akun?{' '}
        <span
          className='text-primary-base font-bold'
          onClick={() => navigate('/login')}
        >
          Masuk
        </span>
      </div>
    </div>
  )
}
