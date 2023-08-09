/* eslint-disable react-hooks/exhaustive-deps */
import images from 'assets/images'
import { ProfileItem } from 'components'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
import { useGet, usePost } from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'
import { MENU_PROFILE } from 'utils/dumy'

export const Profile: React.FC = () => {
  const storage = new LocalStorage()
  const navigate = useNavigate()
  const { openAlert, setLevelMitra } = useGlobalContext()
  const [logout, postLogout] = usePost({ isLoading: false })
  const [upperMenu, setUpperMenu] = useState<any>()
  const [bottomMenu, setBottomMenu] = useState<any>()
  const [dataProfile, getProfile] = useGet({ isLoading: false })

  useEffect(() => {
    const { data } = logout
    if (data?.status === 'success') {
      storage.clear()
      navigate('/', { replace: true })
      // window.location.reload()
    }
  }, [logout])

  useEffect(() => {
    getProfile.getRequest(API.PROFILE)
  }, [])

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
          storage.clear()
          setLevelMitra('')
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
      {dataProfile?.isLoading ? (
        <div className='flex justify-center mb-2'>
          <Skeleton width={80} height={80} circle className='mb-3' />
        </div>
      ) : (
        <img
          src={
            dataProfile?.data?.result?.photo
              ? dataProfile?.data?.result?.photo
              : images.ic_user
          }
          alt=''
          className='rounded-full h-20 w-20 mx-auto mb-6'
        />
      )}
      {dataProfile?.isLoading ? (
        <div className='flex justify-center mb-2'>
          <Skeleton width={120} height={24} className='mx-auto' />
        </div>
      ) : (
        <div className='text-center mb-2'>
          {dataProfile?.data?.result?.name}
        </div>
      )}

      {dataProfile?.isLoading ? (
        <div className='flex justify-center mb-2'>
          <Skeleton width={180} height={24} className='mx-auto' />
        </div>
      ) : (
        <div className='text-center mb-6'>
          {dataProfile?.data?.result?.email}
        </div>
      )}

      {upperMenu?.map((item: any, index: number) => (
        <ProfileItem
          key={index}
          className='mb-1'
          item={item}
          onClick={() => navigate(item.to)}
        />
      ))}

      <div className='border-neutral-10 border-b my-4' />

      {bottomMenu?.map((item: any, index: number) => (
        <ProfileItem
          key={index}
          className='mb-1'
          item={item}
          onClick={() => navigate(item.to)}
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
