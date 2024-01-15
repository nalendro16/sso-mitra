import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation'
import { Capacitor, registerPlugin } from '@capacitor/core'
import { Button, Header } from 'components'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
import { usePost } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LocalStorage } from 'utils'
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  'BackgroundGeolocation'
)

export const VolumeOrder: React.FC = () => {
  const storage = new LocalStorage()
  const { id_transaction } = useParams() as any
  const { state } = useLocation() as any
  const navigate = useNavigate()
  const { openAlert, setWatcherID, watcherID } = useGlobalContext()
  const [dataBiaya, postBiaya] = usePost({ isLoading: false })
  const [form, setForm] = useState({
    id_transaction: id_transaction,
    volume_sedot_wc: '',
  })
  const [error, setError] = useState({
    volume_sedot_wc: '',
  })

  useEffect(() => {
    const { data } = dataBiaya
    if (data?.status === 'success') {
      navigate(-1)
      storage.remove(StorageKey.ID_TRANSACTION)
      BackgroundGeolocation.removeWatcher({ id: watcherID })
      setWatcherID('')
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBiaya])

  const onSubmit = () => {
    postBiaya.getRequest(API.PERHITUNGAN_BIAYA_SEDOT, form)
    console.log(form)
  }

  return (
    <div>
      <Header
        onBackClick={() => navigate(-1)}
        label='Detail Transaksi'
        backWhite
        labelClassName='text-white'
        className='!bg-primary-base'
      />

      <div className='bg-primary-base px-4 -mt-8 py-4 -mx-4 h-32' />

      <div className='bg-white p-4 rounded-lg -mt-20 mb-8 shadow-md px-8'>
        <div className='text-primary-darker text-sm font-semibold -mx-4 mb-4'>
          Detail Order
        </div>

        <div className='text-primary-darker text-sm font-semibold'>
          {state?.transaction_receipt_number}
        </div>
        <div className='text-xs  mb-4'>{state?.time_sedot_formatted}</div>

        <div className='text-primary-darker text-sm font-semibold'>
          {state?.name}
        </div>
        <div className='text-xs'>
          {`${state?.address ? state?.address : ''} ${
            state?.subdistrict ? `${state?.subdistrict},` : ''
          } ${state?.district ? `${state?.district},` : ''} ${
            state?.city ? state?.city : ''
          }`}
        </div>

        <div className='text-primary-darker text-sm font-semibold mt-4'>
          Nama Pelanggan
        </div>
        <div className='text-xs mb-4'>{state?.order_by}</div>

        <div className='text-primary-darker text-sm font-semibold'>
          Tanggal Order
        </div>
        <div className='text-xs'>{state?.order_time_formatted}</div>

        <div className='text-primary-darker text-sm font-semibold mt-4'>
          No. Armada
        </div>
        <div className='text-xs'>{state?.accommodation_number}</div>
      </div>

      <div className='text-sm text-primary-darker font-semi-bold mb-2'>
        Volume yang disedot
      </div>
      <div className='flex bg-neutral-10 items-center rounded-md'>
        <input
          type='number'
          placeholder='Masukan volume yang akan disedot'
          className='resize-none placeholder:text-sm appearance-none focus:outline-none w-full rounded-md bg-neutral-10 focus:border-active p-3'
          name='volume_sedot_wc'
          value={form.volume_sedot_wc}
          onChange={(e) => {
            setForm({ ...form, volume_sedot_wc: e.target.value })
            setError({ ...error, volume_sedot_wc: '' })
          }}
        />
        <div className='bg-neutral-20 text-white font-semi-bold px-2 pl-3 py-3 rounded-e-md'>
          L
        </div>
      </div>
      <div
        className={`fixed bottom-0 w-full bg-white p-4 -mx-4 ${
          Capacitor.isNativePlatform() ? 'max-w-content-full' : 'max-w-content'
        }`}
      >
        <Button
          className='btn-primary !w-full'
          label='Simpan'
          // disabled={!isVerified}
          isLoading={dataBiaya?.isLoading}
          onClick={onSubmit}
        />
      </div>
    </div>
  )
}
