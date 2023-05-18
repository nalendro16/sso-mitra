import { Button, Header, Input } from 'components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AddAddress: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState<any>({
    address: '',
    latitude: '',
    longitude: '',
    label: '',
  })
  const [error, setError] = useState<any>({
    address: '',
    latitude: '',
    longitude: '',
    label: '',
  })

  const handleChangeForm = (e: any) => {
    const { value, name } = e
    setForm({ ...form, [name]: value })
    setError({ ...error, [name]: '' })
  }

  return (
    <div>
      <Header onBackClick={() => navigate(-1)} label='Daftar Alamat' />
      <div className='!font-bold text-primary-darker mt-6 mb-4'>
        Alamat Tujuan
      </div>
      <Input
        type='text-area'
        name='address'
        onChange={handleChangeForm}
        value={form.address}
        rows={2}
        placeholder='Alamat'
        className='mb-4'
      />

      <div className='!font-bold text-primary-darker mt-6 mb-4'>Pin Lokasi</div>
      <Input
        className='mb-4'
        name='longitude'
        placeholder='Lokasi'
        value={form.longitude}
        onChange={(e) => handleChangeForm(e)}
      />

      <div className='!font-bold text-primary-darker mt-6 mb-4'>
        Label Alamat
      </div>
      <Input
        className='mb-4'
        name='label'
        placeholder='Rumah'
        value={form.label}
        onChange={(e) => handleChangeForm(e)}
      />

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
          label='Simpan'
          onClick={() => console.log(form)}
          // isLoading={dataConfirmDelivery?.isLoading}
        />
      </div>
    </div>
  )
}
