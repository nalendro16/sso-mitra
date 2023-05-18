/* eslint-disable react-hooks/exhaustive-deps */
import images from 'assets/images'
import { ProfileItem } from 'components'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
import { usePost } from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'
import { MENU_PROFILE } from 'utils/dumy'

export const Profile: React.FC = () => {
  const storage = new LocalStorage()
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [logout, postLogout] = usePost({ isLoading: false })
  const [upperMenu, setUpperMenu] = useState<any>()
  const [bottomMenu, setBottomMenu] = useState<any>()

  useEffect(() => {
    const { data } = logout
    if (data?.status === 'success') {
      storage.clear()
      navigate('/', { replace: true })
      // window.location.reload()
    }
  }, [logout])

  useEffect(() => {
    let tmpUpper: any = []
    let tmpBottom: any = []
    MENU_PROFILE?.forEach((item) => {
      if (item.label !== 'FAQs' && item.label !== 'Berikan Rating Applikasi') {
        tmpUpper.push({ ...item })
        return setUpperMenu([...tmpUpper])
      } else {
        tmpBottom.push({ ...item })
        return setBottomMenu([...tmpBottom])
      }
    })
  }, [])

  useEffect(() => {
    const { data } = logout
    if (data?.status === 'success') {
      storage.remove(StorageKey.ACCESS_TOKEN)
      storage.remove(StorageKey.IS_LOGIN)
      navigate('/', { replace: true })
      window.location.reload()
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
  }, [logout])

  const doLogout = () => {
    const deviceID = ''

    openAlert({
      title: 'Konfirmasi',
      messages: 'Apakah Anda yakin ingin keluar?',
      btnCloseText: 'Tidak',
      isConfirm: true,
      callback: (e: any) => {
        if (e.isConfirm) {
          // postLogout.getRequest(API.LOGOUT, { device_id: deviceID })
          storage.remove(StorageKey.ACCESS_TOKEN)
          storage.remove(StorageKey.IS_LOGIN)
          navigate('/', { replace: true })
        }
      },
    })
  }

  return (
    <div
      className={`bg-no-repeat bg-cover bg-center z-10 min-h-screen pb-20 bg-white top-0 left-0 w-full absolute bg-[url('/src/assets/images/ic_banner_order.png')] px-4 mt-[1rem]`}
    >
      <div className='font-bold text-center mb-12 text-lg mt-2'>{'Akun'}</div>
      <img
        src={images.ic_user}
        alt=''
        className='rounded-full h-20 w-20 mx-auto mb-6'
      />
      <div className='text-center mb-2'>{'Rafi Ramdhani'}</div>
      <div className='text-center mb-6'>{'rafiramdhani@space.com'}</div>

      {upperMenu?.map((item: any, index: number) => (
        <ProfileItem
          key={index}
          className='mb-1'
          item={item}
          onClick={() => console.log(item)}
        />
      ))}

      <div className='border-neutral-10 border-b my-4' />

      {bottomMenu?.map((item: any, index: number) => (
        <ProfileItem
          key={index}
          className='mb-1'
          item={item}
          onClick={() => console.log(item)}
        />
      ))}

      <ProfileItem
        className='mb-1'
        item={{
          label: 'LogOut',
          icon: images.ic_logout,
          to: '',
        }}
        onClick={doLogout}
      />
    </div>
  )
}
