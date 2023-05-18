import images from 'assets/images'
import { Button, Header } from 'components'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LAYANAN_SEDOT } from 'utils/dumy'

export const RequestSedot: React.FC = () => {
  const navigate = useNavigate()
  const [dataLayananSedot, setDataLayananSedot] = useState<any>()
  const [form, setForm] = useState({
    subject: '',
    note: '',
  })

  useEffect(() => {
    let tmp: any = []
    LAYANAN_SEDOT?.forEach((item: any) => {
      tmp.push({ ...item, isSelected: false })
    })
    setDataLayananSedot([...tmp])
  }, [LAYANAN_SEDOT])

  const handleChangeForm = (e: any) => {
    setForm({
      ...form,
      [e.name]: e.value,
    })
  }

  const handleSelectService = (idx: number) => {
    dataLayananSedot?.forEach((item: any, index: any) => {
      if (index === idx) {
        return (item.isSelected = !item.isSelected)
      } else {
        return (item.isSelected = false)
      }
    })
    setDataLayananSedot([...dataLayananSedot])
  }

  const onSubmit = () => {
    console.log('onSubmit', form)
    navigate('/detail-order')
  }

  return (
    <div className='flex flex-col h-full'>
      <Header
        label='Rekues Sedot'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold'
      />
      <div className='flex flex-col flex-1 h-full bg-white px-4 py-6 -mx-4 -mt-4 -mb-[4rem]'>
        <div className='flex justify-between text-primary-darker text-sm mb-2'>
          <div className='font-bold'>{'Alamat'}</div>
          <div className='font-bold' onClick={() => navigate('/address-list')}>
            {'Ubah'}
          </div>
        </div>

        <div className='rounded-md bg-neutral-10 p-3 text-sm text-black-lighter h-24 mb-2'>
          <div>{'Rumah'}</div>
          <div>{'Jl. Gajah Mada No. 18, Genteng, Banyuwangi 68465'}</div>
        </div>

        <Button
          className='btn-primary !w-full'
          label='Tambah Alamat Baru'
          onClick={() => navigate('/add-address')}
        />

        <div>
          <div className='flex justify-between  text-sm text-primary-darker font-semi-bold my-4'>
            {'Tanggal & Jam Penyedotan'}
          </div>
          <div className='bg-white rounded-xl border border-neutral-10 flex justify-between text-sm py-2 px-4 text-primary-darker font-bold items-center mb-4'>
            <img src={images.ic_calendar} alt='' className='w-5 h-5' />
            <div>Sabtu, 30 Des 2023</div>
            <div>10:00 WIB</div>
            <img src={images.ic_stroke_right} alt='' className='h-3' />
          </div>
        </div>

        <div>
          <div className='flex justify-between  text-sm text-primary-darker font-semi-bold my-4'>
            {'Layanan Sedot'}
          </div>
          <div>
            <div className='text-xs mb-8'>
              {'Pilih layanan jenis sedot dan kebutuhanmu'}
            </div>
            <div className='grid grid-cols-4 gap-4 my-4'>
              {dataLayananSedot?.map((item: any, index: number) => (
                <div
                  className='rounded-full flex flex-col items-center'
                  onClick={() => handleSelectService(index)}
                  key={index}
                >
                  <div
                    className={`${
                      item.isSelected &&
                      'border p-1.5 border-primary-lighter rounded-full bg-neutral-10'
                    }`}
                  >
                    <img src={item.icon} alt='' />
                  </div>
                  <p
                    className={`${
                      item.isSelected ? 'mt-1' : 'mt-4'
                    } text-xs text-primary-base`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mb-10'>
          <div className='flex justify-between  text-sm text-primary-darker font-semi-bold my-4'>
            {'Jadwal sedot yang akan datang'}
          </div>
          <div className='rounded-md bg-primary-base p-3 text-sm text-white h-24 mb-2'>
            <div className='flex justify-between'>
              <div>
                {'Layanan sedot '}
                <span className='font-bold'>{'Rumah'}</span>
              </div>
              <div className='font-semi-bold'>{'13 Juni 2023'}</div>
            </div>
            <div>{'Jl. Gajah Mada No. 18, Genteng, Banyuwangi 68465'}</div>
          </div>
        </div>

        <div className='flex flex-1 items-end mb-10'>
          <Button
            className='btn-primary !w-full'
            label='Selanjutnya'
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  )
}
