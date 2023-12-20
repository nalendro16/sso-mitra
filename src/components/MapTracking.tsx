import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation'
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api'
import { googleMapKey } from 'config/app'
import { useEffect, useState } from 'react'
import { Button, Header } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import { Geolocation } from '@capacitor/geolocation'
import { usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import { registerPlugin } from '@capacitor/core'
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  'BackgroundGeolocation'
)

const containerStyle = {
  width: '415px',
  height: '90vh',
}

export const MapTracking: React.FC = () => {
  const { openAlert, openModalLocation, setWatcherID, watcherID } =
    useGlobalContext()
  const [coor, setCoor] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  })
  const { id_transaction } = useParams()
  const [stops, setStop] = useState<any>([])
  const [paths, setPath] = useState<Array<{ lat: number; lng: number }>>([])
  const storage = new LocalStorage()
  const [dataUpdateLocation, postUpdateLocation] = usePost({ isLoading: false })
  const [dataTrackingFinish, getTrackingFinish] = usePost({ isLoading: false })
  const navigate = useNavigate()

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
      navigate(-1)
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTrackingFinish])

  useEffect(() => {
    startBackgroundLocation()
    printCurrentPosition()
    let showedTime = setTimeout(() => {
      printCurrentPositionFirst()
    }, 600)
    return () => {
      clearInterval(showedTime)
    }
  }, [])

  // useEffect(() => {

  //   let levelMitra = storage.getItem(StorageKey?.LEVEL)

  //   let interval = setInterval(() => {
  //     if (levelMitra === 'Kontraktor') {
  //       postUpdateLocation.getRequest(API.UPDATE_TRACKING_RENOV, {
  //         id_transaction: id_transaction,
  //         latitude: coor.lat,
  //         longitude: coor.lng,
  //       })
  //     } else {
  //       postUpdateLocation.getRequest(API.UPDATE_TRACKING_SEDOT, {
  //         id_transaction: id_transaction,
  //         latitude: coor.lat,
  //         longitude: coor.lng,
  //       })
  //     }
  //   }, 60000)
  //   return () => {
  //     clearInterval(interval)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [coor])

  useEffect(() => {
    const { data } = dataUpdateLocation
    if (data?.status === 'success') {
      const tmp = [
        {
          lat: Number(data?.result?.latitude),
          lng: Number(data?.result?.longitude),
          id: 'Vendor',
        },
        {
          lat: Number(data?.result?.destination_latitude),
          lng: Number(data?.result?.destination_longitude),
          id: 'Customer',
        },
      ]
      setStop(tmp)
      setPath(data?.result?.route)
      setCoor({
        lat: Number(data?.result?.latitude),
        lng: Number(data?.result?.longitude),
      })
    } else if (data?.status === 'fail') {
      // openAlert({ messages: data?.messages })
      printCurrentPositionFirstFail()
    }
  }, [dataUpdateLocation])

  const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition()

    setCoor({
      lat: coordinates?.coords?.latitude,
      lng: coordinates?.coords?.longitude,
    })
  }

  const startBackgroundLocation = () => {
    let levelMitra = storage.getItem(StorageKey?.LEVEL)
    console.log('start bg location')
    BackgroundGeolocation.addWatcher(
      {
        backgroundMessage: 'Menuju lokasi customer',
        backgroundTitle: 'Update Lokasi',
        requestPermissions: true,
        stale: false,
        distanceFilter: 100,
      },
      (location: any, error: any) => {
        if (error) {
          if (error.code === 'NOT_AUTHORIZED') {
            openModalLocation()
          }
          return console.error(error)
        }
        if (levelMitra === 'Kontraktor') {
          return postUpdateLocation.getRequest(API.UPDATE_TRACKING_RENOV, {
            id_transaction: id_transaction,
            latitude: location.latitude,
            longitude: location.longitude,
          })
        } else {
          return postUpdateLocation.getRequest(API.UPDATE_TRACKING_SEDOT, {
            id_transaction: id_transaction,
            latitude: location.latitude,
            longitude: location.longitude,
          })
        }
      }
    ).then((watcherId: string) => {
      setWatcherID(watcherId)
    })
  }

  const printCurrentPositionFirst = async () => {
    let levelMitra = storage.getItem(StorageKey?.LEVEL)
    const coordinates = await Geolocation.getCurrentPosition()

    if (levelMitra === 'Kontraktor') {
      postUpdateLocation.getRequest(API.UPDATE_TRACKING_RENOV, {
        id_transaction: id_transaction,
        latitude: coordinates.coords?.latitude,
        longitude: coordinates.coords?.longitude,
      })
    } else {
      postUpdateLocation.getRequest(API.UPDATE_TRACKING_SEDOT, {
        id_transaction: id_transaction,
        latitude: coordinates.coords?.latitude,
        longitude: coordinates.coords?.longitude,
      })
    }
  }

  const printCurrentPositionFirstFail = async () => {
    let levelMitra = storage.getItem(StorageKey?.LEVEL)

    const coordinates = await Geolocation.getCurrentPosition()
    let interval = setInterval(() => {
      if (levelMitra === 'Kontraktor') {
        postUpdateLocation.getRequest(API.UPDATE_TRACKING_RENOV, {
          id_transaction: id_transaction,
          latitude: coordinates.coords?.latitude,
          longitude: coordinates.coords?.longitude,
        })
      } else {
        postUpdateLocation.getRequest(API.UPDATE_TRACKING_SEDOT, {
          id_transaction: id_transaction,
          latitude: coordinates.coords?.latitude,
          longitude: coordinates.coords?.longitude,
        })
      }
    }, 30000)
    return () => {
      clearInterval(interval)
    }
  }

  const handleLastStep = async () => {
    let levelMitra = storage.getItem(StorageKey?.LEVEL)

    const coordinates = await Geolocation.getCurrentPosition()
    openAlert({
      messages:
        levelMitra === 'Kontraktor'
          ? 'Apakah survey sudah selesai?'
          : 'Apakah seluruh pekerjaan sudah selesai?',
      isConfirm: true,
      btnConfirmText: 'Ya',
      btnCloseText: 'Tidak',
      callback: (e: any) => {
        if (e.isConfirm) {
          if (levelMitra === 'Kontraktor') {
            getTrackingFinish.getRequest(API.START_SURVEY, {
              id_transaction: id_transaction,
              latitude: coordinates.coords?.latitude,
              longitude: coordinates.coords?.longitude,
            })
          } else {
            getTrackingFinish.getRequest(API.FINISH_SURVEY, {
              id_transaction: id_transaction,
            })
          }
        }
      },
    })
  }

  return (
    <div className='-mt-5'>
      {/* <div className='ml-2'> */}
      <Header
        onBackClick={() => navigate(-1)}
        label='Tracking Tukang Sedot'
        className='bg-gradient-header'
        labelClassName='!font-bold text-white'
        backWhite
      />
      {/* </div> */}

      <div className='flex justify-center -mx-4 -mt-[1.5rem]'>
        <LoadScript googleMapsApiKey={googleMapKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={{ lat: coor?.lat, lng: coor?.lng }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <Polyline
              path={paths}
              options={{
                strokeColor: '#eb9b34',
                strokeWeight: 10,
                strokeOpacity: 0.8,
              }}
            />

            {stops.map((stop: any, index: number) => (
              <Marker
                key={index}
                position={{
                  lat: stop.lat,
                  lng: stop.lng,
                }}
                title={stop.id}
                label={{
                  text: `${stop.id === 'Vendor' ? ' ' : stop.id}`,
                  color: '#4a89f3 ',
                  fontWeight: '800',
                  fontSize: '24px',
                }}
                icon={
                  stop.id === 'Vendor'
                    ? images.ic_mobil
                    : stop.id === 'Customer'
                    ? images.ic_customer_home
                    : ''
                }
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <Button
        className='btn-primary !w-full mt-4'
        label={
          storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
            ? 'Penyelesaian Survey'
            : 'Penyelesaian Penyedotan'
        }
        onClick={() => handleLastStep()}
        // isLoading={dataConfirmDelivery?.isLoading}
      />
    </div>
  )
}
