import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Input, Button } from 'components'
import { InputPIN } from 'components/InputPin'
import images from 'assets/images'

export const RegisterTwo: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    volume: '',
    family_member: '',
    NIK: '',
    role: '',
    address: '',
    poscode: '',
    latitude: '',
    longitude: '',
    reffcode: '',
  })
  const [error, setError] = useState({
    volume: '',
    family_member: '',
    NIK: '',
    role: '',
    address: '',
    poscode: '',
  })

  const onSubmit = () => {
    // navigate('/home')
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
        name='volume'
        placeholder='Volume Septic Tank (L)'
        label='Volume Septic Tank'
        value={form.volume}
        onChange={(e) => handleChangeForm(e)}
      />

      <Input
        className='mb-4'
        name='family_member'
        placeholder='Anggota Keluarga'
        label='Jumlah anggota keluarga'
        value={form.family_member}
        onChange={(e) => handleChangeForm(e)}
      />

      <Input
        className='mb-4'
        name='NIK'
        placeholder='No NIK'
        label='NIK'
        value={form.NIK}
        onChange={(e) => handleChangeForm(e)}
      />

      {/* 
      <InputSelect
        className='mb-4'
        name='email'
        placeholder='Email/No. Handphone'
        label='Email'
        value={form.email}
        onChange={(e) => handleChangeForm(e)}
      /> */}

      <Input
        type='text-area'
        name='address'
        onChange={handleChangeForm}
        value={form.address}
        rows={2}
        placeholder='Alamat'
        label='Alamat'
        className='mb-4'
      />

      <Input
        className='mb-4'
        name='poscode'
        placeholder='Kode POS'
        label='Kode POS'
        value={form.poscode}
        onChange={(e) => handleChangeForm(e)}
      />

      <Input
        className='mb-4'
        name='reffcode'
        placeholder='Kode Refferal'
        label='KODEREFFERAL'
        value={form.reffcode}
        onChange={(e) => handleChangeForm(e)}
      />

      <div className='bg-primary-base px-4 py-2 flex rounded-md items-center gap-2 justify-center'>
        <img src={images.ic_info_refferal} alt='' className='h-4' />
        <div className='text-sm text-white'>
          Silahkan masukan kode Referel jika memiliki
        </div>
      </div>

      <Button
        className='btn-primary !w-full my-10'
        label='Daftar'
        onClick={onSubmit}
      />
    </div>
  )
}
