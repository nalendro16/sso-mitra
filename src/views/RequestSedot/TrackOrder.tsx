import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation'
import images from 'assets/images'
import { useState, useEffect } from 'react'
import { AnimatedDiv, Header, StepItem } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import { useGet, usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import Skeleton from 'react-loading-skeleton'
import { useGlobalContext } from 'hooks/context'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { Geolocation } from '@capacitor/geolocation'
import { registerPlugin } from '@capacitor/core'
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  'BackgroundGeolocation'
)

export const TrackOrder: React.FC = () => {
  const navigate = useNavigate()
  const storage = new LocalStorage()
  const { openAlert, setWatcherID, watcherID } = useGlobalContext()
  const { id } = useParams()
  const [coor, setCoor] = useState<{ lat: number; long: number }>({
    lat: 0,
    long: 0,
  })
  const [dataTracking, setDataTracking] = useState<any>([])
  const [dataOrderDetail, setDataOrderDetail] = useState<any>()
  const [dataGetTracking, getTrackingData] = useGet({ isLoading: false })
  const [dataTrackingFinish, getTrackingFinish] = usePost({ isLoading: false }) //finish sedot
  const [dataStartSedot, postStartSedot] = usePost({ isLoading: false })
  const [startRenov, postStartRenov] = usePost({ isLoading: false })
  const [finishRenov, postFinishRenov] = usePost({ isLoading: false }) // finish renov
  const [startTracking, postStartTracking] = usePost({ isLoading: false })
  let levelsMitra = storage.getItem(StorageKey?.LEVEL)

  useEffect(() => {
    let levelMitra = storage.getItem(StorageKey?.LEVEL)
    if (levelMitra === 'Kontraktor') {
      getTrackingData.getRequest(API.TRACKING_SEDOT_DETAIL_KONTRAKTOR + id)
    } else {
      getTrackingData.getRequest(API.TRACKING_SEDOT_DETAIL + id)
    }
    printCurrentPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    const { data } = dataStartSedot
    if (data?.status === 'success') {
      getTrackingData.getRequest(API.TRACKING_SEDOT_DETAIL + id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStartSedot])

  useEffect(() => {
    const { data } = startTracking
    if (data?.status === 'success') {
      navigate(`/tracking-maps/${id}`)
      storage.setItem(StorageKey.ID_TRANSACTION, id)
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTracking])

  useEffect(() => {
    const { data } = dataGetTracking
    if (data?.status === 'success') {
      setDataTracking(data?.result?.progress)
      setDataOrderDetail(data?.result?.order_detail)
    } else if (data?.status === 'false') {
      setDataTracking([])
      setDataOrderDetail(null)
    }
  }, [dataGetTracking])

  useEffect(() => {
    const { data } = dataTrackingFinish
    if (data?.status === 'success') {
      openAlert({
        messages: data?.messages || 'Pesanan sudah terselesaikan',
        showBtnClose: false,
        isConfirm: true,
      })
      storage.remove(StorageKey.ID_TRANSACTION)
      BackgroundGeolocation.removeWatcher({ id: watcherID })
      setWatcherID('')
      getTrackingData.getRequest(API.TRACKING_SEDOT_DETAIL + id)
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTrackingFinish])

  useEffect(() => {
    const { data } = startRenov
    if (data?.status === 'success') {
      openAlert({
        messages: data?.messages || 'Pekerjaan sedang berlangsung',
        showBtnClose: false,
        isConfirm: true,
      })
      getTrackingData.getRequest(API.TRACKING_SEDOT_DETAIL_KONTRAKTOR + id)
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startRenov])

  useEffect(() => {
    const { data } = finishRenov
    if (data?.status === 'success') {
      openAlert({
        messages: data?.messages || 'Pekerjaan berhasil terselesaikan',
        showBtnClose: false,
        isConfirm: true,
      })
      storage.remove(StorageKey.ID_TRANSACTION)
      BackgroundGeolocation.removeWatcher({ id: watcherID })
      setWatcherID('')
      getTrackingData.getRequest(API.TRACKING_SEDOT_DETAIL_KONTRAKTOR + id)
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishRenov])

  const handleStepData = (datas: number) => {
    switch (datas) {
      case 3:
        return handleStartTracking()
      case 4:
        return handleStartWork()
      case 5:
        return storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
          ? navigate(
              `/detail-kontruksi-rab/${dataOrderDetail?.id_transaction_renovasi}/${dataOrderDetail?.id_transaction}`
            )
          : navigate(`/volume-order/${dataOrderDetail?.id_transaction}`, {
              state: dataOrderDetail,
            })
      case 6:
        return storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
          ? navigate(
              `/detail-kontruksi-wait/${dataOrderDetail?.id_transaction}`
            )
          : console.log(datas)
      case 7:
        return handleStartWork()
      case 8:
        return handleFinishWork()
      default:
        return void 0
    }
  }

  // const handleLastStep = () => {
  //   openAlert({
  //     messages: 'Apakah seluruh pekerjaan sudah selesai?',
  //     isConfirm: true,
  //     btnConfirmText: 'Ya',
  //     btnCloseText: 'Tidak',
  //     callback: (e: any) => {
  //       if (e.isConfirm) {
  //         getTrackingFinish.getRequest(API.TRACKING_FINISH_SEDOT, {
  //           id_transaction: dataOrderDetail?.id_transaction,
  //         })
  //       }
  //     },
  //   })
  // }

  const handleFinishWork = () => {
    openAlert({
      messages: 'Pastikan seluruh pekerjaan sudah selesai?',
      isConfirm: true,
      btnConfirmText: 'Ya',
      btnCloseText: 'Tidak',
      callback: (e: any) => {
        if (e.isConfirm) {
          postFinishRenov.getRequest(API.FINISH_RENOV, {
            id_transaction: dataOrderDetail?.id_transaction,
          })
        }
      },
    })
  }

  const handleStartWork = () => {
    let levelMitra = storage.getItem(StorageKey?.LEVEL)
    openAlert({
      messages: 'Apakah pekerjaan akan dimulai?',
      isConfirm: true,
      btnConfirmText: 'Ya',
      btnCloseText: 'Tidak',
      callback: (e: any) => {
        if (e.isConfirm) {
          if (levelMitra === 'Kontraktor') {
            postStartRenov.getRequest(API.START_RENOV, {
              id_transaction: dataOrderDetail?.id_transaction,
            })
          } else {
            postStartSedot.getRequest(API.START_SEDOT, {
              id_transaction: dataOrderDetail?.id_transaction,
            })
          }
        }
      },
    })
  }

  const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition()

    setCoor({
      lat: coordinates?.coords?.latitude,
      long: coordinates?.coords?.longitude,
    })
  }

  const handleStartTracking = () => {
    let levelMitra = storage.getItem(StorageKey?.LEVEL)

    openAlert({
      title: 'Mulai Pekerjaan',
      messages: 'Mulai perjalanan dan pengerjaan ke lokasi Customer?',
      isConfirm: true,
      btnConfirmText: 'Oke',
      btnCloseText: 'Nanti',
      callback: (e: any) => {
        if (e.isConfirm) {
          if (levelMitra === 'Kontraktor') {
            postStartTracking.getRequest(API.START_TRACKING_RENOV, {
              id_transaction: id,
              latitude: coor.lat,
              longitude: coor.long,
            })
          } else {
            postStartTracking.getRequest(API.START_TRACKING_SEDOT, {
              id_transaction: id,
              latitude: coor.lat,
              longitude: coor.long,
            })
          }
        }
      },
    })
  }

  return (
    <div className='mb-16'>
      <Header
        label='Track Order'
        onBackClick={() => navigate('/transaksi')}
        labelClassName='!font-bold text-white'
        className='bg-grad-head'
        backWhite
      />

      <AnimatedDiv
        className='-mx-4 bg-grad-head px-4 pt-4 pb-8 -mt-5'
        animationType='animate-ease-top'
      >
        <div className='flex justify-between text-sm my-2 text-neutral-10'>
          <div>Order dari</div>
          <div>Tanggal order</div>
        </div>

        <div className='flex justify-between text-neutral-10 font-bold text-sm'>
          {dataGetTracking?.isLoading ? (
            <Skeleton width={90} height={15} />
          ) : (
            <div>{dataOrderDetail?.order_by}</div>
          )}
          {dataGetTracking?.isLoading ? (
            <Skeleton width={90} height={15} />
          ) : (
            <div>{dataOrderDetail?.order_time_formatted}</div>
          )}
        </div>

        <div className='flex flex-col justify-center my-4 items-center w-full '>
          {dataGetTracking?.isLoading ? (
            <Skeleton width={200} height={18} className='my-0.5' />
          ) : (
            <div className='text-neutral-10'>
              {storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
                ? 'Layanan '
                : 'Layanan sedot '}
              <span className='text-neutral-10 font-bold'>
                {dataOrderDetail?.name}
              </span>
            </div>
          )}

          {dataGetTracking?.isLoading ? (
            <Skeleton width={60} height={58} className='my-4' />
          ) : (
            <div className='relative text-center my-4'>
              <img src={images.ic_calender_order} alt='' />
              <div className='font-bold text-3xl absolute top-8 left-6'>
                {dataOrderDetail?.date_sedot_formatted ||
                  dataOrderDetail?.date_renov_formatted}
              </div>
            </div>
          )}

          {dataGetTracking?.isLoading ? (
            <Skeleton width={120} height={28} className='my-2' />
          ) : (
            <div className='!font-bold text-xl text-neutral-10'>
              {dataOrderDetail?.order_time_formatted}
            </div>
          )}

          {dataGetTracking?.isLoading ? (
            <Skeleton width={200} height={18} className='my-2.5' />
          ) : (
            <div className='text-neutral-10 text-sm line-clamp-2 w-3/4 text-center mb-4'>
              {`${
                dataOrderDetail?.address ? `${dataOrderDetail?.address},` : ''
              } ${
                dataOrderDetail?.subdistrict
                  ? `${dataOrderDetail?.subdistrict},`
                  : ''
              } ${
                dataOrderDetail?.district ? `${dataOrderDetail?.district},` : ''
              } ${dataOrderDetail?.city ? `${dataOrderDetail?.city},` : ''} ${
                dataOrderDetail?.province ? `${dataOrderDetail?.province},` : ''
              }`}
              {dataOrderDetail?.postal_code ? dataOrderDetail?.postal_code : ''}
            </div>
          )}
        </div>
      </AnimatedDiv>

      <AnimatedDiv className='bg-white shadow-xl -mt-12 p-4 rounded-xl mx-4'>
        <div className='bg-primary-base p-4 rounded-md justify-between flex'>
          <div>
            <div className='text-sm text-white'>Progress</div>
            <div className='font-semi-bold text-white'>Kontruksi Renovasi</div>
            <div className='text-sm text-neutral-10'>
              Klik centang jika pekerjaan selsai
            </div>
          </div>
          <div style={{ width: 100, height: 100 }} className='p-2'>
            <CircularProgressbar
              value={dataGetTracking?.data?.result?.percentage}
              text={`${dataGetTracking?.data?.result?.percentage}%`}
              styles={buildStyles({
                textColor: 'white',
                pathColor: 'white',
              })}
            />
          </div>
        </div>

        <div className='mt-4'>
          {dataTracking?.map((item: any, index: number) => (
            <StepItem
              data={item}
              key={index}
              className='bg-yellow'
              handleStep={() =>
                handleStepData(
                  levelsMitra === 'Kontraktor' &&
                    item.step === dataGetTracking?.data?.result?.step
                    ? dataGetTracking?.data?.result?.step
                    : item.step ===
                      dataGetTracking?.data?.result?.clickable_step
                    ? item.step
                    : 0
                )
              }
            />
          ))}
        </div>
      </AnimatedDiv>
    </div>
  )
}
