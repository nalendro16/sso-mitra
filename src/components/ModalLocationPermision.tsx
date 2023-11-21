import { Geolocation } from '@capacitor/geolocation'
import images from 'assets/images'
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings'
import { Button, Modal } from 'components'
import { useGlobalContext } from 'hooks/context'
import React from 'react'
import { App } from '@capacitor/app'

const ModalLocationPermission: React.FC = () => {
  const { isModalLocationShow, closeModalLocation } = useGlobalContext()

  const listenerAppStateChange = () => {
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        Geolocation.checkPermissions().then((status) => {
          if (status.location === 'granted') {
            App.removeAllListeners()
            window.location.reload()
            closeModalLocation()
          }
        })
      }
    })
  }

  const checkPermission = async () => {
    Geolocation.checkPermissions()
      .then((status) => {
        if (status.location !== 'granted') {
          Geolocation.requestPermissions().then((status) => {
            if (status.location === 'granted') {
              window.location.reload()
              closeModalLocation()
            } else {
              listenerAppStateChange()
              NativeSettings.open({
                optionAndroid: AndroidSettings.ApplicationDetails,
                optionIOS: IOSSettings.App,
              })
            }
          })
        } else {
          listenerAppStateChange()
          NativeSettings.open({
            optionAndroid: AndroidSettings.Location,
            optionIOS: IOSSettings.LocationServices,
          })
        }
      })
      .catch((e) => {
        listenerAppStateChange()
        NativeSettings.open({
          optionAndroid: AndroidSettings.Location,
          optionIOS: IOSSettings.LocationServices,
        })
      })
  }

  return (
    <Modal
      aria-hidden='true'
      dialogClassName='p-0'
      contentClassName='flex flex-col justify-center p-4'
      show={isModalLocationShow}
      onHide={closeModalLocation}
    >
      <div className='text-center mx-4'>
        <div className='font-arial-rounded text-center fs-5'>
          {'AKSES TIDAK DIIZINKAN'}
        </div>
        {/* <img className='my-3' src={images.ic_error} style={{width: '20%'}} alt='ic-error'/> */}
        <div className='text-center'>
          {'Izinkan akses aplikasi untuk melanjutkan'}
        </div>
        <Button
          className='btn-sm w-3/4 mt-4'
          label='MINTA AKSES'
          onClick={checkPermission}
        />
      </div>
    </Modal>
  )
}

export default ModalLocationPermission
