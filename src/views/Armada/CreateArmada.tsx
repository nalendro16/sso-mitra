import images from 'assets/images'
import { Button, Header, Input } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { usePost } from 'hooks/useRequest'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type formProps = {
  name: string
  number_accommodation: string
  merk: string
  type: string
  capacity: string
  attachment: any
}

export const CreateArmada: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [imgAttached, setImgAttached] = useState<any>(null)
  const [namaFoto, setNamaFoto] = useState<string>('')
  const [dataCreateArmada, postCreateArmada] = usePost({ isLoading: false })
  const [form, setForm] = useState<formProps>({
    name: '',
    number_accommodation: '',
    merk: '',
    type: '',
    capacity: '',
    attachment: null,
  })

  const [error, setError] = useState<formProps>({
    name: '',
    number_accommodation: '',
    merk: '',
    type: '',
    capacity: '',
    attachment: null,
  })

  useEffect(() => {
    const { data } = dataCreateArmada
    if (data?.status === 'success') {
      openAlert({
        messages: 'Berhasil menyimpan armada baru',
        showBtnClose: false,
        isConfirm: true,
        callback: (e: any) => {
          if (e.isConfirm) {
            navigate(-1)
          }
        },
      })
      setForm({
        name: '',
        number_accommodation: '',
        merk: '',
        type: '',
        capacity: '',
        attachment: '',
      })
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCreateArmada])

  const handleChangeForm = (e: any) => {
    const { value, name } = e
    setForm({ ...form, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const changeHandler = (e: any) => {
    let file = e.target.files[0]
    let url = URL.createObjectURL(file)
    setNamaFoto(e.target.files[0]?.name)
    setImgAttached(url)

    if (file.size < 5000000) {
      setForm({ ...form, attachment: e.target.files[0] })
      setError({ ...error, attachment: '' })
    } else if (file.size > 5000000) {
      openAlert({ messages: 'Maksimum Ukuran File 2 Mb' })
    }
    e.target.value = null
  }

  const handleDeleteImage = () => {
    setForm({ ...form, attachment: null })
    setImgAttached(null)
  }

  const validationForm = () => {
    const newError = { ...error }
    if (!form.name)
      newError.name = 'Nama wajib diisi untuk mempermudah mengenali armada'
    if (!form.number_accommodation)
      newError.number_accommodation = 'Nomor plat tidak boleh kosong'
    if (!form.merk) newError.merk = 'Merk tidak boleh kosong'
    if (!form.type) newError.type = 'Tipe tidak boleh kosong'
    if (!form.capacity)
      newError.capacity = 'Kapasitas tangki tidak boleh kosong'
    if (!form.attachment)
      newError.attachment = 'Pilih foto untuk mempermudah mengenali armada'

    return newError
  }

  const onSubmit = () => {
    let bodyFormData = new FormData()

    const findErrors = validationForm()
    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors)
    } else {
      for (const [key, value] of Object.entries(form)) {
        bodyFormData.append(key, value as string)
      }
      postCreateArmada.getRequest(API.CREATE_ARMADA, bodyFormData)
    }
  }

  return (
    <div>
      <Header
        label='Tambah Armada'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-white'
        className='bg-gradient-header'
        backWhite
      />

      <div>
        <div className='text-sm text-primary-darker font-semi-bold'>
          Tambah Data
        </div>
        <div className='text-xxs'>
          Untuk dapat menambahkan data, mohon lengkapi semua data yang
          diperlukan di bawah ini.
        </div>
      </div>

      <div className='mt-4'>
        <Input
          label='Nama'
          placeholder='Nama untuk armada'
          name='name'
          className='mb-4'
          labelClassName='text-sm text-primary-darker font-semi-bold'
          value={form.name}
          error={error.name}
          onChange={handleChangeForm}
        />
        <Input
          label='Nomor Plat'
          placeholder='Plat nomor kendaraan'
          name='number_accommodation'
          labelClassName='text-sm text-primary-darker font-semi-bold'
          value={form.number_accommodation}
          error={error.number_accommodation}
          onChange={handleChangeForm}
        />
        <Input
          label='Merek'
          name='merk'
          placeholder='Merek kendaraan'
          labelClassName='text-sm text-primary-darker font-semi-bold'
          value={form.merk}
          error={error.merk}
          className='my-4'
          onChange={handleChangeForm}
        />
        <Input
          label='Tipe'
          name='type'
          placeholder='Tipe kendaraan'
          labelClassName='text-sm text-primary-darker font-semi-bold'
          value={form.type}
          error={error.type}
          onChange={handleChangeForm}
        />

        <div className='my-4'>
          <div className='text-sm text-primary-darker font-semi-bold mb-2'>
            Kapasitas
          </div>
          <div className='flex bg-neutral-10 items-center rounded-md'>
            <input
              type='number'
              placeholder='Masukan Kapasitas Tangki'
              className='resize-none placeholder:text-sm appearance-none focus:outline-none w-full rounded-md bg-neutral-10 focus:border-active p-3'
              name='capacity'
              value={form.capacity}
              onChange={(e) => {
                setForm({ ...form, capacity: e.target.value })
                setError({ ...error, capacity: '' })
              }}
            />
            <div className='bg-neutral-20 text-white font-semi-bold px-2 pl-3 py-3 rounded-e-md'>
              L
            </div>
          </div>
          {error?.capacity && (
            <div className='text-error text-xs'>{error.capacity}</div>
          )}
        </div>

        <div className='text-sm text-primary-darker font-semi-bold mb-2'>
          Unggah foto kendaraan
        </div>
        <div className='flex bg-neutral-10 items-center rounded-md w-full'>
          <label
            htmlFor='file'
            className='justify-between flex items-center p-3 w-full'
          >
            <div className=' flex justify-between w-full'>
              <div className='text-sm text-neutral-20 mr-4'>
                {form?.attachment ? namaFoto : 'Lampiran foto'}
              </div>
              <img src={images?.ic_image_upload} alt='' />
            </div>
            <input
              accept='application/pdf,image/*'
              type='file'
              name='file'
              onChange={changeHandler}
              style={{ display: 'none' }}
              id='file'
            />
          </label>
        </div>
        {error?.attachment && (
          <div className='text-error text-xs'>{error.attachment}</div>
        )}
      </div>

      {form?.attachment && (
        <div
          className='overflow-hidden relative w-24'
          style={{ borderRadius: '1rem' }}
        >
          <div
            className='absolute flex items-center justify-center w-10 h-10 top-2 -right-1'
            onClick={handleDeleteImage}
          >
            <img style={{ width: '90%' }} alt='' src={images.ic_close_black} />
          </div>
          <img
            src={imgAttached}
            alt='atttached img'
            className='h-24 my-4 shadow-md object-contain'
          />
        </div>
      )}

      <Button
        className='btn-primary !w-full mt-6'
        label='Simpan'
        onClick={onSubmit}
        isLoading={dataCreateArmada?.isLoading}
      />
    </div>
  )
}
