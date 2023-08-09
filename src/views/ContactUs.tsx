import images from 'assets/images'
import { Button, Header, Input, InputSelect } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { useGet, usePost } from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ContactUs: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [subjectOption, setSubjectOption] = useState<any>()
  const [selectedOption, setSelectedOption] = useState<any>()
  const [imageDetail, setImageDetail] = useState<any>([])
  const [dataListSubject, getListSubject] = useGet({ isLoading: false })
  const [dataPostHelp, postDataHelp] = usePost({ isLoading: false })
  const [form, setForm] = useState<{
    subject: string
    messages: string
    file: any[]
  }>({
    subject: '',
    messages: '',
    file: [],
  })
  const [error, setError] = useState({
    subject: '',
    messages: '',
  })

  useEffect(() => {
    const { data } = dataListSubject
    if (data?.status === 'success') {
      let tmp: any = []
      data?.result?.forEach((item: any) => {
        tmp.push({ label: item, value: item })
      })
      setSubjectOption(tmp)
    }
  }, [dataListSubject])

  useEffect(() => {
    getListSubject.getRequest(API.HELP_LIST)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { data } = dataPostHelp
    if (data?.status === 'success') {
      openAlert({
        messages: 'Berhasil Mengirim Bantuan',
        isConfirm: true,
        showBtnClose: false,
        btnConfirmText: 'OK',
      })
      setForm({ subject: '', messages: '', file: [] })
      setSelectedOption(null)
      setImageDetail([])
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages,
        isConfirm: true,
        showBtnClose: false,
        btnConfirmText: 'Ya',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPostHelp])

  const handleChangeForm = (e: any) => {
    setForm({
      ...form,
      [e.name]: e.value,
    })
    setError({ ...error, [e.name]: '' })
  }

  const handleSelectSubject = (e: any) => {
    setForm({ ...form, subject: e.value })
    setError({ ...error, subject: '' })
    setSelectedOption(e)
  }

  const handleImagedetail = (e: any) => {
    let file = e.target.files[0]
    let url = URL.createObjectURL(file)

    if (imageDetail.length < 3) {
      if (file.size < 10000000) {
        if (file.type === 'application/pdf') {
          setImageDetail([...imageDetail, images.ic_pdfplaceholder])
        } else {
          setImageDetail([...imageDetail, url])
        }
        setForm({ ...form, file: [...form.file, file] })
      } else if (file.size > 10000000) {
        openAlert({
          messages: 'Ukuran maksimum File 10 Mb',
          isConfirm: true,
          showBtnClose: false,
          btnConfirmText: 'Ya',
        })
      }
    } else {
      openAlert({
        messages: 'Jumlah file sudah maksimal',
        isConfirm: true,
        showBtnClose: false,
        btnConfirmText: 'Ya',
      })
    }
    e.target.value = null
  }

  const handleDeleteImageDetail = (index: number) => {
    imageDetail.splice(index, 1)
    setImageDetail([...imageDetail])
    setForm({ ...form, file: [...imageDetail] })
  }

  const validationForm = () => {
    const newError = { ...error }
    if (!form.messages)
      newError.messages = 'Isi pesan mengenai bantuan yang anda butuhkan'
    if (!form.subject)
      newError.subject = 'Isi pesan mengenai bantuan yang anda butuhkan'

    return newError
  }

  const onSubmit = () => {
    let bodyFormData = new FormData()

    const findErrors = validationForm()
    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors)
    } else {
      for (const [key, value] of Object.entries(form)) {
        if (key === 'file') {
          Object.keys(value).forEach((index: any) => {
            let item: any = value[index]
            if (item) {
              bodyFormData.append(`file[]`, item)
            }
          })
        } else {
          bodyFormData.append(key, value as string)
        }
      }
      postDataHelp.getRequest(API.HELP_CREATE, bodyFormData)
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <Header label='Bantuan' onBackClick={() => navigate(-1)} />
      <div className='flex flex-col flex-1 h-full bg-white px-4 py-6 -mx-4 -mt-4 -mb-[4rem]'>
        <div className='font-bold text-xl mb-8'>{'Hubungi Kami'}</div>

        <InputSelect
          className='my-4'
          options={subjectOption}
          value={selectedOption}
          label='Subjek'
          onChange={handleSelectSubject}
          error={error.subject}
        />

        <Input
          className='mb-7'
          type='text-area'
          name='messages'
          label='Pesan'
          placeholder='Ketikkan Pesan'
          rows={4}
          value={form?.messages}
          onChange={handleChangeForm}
          error={error.messages}
        />

        <p className='font-semi-bold text-neutral-30 -mb-1 text-sm'>
          Upload File (Optional)
        </p>
        <label className='py-1 border-dashed border-2 border-primary-base min-w-max mt-4 text-center rounded-lg flex'>
          <div className='my-3 mx-auto px-2 flex justify-center'>
            <img
              src={images.ic_upload_photo}
              alt=''
              className='w-4 h-4 mx-auto'
            />

            <p className='ml-4 text-xs'>Upload File</p>

            <input
              accept='application/pdf,image/*'
              type='file'
              name='file'
              onChange={handleImagedetail}
              style={{ display: 'none' }}
              id='file'
            />
          </div>
        </label>

        {imageDetail && (
          <div className='mt-4 flex'>
            {imageDetail.map((item: any, index: number) => (
              <div className='flex top-0 mx-1 shadow-lg rounded'>
                <img
                  src={item ? item : ''}
                  alt=''
                  className='relative h-24 w-24 py-4 object-contain'
                />
                <img
                  src={images.ic_close_black}
                  alt='hapus gambar'
                  className='w-6 h-6 right-0 z-10 -ml-6'
                  onClick={() => handleDeleteImageDetail(index)}
                />
              </div>
            ))}
          </div>
        )}

        <div className='flex flex-1 items-end pb-4'>
          <Button
            className='btn-primary !w-full'
            label='Submit'
            onClick={onSubmit}
            isLoading={dataPostHelp?.isLoading}
          />
        </div>
      </div>
    </div>
  )
}
