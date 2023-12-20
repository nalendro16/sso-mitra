import { Capacitor } from '@capacitor/core'
import { Button, Header, Input, InputSelect } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { usePost } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const DumpingSubmit: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation() as any
  const { openAlert } = useGlobalContext()
  const [dataCreateDumping, postCreatDumping] = usePost({ isLoading: false })
  const [selectedOption, setSelectedOption] = useState<any>({
    label: 'Non IPLT',
    value: 1,
  })
  const [form, setForm] = useState<{
    id_accommodation: number
    iplt: number
    nama_tempat_pembuangan: string
  }>({
    id_accommodation: state?.id_accommodation,
    iplt: 1,
    nama_tempat_pembuangan: '',
  })

  useEffect(() => {
    const { data } = dataCreateDumping
    if (data?.status === 'success') {
      navigate('/dumping-list')
    } else if (data?.status === 'fail') {
      openAlert({ message: data?.messages })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCreateDumping])

  const onSubmit = () => {
    if (form?.iplt === 0) {
      postCreatDumping.getRequest(API.CREATE_DUMPING, form)
    } else {
      postCreatDumping.getRequest(API.CREATE_DUMPING, {
        id_accommodation: form?.id_accommodation,
        iplt: 1,
      })
    }
  }

  const handleSelectSubject = (e: any) => {
    setSelectedOption(e)
    setForm({ ...form, iplt: e.value, nama_tempat_pembuangan: '' })
  }

  return (
    <div>
      <Header
        label='Verifikasi Limbah'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold'
        className='!bg-primary-base text-white'
        backWhite
      />
      <div className='bg-primary-base px-4 -mt-8 py-4 -mx-4 h-28' />

      <div className='px-4 rounded-lg shadow-lg -mt-16 bg-white py-4'>
        <div className='text-primary-darker text-sm font-semibold'>
          Data Detail
        </div>
        <div className='text-primary-darker text-sm font-semibold mt-3'>
          Kendaraan
        </div>
        <div className='text-xs'>{state?.name ?? '-'}</div>
        <div className='text-primary-darker text-sm font-semibold mt-3'>
          No Plat
        </div>
        <div className='text-xs'>{state?.number_accommodation ?? '-'}</div>
        <div className='text-primary-darker text-sm font-semibold mt-3'>
          Volume Tangki
        </div>
        <div className='text-xs'>{state?.capacity ?? 0}L</div>
        <div className='text-primary-darker text-sm font-semibold mt-3'>
          Jumlah Penyedotan
        </div>
        <div className='text-xs'>{state?.total_transaksi ?? 0}</div>
      </div>

      <div className='mt-8'>
        <InputSelect
          className='my-4'
          classNameLabel='!text-primary-darker !font-semibold'
          options={[
            { label: 'IPLT', value: 0 },
            { label: 'Non IPLT', value: 1 },
          ]}
          value={selectedOption}
          label='Tempat Pembuangan'
          onChange={handleSelectSubject}
        />
      </div>

      {form?.iplt === 1 && (
        <Input
          onChange={(e) =>
            setForm({ ...form, nama_tempat_pembuangan: e.value })
          }
          name='nama_tempat_pembuangan'
          value={form.nama_tempat_pembuangan}
          label='Nama Tempat Pembuangan'
          placeholder='Nama tempat pembuangan'
          className='mb-4'
          labelClassName='text-primary-darker'
        />
      )}

      <div
        className={`fixed bottom-0 w-full bg-white p-4 -mx-4 ${
          Capacitor.isNativePlatform() ? 'max-w-content-full' : 'max-w-content'
        }`}
      >
        <Button
          className='btn-primary !w-full'
          label='Dumping'
          isLoading={dataCreateDumping?.isLoading}
          disabled={form.iplt === 1 && !form.nama_tempat_pembuangan}
          onClick={() =>
            openAlert({
              title: `Apakah anda yakin ingin melakukan submit?`,
              messages: `Data akan tersubmit pada sistem, data akan diproses oleh admin IPLT`,
              isConfirm: true,
              btnConfirmText: 'Ya',
              btnCloseText: 'Tidak',
              callback: (e: any) => {
                if (e.isConfirm) {
                  onSubmit()
                }
              },
            })
          }
        />
      </div>
    </div>
  )
}
