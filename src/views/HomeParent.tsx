import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation'
import React, { useEffect } from 'react'
import { registerPlugin } from '@capacitor/core'
import { Routes, Route } from 'react-router-dom'
import { Home, Order, Profile, Transaksi } from 'views'
import { MenuBottom } from 'components'
import { MENU_BOTTOM } from 'config/menu'
import { usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  'BackgroundGeolocation'
)

export const HomeParent: React.FC = () => {
  const storage = new LocalStorage()
  const id_transaction = storage.getItem(StorageKey?.ID_TRANSACTION)
  const { setWatcherID, watcherID, openModalLocation } = useGlobalContext()
  const [dataUpdateLocation, postUpdateLocation] = usePost({ isLoading: false })

  useEffect(() => {
    if (id_transaction && !watcherID) {
      startBackgroundLocation()
    }
  }, [])

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

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/order' element={<Order />} />
        <Route path='/transaksi' element={<Transaksi />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <MenuBottom menu={MENU_BOTTOM} />
    </>
  )
}
